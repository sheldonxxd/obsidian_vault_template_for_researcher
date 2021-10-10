'use strict';

var obsidian = require('obsidian');
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var util = require('util');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespace(path);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class TemplaterError extends Error {
    constructor(msg, console_msg) {
        super(msg);
        this.console_msg = console_msg;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

const DEFAULT_SETTINGS = {
    command_timeout: 5,
    template_folder: "",
    templates_pairs: [["", ""]],
    trigger_on_file_creation: false,
    enable_system_commands: false,
    shell_path: "",
    script_folder: undefined,
    empty_file_template: undefined,
    syntax_highlighting: true,
};
class TemplaterSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.app = app;
        this.plugin = plugin;
    }
    display() {
        const { containerEl } = this;
        let desc;
        containerEl.empty();
        new obsidian.Setting(containerEl)
            .setName("Template folder location")
            .setDesc("Files in this folder will be available as templates.")
            .addText(text => {
            text.setPlaceholder("Example: folder 1/folder 2")
                .setValue(this.plugin.settings.template_folder)
                .onChange((new_folder) => {
                this.plugin.settings.template_folder = new_folder;
                this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Timeout")
            .setDesc("Maximum timeout in seconds for a system command.")
            .addText(text => {
            text.setPlaceholder("Timeout")
                .setValue(this.plugin.settings.command_timeout.toString())
                .onChange((new_value) => {
                const new_timeout = Number(new_value);
                if (isNaN(new_timeout)) {
                    this.plugin.log_error(new TemplaterError("Timeout must be a number"));
                    return;
                }
                this.plugin.settings.command_timeout = new_timeout;
                this.plugin.saveSettings();
            });
        });
        desc = document.createDocumentFragment();
        desc.append("Templater provides multiples predefined variables / functions that you can use.", desc.createEl("br"), "Check the ", desc.createEl("a", {
            href: "https://silentvoid13.github.io/Templater/",
            text: "documentation"
        }), " to get a list of all the available internal variables / functions.");
        new obsidian.Setting(containerEl)
            .setName("Internal Variables and Functions")
            .setDesc(desc);
        desc = document.createDocumentFragment();
        desc.append("Adds syntax highlighting for Templater commands in edit mode.");
        new obsidian.Setting(containerEl)
            .setName("Syntax Highlighting")
            .setDesc(desc)
            .addToggle(toggle => {
            toggle
                .setValue(this.plugin.settings.syntax_highlighting)
                .onChange(syntax_highlighting => {
                this.plugin.settings.syntax_highlighting = syntax_highlighting;
                this.plugin.saveSettings();
                this.plugin.update_syntax_highlighting();
            });
        });
        desc = document.createDocumentFragment();
        desc.append("Templater will listen for the new file creation event, and replace every command it finds in the new file's content.", desc.createEl("br"), "This makes Templater compatible with other plugins like the Daily note core plugin, Calendar plugin, Review plugin, Note refactor plugin, ...", desc.createEl("br"), desc.createEl("b", {
            text: "Warning: ",
        }), "This can be dangerous if you create new files with unknown / unsafe content on creation. Make sure that every new file's content is safe on creation.");
        new obsidian.Setting(containerEl)
            .setName("Trigger Templater on new file creation")
            .setDesc(desc)
            .addToggle(toggle => {
            toggle
                .setValue(this.plugin.settings.trigger_on_file_creation)
                .onChange(trigger_on_file_creation => {
                this.plugin.settings.trigger_on_file_creation = trigger_on_file_creation;
                this.plugin.saveSettings();
                this.plugin.update_trigger_file_on_creation();
                // Force refresh
                this.display();
            });
        });
        if (this.plugin.settings.trigger_on_file_creation) {
            desc = document.createDocumentFragment();
            desc.append("Templater will automatically apply this template to new empty files when they are created.", desc.createEl("br"), "The .md extension for the file shouldn't be specified.");
            new obsidian.Setting(containerEl)
                .setName("Empty file template")
                .setDesc(desc)
                .addText(text => {
                text.setPlaceholder("folder 1/template_file")
                    .setValue(this.plugin.settings.empty_file_template)
                    .onChange((empty_file_template) => {
                    this.plugin.settings.empty_file_template = empty_file_template;
                    this.plugin.saveSettings();
                });
            });
        }
        desc = document.createDocumentFragment();
        desc.append("All JavaScript files in this folder will be loaded as CommonJS modules, to import custom user functions.", desc.createEl("br"), "The folder needs to be accessible from the vault.", desc.createEl("br"), "Check the ", desc.createEl("a", {
            href: "https://silentvoid13.github.io/Templater/",
            text: "documentation",
        }), " for more informations.");
        new obsidian.Setting(containerEl)
            .setName("Script files folder location")
            .setDesc(desc)
            .addText(text => {
            text.setPlaceholder("Example: folder 1/folder 2")
                .setValue(this.plugin.settings.script_folder)
                .onChange((new_folder) => {
                this.plugin.settings.script_folder = new_folder;
                this.plugin.saveSettings();
            });
        });
        desc = document.createDocumentFragment();
        desc.append("Allows you to create user functions linked to system commands.", desc.createEl("br"), desc.createEl("b", {
            text: "Warning: "
        }), "It can be dangerous to execute arbitrary system commands from untrusted sources. Only run system commands that you understand, from trusted sources.");
        new obsidian.Setting(containerEl)
            .setName("Enable System Commands")
            .setDesc(desc)
            .addToggle(toggle => {
            toggle
                .setValue(this.plugin.settings.enable_system_commands)
                .onChange(enable_system_commands => {
                this.plugin.settings.enable_system_commands = enable_system_commands;
                this.plugin.saveSettings();
                // Force refresh
                this.display();
            });
        });
        if (this.plugin.settings.enable_system_commands) {
            desc = document.createDocumentFragment();
            desc.append("Full path to the shell binary to execute the command with.", desc.createEl("br"), "This setting is optional and will default to the system's default shell if not specified.", desc.createEl("br"), "You can use forward slashes ('/') as path separators on all platforms if in doubt.");
            new obsidian.Setting(containerEl)
                .setName("Shell binary location")
                .setDesc(desc)
                .addText(text => {
                text.setPlaceholder("Example: /bin/bash, ...")
                    .setValue(this.plugin.settings.shell_path)
                    .onChange((shell_path) => {
                    this.plugin.settings.shell_path = shell_path;
                    this.plugin.saveSettings();
                });
            });
            let i = 1;
            this.plugin.settings.templates_pairs.forEach((template_pair) => {
                const div = containerEl.createEl('div');
                div.addClass("templater_div");
                const title = containerEl.createEl('h4', {
                    text: 'User Function n°' + i,
                });
                title.addClass("templater_title");
                const setting = new obsidian.Setting(containerEl)
                    .addExtraButton(extra => {
                    extra.setIcon("cross")
                        .setTooltip("Delete")
                        .onClick(() => {
                        const index = this.plugin.settings.templates_pairs.indexOf(template_pair);
                        if (index > -1) {
                            this.plugin.settings.templates_pairs.splice(index, 1);
                            // Force refresh
                            this.plugin.saveSettings();
                            this.display();
                        }
                    });
                })
                    .addText(text => {
                    const t = text.setPlaceholder('Function name')
                        .setValue(template_pair[0])
                        .onChange((new_value) => {
                        const index = this.plugin.settings.templates_pairs.indexOf(template_pair);
                        if (index > -1) {
                            this.plugin.settings.templates_pairs[index][0] = new_value;
                            this.plugin.saveSettings();
                        }
                    });
                    t.inputEl.addClass("templater_template");
                    return t;
                })
                    .addTextArea(text => {
                    const t = text.setPlaceholder('System Command')
                        .setValue(template_pair[1])
                        .onChange((new_cmd) => {
                        const index = this.plugin.settings.templates_pairs.indexOf(template_pair);
                        if (index > -1) {
                            this.plugin.settings.templates_pairs[index][1] = new_cmd;
                            this.plugin.saveSettings();
                        }
                    });
                    t.inputEl.setAttr("rows", 4);
                    t.inputEl.addClass("templater_cmd");
                    return t;
                });
                setting.infoEl.remove();
                div.appendChild(title);
                div.appendChild(containerEl.lastChild);
                i += 1;
            });
            const div = containerEl.createEl('div');
            div.addClass("templater_div2");
            const setting = new obsidian.Setting(containerEl)
                .addButton(button => {
                const b = button.setButtonText("Add New User Function").onClick(() => {
                    this.plugin.settings.templates_pairs.push(["", ""]);
                    // Force refresh
                    this.display();
                });
                b.buttonEl.addClass("templater_button");
                return b;
            });
            setting.infoEl.remove();
            div.appendChild(containerEl.lastChild);
        }
    }
}

const obsidian_module = require("obsidian");
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function escapeRegExp$1(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function resolveTFile(app, file_str) {
    file_str = obsidian.normalizePath(file_str);
    const file = app.vault.getAbstractFileByPath(file_str);
    if (!file) {
        throw new TemplaterError(`File "${file_str}" doesn't exist`);
    }
    if (!(file instanceof obsidian.TFile)) {
        throw new TemplaterError(`${file_str} is a folder, not a file`);
    }
    return file;
}
function getTFilesFromFolder(app, folder_str) {
    folder_str = obsidian.normalizePath(folder_str);
    const folder = app.vault.getAbstractFileByPath(folder_str);
    if (!folder) {
        throw new TemplaterError(`Folder "${folder_str}" doesn't exist`);
    }
    if (!(folder instanceof obsidian.TFolder)) {
        throw new TemplaterError(`${folder_str} is a file, not a folder`);
    }
    let files = [];
    obsidian.Vault.recurseChildren(folder, (file) => {
        if (file instanceof obsidian.TFile) {
            files.push(file);
        }
    });
    files.sort((a, b) => {
        return a.basename.localeCompare(b.basename);
    });
    return files;
}

var OpenMode;
(function (OpenMode) {
    OpenMode[OpenMode["InsertTemplate"] = 0] = "InsertTemplate";
    OpenMode[OpenMode["CreateNoteTemplate"] = 1] = "CreateNoteTemplate";
})(OpenMode || (OpenMode = {}));
class TemplaterFuzzySuggestModal extends obsidian.FuzzySuggestModal {
    constructor(app, plugin) {
        super(app);
        this.app = app;
        this.plugin = plugin;
    }
    getItems() {
        if (this.plugin.settings.template_folder === "") {
            return this.app.vault.getMarkdownFiles();
        }
        return getTFilesFromFolder(this.app, this.plugin.settings.template_folder);
    }
    getItemText(item) {
        return item.basename;
    }
    onChooseItem(item, _evt) {
        switch (this.open_mode) {
            case OpenMode.InsertTemplate:
                this.plugin.templater.append_template(item);
                break;
            case OpenMode.CreateNoteTemplate:
                this.plugin.templater.create_new_note_from_template(item, this.creation_folder);
                break;
        }
    }
    start() {
        try {
            this.open();
        }
        catch (e) {
            this.plugin.log_error(e);
        }
    }
    insert_template() {
        this.open_mode = OpenMode.InsertTemplate;
        this.start();
    }
    create_new_note_from_template(folder) {
        this.creation_folder = folder;
        this.open_mode = OpenMode.CreateNoteTemplate;
        this.start();
    }
}

const UNSUPPORTED_MOBILE_TEMPLATE = "Error_MobileUnsupportedTemplate";
const ICON_DATA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.1328 28.7"><path d="M0 15.14 0 10.15 18.67 1.51 18.67 6.03 4.72 12.33 4.72 12.76 18.67 19.22 18.67 23.74 0 15.14ZM33.6928 1.84C33.6928 1.84 33.9761 2.1467 34.5428 2.76C35.1094 3.38 35.3928 4.56 35.3928 6.3C35.3928 8.0466 34.8195 9.54 33.6728 10.78C32.5261 12.02 31.0995 12.64 29.3928 12.64C27.6862 12.64 26.2661 12.0267 25.1328 10.8C23.9928 9.5733 23.4228 8.0867 23.4228 6.34C23.4228 4.6 23.9995 3.1066 25.1528 1.86C26.2994.62 27.7261 0 29.4328 0C31.1395 0 32.5594.6133 33.6928 1.84M49.8228.67 29.5328 28.38 24.4128 28.38 44.7128.67 49.8228.67M31.0328 8.38C31.0328 8.38 31.1395 8.2467 31.3528 7.98C31.5662 7.7067 31.6728 7.1733 31.6728 6.38C31.6728 5.5867 31.4461 4.92 30.9928 4.38C30.5461 3.84 29.9995 3.57 29.3528 3.57C28.7061 3.57 28.1695 3.84 27.7428 4.38C27.3228 4.92 27.1128 5.5867 27.1128 6.38C27.1128 7.1733 27.3361 7.84 27.7828 8.38C28.2361 8.9267 28.7861 9.2 29.4328 9.2C30.0795 9.2 30.6128 8.9267 31.0328 8.38M49.4328 17.9C49.4328 17.9 49.7161 18.2067 50.2828 18.82C50.8495 19.4333 51.1328 20.6133 51.1328 22.36C51.1328 24.1 50.5594 25.59 49.4128 26.83C48.2595 28.0766 46.8295 28.7 45.1228 28.7C43.4228 28.7 42.0028 28.0833 40.8628 26.85C39.7295 25.6233 39.1628 24.1366 39.1628 22.39C39.1628 20.65 39.7361 19.16 40.8828 17.92C42.0361 16.6733 43.4628 16.05 45.1628 16.05C46.8694 16.05 48.2928 16.6667 49.4328 17.9M46.8528 24.52C46.8528 24.52 46.9595 24.3833 47.1728 24.11C47.3795 23.8367 47.4828 23.3033 47.4828 22.51C47.4828 21.7167 47.2595 21.05 46.8128 20.51C46.3661 19.97 45.8162 19.7 45.1628 19.7C44.5161 19.7 43.9828 19.97 43.5628 20.51C43.1428 21.05 42.9328 21.7167 42.9328 22.51C42.9328 23.3033 43.1561 23.9733 43.6028 24.52C44.0494 25.06 44.5961 25.33 45.2428 25.33C45.8895 25.33 46.4261 25.06 46.8528 24.52Z" fill="currentColor"/></svg>`;

class CursorJumper {
    constructor(app) {
        this.app = app;
        this.cursor_regex = new RegExp("<%\\s*tp.file.cursor\\((?<order>[0-9]{0,2})\\)\\s*%>", "g");
    }
    jump_to_next_cursor_location() {
        return __awaiter(this, void 0, void 0, function* () {
            const active_view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
            if (!active_view) {
                return;
            }
            const active_file = active_view.file;
            yield active_view.save();
            const content = yield this.app.vault.read(active_file);
            const { new_content, positions } = this.replace_and_get_cursor_positions(content);
            if (positions) {
                yield this.app.vault.modify(active_file, new_content);
                this.set_cursor_location(positions);
            }
        });
    }
    get_editor_position_from_index(content, index) {
        const substr = content.substr(0, index);
        let l = 0;
        let offset = -1;
        let r = -1;
        for (; (r = substr.indexOf("\n", r + 1)) !== -1; l++, offset = r)
            ;
        offset += 1;
        const ch = content.substr(offset, index - offset).length;
        return { line: l, ch: ch };
    }
    replace_and_get_cursor_positions(content) {
        let cursor_matches = [];
        let match;
        while ((match = this.cursor_regex.exec(content)) != null) {
            cursor_matches.push(match);
        }
        if (cursor_matches.length === 0) {
            return {};
        }
        cursor_matches.sort((m1, m2) => {
            return Number(m1.groups["order"]) - Number(m2.groups["order"]);
        });
        const match_str = cursor_matches[0][0];
        cursor_matches = cursor_matches.filter(m => {
            return m[0] === match_str;
        });
        const positions = [];
        let index_offset = 0;
        for (let match of cursor_matches) {
            const index = match.index - index_offset;
            positions.push(this.get_editor_position_from_index(content, index));
            content = content.replace(new RegExp(escapeRegExp$1(match[0])), "");
            index_offset += match[0].length;
            // For tp.file.cursor(), we keep the default top to bottom
            if (match[1] === "") {
                break;
            }
        }
        return { new_content: content, positions: positions };
    }
    set_cursor_location(positions) {
        const active_view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        if (!active_view) {
            return;
        }
        const editor = active_view.editor;
        editor.focus();
        let selections = [];
        for (let pos of positions) {
            selections.push({ from: pos });
        }
        let transaction = {
            selections: selections
        };
        editor.transaction(transaction);
    }
}

function setPrototypeOf(obj, proto) {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(obj, proto);
    }
    else {
        obj.__proto__ = proto;
    }
}
// This is pretty much the only way to get nice, extended Errors
// without using ES6
/**
 * This returns a new Error with a custom prototype. Note that it's _not_ a constructor
 *
 * @param message Error message
 *
 * **Example**
 *
 * ```js
 * throw EtaErr("template not found")
 * ```
 */
function EtaErr(message) {
    var err = new Error(message);
    setPrototypeOf(err, EtaErr.prototype);
    return err;
}
EtaErr.prototype = Object.create(Error.prototype, {
    name: { value: 'Eta Error', enumerable: false }
});
/**
 * Throws an EtaErr with a nicely formatted error and message showing where in the template the error occurred.
 */
function ParseErr(message, str, indx) {
    var whitespace = str.slice(0, indx).split(/\n/);
    var lineNo = whitespace.length;
    var colNo = whitespace[lineNo - 1].length + 1;
    message +=
        ' at line ' +
            lineNo +
            ' col ' +
            colNo +
            ':\n\n' +
            '  ' +
            str.split(/\n/)[lineNo - 1] +
            '\n' +
            '  ' +
            Array(colNo).join(' ') +
            '^';
    throw EtaErr(message);
}

/**
 * @returns The global Promise function
 */
var promiseImpl = new Function('return this')().Promise;
/**
 * @returns A new AsyncFunction constuctor
 */
function getAsyncFunctionConstructor() {
    try {
        return new Function('return (async function(){}).constructor')();
    }
    catch (e) {
        if (e instanceof SyntaxError) {
            throw EtaErr("This environment doesn't support async/await");
        }
        else {
            throw e;
        }
    }
}
/**
 * str.trimLeft polyfill
 *
 * @param str - Input string
 * @returns The string with left whitespace removed
 *
 */
function trimLeft(str) {
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!String.prototype.trimLeft) {
        return str.trimLeft();
    }
    else {
        return str.replace(/^\s+/, '');
    }
}
/**
 * str.trimRight polyfill
 *
 * @param str - Input string
 * @returns The string with right whitespace removed
 *
 */
function trimRight(str) {
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!String.prototype.trimRight) {
        return str.trimRight();
    }
    else {
        return str.replace(/\s+$/, ''); // TODO: do we really need to replace BOM's?
    }
}

// TODO: allow '-' to trim up until newline. Use [^\S\n\r] instead of \s
/* END TYPES */
function hasOwnProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
function copyProps(toObj, fromObj) {
    for (var key in fromObj) {
        if (hasOwnProp(fromObj, key)) {
            toObj[key] = fromObj[key];
        }
    }
    return toObj;
}
/**
 * Takes a string within a template and trims it, based on the preceding tag's whitespace control and `config.autoTrim`
 */
function trimWS(str, config, wsLeft, wsRight) {
    var leftTrim;
    var rightTrim;
    if (Array.isArray(config.autoTrim)) {
        // kinda confusing
        // but _}} will trim the left side of the following string
        leftTrim = config.autoTrim[1];
        rightTrim = config.autoTrim[0];
    }
    else {
        leftTrim = rightTrim = config.autoTrim;
    }
    if (wsLeft || wsLeft === false) {
        leftTrim = wsLeft;
    }
    if (wsRight || wsRight === false) {
        rightTrim = wsRight;
    }
    if (!rightTrim && !leftTrim) {
        return str;
    }
    if (leftTrim === 'slurp' && rightTrim === 'slurp') {
        return str.trim();
    }
    if (leftTrim === '_' || leftTrim === 'slurp') {
        // console.log('trimming left' + leftTrim)
        // full slurp
        str = trimLeft(str);
    }
    else if (leftTrim === '-' || leftTrim === 'nl') {
        // nl trim
        str = str.replace(/^(?:\r\n|\n|\r)/, '');
    }
    if (rightTrim === '_' || rightTrim === 'slurp') {
        // full slurp
        str = trimRight(str);
    }
    else if (rightTrim === '-' || rightTrim === 'nl') {
        // nl trim
        str = str.replace(/(?:\r\n|\n|\r)$/, ''); // TODO: make sure this gets \r\n
    }
    return str;
}
/**
 * A map of special HTML characters to their XML-escaped equivalents
 */
var escMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};
function replaceChar(s) {
    return escMap[s];
}
/**
 * XML-escapes an input value after converting it to a string
 *
 * @param str - Input value (usually a string)
 * @returns XML-escaped string
 */
function XMLEscape(str) {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    // To deal with XSS. Based on Escape implementations of Mustache.JS and Marko, then customized.
    var newStr = String(str);
    if (/[&<>"']/.test(newStr)) {
        return newStr.replace(/[&<>"']/g, replaceChar);
    }
    else {
        return newStr;
    }
}

/* END TYPES */
var templateLitReg = /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})*}|(?!\${)[^\\`])*`/g;
var singleQuoteReg = /'(?:\\[\s\w"'\\`]|[^\n\r'\\])*?'/g;
var doubleQuoteReg = /"(?:\\[\s\w"'\\`]|[^\n\r"\\])*?"/g;
/** Escape special regular expression characters inside a string */
function escapeRegExp(string) {
    // From MDN
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function parse(str, config) {
    var buffer = [];
    var trimLeftOfNextStr = false;
    var lastIndex = 0;
    var parseOptions = config.parse;
    if (config.plugins) {
        for (var i = 0; i < config.plugins.length; i++) {
            var plugin = config.plugins[i];
            if (plugin.processTemplate) {
                str = plugin.processTemplate(str, config);
            }
        }
    }
    /* Adding for EJS compatibility */
    if (config.rmWhitespace) {
        // Code taken directly from EJS
        // Have to use two separate replaces here as `^` and `$` operators don't
        // work well with `\r` and empty lines don't work well with the `m` flag.
        // Essentially, this replaces the whitespace at the beginning and end of
        // each line and removes multiple newlines.
        str = str.replace(/[\r\n]+/g, '\n').replace(/^\s+|\s+$/gm, '');
    }
    /* End rmWhitespace option */
    templateLitReg.lastIndex = 0;
    singleQuoteReg.lastIndex = 0;
    doubleQuoteReg.lastIndex = 0;
    function pushString(strng, shouldTrimRightOfString) {
        if (strng) {
            // if string is truthy it must be of type 'string'
            strng = trimWS(strng, config, trimLeftOfNextStr, // this will only be false on the first str, the next ones will be null or undefined
            shouldTrimRightOfString);
            if (strng) {
                // replace \ with \\, ' with \'
                // we're going to convert all CRLF to LF so it doesn't take more than one replace
                strng = strng.replace(/\\|'/g, '\\$&').replace(/\r\n|\n|\r/g, '\\n');
                buffer.push(strng);
            }
        }
    }
    var prefixes = [parseOptions.exec, parseOptions.interpolate, parseOptions.raw].reduce(function (accumulator, prefix) {
        if (accumulator && prefix) {
            return accumulator + '|' + escapeRegExp(prefix);
        }
        else if (prefix) {
            // accumulator is falsy
            return escapeRegExp(prefix);
        }
        else {
            // prefix and accumulator are both falsy
            return accumulator;
        }
    }, '');
    var parseOpenReg = new RegExp('([^]*?)' + escapeRegExp(config.tags[0]) + '(-|_)?\\s*(' + prefixes + ')?\\s*(?![\\s+\\-_' + prefixes + '])', 'g');
    var parseCloseReg = new RegExp('\'|"|`|\\/\\*|(\\s*(-|_)?' + escapeRegExp(config.tags[1]) + ')', 'g');
    // TODO: benchmark having the \s* on either side vs using str.trim()
    var m;
    while ((m = parseOpenReg.exec(str))) {
        lastIndex = m[0].length + m.index;
        var precedingString = m[1];
        var wsLeft = m[2];
        var prefix = m[3] || ''; // by default either ~, =, or empty
        pushString(precedingString, wsLeft);
        parseCloseReg.lastIndex = lastIndex;
        var closeTag = void 0;
        var currentObj = false;
        while ((closeTag = parseCloseReg.exec(str))) {
            if (closeTag[1]) {
                var content = str.slice(lastIndex, closeTag.index);
                parseOpenReg.lastIndex = lastIndex = parseCloseReg.lastIndex;
                trimLeftOfNextStr = closeTag[2];
                var currentType = prefix === parseOptions.exec
                    ? 'e'
                    : prefix === parseOptions.raw
                        ? 'r'
                        : prefix === parseOptions.interpolate
                            ? 'i'
                            : '';
                currentObj = { t: currentType, val: content };
                break;
            }
            else {
                var char = closeTag[0];
                if (char === '/*') {
                    var commentCloseInd = str.indexOf('*/', parseCloseReg.lastIndex);
                    if (commentCloseInd === -1) {
                        ParseErr('unclosed comment', str, closeTag.index);
                    }
                    parseCloseReg.lastIndex = commentCloseInd;
                }
                else if (char === "'") {
                    singleQuoteReg.lastIndex = closeTag.index;
                    var singleQuoteMatch = singleQuoteReg.exec(str);
                    if (singleQuoteMatch) {
                        parseCloseReg.lastIndex = singleQuoteReg.lastIndex;
                    }
                    else {
                        ParseErr('unclosed string', str, closeTag.index);
                    }
                }
                else if (char === '"') {
                    doubleQuoteReg.lastIndex = closeTag.index;
                    var doubleQuoteMatch = doubleQuoteReg.exec(str);
                    if (doubleQuoteMatch) {
                        parseCloseReg.lastIndex = doubleQuoteReg.lastIndex;
                    }
                    else {
                        ParseErr('unclosed string', str, closeTag.index);
                    }
                }
                else if (char === '`') {
                    templateLitReg.lastIndex = closeTag.index;
                    var templateLitMatch = templateLitReg.exec(str);
                    if (templateLitMatch) {
                        parseCloseReg.lastIndex = templateLitReg.lastIndex;
                    }
                    else {
                        ParseErr('unclosed string', str, closeTag.index);
                    }
                }
            }
        }
        if (currentObj) {
            buffer.push(currentObj);
        }
        else {
            ParseErr('unclosed tag', str, m.index + precedingString.length);
        }
    }
    pushString(str.slice(lastIndex, str.length), false);
    if (config.plugins) {
        for (var i = 0; i < config.plugins.length; i++) {
            var plugin = config.plugins[i];
            if (plugin.processAST) {
                buffer = plugin.processAST(buffer, config);
            }
        }
    }
    return buffer;
}

/* END TYPES */
/**
 * Compiles a template string to a function string. Most often users just use `compile()`, which calls `compileToString` and creates a new function using the result
 *
 * **Example**
 *
 * ```js
 * compileToString("Hi <%= it.user %>", eta.config)
 * // "var tR='',include=E.include.bind(E),includeFile=E.includeFile.bind(E);tR+='Hi ';tR+=E.e(it.user);if(cb){cb(null,tR)} return tR"
 * ```
 */
function compileToString(str, config) {
    var buffer = parse(str, config);
    var res = "var tR='',__l,__lP" +
        (config.include ? ',include=E.include.bind(E)' : '') +
        (config.includeFile ? ',includeFile=E.includeFile.bind(E)' : '') +
        '\nfunction layout(p,d){__l=p;__lP=d}\n' +
        (config.globalAwait ? 'const _prs = [];\n' : '') +
        (config.useWith ? 'with(' + config.varName + '||{}){' : '') +
        compileScope(buffer, config) +
        (config.includeFile
            ? 'if(__l)tR=' +
                (config.async ? 'await ' : '') +
                ("includeFile(__l,Object.assign(" + config.varName + ",{body:tR},__lP))\n")
            : config.include
                ? 'if(__l)tR=' +
                    (config.async ? 'await ' : '') +
                    ("include(__l,Object.assign(" + config.varName + ",{body:tR},__lP))\n")
                : '') +
        'if(cb){cb(null,tR)} return tR' +
        (config.useWith ? '}' : '');
    if (config.plugins) {
        for (var i = 0; i < config.plugins.length; i++) {
            var plugin = config.plugins[i];
            if (plugin.processFnString) {
                res = plugin.processFnString(res, config);
            }
        }
    }
    return res;
}
/**
 * Loops through the AST generated by `parse` and transform each item into JS calls
 *
 * **Example**
 *
 * ```js
 * // AST version of 'Hi <%= it.user %>'
 * let templateAST = ['Hi ', { val: 'it.user', t: 'i' }]
 * compileScope(templateAST, eta.config)
 * // "tR+='Hi ';tR+=E.e(it.user);"
 * ```
 */
function compileScope(buff, config) {
    var i;
    var buffLength = buff.length;
    var returnStr = '';
    var REPLACEMENT_STR = "rJ2KqXzxQg";
    for (i = 0; i < buffLength; i++) {
        var currentBlock = buff[i];
        if (typeof currentBlock === 'string') {
            var str = currentBlock;
            // we know string exists
            returnStr += "tR+='" + str + "'\n";
        }
        else {
            var type = currentBlock.t; // ~, s, !, ?, r
            var content = currentBlock.val || '';
            if (type === 'r') {
                // raw
                if (config.globalAwait) {
                    returnStr += "_prs.push(" + content + ");\n";
                    returnStr += "tR+='" + REPLACEMENT_STR + "'\n";
                }
                else {
                    if (config.filter) {
                        content = 'E.filter(' + content + ')';
                    }
                    returnStr += 'tR+=' + content + '\n';
                }
            }
            else if (type === 'i') {
                // interpolate
                if (config.globalAwait) {
                    returnStr += "_prs.push(" + content + ");\n";
                    returnStr += "tR+='" + REPLACEMENT_STR + "'\n";
                }
                else {
                    if (config.filter) {
                        content = 'E.filter(' + content + ')';
                    }
                    returnStr += 'tR+=' + content + '\n';
                    if (config.autoEscape) {
                        content = 'E.e(' + content + ')';
                    }
                    returnStr += 'tR+=' + content + '\n';
                }
            }
            else if (type === 'e') {
                // execute
                returnStr += content + '\n'; // you need a \n in case you have <% } %>
            }
        }
    }
    if (config.globalAwait) {
        returnStr += "const _rst = await Promise.all(_prs);\ntR = tR.replace(/" + REPLACEMENT_STR + "/g, () => _rst.shift());\n";
    }
    return returnStr;
}

/**
 * Handles storage and accessing of values
 *
 * In this case, we use it to store compiled template functions
 * Indexed by their `name` or `filename`
 */
var Cacher = /** @class */ (function () {
    function Cacher(cache) {
        this.cache = cache;
    }
    Cacher.prototype.define = function (key, val) {
        this.cache[key] = val;
    };
    Cacher.prototype.get = function (key) {
        // string | array.
        // TODO: allow array of keys to look down
        // TODO: create plugin to allow referencing helpers, filters with dot notation
        return this.cache[key];
    };
    Cacher.prototype.remove = function (key) {
        delete this.cache[key];
    };
    Cacher.prototype.reset = function () {
        this.cache = {};
    };
    Cacher.prototype.load = function (cacheObj) {
        copyProps(this.cache, cacheObj);
    };
    return Cacher;
}());

/* END TYPES */
/**
 * Eta's template storage
 *
 * Stores partials and cached templates
 */
var templates = new Cacher({});

/* END TYPES */
/**
 * Include a template based on its name (or filepath, if it's already been cached).
 *
 * Called like `include(templateNameOrPath, data)`
 */
function includeHelper(templateNameOrPath, data) {
    var template = this.templates.get(templateNameOrPath);
    if (!template) {
        throw EtaErr('Could not fetch template "' + templateNameOrPath + '"');
    }
    return template(data, this);
}
/** Eta's base (global) configuration */
var config = {
    async: false,
    autoEscape: true,
    autoTrim: [false, 'nl'],
    cache: false,
    e: XMLEscape,
    include: includeHelper,
    parse: {
        exec: '',
        interpolate: '=',
        raw: '~'
    },
    plugins: [],
    rmWhitespace: false,
    tags: ['<%', '%>'],
    templates: templates,
    useWith: false,
    varName: 'it'
};
/**
 * Takes one or two partial (not necessarily complete) configuration objects, merges them 1 layer deep into eta.config, and returns the result
 *
 * @param override Partial configuration object
 * @param baseConfig Partial configuration object to merge before `override`
 *
 * **Example**
 *
 * ```js
 * let customConfig = getConfig({tags: ['!#', '#!']})
 * ```
 */
function getConfig(override, baseConfig) {
    // TODO: run more tests on this
    var res = {}; // Linked
    copyProps(res, config); // Creates deep clone of eta.config, 1 layer deep
    if (baseConfig) {
        copyProps(res, baseConfig);
    }
    if (override) {
        copyProps(res, override);
    }
    return res;
}

/* END TYPES */
/**
 * Takes a template string and returns a template function that can be called with (data, config, [cb])
 *
 * @param str - The template string
 * @param config - A custom configuration object (optional)
 *
 * **Example**
 *
 * ```js
 * let compiledFn = eta.compile("Hi <%= it.user %>")
 * // function anonymous()
 * let compiledFnStr = compiledFn.toString()
 * // "function anonymous(it,E,cb\n) {\nvar tR='',include=E.include.bind(E),includeFile=E.includeFile.bind(E);tR+='Hi ';tR+=E.e(it.user);if(cb){cb(null,tR)} return tR\n}"
 * ```
 */
function compile(str, config) {
    var options = getConfig(config || {});
    /* ASYNC HANDLING */
    // The below code is modified from mde/ejs. All credit should go to them.
    var ctor = options.async ? getAsyncFunctionConstructor() : Function;
    /* END ASYNC HANDLING */
    try {
        return new ctor(options.varName, 'E', // EtaConfig
        'cb', // optional callback
        compileToString(str, options)); // eslint-disable-line no-new-func
    }
    catch (e) {
        if (e instanceof SyntaxError) {
            throw EtaErr('Bad template syntax\n\n' +
                e.message +
                '\n' +
                Array(e.message.length + 1).join('=') +
                '\n' +
                compileToString(str, options) +
                '\n' // This will put an extra newline before the callstack for extra readability
            );
        }
        else {
            throw e;
        }
    }
}

var _BOM = /^\uFEFF/;
/* END TYPES */
/**
 * Get the path to the included file from the parent file path and the
 * specified path.
 *
 * If `name` does not have an extension, it will default to `.eta`
 *
 * @param name specified path
 * @param parentfile parent file path
 * @param isDirectory whether parentfile is a directory
 * @return absolute path to template
 */
function getWholeFilePath(name, parentfile, isDirectory) {
    var includePath = path__namespace.resolve(isDirectory ? parentfile : path__namespace.dirname(parentfile), // returns directory the parent file is in
    name // file
    ) + (path__namespace.extname(name) ? '' : '.eta');
    return includePath;
}
/**
 * Get the absolute path to an included template
 *
 * If this is called with an absolute path (for example, starting with '/' or 'C:\')
 * then Eta will attempt to resolve the absolute path within options.views. If it cannot,
 * Eta will fallback to options.root or '/'
 *
 * If this is called with a relative path, Eta will:
 * - Look relative to the current template (if the current template has the `filename` property)
 * - Look inside each directory in options.views
 *
 * Note: if Eta is unable to find a template using path and options, it will throw an error.
 *
 * @param path    specified path
 * @param options compilation options
 * @return absolute path to template
 */
function getPath(path, options) {
    var includePath = false;
    var views = options.views;
    var searchedPaths = [];
    // If these four values are the same,
    // getPath() will return the same result every time.
    // We can cache the result to avoid expensive
    // file operations.
    var pathOptions = JSON.stringify({
        filename: options.filename,
        path: path,
        root: options.root,
        views: options.views
    });
    if (options.cache && options.filepathCache && options.filepathCache[pathOptions]) {
        // Use the cached filepath
        return options.filepathCache[pathOptions];
    }
    /** Add a filepath to the list of paths we've checked for a template */
    function addPathToSearched(pathSearched) {
        if (!searchedPaths.includes(pathSearched)) {
            searchedPaths.push(pathSearched);
        }
    }
    /**
     * Take a filepath (like 'partials/mypartial.eta'). Attempt to find the template file inside `views`;
     * return the resulting template file path, or `false` to indicate that the template was not found.
     *
     * @param views the filepath that holds templates, or an array of filepaths that hold templates
     * @param path the path to the template
     */
    function searchViews(views, path) {
        var filePath;
        // If views is an array, then loop through each directory
        // And attempt to find the template
        if (Array.isArray(views) &&
            views.some(function (v) {
                filePath = getWholeFilePath(path, v, true);
                addPathToSearched(filePath);
                return fs.existsSync(filePath);
            })) {
            // If the above returned true, we know that the filePath was just set to a path
            // That exists (Array.some() returns as soon as it finds a valid element)
            return filePath;
        }
        else if (typeof views === 'string') {
            // Search for the file if views is a single directory
            filePath = getWholeFilePath(path, views, true);
            addPathToSearched(filePath);
            if (fs.existsSync(filePath)) {
                return filePath;
            }
        }
        // Unable to find a file
        return false;
    }
    // Path starts with '/', 'C:\', etc.
    var match = /^[A-Za-z]+:\\|^\//.exec(path);
    // Absolute path, like /partials/partial.eta
    if (match && match.length) {
        // We have to trim the beginning '/' off the path, or else
        // path.resolve(dir, path) will always resolve to just path
        var formattedPath = path.replace(/^\/*/, '');
        // First, try to resolve the path within options.views
        includePath = searchViews(views, formattedPath);
        if (!includePath) {
            // If that fails, searchViews will return false. Try to find the path
            // inside options.root (by default '/', the base of the filesystem)
            var pathFromRoot = getWholeFilePath(formattedPath, options.root || '/', true);
            addPathToSearched(pathFromRoot);
            includePath = pathFromRoot;
        }
    }
    else {
        // Relative paths
        // Look relative to a passed filename first
        if (options.filename) {
            var filePath = getWholeFilePath(path, options.filename);
            addPathToSearched(filePath);
            if (fs.existsSync(filePath)) {
                includePath = filePath;
            }
        }
        // Then look for the template in options.views
        if (!includePath) {
            includePath = searchViews(views, path);
        }
        if (!includePath) {
            throw EtaErr('Could not find the template "' + path + '". Paths tried: ' + searchedPaths);
        }
    }
    // If caching and filepathCache are enabled,
    // cache the input & output of this function.
    if (options.cache && options.filepathCache) {
        options.filepathCache[pathOptions] = includePath;
    }
    return includePath;
}
/**
 * Reads a file synchronously
 */
function readFile(filePath) {
    try {
        return fs.readFileSync(filePath).toString().replace(_BOM, ''); // TODO: is replacing BOM's necessary?
    }
    catch (_a) {
        throw EtaErr("Failed to read template at '" + filePath + "'");
    }
}

// express is set like: app.engine('html', require('eta').renderFile)
/* END TYPES */
/**
 * Reads a template, compiles it into a function, caches it if caching isn't disabled, returns the function
 *
 * @param filePath Absolute path to template file
 * @param options Eta configuration overrides
 * @param noCache Optionally, make Eta not cache the template
 */
function loadFile(filePath, options, noCache) {
    var config = getConfig(options);
    var template = readFile(filePath);
    try {
        var compiledTemplate = compile(template, config);
        if (!noCache) {
            config.templates.define(config.filename, compiledTemplate);
        }
        return compiledTemplate;
    }
    catch (e) {
        throw EtaErr('Loading file: ' + filePath + ' failed:\n\n' + e.message);
    }
}
/**
 * Get the template from a string or a file, either compiled on-the-fly or
 * read from cache (if enabled), and cache the template if needed.
 *
 * If `options.cache` is true, this function reads the file from
 * `options.filename` so it must be set prior to calling this function.
 *
 * @param options   compilation options
 * @return Eta template function
 */
function handleCache$1(options) {
    var filename = options.filename;
    if (options.cache) {
        var func = options.templates.get(filename);
        if (func) {
            return func;
        }
        return loadFile(filename, options);
    }
    // Caching is disabled, so pass noCache = true
    return loadFile(filename, options, true);
}
/**
 * Get the template function.
 *
 * If `options.cache` is `true`, then the template is cached.
 *
 * This returns a template function and the config object with which that template function should be called.
 *
 * @remarks
 *
 * It's important that this returns a config object with `filename` set.
 * Otherwise, the included file would not be able to use relative paths
 *
 * @param path path for the specified file (if relative, specify `views` on `options`)
 * @param options compilation options
 * @return [Eta template function, new config object]
 */
function includeFile(path, options) {
    // the below creates a new options object, using the parent filepath of the old options object and the path
    var newFileOptions = getConfig({ filename: getPath(path, options) }, options);
    // TODO: make sure properties are currectly copied over
    return [handleCache$1(newFileOptions), newFileOptions];
}

/* END TYPES */
/**
 * Called with `includeFile(path, data)`
 */
function includeFileHelper(path, data) {
    var templateAndConfig = includeFile(path, this);
    return templateAndConfig[0](data, templateAndConfig[1]);
}

/* END TYPES */
function handleCache(template, options) {
    if (options.cache && options.name && options.templates.get(options.name)) {
        return options.templates.get(options.name);
    }
    var templateFunc = typeof template === 'function' ? template : compile(template, options);
    // Note that we don't have to check if it already exists in the cache;
    // it would have returned earlier if it had
    if (options.cache && options.name) {
        options.templates.define(options.name, templateFunc);
    }
    return templateFunc;
}
/**
 * Render a template
 *
 * If `template` is a string, Eta will compile it to a function and then call it with the provided data.
 * If `template` is a template function, Eta will call it with the provided data.
 *
 * If `config.async` is `false`, Eta will return the rendered template.
 *
 * If `config.async` is `true` and there's a callback function, Eta will call the callback with `(err, renderedTemplate)`.
 * If `config.async` is `true` and there's not a callback function, Eta will return a Promise that resolves to the rendered template.
 *
 * If `config.cache` is `true` and `config` has a `name` or `filename` property, Eta will cache the template on the first render and use the cached template for all subsequent renders.
 *
 * @param template Template string or template function
 * @param data Data to render the template with
 * @param config Optional config options
 * @param cb Callback function
 */
function render(template, data, config, cb) {
    var options = getConfig(config || {});
    if (options.async) {
        if (cb) {
            // If user passes callback
            try {
                // Note: if there is an error while rendering the template,
                // It will bubble up and be caught here
                var templateFn = handleCache(template, options);
                templateFn(data, options, cb);
            }
            catch (err) {
                return cb(err);
            }
        }
        else {
            // No callback, try returning a promise
            if (typeof promiseImpl === 'function') {
                return new promiseImpl(function (resolve, reject) {
                    try {
                        resolve(handleCache(template, options)(data, options));
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            }
            else {
                throw EtaErr("Please provide a callback function, this env doesn't support Promises");
            }
        }
    }
    else {
        return handleCache(template, options)(data, options);
    }
}
/**
 * Render a template asynchronously
 *
 * If `template` is a string, Eta will compile it to a function and call it with the provided data.
 * If `template` is a function, Eta will call it with the provided data.
 *
 * If there is a callback function, Eta will call it with `(err, renderedTemplate)`.
 * If there is not a callback function, Eta will return a Promise that resolves to the rendered template
 *
 * @param template Template string or template function
 * @param data Data to render the template with
 * @param config Optional config options
 * @param cb Callback function
 */
function renderAsync(template, data, config, cb) {
    // Using Object.assign to lower bundle size, using spread operator makes it larger because of typescript injected polyfills
    return render(template, data, Object.assign({}, config, { async: true }), cb);
}

// @denoify-ignore
config.includeFile = includeFileHelper;
config.filepathCache = {};

class InternalModule {
    constructor(app, plugin) {
        this.app = app;
        this.plugin = plugin;
        this.static_templates = new Map();
        this.dynamic_templates = new Map();
    }
    getName() {
        return this.name;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createStaticTemplates();
            this.static_context = Object.fromEntries(this.static_templates);
        });
    }
    generateContext(config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.config = config;
            yield this.updateTemplates();
            return Object.assign(Object.assign({}, this.static_context), Object.fromEntries(this.dynamic_templates));
        });
    }
}

class InternalModuleDate extends InternalModule {
    constructor() {
        super(...arguments);
        this.name = "date";
    }
    createStaticTemplates() {
        return __awaiter(this, void 0, void 0, function* () {
            this.static_templates.set("now", this.generate_now());
            this.static_templates.set("tomorrow", this.generate_tomorrow());
            this.static_templates.set("weekday", this.generate_weekday());
            this.static_templates.set("yesterday", this.generate_yesterday());
        });
    }
    updateTemplates() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    generate_now() {
        return (format = "YYYY-MM-DD", offset, reference, reference_format) => {
            if (reference && !window.moment(reference, reference_format).isValid()) {
                throw new TemplaterError("Invalid reference date format, try specifying one with the argument 'reference_format'");
            }
            let duration;
            if (typeof offset === "string") {
                duration = window.moment.duration(offset);
            }
            else if (typeof offset === "number") {
                duration = window.moment.duration(offset, "days");
            }
            return window.moment(reference, reference_format).add(duration).format(format);
        };
    }
    generate_tomorrow() {
        return (format = "YYYY-MM-DD") => {
            return window.moment().add(1, 'days').format(format);
        };
    }
    generate_weekday() {
        return (format = "YYYY-MM-DD", weekday, reference, reference_format) => {
            if (reference && !window.moment(reference, reference_format).isValid()) {
                throw new TemplaterError("Invalid reference date format, try specifying one with the argument 'reference_format'");
            }
            return window.moment(reference, reference_format).weekday(weekday).format(format);
        };
    }
    generate_yesterday() {
        return (format = "YYYY-MM-DD") => {
            return window.moment().add(-1, 'days').format(format);
        };
    }
}

const DEPTH_LIMIT = 10;
class InternalModuleFile extends InternalModule {
    constructor() {
        super(...arguments);
        this.name = "file";
        this.include_depth = 0;
        this.create_new_depth = 0;
        this.linkpath_regex = new RegExp("^\\[\\[(.*)\\]\\]$");
    }
    createStaticTemplates() {
        return __awaiter(this, void 0, void 0, function* () {
            this.static_templates.set("creation_date", this.generate_creation_date());
            this.static_templates.set("create_new", this.generate_create_new());
            this.static_templates.set("cursor", this.generate_cursor());
            this.static_templates.set("cursor_append", this.generate_cursor_append());
            this.static_templates.set("exists", this.generate_exists());
            this.static_templates.set("find_tfile", this.generate_find_tfile());
            this.static_templates.set("folder", this.generate_folder());
            this.static_templates.set("include", this.generate_include());
            this.static_templates.set("last_modified_date", this.generate_last_modified_date());
            this.static_templates.set("move", this.generate_move());
            this.static_templates.set("path", this.generate_path());
            this.static_templates.set("rename", this.generate_rename());
            this.static_templates.set("selection", this.generate_selection());
        });
    }
    updateTemplates() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dynamic_templates.set("content", yield this.generate_content());
            this.dynamic_templates.set("tags", this.generate_tags());
            this.dynamic_templates.set("title", this.generate_title());
        });
    }
    generate_content() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.app.vault.read(this.config.target_file);
        });
    }
    generate_create_new() {
        return (template, filename, open_new = false, folder) => __awaiter(this, void 0, void 0, function* () {
            this.create_new_depth += 1;
            if (this.create_new_depth > DEPTH_LIMIT) {
                this.create_new_depth = 0;
                throw new TemplaterError("Reached create_new depth limit (max = 10)");
            }
            const new_file = yield this.plugin.templater.create_new_note_from_template(template, folder, filename, open_new);
            this.create_new_depth -= 1;
            return new_file;
        });
    }
    generate_creation_date() {
        return (format = "YYYY-MM-DD HH:mm") => {
            return window.moment(this.config.target_file.stat.ctime).format(format);
        };
    }
    generate_cursor() {
        return (order) => {
            // Hack to prevent empty output
            return `<% tp.file.cursor(${order !== null && order !== void 0 ? order : ''}) %>`;
        };
    }
    generate_cursor_append() {
        return (content) => {
            const active_view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
            if (active_view === null) {
                this.plugin.log_error(new TemplaterError("No active view, can't append to cursor."));
                return;
            }
            const editor = active_view.editor;
            const doc = editor.getDoc();
            doc.replaceSelection(content);
            return "";
        };
    }
    generate_exists() {
        return (filename) => {
            // TODO: Remove this, only here to support the old way
            let match;
            if ((match = this.linkpath_regex.exec(filename)) !== null) {
                filename = match[1];
            }
            const file = this.app.metadataCache.getFirstLinkpathDest(filename, "");
            return file != null;
        };
    }
    generate_find_tfile() {
        return (filename) => {
            const path = obsidian.normalizePath(filename);
            return this.app.metadataCache.getFirstLinkpathDest(path, "");
        };
    }
    generate_folder() {
        return (relative = false) => {
            let parent = this.config.target_file.parent;
            let folder;
            if (relative) {
                folder = parent.path;
            }
            else {
                folder = parent.name;
            }
            return folder;
        };
    }
    generate_include() {
        return (include_link) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // TODO: Add mutex for this, this may currently lead to a race condition. 
            // While not very impactful, that could still be annoying.
            this.include_depth += 1;
            if (this.include_depth > DEPTH_LIMIT) {
                this.include_depth = 0;
                throw new TemplaterError("Reached inclusion depth limit (max = 10)");
            }
            let inc_file_content;
            if (include_link instanceof obsidian.TFile) {
                inc_file_content = yield this.app.vault.read(include_link);
            }
            else {
                let match;
                if ((match = this.linkpath_regex.exec(include_link)) === null) {
                    throw new TemplaterError("Invalid file format, provide an obsidian link between quotes.");
                }
                const { path, subpath } = obsidian.parseLinktext(match[1]);
                const inc_file = this.app.metadataCache.getFirstLinkpathDest(path, "");
                if (!inc_file) {
                    throw new TemplaterError(`File ${include_link} doesn't exist`);
                }
                inc_file_content = yield this.app.vault.read(inc_file);
                if (subpath) {
                    const cache = this.app.metadataCache.getFileCache(inc_file);
                    if (cache) {
                        const result = obsidian.resolveSubpath(cache, subpath);
                        if (result) {
                            inc_file_content = inc_file_content.slice(result.start.offset, (_a = result.end) === null || _a === void 0 ? void 0 : _a.offset);
                        }
                    }
                }
            }
            const parsed_content = yield this.plugin.templater.parser.parseTemplates(inc_file_content);
            this.include_depth -= 1;
            return parsed_content;
        });
    }
    generate_last_modified_date() {
        return (format = "YYYY-MM-DD HH:mm") => {
            return window.moment(this.config.target_file.stat.mtime).format(format);
        };
    }
    generate_move() {
        return (path) => __awaiter(this, void 0, void 0, function* () {
            const new_path = obsidian.normalizePath(`${path}.${this.config.target_file.extension}`);
            yield this.app.fileManager.renameFile(this.config.target_file, new_path);
            return "";
        });
    }
    generate_path() {
        return (relative = false) => {
            // TODO: Add mobile support
            if (obsidian.Platform.isMobileApp) {
                return UNSUPPORTED_MOBILE_TEMPLATE;
            }
            if (!(this.app.vault.adapter instanceof obsidian.FileSystemAdapter)) {
                throw new TemplaterError("app.vault is not a FileSystemAdapter instance");
            }
            const vault_path = this.app.vault.adapter.getBasePath();
            if (relative) {
                return this.config.target_file.path;
            }
            else {
                return `${vault_path}/${this.config.target_file.path}`;
            }
        };
    }
    generate_rename() {
        return (new_title) => __awaiter(this, void 0, void 0, function* () {
            if (new_title.match(/[\\\/:]+/g)) {
                throw new TemplaterError("File name cannot contain any of these characters: \\ / :");
            }
            const new_path = obsidian.normalizePath(`${this.config.target_file.parent.path}/${new_title}.${this.config.target_file.extension}`);
            yield this.app.fileManager.renameFile(this.config.target_file, new_path);
            return "";
        });
    }
    generate_selection() {
        return () => {
            const active_view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
            if (active_view == null) {
                throw new TemplaterError("Active view is null, can't read selection.");
            }
            const editor = active_view.editor;
            return editor.getSelection();
        };
    }
    // TODO: Turn this into a function
    generate_tags() {
        const cache = this.app.metadataCache.getFileCache(this.config.target_file);
        return obsidian.getAllTags(cache);
    }
    // TODO: Turn this into a function
    generate_title() {
        return this.config.target_file.basename;
    }
}

class InternalModuleWeb extends InternalModule {
    constructor() {
        super(...arguments);
        this.name = "web";
    }
    createStaticTemplates() {
        return __awaiter(this, void 0, void 0, function* () {
            this.static_templates.set("daily_quote", this.generate_daily_quote());
            this.static_templates.set("random_picture", this.generate_random_picture());
            //this.static_templates.set("get_request", this.generate_get_request());
        });
    }
    updateTemplates() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    getRequest(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(url);
            if (!response.ok) {
                throw new TemplaterError("Error performing GET request");
            }
            return response;
        });
    }
    generate_daily_quote() {
        return () => __awaiter(this, void 0, void 0, function* () {
            let response = yield this.getRequest("https://quotes.rest/qod");
            let json = yield response.json();
            let author = json.contents.quotes[0].author;
            let quote = json.contents.quotes[0].quote;
            let new_content = `> ${quote}\n> &mdash; <cite>${author}</cite>`;
            return new_content;
        });
    }
    generate_random_picture() {
        return (size, query) => __awaiter(this, void 0, void 0, function* () {
            let response = yield this.getRequest(`https://source.unsplash.com/random/${size !== null && size !== void 0 ? size : ''}?${query !== null && query !== void 0 ? query : ''}`);
            let url = response.url;
            return `![tp.web.random_picture](${url})`;
        });
    }
    generate_get_request() {
        return (url) => __awaiter(this, void 0, void 0, function* () {
            let response = yield this.getRequest(url);
            let json = yield response.json();
            return json;
        });
    }
}

class InternalModuleFrontmatter extends InternalModule {
    constructor() {
        super(...arguments);
        this.name = "frontmatter";
    }
    createStaticTemplates() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    updateTemplates() {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = this.app.metadataCache.getFileCache(this.config.target_file);
            this.dynamic_templates = new Map(Object.entries((cache === null || cache === void 0 ? void 0 : cache.frontmatter) || {}));
        });
    }
}

class PromptModal extends obsidian.Modal {
    constructor(app, prompt_text, default_value) {
        super(app);
        this.prompt_text = prompt_text;
        this.default_value = default_value;
        this.submitted = false;
    }
    onOpen() {
        this.titleEl.setText(this.prompt_text);
        this.createForm();
    }
    onClose() {
        this.contentEl.empty();
        if (!this.submitted) {
            this.reject(new TemplaterError("Cancelled prompt"));
        }
    }
    createForm() {
        var _a;
        const div = this.contentEl.createDiv();
        div.addClass("templater-prompt-div");
        const form = div.createEl("form");
        form.addClass("templater-prompt-form");
        form.type = "submit";
        form.onsubmit = (e) => {
            this.submitted = true;
            e.preventDefault();
            this.resolve(this.promptEl.value);
            this.close();
        };
        this.promptEl = form.createEl("input");
        this.promptEl.type = "text";
        this.promptEl.placeholder = "Type text here...";
        this.promptEl.value = (_a = this.default_value) !== null && _a !== void 0 ? _a : "";
        this.promptEl.addClass("templater-prompt-input");
        this.promptEl.select();
    }
    openAndGetValue(resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            this.resolve = resolve;
            this.reject = reject;
            this.open();
        });
    }
}

class SuggesterModal extends obsidian.FuzzySuggestModal {
    constructor(app, text_items, items, placeholder) {
        super(app);
        this.text_items = text_items;
        this.items = items;
        this.submitted = false;
        this.setPlaceholder(placeholder);
    }
    getItems() {
        return this.items;
    }
    onClose() {
        if (!this.submitted) {
            this.reject(new TemplaterError("Cancelled prompt"));
        }
    }
    selectSuggestion(value, evt) {
        this.submitted = true;
        this.close();
        this.onChooseSuggestion(value, evt);
    }
    getItemText(item) {
        if (this.text_items instanceof Function) {
            return this.text_items(item);
        }
        return this.text_items[this.items.indexOf(item)] || "Undefined Text Item";
    }
    onChooseItem(item, _evt) {
        this.resolve(item);
    }
    openAndGetValue(resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            this.resolve = resolve;
            this.reject = reject;
            this.open();
        });
    }
}

class InternalModuleSystem extends InternalModule {
    constructor() {
        super(...arguments);
        this.name = "system";
    }
    createStaticTemplates() {
        return __awaiter(this, void 0, void 0, function* () {
            this.static_templates.set("clipboard", this.generate_clipboard());
            this.static_templates.set("prompt", this.generate_prompt());
            this.static_templates.set("suggester", this.generate_suggester());
        });
    }
    updateTemplates() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    generate_clipboard() {
        return () => __awaiter(this, void 0, void 0, function* () {
            // TODO: Add mobile support
            if (obsidian.Platform.isMobileApp) {
                return UNSUPPORTED_MOBILE_TEMPLATE;
            }
            return yield navigator.clipboard.readText();
        });
    }
    generate_prompt() {
        return (prompt_text, default_value, throw_on_cancel = false) => __awaiter(this, void 0, void 0, function* () {
            const prompt = new PromptModal(this.app, prompt_text, default_value);
            const promise = new Promise((resolve, reject) => prompt.openAndGetValue(resolve, reject));
            try {
                return yield promise;
            }
            catch (error) {
                if (throw_on_cancel) {
                    throw error;
                }
                return null;
            }
        });
    }
    generate_suggester() {
        return (text_items, items, throw_on_cancel = false, placeholder = "") => __awaiter(this, void 0, void 0, function* () {
            const suggester = new SuggesterModal(this.app, text_items, items, placeholder);
            const promise = new Promise((resolve, reject) => suggester.openAndGetValue(resolve, reject));
            try {
                return yield promise;
            }
            catch (error) {
                if (throw_on_cancel) {
                    throw error;
                }
                return null;
            }
        });
    }
}

class InternalModuleConfig extends InternalModule {
    constructor() {
        super(...arguments);
        this.name = "config";
    }
    createStaticTemplates() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    updateTemplates() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    generateContext(config) {
        return __awaiter(this, void 0, void 0, function* () {
            return config;
        });
    }
}

class InternalTemplateParser {
    constructor(app, plugin) {
        this.app = app;
        this.plugin = plugin;
        this.modules_array = new Array();
        this.modules_array.push(new InternalModuleDate(this.app, this.plugin));
        this.modules_array.push(new InternalModuleFile(this.app, this.plugin));
        this.modules_array.push(new InternalModuleWeb(this.app, this.plugin));
        this.modules_array.push(new InternalModuleFrontmatter(this.app, this.plugin));
        this.modules_array.push(new InternalModuleSystem(this.app, this.plugin));
        this.modules_array.push(new InternalModuleConfig(this.app, this.plugin));
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const mod of this.modules_array) {
                yield mod.init();
            }
        });
    }
    generateContext(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const modules_context = {};
            for (const mod of this.modules_array) {
                modules_context[mod.getName()] = yield mod.generateContext(config);
            }
            return modules_context;
        });
    }
}

class UserTemplateParser {
    constructor(app, plugin) {
        this.app = app;
        this.plugin = plugin;
        this.user_system_command_functions = new Map();
        this.user_script_functions = new Map();
        this.setup();
    }
    setup() {
        if (obsidian.Platform.isMobileApp || !(this.app.vault.adapter instanceof obsidian.FileSystemAdapter)) {
            this.cwd = "";
        }
        else {
            this.cwd = this.app.vault.adapter.getBasePath();
            this.exec_promise = util.promisify(child_process.exec);
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    generate_user_script_functions(config) {
        return __awaiter(this, void 0, void 0, function* () {
            let files = getTFilesFromFolder(this.app, this.plugin.settings.script_folder);
            for (let file of files) {
                if (file.extension.toLowerCase() === "js") {
                    yield this.load_user_script_function(config, file);
                }
            }
        });
    }
    load_user_script_function(config, file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(this.app.vault.adapter instanceof obsidian.FileSystemAdapter)) {
                throw new TemplaterError("app.vault is not a FileSystemAdapter instance");
            }
            let vault_path = this.app.vault.adapter.getBasePath();
            let file_path = `${vault_path}/${file.path}`;
            // https://stackoverflow.com/questions/26633901/reload-module-at-runtime
            // https://stackoverflow.com/questions/1972242/how-to-auto-reload-files-in-node-js
            if (Object.keys(window.require.cache).contains(file_path)) {
                delete window.require.cache[window.require.resolve(file_path)];
            }
            const user_function = yield Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(file_path)); });
            if (!user_function.default) {
                throw new TemplaterError(`Failed to load user script ${file_path}. No exports detected.`);
            }
            if (!(user_function.default instanceof Function)) {
                throw new TemplaterError(`Failed to load user script ${file_path}. Default export is not a function.`);
            }
            this.user_script_functions.set(`${file.basename}`, user_function.default);
        });
    }
    // TODO: Add mobile support
    generate_system_command_user_functions(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = yield this.plugin.templater.parser.generateContext(config, ContextMode.INTERNAL);
            for (let [template, cmd] of this.plugin.settings.templates_pairs) {
                if (template === "" || cmd === "") {
                    continue;
                }
                if (obsidian.Platform.isMobileApp) {
                    this.user_system_command_functions.set(template, (user_args) => {
                        return UNSUPPORTED_MOBILE_TEMPLATE;
                    });
                }
                else {
                    cmd = yield this.plugin.templater.parser.parseTemplates(cmd, context);
                    this.user_system_command_functions.set(template, (user_args) => __awaiter(this, void 0, void 0, function* () {
                        const process_env = Object.assign(Object.assign({}, process.env), user_args);
                        const cmd_options = Object.assign({ timeout: this.plugin.settings.command_timeout * 1000, cwd: this.cwd, env: process_env }, (this.plugin.settings.shell_path !== "" && { shell: this.plugin.settings.shell_path }));
                        try {
                            const { stdout } = yield this.exec_promise(cmd, cmd_options);
                            return stdout.trimRight();
                        }
                        catch (error) {
                            throw new TemplaterError(`Error with User Template ${template}`, error);
                        }
                    }));
                }
            }
        });
    }
    generateContext(config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.user_system_command_functions.clear();
            this.user_script_functions.clear();
            if (this.plugin.settings.enable_system_commands) {
                yield this.generate_system_command_user_functions(config);
            }
            // TODO: Add mobile support
            if (obsidian.Platform.isDesktopApp && this.plugin.settings.script_folder) {
                yield this.generate_user_script_functions(config);
            }
            return Object.assign(Object.assign({}, Object.fromEntries(this.user_system_command_functions)), Object.fromEntries(this.user_script_functions));
        });
    }
}

var ContextMode;
(function (ContextMode) {
    ContextMode[ContextMode["INTERNAL"] = 0] = "INTERNAL";
    ContextMode[ContextMode["USER_INTERNAL"] = 1] = "USER_INTERNAL";
})(ContextMode || (ContextMode = {}));
class TemplateParser {
    constructor(app, plugin) {
        this.app = app;
        this.plugin = plugin;
        this.internalTemplateParser = new InternalTemplateParser(this.app, this.plugin);
        this.userTemplateParser = new UserTemplateParser(this.app, this.plugin);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.internalTemplateParser.init();
            yield this.userTemplateParser.init();
        });
    }
    setCurrentContext(config, context_mode) {
        return __awaiter(this, void 0, void 0, function* () {
            this.current_context = yield this.generateContext(config, context_mode);
        });
    }
    additionalContext() {
        return {
            obsidian: obsidian_module,
        };
    }
    generateContext(config, context_mode = ContextMode.USER_INTERNAL) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = {};
            const additional_context = this.additionalContext();
            const internal_context = yield this.internalTemplateParser.generateContext(config);
            let user_context = {};
            if (!this.current_context) {
                // If a user system command is using tp.file.include, we need the context to be set.
                this.current_context = internal_context;
            }
            Object.assign(context, additional_context);
            switch (context_mode) {
                case ContextMode.INTERNAL:
                    Object.assign(context, internal_context);
                    break;
                case ContextMode.USER_INTERNAL:
                    user_context = yield this.userTemplateParser.generateContext(config);
                    Object.assign(context, Object.assign(Object.assign({}, internal_context), { user: user_context }));
                    break;
            }
            return context;
        });
    }
    parseTemplates(content, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!context) {
                context = this.current_context;
            }
            content = (yield renderAsync(content, context, {
                varName: "tp",
                parse: {
                    exec: "*",
                    interpolate: "~",
                    raw: "",
                },
                autoTrim: false,
                globalAwait: true,
            }));
            return content;
        });
    }
}

var RunMode;
(function (RunMode) {
    RunMode[RunMode["CreateNewFromTemplate"] = 0] = "CreateNewFromTemplate";
    RunMode[RunMode["AppendActiveFile"] = 1] = "AppendActiveFile";
    RunMode[RunMode["OverwriteFile"] = 2] = "OverwriteFile";
    RunMode[RunMode["OverwriteActiveFile"] = 3] = "OverwriteActiveFile";
    RunMode[RunMode["DynamicProcessor"] = 4] = "DynamicProcessor";
})(RunMode || (RunMode = {}));
class Templater {
    constructor(app, plugin) {
        this.app = app;
        this.plugin = plugin;
        this.cursor_jumper = new CursorJumper(this.app);
        this.parser = new TemplateParser(this.app, this.plugin);
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.parser.init();
        });
    }
    create_running_config(template_file, target_file, run_mode) {
        return {
            template_file: template_file,
            target_file: target_file,
            run_mode: run_mode,
        };
    }
    read_and_parse_template(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const template_content = yield this.app.vault.read(config.template_file);
            return this.parse_template(config, template_content);
        });
    }
    parse_template(config, template_content) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.parser.setCurrentContext(config, ContextMode.USER_INTERNAL);
            const content = yield this.parser.parseTemplates(template_content);
            return content;
        });
    }
    create_new_note_from_template(template, folder, filename, open_new_note = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!folder) {
                folder = this.app.fileManager.getNewFileParent("");
            }
            // TODO: Change that, not stable atm
            // @ts-ignore
            const created_note = yield this.app.fileManager.createNewMarkdownFile(folder, filename !== null && filename !== void 0 ? filename : "Untitled");
            let running_config;
            let output_content;
            if (template instanceof obsidian.TFile) {
                running_config = this.create_running_config(template, created_note, RunMode.CreateNewFromTemplate);
                output_content = yield this.plugin.errorWrapper(() => __awaiter(this, void 0, void 0, function* () { return this.read_and_parse_template(running_config); }));
            }
            else {
                running_config = this.create_running_config(undefined, created_note, RunMode.CreateNewFromTemplate);
                output_content = yield this.plugin.errorWrapper(() => __awaiter(this, void 0, void 0, function* () { return this.parse_template(running_config, template); }));
            }
            if (output_content == null) {
                yield this.app.vault.delete(created_note);
                return;
            }
            yield this.app.vault.modify(created_note, output_content);
            if (open_new_note) {
                const active_leaf = this.app.workspace.activeLeaf;
                if (!active_leaf) {
                    this.plugin.log_error(new TemplaterError("No active leaf"));
                    return;
                }
                yield active_leaf.openFile(created_note, { state: { mode: 'source' }, eState: { rename: 'all' } });
                yield this.cursor_jumper.jump_to_next_cursor_location();
            }
            return created_note;
        });
    }
    append_template(template_file) {
        return __awaiter(this, void 0, void 0, function* () {
            const active_view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
            if (active_view === null) {
                this.plugin.log_error(new TemplaterError("No active view, can't append templates."));
                return;
            }
            const running_config = this.create_running_config(template_file, active_view.file, RunMode.AppendActiveFile);
            const output_content = yield this.plugin.errorWrapper(() => __awaiter(this, void 0, void 0, function* () { return this.read_and_parse_template(running_config); }));
            if (output_content == null) {
                return;
            }
            const editor = active_view.editor;
            const doc = editor.getDoc();
            doc.replaceSelection(output_content);
            yield this.cursor_jumper.jump_to_next_cursor_location();
        });
    }
    overwrite_active_file_templates() {
        const active_view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        if (active_view === null) {
            this.plugin.log_error(new TemplaterError("Active view is null, can't overwrite content"));
            return;
        }
        this.overwrite_file_templates(active_view.file, true);
    }
    overwrite_file_templates(file, active_file = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const running_config = this.create_running_config(file, file, active_file ? RunMode.OverwriteActiveFile : RunMode.OverwriteFile);
            const output_content = yield this.plugin.errorWrapper(() => __awaiter(this, void 0, void 0, function* () { return this.read_and_parse_template(running_config); }));
            if (output_content == null) {
                return;
            }
            yield this.app.vault.modify(file, output_content);
            if (this.app.workspace.getActiveFile() === file) {
                yield this.cursor_jumper.jump_to_next_cursor_location();
            }
        });
    }
    process_dynamic_templates(el, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const dynamic_command_regex = /(<%(?:-|_)?\s*[*~]{0,1})\+((?:.|\s)*?%>)/g;
            const walker = document.createNodeIterator(el, NodeFilter.SHOW_TEXT);
            let node;
            let pass = false;
            while ((node = walker.nextNode())) {
                let content = node.nodeValue;
                let match;
                if ((match = dynamic_command_regex.exec(content)) != null) {
                    const file = this.app.metadataCache.getFirstLinkpathDest("", ctx.sourcePath);
                    if (!file || !(file instanceof obsidian.TFile)) {
                        return;
                    }
                    if (!pass) {
                        pass = true;
                        const running_config = this.create_running_config(file, file, RunMode.DynamicProcessor);
                        yield this.parser.setCurrentContext(running_config, ContextMode.USER_INTERNAL);
                    }
                    while (match != null) {
                        // Not the most efficient way to exclude the '+' from the command but I couldn't find something better
                        const complete_command = match[1] + match[2];
                        const command_output = yield this.plugin.errorWrapper(() => __awaiter(this, void 0, void 0, function* () {
                            return yield this.parser.parseTemplates(complete_command);
                        }));
                        if (command_output == null) {
                            return;
                        }
                        let start = dynamic_command_regex.lastIndex - match[0].length;
                        let end = dynamic_command_regex.lastIndex;
                        content = content.substring(0, start) + command_output + content.substring(end);
                        dynamic_command_regex.lastIndex += (command_output.length - match[0].length);
                        match = dynamic_command_regex.exec(content);
                    }
                    node.nodeValue = content;
                }
            }
        });
    }
}

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
  mod(window.CodeMirror);
})(function(CodeMirror) {

CodeMirror.defineMode("javascript", function(config, parserConfig) {
  var indentUnit = config.indentUnit;
  var statementIndent = parserConfig.statementIndent;
  var jsonldMode = parserConfig.jsonld;
  var jsonMode = parserConfig.json || jsonldMode;
  var trackScope = parserConfig.trackScope !== false;
  var isTS = parserConfig.typescript;
  var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;

  // Tokenizer

  var keywords = function(){
    function kw(type) {return {type: type, style: "keyword"};}
    var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c"), D = kw("keyword d");
    var operator = kw("operator"), atom = {type: "atom", style: "atom"};

    return {
      "if": kw("if"), "while": A, "with": A, "else": B, "do": B, "try": B, "finally": B,
      "return": D, "break": D, "continue": D, "new": kw("new"), "delete": C, "void": C, "throw": C,
      "debugger": kw("debugger"), "var": kw("var"), "const": kw("var"), "let": kw("var"),
      "function": kw("function"), "catch": kw("catch"),
      "for": kw("for"), "switch": kw("switch"), "case": kw("case"), "default": kw("default"),
      "in": operator, "typeof": operator, "instanceof": operator,
      "true": atom, "false": atom, "null": atom, "undefined": atom, "NaN": atom, "Infinity": atom,
      "this": kw("this"), "class": kw("class"), "super": kw("atom"),
      "yield": C, "export": kw("export"), "import": kw("import"), "extends": C,
      "await": C
    };
  }();

  var isOperatorChar = /[+\-*&%=<>!?|~^@]/;
  var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;

  function readRegexp(stream) {
    var escaped = false, next, inSet = false;
    while ((next = stream.next()) != null) {
      if (!escaped) {
        if (next == "/" && !inSet) return;
        if (next == "[") inSet = true;
        else if (inSet && next == "]") inSet = false;
      }
      escaped = !escaped && next == "\\";
    }
  }

  // Used as scratch variables to communicate multiple values without
  // consing up tons of objects.
  var type, content;
  function ret(tp, style, cont) {
    type = tp; content = cont;
    return style;
  }
  function tokenBase(stream, state) {
    var ch = stream.next();
    if (ch == '"' || ch == "'") {
      state.tokenize = tokenString(ch);
      return state.tokenize(stream, state);
    } else if (ch == "." && stream.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) {
      return ret("number", "number");
    } else if (ch == "." && stream.match("..")) {
      return ret("spread", "meta");
    } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
      return ret(ch);
    } else if (ch == "=" && stream.eat(">")) {
      return ret("=>", "operator");
    } else if (ch == "0" && stream.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) {
      return ret("number", "number");
    } else if (/\d/.test(ch)) {
      stream.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/);
      return ret("number", "number");
    } else if (ch == "/") {
      if (stream.eat("*")) {
        state.tokenize = tokenComment;
        return tokenComment(stream, state);
      } else if (stream.eat("/")) {
        stream.skipToEnd();
        return ret("comment", "comment");
      } else if (expressionAllowed(stream, state, 1)) {
        readRegexp(stream);
        stream.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/);
        return ret("regexp", "string-2");
      } else {
        stream.eat("=");
        return ret("operator", "operator", stream.current());
      }
    } else if (ch == "`") {
      state.tokenize = tokenQuasi;
      return tokenQuasi(stream, state);
    } else if (ch == "#" && stream.peek() == "!") {
      stream.skipToEnd();
      return ret("meta", "meta");
    } else if (ch == "#" && stream.eatWhile(wordRE)) {
      return ret("variable", "property")
    } else if (ch == "<" && stream.match("!--") ||
               (ch == "-" && stream.match("->") && !/\S/.test(stream.string.slice(0, stream.start)))) {
      stream.skipToEnd();
      return ret("comment", "comment")
    } else if (isOperatorChar.test(ch)) {
      if (ch != ">" || !state.lexical || state.lexical.type != ">") {
        if (stream.eat("=")) {
          if (ch == "!" || ch == "=") stream.eat("=");
        } else if (/[<>*+\-|&?]/.test(ch)) {
          stream.eat(ch);
          if (ch == ">") stream.eat(ch);
        }
      }
      if (ch == "?" && stream.eat(".")) return ret(".")
      return ret("operator", "operator", stream.current());
    } else if (wordRE.test(ch)) {
      stream.eatWhile(wordRE);
      var word = stream.current();
      if (state.lastType != ".") {
        if (keywords.propertyIsEnumerable(word)) {
          var kw = keywords[word];
          return ret(kw.type, kw.style, word)
        }
        if (word == "async" && stream.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, false))
          return ret("async", "keyword", word)
      }
      return ret("variable", "variable", word)
    }
  }

  function tokenString(quote) {
    return function(stream, state) {
      var escaped = false, next;
      if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)){
        state.tokenize = tokenBase;
        return ret("jsonld-keyword", "meta");
      }
      while ((next = stream.next()) != null) {
        if (next == quote && !escaped) break;
        escaped = !escaped && next == "\\";
      }
      if (!escaped) state.tokenize = tokenBase;
      return ret("string", "string");
    };
  }

  function tokenComment(stream, state) {
    var maybeEnd = false, ch;
    while (ch = stream.next()) {
      if (ch == "/" && maybeEnd) {
        state.tokenize = tokenBase;
        break;
      }
      maybeEnd = (ch == "*");
    }
    return ret("comment", "comment");
  }

  function tokenQuasi(stream, state) {
    var escaped = false, next;
    while ((next = stream.next()) != null) {
      if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
        state.tokenize = tokenBase;
        break;
      }
      escaped = !escaped && next == "\\";
    }
    return ret("quasi", "string-2", stream.current());
  }

  var brackets = "([{}])";
  // This is a crude lookahead trick to try and notice that we're
  // parsing the argument patterns for a fat-arrow function before we
  // actually hit the arrow token. It only works if the arrow is on
  // the same line as the arguments and there's no strange noise
  // (comments) in between. Fallback is to only notice when we hit the
  // arrow, and not declare the arguments as locals for the arrow
  // body.
  function findFatArrow(stream, state) {
    if (state.fatArrowAt) state.fatArrowAt = null;
    var arrow = stream.string.indexOf("=>", stream.start);
    if (arrow < 0) return;

    if (isTS) { // Try to skip TypeScript return type declarations after the arguments
      var m = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(stream.string.slice(stream.start, arrow));
      if (m) arrow = m.index;
    }

    var depth = 0, sawSomething = false;
    for (var pos = arrow - 1; pos >= 0; --pos) {
      var ch = stream.string.charAt(pos);
      var bracket = brackets.indexOf(ch);
      if (bracket >= 0 && bracket < 3) {
        if (!depth) { ++pos; break; }
        if (--depth == 0) { if (ch == "(") sawSomething = true; break; }
      } else if (bracket >= 3 && bracket < 6) {
        ++depth;
      } else if (wordRE.test(ch)) {
        sawSomething = true;
      } else if (/["'\/`]/.test(ch)) {
        for (;; --pos) {
          if (pos == 0) return
          var next = stream.string.charAt(pos - 1);
          if (next == ch && stream.string.charAt(pos - 2) != "\\") { pos--; break }
        }
      } else if (sawSomething && !depth) {
        ++pos;
        break;
      }
    }
    if (sawSomething && !depth) state.fatArrowAt = pos;
  }

  // Parser

  var atomicTypes = {"atom": true, "number": true, "variable": true, "string": true,
                     "regexp": true, "this": true, "import": true, "jsonld-keyword": true};

  function JSLexical(indented, column, type, align, prev, info) {
    this.indented = indented;
    this.column = column;
    this.type = type;
    this.prev = prev;
    this.info = info;
    if (align != null) this.align = align;
  }

  function inScope(state, varname) {
    if (!trackScope) return false
    for (var v = state.localVars; v; v = v.next)
      if (v.name == varname) return true;
    for (var cx = state.context; cx; cx = cx.prev) {
      for (var v = cx.vars; v; v = v.next)
        if (v.name == varname) return true;
    }
  }

  function parseJS(state, style, type, content, stream) {
    var cc = state.cc;
    // Communicate our context to the combinators.
    // (Less wasteful than consing up a hundred closures on every call.)
    cx.state = state; cx.stream = stream; cx.marked = null, cx.cc = cc; cx.style = style;

    if (!state.lexical.hasOwnProperty("align"))
      state.lexical.align = true;

    while(true) {
      var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
      if (combinator(type, content)) {
        while(cc.length && cc[cc.length - 1].lex)
          cc.pop()();
        if (cx.marked) return cx.marked;
        if (type == "variable" && inScope(state, content)) return "variable-2";
        return style;
      }
    }
  }

  // Combinator utils

  var cx = {state: null, column: null, marked: null, cc: null};
  function pass() {
    for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
  }
  function cont() {
    pass.apply(null, arguments);
    return true;
  }
  function inList(name, list) {
    for (var v = list; v; v = v.next) if (v.name == name) return true
    return false;
  }
  function register(varname) {
    var state = cx.state;
    cx.marked = "def";
    if (!trackScope) return
    if (state.context) {
      if (state.lexical.info == "var" && state.context && state.context.block) {
        // FIXME function decls are also not block scoped
        var newContext = registerVarScoped(varname, state.context);
        if (newContext != null) {
          state.context = newContext;
          return
        }
      } else if (!inList(varname, state.localVars)) {
        state.localVars = new Var(varname, state.localVars);
        return
      }
    }
    // Fall through means this is global
    if (parserConfig.globalVars && !inList(varname, state.globalVars))
      state.globalVars = new Var(varname, state.globalVars);
  }
  function registerVarScoped(varname, context) {
    if (!context) {
      return null
    } else if (context.block) {
      var inner = registerVarScoped(varname, context.prev);
      if (!inner) return null
      if (inner == context.prev) return context
      return new Context(inner, context.vars, true)
    } else if (inList(varname, context.vars)) {
      return context
    } else {
      return new Context(context.prev, new Var(varname, context.vars), false)
    }
  }

  function isModifier(name) {
    return name == "public" || name == "private" || name == "protected" || name == "abstract" || name == "readonly"
  }

  // Combinators

  function Context(prev, vars, block) { this.prev = prev; this.vars = vars; this.block = block; }
  function Var(name, next) { this.name = name; this.next = next; }

  var defaultVars = new Var("this", new Var("arguments", null));
  function pushcontext() {
    cx.state.context = new Context(cx.state.context, cx.state.localVars, false);
    cx.state.localVars = defaultVars;
  }
  function pushblockcontext() {
    cx.state.context = new Context(cx.state.context, cx.state.localVars, true);
    cx.state.localVars = null;
  }
  function popcontext() {
    cx.state.localVars = cx.state.context.vars;
    cx.state.context = cx.state.context.prev;
  }
  popcontext.lex = true;
  function pushlex(type, info) {
    var result = function() {
      var state = cx.state, indent = state.indented;
      if (state.lexical.type == "stat") indent = state.lexical.indented;
      else for (var outer = state.lexical; outer && outer.type == ")" && outer.align; outer = outer.prev)
        indent = outer.indented;
      state.lexical = new JSLexical(indent, cx.stream.column(), type, null, state.lexical, info);
    };
    result.lex = true;
    return result;
  }
  function poplex() {
    var state = cx.state;
    if (state.lexical.prev) {
      if (state.lexical.type == ")")
        state.indented = state.lexical.indented;
      state.lexical = state.lexical.prev;
    }
  }
  poplex.lex = true;

  function expect(wanted) {
    function exp(type) {
      if (type == wanted) return cont();
      else if (wanted == ";" || type == "}" || type == ")" || type == "]") return pass();
      else return cont(exp);
    }    return exp;
  }

  function statement(type, value) {
    if (type == "var") return cont(pushlex("vardef", value), vardef, expect(";"), poplex);
    if (type == "keyword a") return cont(pushlex("form"), parenExpr, statement, poplex);
    if (type == "keyword b") return cont(pushlex("form"), statement, poplex);
    if (type == "keyword d") return cx.stream.match(/^\s*$/, false) ? cont() : cont(pushlex("stat"), maybeexpression, expect(";"), poplex);
    if (type == "debugger") return cont(expect(";"));
    if (type == "{") return cont(pushlex("}"), pushblockcontext, block, poplex, popcontext);
    if (type == ";") return cont();
    if (type == "if") {
      if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
        cx.state.cc.pop()();
      return cont(pushlex("form"), parenExpr, statement, poplex, maybeelse);
    }
    if (type == "function") return cont(functiondef);
    if (type == "for") return cont(pushlex("form"), pushblockcontext, forspec, statement, popcontext, poplex);
    if (type == "class" || (isTS && value == "interface")) {
      cx.marked = "keyword";
      return cont(pushlex("form", type == "class" ? type : value), className, poplex)
    }
    if (type == "variable") {
      if (isTS && value == "declare") {
        cx.marked = "keyword";
        return cont(statement)
      } else if (isTS && (value == "module" || value == "enum" || value == "type") && cx.stream.match(/^\s*\w/, false)) {
        cx.marked = "keyword";
        if (value == "enum") return cont(enumdef);
        else if (value == "type") return cont(typename, expect("operator"), typeexpr, expect(";"));
        else return cont(pushlex("form"), pattern, expect("{"), pushlex("}"), block, poplex, poplex)
      } else if (isTS && value == "namespace") {
        cx.marked = "keyword";
        return cont(pushlex("form"), expression, statement, poplex)
      } else if (isTS && value == "abstract") {
        cx.marked = "keyword";
        return cont(statement)
      } else {
        return cont(pushlex("stat"), maybelabel);
      }
    }
    if (type == "switch") return cont(pushlex("form"), parenExpr, expect("{"), pushlex("}", "switch"), pushblockcontext,
                                      block, poplex, poplex, popcontext);
    if (type == "case") return cont(expression, expect(":"));
    if (type == "default") return cont(expect(":"));
    if (type == "catch") return cont(pushlex("form"), pushcontext, maybeCatchBinding, statement, poplex, popcontext);
    if (type == "export") return cont(pushlex("stat"), afterExport, poplex);
    if (type == "import") return cont(pushlex("stat"), afterImport, poplex);
    if (type == "async") return cont(statement)
    if (value == "@") return cont(expression, statement)
    return pass(pushlex("stat"), expression, expect(";"), poplex);
  }
  function maybeCatchBinding(type) {
    if (type == "(") return cont(funarg, expect(")"))
  }
  function expression(type, value) {
    return expressionInner(type, value, false);
  }
  function expressionNoComma(type, value) {
    return expressionInner(type, value, true);
  }
  function parenExpr(type) {
    if (type != "(") return pass()
    return cont(pushlex(")"), maybeexpression, expect(")"), poplex)
  }
  function expressionInner(type, value, noComma) {
    if (cx.state.fatArrowAt == cx.stream.start) {
      var body = noComma ? arrowBodyNoComma : arrowBody;
      if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, expect("=>"), body, popcontext);
      else if (type == "variable") return pass(pushcontext, pattern, expect("=>"), body, popcontext);
    }

    var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
    if (atomicTypes.hasOwnProperty(type)) return cont(maybeop);
    if (type == "function") return cont(functiondef, maybeop);
    if (type == "class" || (isTS && value == "interface")) { cx.marked = "keyword"; return cont(pushlex("form"), classExpression, poplex); }
    if (type == "keyword c" || type == "async") return cont(noComma ? expressionNoComma : expression);
    if (type == "(") return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeop);
    if (type == "operator" || type == "spread") return cont(noComma ? expressionNoComma : expression);
    if (type == "[") return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
    if (type == "{") return contCommasep(objprop, "}", null, maybeop);
    if (type == "quasi") return pass(quasi, maybeop);
    if (type == "new") return cont(maybeTarget(noComma));
    return cont();
  }
  function maybeexpression(type) {
    if (type.match(/[;\}\)\],]/)) return pass();
    return pass(expression);
  }

  function maybeoperatorComma(type, value) {
    if (type == ",") return cont(maybeexpression);
    return maybeoperatorNoComma(type, value, false);
  }
  function maybeoperatorNoComma(type, value, noComma) {
    var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
    var expr = noComma == false ? expression : expressionNoComma;
    if (type == "=>") return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
    if (type == "operator") {
      if (/\+\+|--/.test(value) || isTS && value == "!") return cont(me);
      if (isTS && value == "<" && cx.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, false))
        return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, me);
      if (value == "?") return cont(expression, expect(":"), expr);
      return cont(expr);
    }
    if (type == "quasi") { return pass(quasi, me); }
    if (type == ";") return;
    if (type == "(") return contCommasep(expressionNoComma, ")", "call", me);
    if (type == ".") return cont(property, me);
    if (type == "[") return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
    if (isTS && value == "as") { cx.marked = "keyword"; return cont(typeexpr, me) }
    if (type == "regexp") {
      cx.state.lastType = cx.marked = "operator";
      cx.stream.backUp(cx.stream.pos - cx.stream.start - 1);
      return cont(expr)
    }
  }
  function quasi(type, value) {
    if (type != "quasi") return pass();
    if (value.slice(value.length - 2) != "${") return cont(quasi);
    return cont(maybeexpression, continueQuasi);
  }
  function continueQuasi(type) {
    if (type == "}") {
      cx.marked = "string-2";
      cx.state.tokenize = tokenQuasi;
      return cont(quasi);
    }
  }
  function arrowBody(type) {
    findFatArrow(cx.stream, cx.state);
    return pass(type == "{" ? statement : expression);
  }
  function arrowBodyNoComma(type) {
    findFatArrow(cx.stream, cx.state);
    return pass(type == "{" ? statement : expressionNoComma);
  }
  function maybeTarget(noComma) {
    return function(type) {
      if (type == ".") return cont(noComma ? targetNoComma : target);
      else if (type == "variable" && isTS) return cont(maybeTypeArgs, noComma ? maybeoperatorNoComma : maybeoperatorComma)
      else return pass(noComma ? expressionNoComma : expression);
    };
  }
  function target(_, value) {
    if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorComma); }
  }
  function targetNoComma(_, value) {
    if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorNoComma); }
  }
  function maybelabel(type) {
    if (type == ":") return cont(poplex, statement);
    return pass(maybeoperatorComma, expect(";"), poplex);
  }
  function property(type) {
    if (type == "variable") {cx.marked = "property"; return cont();}
  }
  function objprop(type, value) {
    if (type == "async") {
      cx.marked = "property";
      return cont(objprop);
    } else if (type == "variable" || cx.style == "keyword") {
      cx.marked = "property";
      if (value == "get" || value == "set") return cont(getterSetter);
      var m; // Work around fat-arrow-detection complication for detecting typescript typed arrow params
      if (isTS && cx.state.fatArrowAt == cx.stream.start && (m = cx.stream.match(/^\s*:\s*/, false)))
        cx.state.fatArrowAt = cx.stream.pos + m[0].length;
      return cont(afterprop);
    } else if (type == "number" || type == "string") {
      cx.marked = jsonldMode ? "property" : (cx.style + " property");
      return cont(afterprop);
    } else if (type == "jsonld-keyword") {
      return cont(afterprop);
    } else if (isTS && isModifier(value)) {
      cx.marked = "keyword";
      return cont(objprop)
    } else if (type == "[") {
      return cont(expression, maybetype, expect("]"), afterprop);
    } else if (type == "spread") {
      return cont(expressionNoComma, afterprop);
    } else if (value == "*") {
      cx.marked = "keyword";
      return cont(objprop);
    } else if (type == ":") {
      return pass(afterprop)
    }
  }
  function getterSetter(type) {
    if (type != "variable") return pass(afterprop);
    cx.marked = "property";
    return cont(functiondef);
  }
  function afterprop(type) {
    if (type == ":") return cont(expressionNoComma);
    if (type == "(") return pass(functiondef);
  }
  function commasep(what, end, sep) {
    function proceed(type, value) {
      if (sep ? sep.indexOf(type) > -1 : type == ",") {
        var lex = cx.state.lexical;
        if (lex.info == "call") lex.pos = (lex.pos || 0) + 1;
        return cont(function(type, value) {
          if (type == end || value == end) return pass()
          return pass(what)
        }, proceed);
      }
      if (type == end || value == end) return cont();
      if (sep && sep.indexOf(";") > -1) return pass(what)
      return cont(expect(end));
    }
    return function(type, value) {
      if (type == end || value == end) return cont();
      return pass(what, proceed);
    };
  }
  function contCommasep(what, end, info) {
    for (var i = 3; i < arguments.length; i++)
      cx.cc.push(arguments[i]);
    return cont(pushlex(end, info), commasep(what, end), poplex);
  }
  function block(type) {
    if (type == "}") return cont();
    return pass(statement, block);
  }
  function maybetype(type, value) {
    if (isTS) {
      if (type == ":") return cont(typeexpr);
      if (value == "?") return cont(maybetype);
    }
  }
  function maybetypeOrIn(type, value) {
    if (isTS && (type == ":" || value == "in")) return cont(typeexpr)
  }
  function mayberettype(type) {
    if (isTS && type == ":") {
      if (cx.stream.match(/^\s*\w+\s+is\b/, false)) return cont(expression, isKW, typeexpr)
      else return cont(typeexpr)
    }
  }
  function isKW(_, value) {
    if (value == "is") {
      cx.marked = "keyword";
      return cont()
    }
  }
  function typeexpr(type, value) {
    if (value == "keyof" || value == "typeof" || value == "infer" || value == "readonly") {
      cx.marked = "keyword";
      return cont(value == "typeof" ? expressionNoComma : typeexpr)
    }
    if (type == "variable" || value == "void") {
      cx.marked = "type";
      return cont(afterType)
    }
    if (value == "|" || value == "&") return cont(typeexpr)
    if (type == "string" || type == "number" || type == "atom") return cont(afterType);
    if (type == "[") return cont(pushlex("]"), commasep(typeexpr, "]", ","), poplex, afterType)
    if (type == "{") return cont(pushlex("}"), typeprops, poplex, afterType)
    if (type == "(") return cont(commasep(typearg, ")"), maybeReturnType, afterType)
    if (type == "<") return cont(commasep(typeexpr, ">"), typeexpr)
    if (type == "quasi") { return pass(quasiType, afterType); }
  }
  function maybeReturnType(type) {
    if (type == "=>") return cont(typeexpr)
  }
  function typeprops(type) {
    if (type.match(/[\}\)\]]/)) return cont()
    if (type == "," || type == ";") return cont(typeprops)
    return pass(typeprop, typeprops)
  }
  function typeprop(type, value) {
    if (type == "variable" || cx.style == "keyword") {
      cx.marked = "property";
      return cont(typeprop)
    } else if (value == "?" || type == "number" || type == "string") {
      return cont(typeprop)
    } else if (type == ":") {
      return cont(typeexpr)
    } else if (type == "[") {
      return cont(expect("variable"), maybetypeOrIn, expect("]"), typeprop)
    } else if (type == "(") {
      return pass(functiondecl, typeprop)
    } else if (!type.match(/[;\}\)\],]/)) {
      return cont()
    }
  }
  function quasiType(type, value) {
    if (type != "quasi") return pass();
    if (value.slice(value.length - 2) != "${") return cont(quasiType);
    return cont(typeexpr, continueQuasiType);
  }
  function continueQuasiType(type) {
    if (type == "}") {
      cx.marked = "string-2";
      cx.state.tokenize = tokenQuasi;
      return cont(quasiType);
    }
  }
  function typearg(type, value) {
    if (type == "variable" && cx.stream.match(/^\s*[?:]/, false) || value == "?") return cont(typearg)
    if (type == ":") return cont(typeexpr)
    if (type == "spread") return cont(typearg)
    return pass(typeexpr)
  }
  function afterType(type, value) {
    if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType)
    if (value == "|" || type == "." || value == "&") return cont(typeexpr)
    if (type == "[") return cont(typeexpr, expect("]"), afterType)
    if (value == "extends" || value == "implements") { cx.marked = "keyword"; return cont(typeexpr) }
    if (value == "?") return cont(typeexpr, expect(":"), typeexpr)
  }
  function maybeTypeArgs(_, value) {
    if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType)
  }
  function typeparam() {
    return pass(typeexpr, maybeTypeDefault)
  }
  function maybeTypeDefault(_, value) {
    if (value == "=") return cont(typeexpr)
  }
  function vardef(_, value) {
    if (value == "enum") {cx.marked = "keyword"; return cont(enumdef)}
    return pass(pattern, maybetype, maybeAssign, vardefCont);
  }
  function pattern(type, value) {
    if (isTS && isModifier(value)) { cx.marked = "keyword"; return cont(pattern) }
    if (type == "variable") { register(value); return cont(); }
    if (type == "spread") return cont(pattern);
    if (type == "[") return contCommasep(eltpattern, "]");
    if (type == "{") return contCommasep(proppattern, "}");
  }
  function proppattern(type, value) {
    if (type == "variable" && !cx.stream.match(/^\s*:/, false)) {
      register(value);
      return cont(maybeAssign);
    }
    if (type == "variable") cx.marked = "property";
    if (type == "spread") return cont(pattern);
    if (type == "}") return pass();
    if (type == "[") return cont(expression, expect(']'), expect(':'), proppattern);
    return cont(expect(":"), pattern, maybeAssign);
  }
  function eltpattern() {
    return pass(pattern, maybeAssign)
  }
  function maybeAssign(_type, value) {
    if (value == "=") return cont(expressionNoComma);
  }
  function vardefCont(type) {
    if (type == ",") return cont(vardef);
  }
  function maybeelse(type, value) {
    if (type == "keyword b" && value == "else") return cont(pushlex("form", "else"), statement, poplex);
  }
  function forspec(type, value) {
    if (value == "await") return cont(forspec);
    if (type == "(") return cont(pushlex(")"), forspec1, poplex);
  }
  function forspec1(type) {
    if (type == "var") return cont(vardef, forspec2);
    if (type == "variable") return cont(forspec2);
    return pass(forspec2)
  }
  function forspec2(type, value) {
    if (type == ")") return cont()
    if (type == ";") return cont(forspec2)
    if (value == "in" || value == "of") { cx.marked = "keyword"; return cont(expression, forspec2) }
    return pass(expression, forspec2)
  }
  function functiondef(type, value) {
    if (value == "*") {cx.marked = "keyword"; return cont(functiondef);}
    if (type == "variable") {register(value); return cont(functiondef);}
    if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, statement, popcontext);
    if (isTS && value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondef)
  }
  function functiondecl(type, value) {
    if (value == "*") {cx.marked = "keyword"; return cont(functiondecl);}
    if (type == "variable") {register(value); return cont(functiondecl);}
    if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, popcontext);
    if (isTS && value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondecl)
  }
  function typename(type, value) {
    if (type == "keyword" || type == "variable") {
      cx.marked = "type";
      return cont(typename)
    } else if (value == "<") {
      return cont(pushlex(">"), commasep(typeparam, ">"), poplex)
    }
  }
  function funarg(type, value) {
    if (value == "@") cont(expression, funarg);
    if (type == "spread") return cont(funarg);
    if (isTS && isModifier(value)) { cx.marked = "keyword"; return cont(funarg); }
    if (isTS && type == "this") return cont(maybetype, maybeAssign)
    return pass(pattern, maybetype, maybeAssign);
  }
  function classExpression(type, value) {
    // Class expressions may have an optional name.
    if (type == "variable") return className(type, value);
    return classNameAfter(type, value);
  }
  function className(type, value) {
    if (type == "variable") {register(value); return cont(classNameAfter);}
  }
  function classNameAfter(type, value) {
    if (value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, classNameAfter)
    if (value == "extends" || value == "implements" || (isTS && type == ",")) {
      if (value == "implements") cx.marked = "keyword";
      return cont(isTS ? typeexpr : expression, classNameAfter);
    }
    if (type == "{") return cont(pushlex("}"), classBody, poplex);
  }
  function classBody(type, value) {
    if (type == "async" ||
        (type == "variable" &&
         (value == "static" || value == "get" || value == "set" || (isTS && isModifier(value))) &&
         cx.stream.match(/^\s+[\w$\xa1-\uffff]/, false))) {
      cx.marked = "keyword";
      return cont(classBody);
    }
    if (type == "variable" || cx.style == "keyword") {
      cx.marked = "property";
      return cont(classfield, classBody);
    }
    if (type == "number" || type == "string") return cont(classfield, classBody);
    if (type == "[")
      return cont(expression, maybetype, expect("]"), classfield, classBody)
    if (value == "*") {
      cx.marked = "keyword";
      return cont(classBody);
    }
    if (isTS && type == "(") return pass(functiondecl, classBody)
    if (type == ";" || type == ",") return cont(classBody);
    if (type == "}") return cont();
    if (value == "@") return cont(expression, classBody)
  }
  function classfield(type, value) {
    if (value == "!") return cont(classfield)
    if (value == "?") return cont(classfield)
    if (type == ":") return cont(typeexpr, maybeAssign)
    if (value == "=") return cont(expressionNoComma)
    var context = cx.state.lexical.prev, isInterface = context && context.info == "interface";
    return pass(isInterface ? functiondecl : functiondef)
  }
  function afterExport(type, value) {
    if (value == "*") { cx.marked = "keyword"; return cont(maybeFrom, expect(";")); }
    if (value == "default") { cx.marked = "keyword"; return cont(expression, expect(";")); }
    if (type == "{") return cont(commasep(exportField, "}"), maybeFrom, expect(";"));
    return pass(statement);
  }
  function exportField(type, value) {
    if (value == "as") { cx.marked = "keyword"; return cont(expect("variable")); }
    if (type == "variable") return pass(expressionNoComma, exportField);
  }
  function afterImport(type) {
    if (type == "string") return cont();
    if (type == "(") return pass(expression);
    if (type == ".") return pass(maybeoperatorComma);
    return pass(importSpec, maybeMoreImports, maybeFrom);
  }
  function importSpec(type, value) {
    if (type == "{") return contCommasep(importSpec, "}");
    if (type == "variable") register(value);
    if (value == "*") cx.marked = "keyword";
    return cont(maybeAs);
  }
  function maybeMoreImports(type) {
    if (type == ",") return cont(importSpec, maybeMoreImports)
  }
  function maybeAs(_type, value) {
    if (value == "as") { cx.marked = "keyword"; return cont(importSpec); }
  }
  function maybeFrom(_type, value) {
    if (value == "from") { cx.marked = "keyword"; return cont(expression); }
  }
  function arrayLiteral(type) {
    if (type == "]") return cont();
    return pass(commasep(expressionNoComma, "]"));
  }
  function enumdef() {
    return pass(pushlex("form"), pattern, expect("{"), pushlex("}"), commasep(enummember, "}"), poplex, poplex)
  }
  function enummember() {
    return pass(pattern, maybeAssign);
  }

  function isContinuedStatement(state, textAfter) {
    return state.lastType == "operator" || state.lastType == "," ||
      isOperatorChar.test(textAfter.charAt(0)) ||
      /[,.]/.test(textAfter.charAt(0));
  }

  function expressionAllowed(stream, state, backUp) {
    return state.tokenize == tokenBase &&
      /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(state.lastType) ||
      (state.lastType == "quasi" && /\{\s*$/.test(stream.string.slice(0, stream.pos - (backUp || 0))))
  }

  // Interface

  return {
    startState: function(basecolumn) {
      var state = {
        tokenize: tokenBase,
        lastType: "sof",
        cc: [],
        lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
        localVars: parserConfig.localVars,
        context: parserConfig.localVars && new Context(null, null, false),
        indented: basecolumn || 0
      };
      if (parserConfig.globalVars && typeof parserConfig.globalVars == "object")
        state.globalVars = parserConfig.globalVars;
      return state;
    },

    token: function(stream, state) {
      if (stream.sol()) {
        if (!state.lexical.hasOwnProperty("align"))
          state.lexical.align = false;
        state.indented = stream.indentation();
        findFatArrow(stream, state);
      }
      if (state.tokenize != tokenComment && stream.eatSpace()) return null;
      var style = state.tokenize(stream, state);
      if (type == "comment") return style;
      state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
      return parseJS(state, style, type, content, stream);
    },

    indent: function(state, textAfter) {
      if (state.tokenize == tokenComment || state.tokenize == tokenQuasi) return CodeMirror.Pass;
      if (state.tokenize != tokenBase) return 0;
      var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical, top;
      // Kludge to prevent 'maybelse' from blocking lexical scope pops
      if (!/^\s*else\b/.test(textAfter)) for (var i = state.cc.length - 1; i >= 0; --i) {
        var c = state.cc[i];
        if (c == poplex) lexical = lexical.prev;
        else if (c != maybeelse && c != popcontext) break;
      }
      while ((lexical.type == "stat" || lexical.type == "form") &&
             (firstChar == "}" || ((top = state.cc[state.cc.length - 1]) &&
                                   (top == maybeoperatorComma || top == maybeoperatorNoComma) &&
                                   !/^[,\.=+\-*:?[\(]/.test(textAfter))))
        lexical = lexical.prev;
      if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat")
        lexical = lexical.prev;
      var type = lexical.type, closing = firstChar == type;

      if (type == "vardef") return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info.length + 1 : 0);
      else if (type == "form" && firstChar == "{") return lexical.indented;
      else if (type == "form") return lexical.indented + indentUnit;
      else if (type == "stat")
        return lexical.indented + (isContinuedStatement(state, textAfter) ? statementIndent || indentUnit : 0);
      else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false)
        return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
      else if (lexical.align) return lexical.column + (closing ? 0 : 1);
      else return lexical.indented + (closing ? 0 : indentUnit);
    },

    electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
    blockCommentStart: jsonMode ? null : "/*",
    blockCommentEnd: jsonMode ? null : "*/",
    blockCommentContinue: jsonMode ? null : " * ",
    lineComment: jsonMode ? null : "//",
    fold: "brace",
    closeBrackets: "()[]{}''\"\"``",

    helperType: jsonMode ? "json" : "javascript",
    jsonldMode: jsonldMode,
    jsonMode: jsonMode,

    expressionAllowed: expressionAllowed,

    skipExpression: function(state) {
      parseJS(state, "atom", "atom", "true", new CodeMirror.StringStream("", 2, null));
    }
  };
});

CodeMirror.registerHelper("wordChars", "javascript", /[\w$]/);

CodeMirror.defineMIME("text/javascript", "javascript");
CodeMirror.defineMIME("text/ecmascript", "javascript");
CodeMirror.defineMIME("application/javascript", "javascript");
CodeMirror.defineMIME("application/x-javascript", "javascript");
CodeMirror.defineMIME("application/ecmascript", "javascript");
CodeMirror.defineMIME("application/json", { name: "javascript", json: true });
CodeMirror.defineMIME("application/x-json", { name: "javascript", json: true });
CodeMirror.defineMIME("application/manifest+json", { name: "javascript", json: true });
CodeMirror.defineMIME("application/ld+json", { name: "javascript", jsonld: true });
CodeMirror.defineMIME("text/typescript", { name: "javascript", typescript: true });
CodeMirror.defineMIME("application/typescript", { name: "javascript", typescript: true });

});

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

// Utility function that allows modes to be combined. The mode given
// as the base argument takes care of most of the normal mode
// functionality, but a second (typically simple) mode is used, which
// can override the style of text. Both modes get to parse all of the
// text, but when both assign a non-null style to a piece of code, the
// overlay wins, unless the combine argument was true and not overridden,
// or state.overlay.combineTokens was true, in which case the styles are
// combined.

(function(mod) {
  mod(window.CodeMirror);
})(function(CodeMirror) {

CodeMirror.customOverlayMode = function(base, overlay, combine) {
  return {
    startState: function() {
      return {
        base: CodeMirror.startState(base),
        overlay: CodeMirror.startState(overlay),
        basePos: 0, baseCur: null,
        overlayPos: 0, overlayCur: null,
        streamSeen: null
      };
    },
    copyState: function(state) {
      return {
        base: CodeMirror.copyState(base, state.base),
        overlay: CodeMirror.copyState(overlay, state.overlay),
        basePos: state.basePos, baseCur: null,
        overlayPos: state.overlayPos, overlayCur: null
      };
    },

    token: function(stream, state) {
      if (stream != state.streamSeen ||
          Math.min(state.basePos, state.overlayPos) < stream.start) {
        state.streamSeen = stream;
        state.basePos = state.overlayPos = stream.start;
      }

      if (stream.start == state.basePos) {
        state.baseCur = base.token(stream, state.base);
        state.basePos = stream.pos;
      }
      if (stream.start == state.overlayPos) {
        stream.pos = stream.start;
        state.overlayCur = overlay.token(stream, state.overlay);
        state.overlayPos = stream.pos;
      }
      stream.pos = Math.min(state.basePos, state.overlayPos);

      // Edge case for codeblocks in templater mode
      if (state.baseCur && state.overlayCur && state.baseCur.contains("line-HyperMD-codeblock")) {
        state.overlayCur = state.overlayCur.replace("line-templater-inline", "");
        state.overlayCur += ` line-background-HyperMD-codeblock-bg`;
      }

      // state.overlay.combineTokens always takes precedence over combine,
      // unless set to null
      if (state.overlayCur == null) return state.baseCur;
      else if (state.baseCur != null &&
               state.overlay.combineTokens ||
               combine && state.overlay.combineTokens == null)
        return state.baseCur + " " + state.overlayCur;
      else return state.overlayCur;
    },

    indent: base.indent && function(state, textAfter, line) {
      return base.indent(state.base, textAfter, line);
    },
    electricChars: base.electricChars,

    innerMode: function(state) { return {state: state.base, mode: base}; },

    blankLine: function(state) {
      var baseToken, overlayToken;
      if (base.blankLine) baseToken = base.blankLine(state.base);
      if (overlay.blankLine) overlayToken = overlay.blankLine(state.overlay);

      return overlayToken == null ?
        baseToken :
        (combine && baseToken != null ? baseToken + " " + overlayToken : overlayToken);
    }
  };
};

});

const TP_CMD_TOKEN_CLASS = "templater-command";
const TP_INLINE_CLASS = "templater-inline";
const TP_OPENING_TAG_TOKEN_CLASS = "templater-opening-tag";
const TP_CLOSING_TAG_TOKEN_CLASS = "templater-closing-tag";
const TP_INTERPOLATION_TAG_TOKEN_CLASS = "templater-interpolation-tag";
const TP_RAW_TAG_TOKEN_CLASS = "templater-raw-tag";
const TP_EXEC_TAG_TOKEN_CLASS = "templater-execution-tag";
class TemplaterEditor {
    constructor(app, plugin) {
        this.app = app;
        this.plugin = plugin;
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.registerCodeMirrorMode();
        });
    }
    registerCodeMirrorMode() {
        return __awaiter(this, void 0, void 0, function* () {
            // cm-editor-syntax-highlight-obsidian plugin
            // https://codemirror.net/doc/manual.html#modeapi
            // https://codemirror.net/mode/diff/diff.js
            // https://codemirror.net/demo/mustache.html
            // https://marijnhaverbeke.nl/blog/codemirror-mode-system.html
            if (!this.plugin.settings.syntax_highlighting) {
                return;
            }
            // TODO: Add mobile support
            if (obsidian.Platform.isMobileApp) {
                return;
            }
            const js_mode = window.CodeMirror.getMode({}, "javascript");
            if (js_mode.name === "null") {
                this.plugin.log_error(new TemplaterError("Javascript syntax mode couldn't be found, can't enable syntax highlighting."));
                return;
            }
            // Custom overlay mode used to handle edge cases
            // @ts-ignore
            const overlay_mode = window.CodeMirror.customOverlayMode;
            if (overlay_mode == null) {
                this.plugin.log_error(new TemplaterError("Couldn't find customOverlayMode, can't enable syntax highlighting."));
                return;
            }
            window.CodeMirror.defineMode("templater", function (config, parserConfig) {
                const templaterOverlay = {
                    startState: function () {
                        const js_state = window.CodeMirror.startState(js_mode);
                        return Object.assign(Object.assign({}, js_state), { inCommand: false, tag_class: "", freeLine: false });
                    },
                    copyState: function (state) {
                        const js_state = window.CodeMirror.startState(js_mode);
                        const new_state = Object.assign(Object.assign({}, js_state), { inCommand: state.inCommand, tag_class: state.tag_class, freeLine: state.freeLine });
                        return new_state;
                    },
                    blankLine: function (state) {
                        if (state.inCommand) {
                            return `line-background-templater-command-bg`;
                        }
                        return null;
                    },
                    token: function (stream, state) {
                        if (stream.sol() && state.inCommand) {
                            state.freeLine = true;
                        }
                        if (state.inCommand) {
                            let keywords = "";
                            if (stream.match(/[\-_]{0,1}%>/, true)) {
                                state.inCommand = false;
                                state.freeLine = false;
                                const tag_class = state.tag_class;
                                state.tag_class = "";
                                return `line-${TP_INLINE_CLASS} ${TP_CMD_TOKEN_CLASS} ${TP_CLOSING_TAG_TOKEN_CLASS} ${tag_class}`;
                            }
                            const js_result = js_mode.token(stream, state);
                            if (stream.peek() == null && state.freeLine) {
                                keywords += ` line-background-templater-command-bg`;
                            }
                            if (!state.freeLine) {
                                keywords += ` line-${TP_INLINE_CLASS}`;
                            }
                            return `${keywords} ${TP_CMD_TOKEN_CLASS} ${js_result}`;
                        }
                        const match = stream.match(/<%[\-_]{0,1}\s*([*~+]{0,1})/, true);
                        if (match != null) {
                            switch (match[1]) {
                                case '*':
                                    state.tag_class = TP_EXEC_TAG_TOKEN_CLASS;
                                    break;
                                case '~':
                                    state.tag_class = TP_RAW_TAG_TOKEN_CLASS;
                                    break;
                                default:
                                    state.tag_class = TP_INTERPOLATION_TAG_TOKEN_CLASS;
                                    break;
                            }
                            state.inCommand = true;
                            return `line-${TP_INLINE_CLASS} ${TP_CMD_TOKEN_CLASS} ${TP_OPENING_TAG_TOKEN_CLASS} ${state.tag_class}`;
                        }
                        while (stream.next() != null && !stream.match(/<%/, false))
                            ;
                        return null;
                    }
                };
                return overlay_mode(window.CodeMirror.getMode(config, "hypermd"), templaterOverlay);
            });
        });
    }
}

class TemplaterPlugin extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            this.templater = new Templater(this.app, this);
            yield this.templater.setup();
            this.editor = new TemplaterEditor(this.app, this);
            yield this.editor.setup();
            this.update_syntax_highlighting();
            this.fuzzySuggest = new TemplaterFuzzySuggestModal(this.app, this);
            this.registerMarkdownPostProcessor((el, ctx) => this.templater.process_dynamic_templates(el, ctx));
            obsidian.addIcon("templater-icon", ICON_DATA);
            this.addRibbonIcon('templater-icon', 'Templater', () => __awaiter(this, void 0, void 0, function* () {
                this.fuzzySuggest.insert_template();
            }));
            this.addCommand({
                id: "insert-templater",
                name: "Insert Template",
                hotkeys: [
                    {
                        modifiers: ["Alt"],
                        key: 'e',
                    },
                ],
                callback: () => {
                    this.fuzzySuggest.insert_template();
                },
            });
            this.addCommand({
                id: "replace-in-file-templater",
                name: "Replace templates in the active file",
                hotkeys: [
                    {
                        modifiers: ["Alt"],
                        key: 'r',
                    },
                ],
                callback: () => {
                    this.templater.overwrite_active_file_templates();
                },
            });
            this.addCommand({
                id: "jump-to-next-cursor-location",
                name: "Jump to next cursor location",
                hotkeys: [
                    {
                        modifiers: ["Alt"],
                        key: "Tab",
                    },
                ],
                callback: () => {
                    this.templater.cursor_jumper.jump_to_next_cursor_location();
                }
            });
            this.addCommand({
                id: "create-new-note-from-template",
                name: "Create new note from template",
                hotkeys: [
                    {
                        modifiers: ["Alt"],
                        key: "n",
                    },
                ],
                callback: () => {
                    this.fuzzySuggest.create_new_note_from_template();
                }
            });
            this.app.workspace.onLayoutReady(() => {
                this.update_trigger_file_on_creation();
            });
            this.registerEvent(this.app.workspace.on("file-menu", (menu, file) => {
                if (file instanceof obsidian.TFolder) {
                    menu.addItem((item) => {
                        item.setTitle("Create new note from template")
                            .setIcon("templater-icon")
                            .onClick(evt => {
                            this.fuzzySuggest.create_new_note_from_template(file);
                        });
                    });
                }
            }));
            this.addSettingTab(new TemplaterSettingTab(this.app, this));
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    update_trigger_file_on_creation() {
        if (this.settings.trigger_on_file_creation) {
            this.trigger_on_file_creation_event = this.app.vault.on("create", (file) => __awaiter(this, void 0, void 0, function* () {
                if (!(file instanceof obsidian.TFile) || file.extension !== "md") {
                    return;
                }
                /* Avoids template replacement when syncing files */
                const template_folder = obsidian.normalizePath(this.settings.template_folder);
                if (template_folder !== "/") {
                    let parent = file.parent;
                    while (parent != null) {
                        if (parent.path === template_folder) {
                            return;
                        }
                        parent = parent.parent;
                    }
                }
                // TODO: find a better way to do this
                // Currently, I have to wait for the daily note plugin to add the file content before replacing
                // Not a problem with Calendar however since it creates the file with the existing content
                yield delay(300);
                if (file.stat.size == 0 && this.settings.empty_file_template) {
                    const template_file = yield this.errorWrapper(() => __awaiter(this, void 0, void 0, function* () {
                        return resolveTFile(this.app, this.settings.empty_file_template + ".md");
                    }));
                    if (!template_file) {
                        return;
                    }
                    const content = yield this.app.vault.read(template_file);
                    yield this.app.vault.modify(file, content);
                }
                this.templater.overwrite_file_templates(file);
            }));
            this.registerEvent(this.trigger_on_file_creation_event);
        }
        else {
            if (this.trigger_on_file_creation_event) {
                this.app.vault.offref(this.trigger_on_file_creation_event);
                this.trigger_on_file_creation_event = undefined;
            }
        }
    }
    update_syntax_highlighting() {
        if (this.settings.syntax_highlighting) {
            this.syntax_highlighting_event = this.app.workspace.on("codemirror", cm => {
                cm.setOption("mode", "templater");
            });
            this.app.workspace.iterateCodeMirrors(cm => {
                cm.setOption("mode", "templater");
            });
            this.registerEvent(this.syntax_highlighting_event);
        }
        else {
            if (this.syntax_highlighting_event) {
                this.app.vault.offref(this.syntax_highlighting_event);
            }
            this.app.workspace.iterateCodeMirrors(cm => {
                cm.setOption("mode", "hypermd");
            });
        }
    }
    errorWrapper(fn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield fn();
            }
            catch (e) {
                if (!(e instanceof TemplaterError)) {
                    this.log_error(new TemplaterError(`Template parsing error, aborting.`, e.message));
                }
                else {
                    this.log_error(e);
                }
                return null;
            }
        });
    }
    log_update(msg) {
        const notice = new obsidian.Notice("", 15000);
        // TODO: Find better way for this
        // @ts-ignore
        notice.noticeEl.innerHTML = `<b>Templater update</b>:<br/>${msg}`;
    }
    log_error(e) {
        const notice = new obsidian.Notice("", 8000);
        if (e instanceof TemplaterError && e.console_msg) {
            // TODO: Find a better way for this
            // @ts-ignore
            notice.noticeEl.innerHTML = `<b>Templater Error</b>:<br/>${e.message}<br/>Check console for more informations`;
            console.error(e.message, e.console_msg);
        }
        else {
            // @ts-ignore
            notice.noticeEl.innerHTML = `<b>Templater Error</b>:<br/>${e.message}`;
        }
    }
}

module.exports = TemplaterPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9FcnJvci50cyIsInNyYy9TZXR0aW5ncy50cyIsInNyYy9VdGlscy50cyIsInNyYy9UZW1wbGF0ZXJGdXp6eVN1Z2dlc3QudHMiLCJzcmMvQ29uc3RhbnRzLnRzIiwic3JjL0N1cnNvckp1bXBlci50cyIsIm5vZGVfbW9kdWxlcy9ldGEvZGlzdC9ldGEuZXMuanMiLCJzcmMvSW50ZXJuYWxUZW1wbGF0ZXMvSW50ZXJuYWxNb2R1bGUudHMiLCJzcmMvSW50ZXJuYWxUZW1wbGF0ZXMvZGF0ZS9JbnRlcm5hbE1vZHVsZURhdGUudHMiLCJzcmMvSW50ZXJuYWxUZW1wbGF0ZXMvZmlsZS9JbnRlcm5hbE1vZHVsZUZpbGUudHMiLCJzcmMvSW50ZXJuYWxUZW1wbGF0ZXMvd2ViL0ludGVybmFsTW9kdWxlV2ViLnRzIiwic3JjL0ludGVybmFsVGVtcGxhdGVzL2Zyb250bWF0dGVyL0ludGVybmFsTW9kdWxlRnJvbnRtYXR0ZXIudHMiLCJzcmMvSW50ZXJuYWxUZW1wbGF0ZXMvc3lzdGVtL1Byb21wdE1vZGFsLnRzIiwic3JjL0ludGVybmFsVGVtcGxhdGVzL3N5c3RlbS9TdWdnZXN0ZXJNb2RhbC50cyIsInNyYy9JbnRlcm5hbFRlbXBsYXRlcy9zeXN0ZW0vSW50ZXJuYWxNb2R1bGVTeXN0ZW0udHMiLCJzcmMvSW50ZXJuYWxUZW1wbGF0ZXMvY29uZmlnL0ludGVybmFsTW9kdWxlQ29uZmlnLnRzIiwic3JjL0ludGVybmFsVGVtcGxhdGVzL0ludGVybmFsVGVtcGxhdGVQYXJzZXIudHMiLCJzcmMvVXNlclRlbXBsYXRlcy9Vc2VyVGVtcGxhdGVQYXJzZXIudHMiLCJzcmMvVGVtcGxhdGVQYXJzZXIudHMiLCJzcmMvVGVtcGxhdGVyLnRzIiwic3JjL21vZGUvamF2YXNjcmlwdC5qcyIsInNyYy9tb2RlL2N1c3RvbV9vdmVybGF5LmpzIiwic3JjL1RlbXBsYXRlckVkaXRvci50cyIsInNyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgZnJvbSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgVGVtcGxhdGVyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobXNnOiBzdHJpbmcsIHB1YmxpYyBjb25zb2xlX21zZz86IHN0cmluZykge1xuICAgICAgICBzdXBlcihtc2cpO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBUZW1wbGF0ZXJFcnJvciB9IGZyb20gXCJFcnJvclwiO1xuaW1wb3J0IHsgQXBwLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmltcG9ydCBUZW1wbGF0ZXJQbHVnaW4gZnJvbSAnLi9tYWluJztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0VUVElOR1M6IFRlbXBsYXRlclNldHRpbmdzID0ge1xuXHRjb21tYW5kX3RpbWVvdXQ6IDUsXG5cdHRlbXBsYXRlX2ZvbGRlcjogXCJcIixcblx0dGVtcGxhdGVzX3BhaXJzOiBbW1wiXCIsIFwiXCJdXSxcblx0dHJpZ2dlcl9vbl9maWxlX2NyZWF0aW9uOiBmYWxzZSxcblx0ZW5hYmxlX3N5c3RlbV9jb21tYW5kczogZmFsc2UsXG5cdHNoZWxsX3BhdGg6IFwiXCIsXG5cdHNjcmlwdF9mb2xkZXI6IHVuZGVmaW5lZCxcblx0ZW1wdHlfZmlsZV90ZW1wbGF0ZTogdW5kZWZpbmVkLFxuXHRzeW50YXhfaGlnaGxpZ2h0aW5nOiB0cnVlLFxufTtcblxuZXhwb3J0IGludGVyZmFjZSBUZW1wbGF0ZXJTZXR0aW5ncyB7XG5cdGNvbW1hbmRfdGltZW91dDogbnVtYmVyO1xuXHR0ZW1wbGF0ZV9mb2xkZXI6IHN0cmluZztcblx0dGVtcGxhdGVzX3BhaXJzOiBBcnJheTxbc3RyaW5nLCBzdHJpbmddPjtcblx0dHJpZ2dlcl9vbl9maWxlX2NyZWF0aW9uOiBib29sZWFuO1xuXHRlbmFibGVfc3lzdGVtX2NvbW1hbmRzOiBib29sZWFuO1xuXHRzaGVsbF9wYXRoOiBzdHJpbmcsXG5cdHNjcmlwdF9mb2xkZXI6IHN0cmluZyxcblx0ZW1wdHlfZmlsZV90ZW1wbGF0ZTogc3RyaW5nLFxuXHRzeW50YXhfaGlnaGxpZ2h0aW5nOiBib29sZWFuLFxufTtcblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlclNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcblx0Y29uc3RydWN0b3IocHVibGljIGFwcDogQXBwLCBwcml2YXRlIHBsdWdpbjogVGVtcGxhdGVyUGx1Z2luKSB7XG5cdFx0c3VwZXIoYXBwLCBwbHVnaW4pO1xuXHR9XG5cblx0ZGlzcGxheSgpOiB2b2lkIHtcblx0XHRjb25zdCB7Y29udGFpbmVyRWx9ID0gdGhpcztcblx0XHRsZXQgZGVzYzogRG9jdW1lbnRGcmFnbWVudDtcblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZShcIlRlbXBsYXRlIGZvbGRlciBsb2NhdGlvblwiKVxuXHRcdFx0LnNldERlc2MoXCJGaWxlcyBpbiB0aGlzIGZvbGRlciB3aWxsIGJlIGF2YWlsYWJsZSBhcyB0ZW1wbGF0ZXMuXCIpXG5cdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHtcblx0XHRcdFx0dGV4dC5zZXRQbGFjZWhvbGRlcihcIkV4YW1wbGU6IGZvbGRlciAxL2ZvbGRlciAyXCIpXG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnRlbXBsYXRlX2ZvbGRlcilcblx0XHRcdFx0XHQub25DaGFuZ2UoKG5ld19mb2xkZXIpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnRlbXBsYXRlX2ZvbGRlciA9IG5ld19mb2xkZXI7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0fSk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKFwiVGltZW91dFwiKVxuXHRcdFx0LnNldERlc2MoXCJNYXhpbXVtIHRpbWVvdXQgaW4gc2Vjb25kcyBmb3IgYSBzeXN0ZW0gY29tbWFuZC5cIilcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4ge1xuXHRcdFx0XHR0ZXh0LnNldFBsYWNlaG9sZGVyKFwiVGltZW91dFwiKVxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb21tYW5kX3RpbWVvdXQudG9TdHJpbmcoKSlcblx0XHRcdFx0XHQub25DaGFuZ2UoKG5ld192YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgbmV3X3RpbWVvdXQgPSBOdW1iZXIobmV3X3ZhbHVlKTtcblx0XHRcdFx0XHRcdGlmIChpc05hTihuZXdfdGltZW91dCkpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4ubG9nX2Vycm9yKG5ldyBUZW1wbGF0ZXJFcnJvcihcIlRpbWVvdXQgbXVzdCBiZSBhIG51bWJlclwiKSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbW1hbmRfdGltZW91dCA9IG5ld190aW1lb3V0O1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdH0pO1xuXG5cdFx0ZGVzYyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRkZXNjLmFwcGVuZChcblx0XHRcdFwiVGVtcGxhdGVyIHByb3ZpZGVzIG11bHRpcGxlcyBwcmVkZWZpbmVkIHZhcmlhYmxlcyAvIGZ1bmN0aW9ucyB0aGF0IHlvdSBjYW4gdXNlLlwiLFxuXHRcdFx0ZGVzYy5jcmVhdGVFbChcImJyXCIpLFxuXHRcdFx0XCJDaGVjayB0aGUgXCIsXG5cdFx0XHRkZXNjLmNyZWF0ZUVsKFwiYVwiLCB7XG5cdFx0XHRcdGhyZWY6IFwiaHR0cHM6Ly9zaWxlbnR2b2lkMTMuZ2l0aHViLmlvL1RlbXBsYXRlci9cIixcblx0XHRcdFx0dGV4dDogXCJkb2N1bWVudGF0aW9uXCJcblx0XHRcdH0pLFxuXHRcdFx0XCIgdG8gZ2V0IGEgbGlzdCBvZiBhbGwgdGhlIGF2YWlsYWJsZSBpbnRlcm5hbCB2YXJpYWJsZXMgLyBmdW5jdGlvbnMuXCIsXG5cdFx0KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoXCJJbnRlcm5hbCBWYXJpYWJsZXMgYW5kIEZ1bmN0aW9uc1wiKVxuXHRcdFx0LnNldERlc2MoZGVzYyk7XG5cblx0XHRkZXNjID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXHRcdGRlc2MuYXBwZW5kKFxuXHRcdFx0XCJBZGRzIHN5bnRheCBoaWdobGlnaHRpbmcgZm9yIFRlbXBsYXRlciBjb21tYW5kcyBpbiBlZGl0IG1vZGUuXCIsXG5cdFx0KTtcdFxuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZShcIlN5bnRheCBIaWdobGlnaHRpbmdcIilcblx0XHRcdC5zZXREZXNjKGRlc2MpXG5cdFx0XHQuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB7XG5cdFx0XHRcdHRvZ2dsZVxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zeW50YXhfaGlnaGxpZ2h0aW5nKVxuXHRcdFx0XHRcdC5vbkNoYW5nZShzeW50YXhfaGlnaGxpZ2h0aW5nID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnN5bnRheF9oaWdobGlnaHRpbmcgPSBzeW50YXhfaGlnaGxpZ2h0aW5nO1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi51cGRhdGVfc3ludGF4X2hpZ2hsaWdodGluZygpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHR9KTtcblxuXHRcdGRlc2MgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0ZGVzYy5hcHBlbmQoXG5cdFx0XHRcIlRlbXBsYXRlciB3aWxsIGxpc3RlbiBmb3IgdGhlIG5ldyBmaWxlIGNyZWF0aW9uIGV2ZW50LCBhbmQgcmVwbGFjZSBldmVyeSBjb21tYW5kIGl0IGZpbmRzIGluIHRoZSBuZXcgZmlsZSdzIGNvbnRlbnQuXCIsXG5cdFx0XHRkZXNjLmNyZWF0ZUVsKFwiYnJcIiksXG5cdFx0XHRcIlRoaXMgbWFrZXMgVGVtcGxhdGVyIGNvbXBhdGlibGUgd2l0aCBvdGhlciBwbHVnaW5zIGxpa2UgdGhlIERhaWx5IG5vdGUgY29yZSBwbHVnaW4sIENhbGVuZGFyIHBsdWdpbiwgUmV2aWV3IHBsdWdpbiwgTm90ZSByZWZhY3RvciBwbHVnaW4sIC4uLlwiLFxuXHRcdFx0ZGVzYy5jcmVhdGVFbChcImJyXCIpLFxuXHRcdFx0ZGVzYy5jcmVhdGVFbChcImJcIiwge1xuXHRcdFx0XHR0ZXh0OiBcIldhcm5pbmc6IFwiLFxuXHRcdFx0fSksXG5cdFx0XHRcIlRoaXMgY2FuIGJlIGRhbmdlcm91cyBpZiB5b3UgY3JlYXRlIG5ldyBmaWxlcyB3aXRoIHVua25vd24gLyB1bnNhZmUgY29udGVudCBvbiBjcmVhdGlvbi4gTWFrZSBzdXJlIHRoYXQgZXZlcnkgbmV3IGZpbGUncyBjb250ZW50IGlzIHNhZmUgb24gY3JlYXRpb24uXCJcblx0XHQpO1x0XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKFwiVHJpZ2dlciBUZW1wbGF0ZXIgb24gbmV3IGZpbGUgY3JlYXRpb25cIilcblx0XHRcdC5zZXREZXNjKGRlc2MpXG5cdFx0XHQuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB7XG5cdFx0XHRcdHRvZ2dsZVxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy50cmlnZ2VyX29uX2ZpbGVfY3JlYXRpb24pXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKHRyaWdnZXJfb25fZmlsZV9jcmVhdGlvbiA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy50cmlnZ2VyX29uX2ZpbGVfY3JlYXRpb24gPSB0cmlnZ2VyX29uX2ZpbGVfY3JlYXRpb247XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnVwZGF0ZV90cmlnZ2VyX2ZpbGVfb25fY3JlYXRpb24oKTtcblx0XHRcdFx0XHRcdC8vIEZvcmNlIHJlZnJlc2hcblx0XHRcdFx0XHRcdHRoaXMuZGlzcGxheSgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MudHJpZ2dlcl9vbl9maWxlX2NyZWF0aW9uKSB7XG5cdFx0XHRkZXNjID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXHRcdFx0ZGVzYy5hcHBlbmQoXG5cdFx0XHRcdFwiVGVtcGxhdGVyIHdpbGwgYXV0b21hdGljYWxseSBhcHBseSB0aGlzIHRlbXBsYXRlIHRvIG5ldyBlbXB0eSBmaWxlcyB3aGVuIHRoZXkgYXJlIGNyZWF0ZWQuXCIsXG5cdFx0XHRcdGRlc2MuY3JlYXRlRWwoXCJiclwiKSxcblx0XHRcdFx0XCJUaGUgLm1kIGV4dGVuc2lvbiBmb3IgdGhlIGZpbGUgc2hvdWxkbid0IGJlIHNwZWNpZmllZC5cIlxuXHRcdFx0KTtcblx0XHRcdFxuXHRcdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHRcdC5zZXROYW1lKFwiRW1wdHkgZmlsZSB0ZW1wbGF0ZVwiKVxuXHRcdFx0XHQuc2V0RGVzYyhkZXNjKVxuXHRcdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHtcblx0XHRcdFx0XHR0ZXh0LnNldFBsYWNlaG9sZGVyKFwiZm9sZGVyIDEvdGVtcGxhdGVfZmlsZVwiKVxuXHRcdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmVtcHR5X2ZpbGVfdGVtcGxhdGUpXG5cdFx0XHRcdFx0XHQub25DaGFuZ2UoKGVtcHR5X2ZpbGVfdGVtcGxhdGUpID0+IHtcblx0XHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1wdHlfZmlsZV90ZW1wbGF0ZSA9IGVtcHR5X2ZpbGVfdGVtcGxhdGU7XG5cdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGRlc2MgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0ZGVzYy5hcHBlbmQoXG5cdFx0XHRcIkFsbCBKYXZhU2NyaXB0IGZpbGVzIGluIHRoaXMgZm9sZGVyIHdpbGwgYmUgbG9hZGVkIGFzIENvbW1vbkpTIG1vZHVsZXMsIHRvIGltcG9ydCBjdXN0b20gdXNlciBmdW5jdGlvbnMuXCIsIFxuXHRcdFx0ZGVzYy5jcmVhdGVFbChcImJyXCIpLFxuXHRcdFx0XCJUaGUgZm9sZGVyIG5lZWRzIHRvIGJlIGFjY2Vzc2libGUgZnJvbSB0aGUgdmF1bHQuXCIsXG5cdFx0XHRkZXNjLmNyZWF0ZUVsKFwiYnJcIiksXG5cdFx0XHRcIkNoZWNrIHRoZSBcIixcblx0XHRcdGRlc2MuY3JlYXRlRWwoXCJhXCIsIHtcblx0XHRcdFx0aHJlZjogXCJodHRwczovL3NpbGVudHZvaWQxMy5naXRodWIuaW8vVGVtcGxhdGVyL1wiLFxuXHRcdFx0XHR0ZXh0OiBcImRvY3VtZW50YXRpb25cIixcblx0XHRcdH0pLFxuXHRcdFx0XCIgZm9yIG1vcmUgaW5mb3JtYXRpb25zLlwiLFxuXHRcdCk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKFwiU2NyaXB0IGZpbGVzIGZvbGRlciBsb2NhdGlvblwiKVxuXHRcdFx0LnNldERlc2MoZGVzYylcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4ge1xuXHRcdFx0XHR0ZXh0LnNldFBsYWNlaG9sZGVyKFwiRXhhbXBsZTogZm9sZGVyIDEvZm9sZGVyIDJcIilcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc2NyaXB0X2ZvbGRlcilcblx0XHRcdFx0XHQub25DaGFuZ2UoKG5ld19mb2xkZXIpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnNjcmlwdF9mb2xkZXIgPSBuZXdfZm9sZGVyO1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdH0pO1xuXG5cdFx0ZGVzYyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRkZXNjLmFwcGVuZChcblx0XHRcdFwiQWxsb3dzIHlvdSB0byBjcmVhdGUgdXNlciBmdW5jdGlvbnMgbGlua2VkIHRvIHN5c3RlbSBjb21tYW5kcy5cIixcblx0XHRcdGRlc2MuY3JlYXRlRWwoXCJiclwiKSxcblx0XHRcdGRlc2MuY3JlYXRlRWwoXCJiXCIsIHtcblx0XHRcdFx0dGV4dDogXCJXYXJuaW5nOiBcIlxuXHRcdFx0fSksXG5cdFx0XHRcIkl0IGNhbiBiZSBkYW5nZXJvdXMgdG8gZXhlY3V0ZSBhcmJpdHJhcnkgc3lzdGVtIGNvbW1hbmRzIGZyb20gdW50cnVzdGVkIHNvdXJjZXMuIE9ubHkgcnVuIHN5c3RlbSBjb21tYW5kcyB0aGF0IHlvdSB1bmRlcnN0YW5kLCBmcm9tIHRydXN0ZWQgc291cmNlcy5cIixcblx0XHQpO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZShcIkVuYWJsZSBTeXN0ZW0gQ29tbWFuZHNcIilcblx0XHRcdC5zZXREZXNjKGRlc2MpXG5cdFx0XHQuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB7XG5cdFx0XHRcdHRvZ2dsZVxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVfc3lzdGVtX2NvbW1hbmRzKVxuXHRcdFx0XHRcdC5vbkNoYW5nZShlbmFibGVfc3lzdGVtX2NvbW1hbmRzID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZV9zeXN0ZW1fY29tbWFuZHMgPSBlbmFibGVfc3lzdGVtX2NvbW1hbmRzO1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0XHQvLyBGb3JjZSByZWZyZXNoXG5cdFx0XHRcdFx0XHR0aGlzLmRpc3BsYXkoKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0aWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZV9zeXN0ZW1fY29tbWFuZHMpIHtcblx0XHRcdGRlc2MgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0XHRkZXNjLmFwcGVuZChcblx0XHRcdFx0XCJGdWxsIHBhdGggdG8gdGhlIHNoZWxsIGJpbmFyeSB0byBleGVjdXRlIHRoZSBjb21tYW5kIHdpdGguXCIsXG5cdFx0XHRcdGRlc2MuY3JlYXRlRWwoXCJiclwiKSxcblx0XHRcdFx0XCJUaGlzIHNldHRpbmcgaXMgb3B0aW9uYWwgYW5kIHdpbGwgZGVmYXVsdCB0byB0aGUgc3lzdGVtJ3MgZGVmYXVsdCBzaGVsbCBpZiBub3Qgc3BlY2lmaWVkLlwiLFxuXHRcdFx0XHRkZXNjLmNyZWF0ZUVsKFwiYnJcIiksXG5cdFx0XHRcdFwiWW91IGNhbiB1c2UgZm9yd2FyZCBzbGFzaGVzICgnLycpIGFzIHBhdGggc2VwYXJhdG9ycyBvbiBhbGwgcGxhdGZvcm1zIGlmIGluIGRvdWJ0LlwiXG5cdFx0XHQpO1xuXHRcdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHRcdC5zZXROYW1lKFwiU2hlbGwgYmluYXJ5IGxvY2F0aW9uXCIpXG5cdFx0XHRcdC5zZXREZXNjKGRlc2MpXG5cdFx0XHRcdC5hZGRUZXh0KHRleHQgPT4ge1xuXHRcdFx0XHRcdHRleHQuc2V0UGxhY2Vob2xkZXIoXCJFeGFtcGxlOiAvYmluL2Jhc2gsIC4uLlwiKVxuXHRcdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnNoZWxsX3BhdGgpXG5cdFx0XHRcdFx0XHQub25DaGFuZ2UoKHNoZWxsX3BhdGgpID0+IHtcblx0XHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3Muc2hlbGxfcGF0aCA9IHNoZWxsX3BhdGg7XG5cdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0fSk7XG5cblx0XHRcdGxldCBpID0gMTtcblx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnRlbXBsYXRlc19wYWlycy5mb3JFYWNoKCh0ZW1wbGF0ZV9wYWlyKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGRpdiA9IGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdkaXYnKTtcblx0XHRcdFx0ZGl2LmFkZENsYXNzKFwidGVtcGxhdGVyX2RpdlwiKTtcblxuXHRcdFx0XHRjb25zdCB0aXRsZSA9IGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoNCcsIHtcblx0XHRcdFx0XHR0ZXh0OiAnVXNlciBGdW5jdGlvbiBuwrAnICsgaSxcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHRpdGxlLmFkZENsYXNzKFwidGVtcGxhdGVyX3RpdGxlXCIpO1xuXG5cdFx0XHRcdGNvbnN0IHNldHRpbmcgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdFx0XHQuYWRkRXh0cmFCdXR0b24oZXh0cmEgPT4ge1xuXHRcdFx0XHRcdFx0ZXh0cmEuc2V0SWNvbihcImNyb3NzXCIpXG5cdFx0XHRcdFx0XHRcdC5zZXRUb29sdGlwKFwiRGVsZXRlXCIpXG5cdFx0XHRcdFx0XHRcdC5vbkNsaWNrKCgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBpbmRleCA9IHRoaXMucGx1Z2luLnNldHRpbmdzLnRlbXBsYXRlc19wYWlycy5pbmRleE9mKHRlbXBsYXRlX3BhaXIpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChpbmRleCA+IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy50ZW1wbGF0ZXNfcGFpcnMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHRcdFx0XHRcdC8vIEZvcmNlIHJlZnJlc2hcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5kaXNwbGF5KCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmFkZFRleHQodGV4dCA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHQgPSB0ZXh0LnNldFBsYWNlaG9sZGVyKCdGdW5jdGlvbiBuYW1lJylcblx0XHRcdFx0XHRcdFx0LnNldFZhbHVlKHRlbXBsYXRlX3BhaXJbMF0pXG5cdFx0XHRcdFx0XHRcdC5vbkNoYW5nZSgobmV3X3ZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy50ZW1wbGF0ZXNfcGFpcnMuaW5kZXhPZih0ZW1wbGF0ZV9wYWlyKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoaW5kZXggPiAtMSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MudGVtcGxhdGVzX3BhaXJzW2luZGV4XVswXSA9IG5ld192YWx1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdHQuaW5wdXRFbC5hZGRDbGFzcyhcInRlbXBsYXRlcl90ZW1wbGF0ZVwiKTtcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0LmFkZFRleHRBcmVhKHRleHQgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgdCA9IHRleHQuc2V0UGxhY2Vob2xkZXIoJ1N5c3RlbSBDb21tYW5kJylcblx0XHRcdFx0XHRcdC5zZXRWYWx1ZSh0ZW1wbGF0ZV9wYWlyWzFdKVxuXHRcdFx0XHRcdFx0Lm9uQ2hhbmdlKChuZXdfY21kKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy5wbHVnaW4uc2V0dGluZ3MudGVtcGxhdGVzX3BhaXJzLmluZGV4T2YodGVtcGxhdGVfcGFpcik7XG5cdFx0XHRcdFx0XHRcdGlmIChpbmRleCA+IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MudGVtcGxhdGVzX3BhaXJzW2luZGV4XVsxXSA9IG5ld19jbWQ7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHR0LmlucHV0RWwuc2V0QXR0cihcInJvd3NcIiwgNCk7XG5cdFx0XHRcdFx0XHR0LmlucHV0RWwuYWRkQ2xhc3MoXCJ0ZW1wbGF0ZXJfY21kXCIpO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRzZXR0aW5nLmluZm9FbC5yZW1vdmUoKTtcblxuXHRcdFx0XHRkaXYuYXBwZW5kQ2hpbGQodGl0bGUpO1xuXHRcdFx0XHRkaXYuYXBwZW5kQ2hpbGQoY29udGFpbmVyRWwubGFzdENoaWxkKTtcblxuXHRcdFx0XHRpKz0xO1xuXHRcdFx0fSk7XG5cblx0XHRcdGNvbnN0IGRpdiA9IGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdkaXYnKTtcblx0XHRcdGRpdi5hZGRDbGFzcyhcInRlbXBsYXRlcl9kaXYyXCIpO1xuXG5cdFx0XHRjb25zdCBzZXR0aW5nID0gbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHRcdC5hZGRCdXR0b24oYnV0dG9uID0+IHtcblx0XHRcdFx0XHRjb25zdCBiID0gYnV0dG9uLnNldEJ1dHRvblRleHQoXCJBZGQgTmV3IFVzZXIgRnVuY3Rpb25cIikub25DbGljaygoKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy50ZW1wbGF0ZXNfcGFpcnMucHVzaChbXCJcIiwgXCJcIl0pO1xuXHRcdFx0XHRcdFx0Ly8gRm9yY2UgcmVmcmVzaFxuXHRcdFx0XHRcdFx0dGhpcy5kaXNwbGF5KCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Yi5idXR0b25FbC5hZGRDbGFzcyhcInRlbXBsYXRlcl9idXR0b25cIik7XG5cblx0XHRcdFx0XHRyZXR1cm4gYjtcblx0XHRcdFx0fSk7XG5cdFx0XHRzZXR0aW5nLmluZm9FbC5yZW1vdmUoKTtcblxuXHRcdFx0ZGl2LmFwcGVuZENoaWxkKGNvbnRhaW5lckVsLmxhc3RDaGlsZCk7XG5cdFx0fVx0XG5cdH1cbn0iLCJpbXBvcnQgeyBUZW1wbGF0ZXJFcnJvciB9IGZyb20gXCJFcnJvclwiO1xuaW1wb3J0IHsgQXBwLCBub3JtYWxpemVQYXRoLCBUQWJzdHJhY3RGaWxlLCBURmlsZSwgVEZvbGRlciwgVmF1bHQgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuZXhwb3J0IGNvbnN0IG9ic2lkaWFuX21vZHVsZSA9IHJlcXVpcmUoXCJvYnNpZGlhblwiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGF5KG1zOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoIHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykgKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTsgLy8gJCYgbWVhbnMgdGhlIHdob2xlIG1hdGNoZWQgc3RyaW5nXG59IFxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVRGaWxlKGFwcDogQXBwLCBmaWxlX3N0cjogc3RyaW5nKTogVEZpbGUge1xuICAgIGZpbGVfc3RyID0gbm9ybWFsaXplUGF0aChmaWxlX3N0cik7XG5cbiAgICBjb25zdCBmaWxlID0gYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChmaWxlX3N0cik7XG4gICAgaWYgKCFmaWxlKSB7XG4gICAgICAgIHRocm93IG5ldyBUZW1wbGF0ZXJFcnJvcihgRmlsZSBcIiR7ZmlsZV9zdHJ9XCIgZG9lc24ndCBleGlzdGApO1xuICAgIH1cbiAgICBpZiAoIShmaWxlIGluc3RhbmNlb2YgVEZpbGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBUZW1wbGF0ZXJFcnJvcihgJHtmaWxlX3N0cn0gaXMgYSBmb2xkZXIsIG5vdCBhIGZpbGVgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmlsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRGaWxlc0Zyb21Gb2xkZXIoYXBwOiBBcHAsIGZvbGRlcl9zdHI6IHN0cmluZyk6IEFycmF5PFRGaWxlPiB7XG4gICAgZm9sZGVyX3N0ciA9IG5vcm1hbGl6ZVBhdGgoZm9sZGVyX3N0cik7XG5cbiAgICBjb25zdCBmb2xkZXIgPSBhcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGZvbGRlcl9zdHIpO1xuICAgIGlmICghZm9sZGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBUZW1wbGF0ZXJFcnJvcihgRm9sZGVyIFwiJHtmb2xkZXJfc3RyfVwiIGRvZXNuJ3QgZXhpc3RgKTtcbiAgICB9XG4gICAgaWYgKCEoZm9sZGVyIGluc3RhbmNlb2YgVEZvbGRlcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFRlbXBsYXRlckVycm9yKGAke2ZvbGRlcl9zdHJ9IGlzIGEgZmlsZSwgbm90IGEgZm9sZGVyYCk7XG4gICAgfVxuXG4gICAgbGV0IGZpbGVzOiBBcnJheTxURmlsZT4gPSBbXTtcbiAgICBWYXVsdC5yZWN1cnNlQ2hpbGRyZW4oZm9sZGVyLCAoZmlsZTogVEFic3RyYWN0RmlsZSkgPT4ge1xuICAgICAgICBpZiAoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB7XG4gICAgICAgICAgICBmaWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmaWxlcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIHJldHVybiBhLmJhc2VuYW1lLmxvY2FsZUNvbXBhcmUoYi5iYXNlbmFtZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmlsZXM7XG59IiwiaW1wb3J0IHsgQXBwLCBGdXp6eVN1Z2dlc3RNb2RhbCwgVEZpbGUsIFRGb2xkZXIsIG5vcm1hbGl6ZVBhdGgsIFZhdWx0LCBUQWJzdHJhY3RGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBnZXRURmlsZXNGcm9tRm9sZGVyIH0gZnJvbSBcIlV0aWxzXCI7XG5pbXBvcnQgVGVtcGxhdGVyUGx1Z2luIGZyb20gJy4vbWFpbic7XG5cbmV4cG9ydCBlbnVtIE9wZW5Nb2RlIHtcbiAgICBJbnNlcnRUZW1wbGF0ZSxcbiAgICBDcmVhdGVOb3RlVGVtcGxhdGUsXG59O1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVyRnV6enlTdWdnZXN0TW9kYWwgZXh0ZW5kcyBGdXp6eVN1Z2dlc3RNb2RhbDxURmlsZT4ge1xuICAgIHB1YmxpYyBhcHA6IEFwcDtcbiAgICBwcml2YXRlIHBsdWdpbjogVGVtcGxhdGVyUGx1Z2luO1xuICAgIHByaXZhdGUgb3Blbl9tb2RlOiBPcGVuTW9kZTtcbiAgICBwcml2YXRlIGNyZWF0aW9uX2ZvbGRlcjogVEZvbGRlcjtcblxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IFRlbXBsYXRlclBsdWdpbikge1xuICAgICAgICBzdXBlcihhcHApO1xuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgfVxuXG4gICAgZ2V0SXRlbXMoKTogVEZpbGVbXSB7XG4gICAgICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy50ZW1wbGF0ZV9mb2xkZXIgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC52YXVsdC5nZXRNYXJrZG93bkZpbGVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdldFRGaWxlc0Zyb21Gb2xkZXIodGhpcy5hcHAsIHRoaXMucGx1Z2luLnNldHRpbmdzLnRlbXBsYXRlX2ZvbGRlcik7XG4gICAgfVxuXG4gICAgZ2V0SXRlbVRleHQoaXRlbTogVEZpbGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gaXRlbS5iYXNlbmFtZTtcbiAgICB9XG5cbiAgICBvbkNob29zZUl0ZW0oaXRlbTogVEZpbGUsIF9ldnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHN3aXRjaCh0aGlzLm9wZW5fbW9kZSkge1xuICAgICAgICAgICAgY2FzZSBPcGVuTW9kZS5JbnNlcnRUZW1wbGF0ZTpcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi50ZW1wbGF0ZXIuYXBwZW5kX3RlbXBsYXRlKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBPcGVuTW9kZS5DcmVhdGVOb3RlVGVtcGxhdGU6XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4udGVtcGxhdGVyLmNyZWF0ZV9uZXdfbm90ZV9mcm9tX3RlbXBsYXRlKGl0ZW0sIHRoaXMuY3JlYXRpb25fZm9sZGVyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0KCk6IHZvaWQge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4ubG9nX2Vycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5zZXJ0X3RlbXBsYXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9wZW5fbW9kZSA9IE9wZW5Nb2RlLkluc2VydFRlbXBsYXRlO1xuICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgY3JlYXRlX25ld19ub3RlX2Zyb21fdGVtcGxhdGUoZm9sZGVyPzogVEZvbGRlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmNyZWF0aW9uX2ZvbGRlciA9IGZvbGRlcjtcbiAgICAgICAgdGhpcy5vcGVuX21vZGUgPSBPcGVuTW9kZS5DcmVhdGVOb3RlVGVtcGxhdGU7XG4gICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY29uc3QgVU5TVVBQT1JURURfTU9CSUxFX1RFTVBMQVRFOiBzdHJpbmcgPSBcIkVycm9yX01vYmlsZVVuc3VwcG9ydGVkVGVtcGxhdGVcIjtcbmV4cG9ydCBjb25zdCBJQ09OX0RBVEE6IHN0cmluZyA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxLjEzMjggMjguN1wiPjxwYXRoIGQ9XCJNMCAxNS4xNCAwIDEwLjE1IDE4LjY3IDEuNTEgMTguNjcgNi4wMyA0LjcyIDEyLjMzIDQuNzIgMTIuNzYgMTguNjcgMTkuMjIgMTguNjcgMjMuNzQgMCAxNS4xNFpNMzMuNjkyOCAxLjg0QzMzLjY5MjggMS44NCAzMy45NzYxIDIuMTQ2NyAzNC41NDI4IDIuNzZDMzUuMTA5NCAzLjM4IDM1LjM5MjggNC41NiAzNS4zOTI4IDYuM0MzNS4zOTI4IDguMDQ2NiAzNC44MTk1IDkuNTQgMzMuNjcyOCAxMC43OEMzMi41MjYxIDEyLjAyIDMxLjA5OTUgMTIuNjQgMjkuMzkyOCAxMi42NEMyNy42ODYyIDEyLjY0IDI2LjI2NjEgMTIuMDI2NyAyNS4xMzI4IDEwLjhDMjMuOTkyOCA5LjU3MzMgMjMuNDIyOCA4LjA4NjcgMjMuNDIyOCA2LjM0QzIzLjQyMjggNC42IDIzLjk5OTUgMy4xMDY2IDI1LjE1MjggMS44NkMyNi4yOTk0LjYyIDI3LjcyNjEgMCAyOS40MzI4IDBDMzEuMTM5NSAwIDMyLjU1OTQuNjEzMyAzMy42OTI4IDEuODRNNDkuODIyOC42NyAyOS41MzI4IDI4LjM4IDI0LjQxMjggMjguMzggNDQuNzEyOC42NyA0OS44MjI4LjY3TTMxLjAzMjggOC4zOEMzMS4wMzI4IDguMzggMzEuMTM5NSA4LjI0NjcgMzEuMzUyOCA3Ljk4QzMxLjU2NjIgNy43MDY3IDMxLjY3MjggNy4xNzMzIDMxLjY3MjggNi4zOEMzMS42NzI4IDUuNTg2NyAzMS40NDYxIDQuOTIgMzAuOTkyOCA0LjM4QzMwLjU0NjEgMy44NCAyOS45OTk1IDMuNTcgMjkuMzUyOCAzLjU3QzI4LjcwNjEgMy41NyAyOC4xNjk1IDMuODQgMjcuNzQyOCA0LjM4QzI3LjMyMjggNC45MiAyNy4xMTI4IDUuNTg2NyAyNy4xMTI4IDYuMzhDMjcuMTEyOCA3LjE3MzMgMjcuMzM2MSA3Ljg0IDI3Ljc4MjggOC4zOEMyOC4yMzYxIDguOTI2NyAyOC43ODYxIDkuMiAyOS40MzI4IDkuMkMzMC4wNzk1IDkuMiAzMC42MTI4IDguOTI2NyAzMS4wMzI4IDguMzhNNDkuNDMyOCAxNy45QzQ5LjQzMjggMTcuOSA0OS43MTYxIDE4LjIwNjcgNTAuMjgyOCAxOC44MkM1MC44NDk1IDE5LjQzMzMgNTEuMTMyOCAyMC42MTMzIDUxLjEzMjggMjIuMzZDNTEuMTMyOCAyNC4xIDUwLjU1OTQgMjUuNTkgNDkuNDEyOCAyNi44M0M0OC4yNTk1IDI4LjA3NjYgNDYuODI5NSAyOC43IDQ1LjEyMjggMjguN0M0My40MjI4IDI4LjcgNDIuMDAyOCAyOC4wODMzIDQwLjg2MjggMjYuODVDMzkuNzI5NSAyNS42MjMzIDM5LjE2MjggMjQuMTM2NiAzOS4xNjI4IDIyLjM5QzM5LjE2MjggMjAuNjUgMzkuNzM2MSAxOS4xNiA0MC44ODI4IDE3LjkyQzQyLjAzNjEgMTYuNjczMyA0My40NjI4IDE2LjA1IDQ1LjE2MjggMTYuMDVDNDYuODY5NCAxNi4wNSA0OC4yOTI4IDE2LjY2NjcgNDkuNDMyOCAxNy45TTQ2Ljg1MjggMjQuNTJDNDYuODUyOCAyNC41MiA0Ni45NTk1IDI0LjM4MzMgNDcuMTcyOCAyNC4xMUM0Ny4zNzk1IDIzLjgzNjcgNDcuNDgyOCAyMy4zMDMzIDQ3LjQ4MjggMjIuNTFDNDcuNDgyOCAyMS43MTY3IDQ3LjI1OTUgMjEuMDUgNDYuODEyOCAyMC41MUM0Ni4zNjYxIDE5Ljk3IDQ1LjgxNjIgMTkuNyA0NS4xNjI4IDE5LjdDNDQuNTE2MSAxOS43IDQzLjk4MjggMTkuOTcgNDMuNTYyOCAyMC41MUM0My4xNDI4IDIxLjA1IDQyLjkzMjggMjEuNzE2NyA0Mi45MzI4IDIyLjUxQzQyLjkzMjggMjMuMzAzMyA0My4xNTYxIDIzLjk3MzMgNDMuNjAyOCAyNC41MkM0NC4wNDk0IDI1LjA2IDQ0LjU5NjEgMjUuMzMgNDUuMjQyOCAyNS4zM0M0NS44ODk1IDI1LjMzIDQ2LjQyNjEgMjUuMDYgNDYuODUyOCAyNC41MlpcIiBmaWxsPVwiY3VycmVudENvbG9yXCIvPjwvc3ZnPmA7IiwiaW1wb3J0IHsgQXBwLCBFZGl0b3JQb3NpdGlvbiwgRWRpdG9yUmFuZ2VPckNhcmV0LCBFZGl0b3JUcmFuc2FjdGlvbiwgTWFya2Rvd25WaWV3IH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBlc2NhcGVSZWdFeHAgfSBmcm9tIFwiVXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIEN1cnNvckp1bXBlciB7XG4gICAgcHJpdmF0ZSBjdXJzb3JfcmVnZXg6IFJlZ0V4cCA9IG5ldyBSZWdFeHAoXCI8JVxcXFxzKnRwLmZpbGUuY3Vyc29yXFxcXCgoPzxvcmRlcj5bMC05XXswLDJ9KVxcXFwpXFxcXHMqJT5cIiwgXCJnXCIpO1x0XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcDogQXBwKSB7fVxuXG4gICAgYXN5bmMganVtcF90b19uZXh0X2N1cnNvcl9sb2NhdGlvbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgYWN0aXZlX3ZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuICAgICAgICBpZiAoIWFjdGl2ZV92aWV3KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWN0aXZlX2ZpbGUgPSBhY3RpdmVfdmlldy5maWxlO1xuICAgICAgICBhd2FpdCBhY3RpdmVfdmlldy5zYXZlKCk7XG5cbiAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQoYWN0aXZlX2ZpbGUpO1xuXG4gICAgICAgIGNvbnN0IHtuZXdfY29udGVudCwgcG9zaXRpb25zfSA9IHRoaXMucmVwbGFjZV9hbmRfZ2V0X2N1cnNvcl9wb3NpdGlvbnMoY29udGVudCk7XG4gICAgICAgIGlmIChwb3NpdGlvbnMpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwLnZhdWx0Lm1vZGlmeShhY3RpdmVfZmlsZSwgbmV3X2NvbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy5zZXRfY3Vyc29yX2xvY2F0aW9uKHBvc2l0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRfZWRpdG9yX3Bvc2l0aW9uX2Zyb21faW5kZXgoY29udGVudDogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogRWRpdG9yUG9zaXRpb24ge1xuICAgICAgICBjb25zdCBzdWJzdHIgPSBjb250ZW50LnN1YnN0cigwLCBpbmRleCk7XG5cbiAgICAgICAgbGV0IGwgPSAwO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gLTE7XG4gICAgICAgIGxldCByID0gLTE7XG4gICAgICAgIGZvciAoOyAociA9IHN1YnN0ci5pbmRleE9mKFwiXFxuXCIsIHIrMSkpICE9PSAtMSA7IGwrKywgb2Zmc2V0PXIpO1xuICAgICAgICBvZmZzZXQgKz0gMTtcblxuICAgICAgICBjb25zdCBjaCA9IGNvbnRlbnQuc3Vic3RyKG9mZnNldCwgaW5kZXgtb2Zmc2V0KS5sZW5ndGg7XG5cbiAgICAgICAgcmV0dXJuIHtsaW5lOiBsLCBjaDogY2h9O1xuICAgIH1cblxuICAgIHJlcGxhY2VfYW5kX2dldF9jdXJzb3JfcG9zaXRpb25zKGNvbnRlbnQ6IHN0cmluZyk6IHtuZXdfY29udGVudD86IHN0cmluZywgcG9zaXRpb25zPzogRWRpdG9yUG9zaXRpb25bXX0ge1xuICAgICAgICBsZXQgY3Vyc29yX21hdGNoZXMgPSBbXTtcbiAgICAgICAgbGV0IG1hdGNoO1xuICAgICAgICB3aGlsZSgobWF0Y2ggPSB0aGlzLmN1cnNvcl9yZWdleC5leGVjKGNvbnRlbnQpKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjdXJzb3JfbWF0Y2hlcy5wdXNoKG1hdGNoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3Vyc29yX21hdGNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cblxuICAgICAgICBjdXJzb3JfbWF0Y2hlcy5zb3J0KChtMSwgbTIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIobTEuZ3JvdXBzW1wib3JkZXJcIl0pIC0gTnVtYmVyKG0yLmdyb3Vwc1tcIm9yZGVyXCJdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG1hdGNoX3N0ciA9IGN1cnNvcl9tYXRjaGVzWzBdWzBdO1xuXG4gICAgICAgIGN1cnNvcl9tYXRjaGVzID0gY3Vyc29yX21hdGNoZXMuZmlsdGVyKG0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG1bMF0gPT09IG1hdGNoX3N0cjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcG9zaXRpb25zID0gW107XG4gICAgICAgIGxldCBpbmRleF9vZmZzZXQgPSAwO1xuICAgICAgICBmb3IgKGxldCBtYXRjaCBvZiBjdXJzb3JfbWF0Y2hlcykge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBtYXRjaC5pbmRleCAtIGluZGV4X29mZnNldDtcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHRoaXMuZ2V0X2VkaXRvcl9wb3NpdGlvbl9mcm9tX2luZGV4KGNvbnRlbnQsIGluZGV4KSk7XG5cbiAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UobmV3IFJlZ0V4cChlc2NhcGVSZWdFeHAobWF0Y2hbMF0pKSwgXCJcIik7XG4gICAgICAgICAgICBpbmRleF9vZmZzZXQgKz0gbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICAvLyBGb3IgdHAuZmlsZS5jdXJzb3IoKSwgd2Uga2VlcCB0aGUgZGVmYXVsdCB0b3AgdG8gYm90dG9tXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0gPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7bmV3X2NvbnRlbnQ6IGNvbnRlbnQsIHBvc2l0aW9uczogcG9zaXRpb25zfTtcbiAgICB9XG5cbiAgICBzZXRfY3Vyc29yX2xvY2F0aW9uKHBvc2l0aW9uczogRWRpdG9yUG9zaXRpb25bXSk6IHZvaWQge1xuICAgICAgICBjb25zdCBhY3RpdmVfdmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG4gICAgICAgIGlmICghYWN0aXZlX3ZpZXcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVkaXRvciA9IGFjdGl2ZV92aWV3LmVkaXRvcjtcbiAgICAgICAgZWRpdG9yLmZvY3VzKCk7XG5cbiAgICAgICAgbGV0IHNlbGVjdGlvbnM6IEFycmF5PEVkaXRvclJhbmdlT3JDYXJldD4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgcG9zIG9mIHBvc2l0aW9ucykge1xuICAgICAgICAgICAgc2VsZWN0aW9ucy5wdXNoKHtmcm9tOiBwb3N9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0cmFuc2FjdGlvbjogRWRpdG9yVHJhbnNhY3Rpb24gPSB7XG4gICAgICAgICAgICBzZWxlY3Rpb25zOiBzZWxlY3Rpb25zXG4gICAgICAgIH07XG4gICAgICAgIGVkaXRvci50cmFuc2FjdGlvbih0cmFuc2FjdGlvbik7XG4gICAgfVxufSIsImltcG9ydCB7IGV4aXN0c1N5bmMsIHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5cbi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG52YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xuXG5mdW5jdGlvbiBzZXRQcm90b3R5cGVPZihvYmosIHByb3RvKSB7XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcclxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yob2JqLCBwcm90byk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBvYmouX19wcm90b19fID0gcHJvdG87XHJcbiAgICB9XHJcbn1cclxuLy8gVGhpcyBpcyBwcmV0dHkgbXVjaCB0aGUgb25seSB3YXkgdG8gZ2V0IG5pY2UsIGV4dGVuZGVkIEVycm9yc1xyXG4vLyB3aXRob3V0IHVzaW5nIEVTNlxyXG4vKipcclxuICogVGhpcyByZXR1cm5zIGEgbmV3IEVycm9yIHdpdGggYSBjdXN0b20gcHJvdG90eXBlLiBOb3RlIHRoYXQgaXQncyBfbm90XyBhIGNvbnN0cnVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSBtZXNzYWdlIEVycm9yIG1lc3NhZ2VcclxuICpcclxuICogKipFeGFtcGxlKipcclxuICpcclxuICogYGBganNcclxuICogdGhyb3cgRXRhRXJyKFwidGVtcGxhdGUgbm90IGZvdW5kXCIpXHJcbiAqIGBgYFxyXG4gKi9cclxuZnVuY3Rpb24gRXRhRXJyKG1lc3NhZ2UpIHtcclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICBzZXRQcm90b3R5cGVPZihlcnIsIEV0YUVyci5wcm90b3R5cGUpO1xyXG4gICAgcmV0dXJuIGVycjtcclxufVxyXG5FdGFFcnIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUsIHtcclxuICAgIG5hbWU6IHsgdmFsdWU6ICdFdGEgRXJyb3InLCBlbnVtZXJhYmxlOiBmYWxzZSB9XHJcbn0pO1xyXG4vKipcclxuICogVGhyb3dzIGFuIEV0YUVyciB3aXRoIGEgbmljZWx5IGZvcm1hdHRlZCBlcnJvciBhbmQgbWVzc2FnZSBzaG93aW5nIHdoZXJlIGluIHRoZSB0ZW1wbGF0ZSB0aGUgZXJyb3Igb2NjdXJyZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBQYXJzZUVycihtZXNzYWdlLCBzdHIsIGluZHgpIHtcclxuICAgIHZhciB3aGl0ZXNwYWNlID0gc3RyLnNsaWNlKDAsIGluZHgpLnNwbGl0KC9cXG4vKTtcclxuICAgIHZhciBsaW5lTm8gPSB3aGl0ZXNwYWNlLmxlbmd0aDtcclxuICAgIHZhciBjb2xObyA9IHdoaXRlc3BhY2VbbGluZU5vIC0gMV0ubGVuZ3RoICsgMTtcclxuICAgIG1lc3NhZ2UgKz1cclxuICAgICAgICAnIGF0IGxpbmUgJyArXHJcbiAgICAgICAgICAgIGxpbmVObyArXHJcbiAgICAgICAgICAgICcgY29sICcgK1xyXG4gICAgICAgICAgICBjb2xObyArXHJcbiAgICAgICAgICAgICc6XFxuXFxuJyArXHJcbiAgICAgICAgICAgICcgICcgK1xyXG4gICAgICAgICAgICBzdHIuc3BsaXQoL1xcbi8pW2xpbmVObyAtIDFdICtcclxuICAgICAgICAgICAgJ1xcbicgK1xyXG4gICAgICAgICAgICAnICAnICtcclxuICAgICAgICAgICAgQXJyYXkoY29sTm8pLmpvaW4oJyAnKSArXHJcbiAgICAgICAgICAgICdeJztcclxuICAgIHRocm93IEV0YUVycihtZXNzYWdlKTtcclxufVxuXG4vKipcclxuICogQHJldHVybnMgVGhlIGdsb2JhbCBQcm9taXNlIGZ1bmN0aW9uXHJcbiAqL1xyXG52YXIgcHJvbWlzZUltcGwgPSBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKS5Qcm9taXNlO1xyXG4vKipcclxuICogQHJldHVybnMgQSBuZXcgQXN5bmNGdW5jdGlvbiBjb25zdHVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRBc3luY0Z1bmN0aW9uQ29uc3RydWN0b3IoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oJ3JldHVybiAoYXN5bmMgZnVuY3Rpb24oKXt9KS5jb25zdHJ1Y3RvcicpKCk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgU3ludGF4RXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXRhRXJyKFwiVGhpcyBlbnZpcm9ubWVudCBkb2Vzbid0IHN1cHBvcnQgYXN5bmMvYXdhaXRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4vKipcclxuICogc3RyLnRyaW1MZWZ0IHBvbHlmaWxsXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHIgLSBJbnB1dCBzdHJpbmdcclxuICogQHJldHVybnMgVGhlIHN0cmluZyB3aXRoIGxlZnQgd2hpdGVzcGFjZSByZW1vdmVkXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiB0cmltTGVmdChzdHIpIHtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRyYS1ib29sZWFuLWNhc3RcclxuICAgIGlmICghIVN0cmluZy5wcm90b3R5cGUudHJpbUxlZnQpIHtcclxuICAgICAgICByZXR1cm4gc3RyLnRyaW1MZWZ0KCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrLywgJycpO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBzdHIudHJpbVJpZ2h0IHBvbHlmaWxsXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHIgLSBJbnB1dCBzdHJpbmdcclxuICogQHJldHVybnMgVGhlIHN0cmluZyB3aXRoIHJpZ2h0IHdoaXRlc3BhY2UgcmVtb3ZlZFxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gdHJpbVJpZ2h0KHN0cikge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV4dHJhLWJvb2xlYW4tY2FzdFxyXG4gICAgaWYgKCEhU3RyaW5nLnByb3RvdHlwZS50cmltUmlnaHQpIHtcclxuICAgICAgICByZXR1cm4gc3RyLnRyaW1SaWdodCgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHMrJC8sICcnKTsgLy8gVE9ETzogZG8gd2UgcmVhbGx5IG5lZWQgdG8gcmVwbGFjZSBCT00ncz9cclxuICAgIH1cclxufVxuXG4vLyBUT0RPOiBhbGxvdyAnLScgdG8gdHJpbSB1cCB1bnRpbCBuZXdsaW5lLiBVc2UgW15cXFNcXG5cXHJdIGluc3RlYWQgb2YgXFxzXHJcbi8qIEVORCBUWVBFUyAqL1xyXG5mdW5jdGlvbiBoYXNPd25Qcm9wKG9iaiwgcHJvcCkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xyXG59XHJcbmZ1bmN0aW9uIGNvcHlQcm9wcyh0b09iaiwgZnJvbU9iaikge1xyXG4gICAgZm9yICh2YXIga2V5IGluIGZyb21PYmopIHtcclxuICAgICAgICBpZiAoaGFzT3duUHJvcChmcm9tT2JqLCBrZXkpKSB7XHJcbiAgICAgICAgICAgIHRvT2JqW2tleV0gPSBmcm9tT2JqW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvT2JqO1xyXG59XHJcbi8qKlxyXG4gKiBUYWtlcyBhIHN0cmluZyB3aXRoaW4gYSB0ZW1wbGF0ZSBhbmQgdHJpbXMgaXQsIGJhc2VkIG9uIHRoZSBwcmVjZWRpbmcgdGFnJ3Mgd2hpdGVzcGFjZSBjb250cm9sIGFuZCBgY29uZmlnLmF1dG9UcmltYFxyXG4gKi9cclxuZnVuY3Rpb24gdHJpbVdTKHN0ciwgY29uZmlnLCB3c0xlZnQsIHdzUmlnaHQpIHtcclxuICAgIHZhciBsZWZ0VHJpbTtcclxuICAgIHZhciByaWdodFRyaW07XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcuYXV0b1RyaW0pKSB7XHJcbiAgICAgICAgLy8ga2luZGEgY29uZnVzaW5nXHJcbiAgICAgICAgLy8gYnV0IF99fSB3aWxsIHRyaW0gdGhlIGxlZnQgc2lkZSBvZiB0aGUgZm9sbG93aW5nIHN0cmluZ1xyXG4gICAgICAgIGxlZnRUcmltID0gY29uZmlnLmF1dG9UcmltWzFdO1xyXG4gICAgICAgIHJpZ2h0VHJpbSA9IGNvbmZpZy5hdXRvVHJpbVswXTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGxlZnRUcmltID0gcmlnaHRUcmltID0gY29uZmlnLmF1dG9UcmltO1xyXG4gICAgfVxyXG4gICAgaWYgKHdzTGVmdCB8fCB3c0xlZnQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgbGVmdFRyaW0gPSB3c0xlZnQ7XHJcbiAgICB9XHJcbiAgICBpZiAod3NSaWdodCB8fCB3c1JpZ2h0ID09PSBmYWxzZSkge1xyXG4gICAgICAgIHJpZ2h0VHJpbSA9IHdzUmlnaHQ7XHJcbiAgICB9XHJcbiAgICBpZiAoIXJpZ2h0VHJpbSAmJiAhbGVmdFRyaW0pIHtcclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG4gICAgaWYgKGxlZnRUcmltID09PSAnc2x1cnAnICYmIHJpZ2h0VHJpbSA9PT0gJ3NsdXJwJykge1xyXG4gICAgICAgIHJldHVybiBzdHIudHJpbSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGxlZnRUcmltID09PSAnXycgfHwgbGVmdFRyaW0gPT09ICdzbHVycCcpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygndHJpbW1pbmcgbGVmdCcgKyBsZWZ0VHJpbSlcclxuICAgICAgICAvLyBmdWxsIHNsdXJwXHJcbiAgICAgICAgc3RyID0gdHJpbUxlZnQoc3RyKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGxlZnRUcmltID09PSAnLScgfHwgbGVmdFRyaW0gPT09ICdubCcpIHtcclxuICAgICAgICAvLyBubCB0cmltXHJcbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoL14oPzpcXHJcXG58XFxufFxccikvLCAnJyk7XHJcbiAgICB9XHJcbiAgICBpZiAocmlnaHRUcmltID09PSAnXycgfHwgcmlnaHRUcmltID09PSAnc2x1cnAnKSB7XHJcbiAgICAgICAgLy8gZnVsbCBzbHVycFxyXG4gICAgICAgIHN0ciA9IHRyaW1SaWdodChzdHIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocmlnaHRUcmltID09PSAnLScgfHwgcmlnaHRUcmltID09PSAnbmwnKSB7XHJcbiAgICAgICAgLy8gbmwgdHJpbVxyXG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8oPzpcXHJcXG58XFxufFxccikkLywgJycpOyAvLyBUT0RPOiBtYWtlIHN1cmUgdGhpcyBnZXRzIFxcclxcblxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0cjtcclxufVxyXG4vKipcclxuICogQSBtYXAgb2Ygc3BlY2lhbCBIVE1MIGNoYXJhY3RlcnMgdG8gdGhlaXIgWE1MLWVzY2FwZWQgZXF1aXZhbGVudHNcclxuICovXHJcbnZhciBlc2NNYXAgPSB7XHJcbiAgICAnJic6ICcmYW1wOycsXHJcbiAgICAnPCc6ICcmbHQ7JyxcclxuICAgICc+JzogJyZndDsnLFxyXG4gICAgJ1wiJzogJyZxdW90OycsXHJcbiAgICBcIidcIjogJyYjMzk7J1xyXG59O1xyXG5mdW5jdGlvbiByZXBsYWNlQ2hhcihzKSB7XHJcbiAgICByZXR1cm4gZXNjTWFwW3NdO1xyXG59XHJcbi8qKlxyXG4gKiBYTUwtZXNjYXBlcyBhbiBpbnB1dCB2YWx1ZSBhZnRlciBjb252ZXJ0aW5nIGl0IHRvIGEgc3RyaW5nXHJcbiAqXHJcbiAqIEBwYXJhbSBzdHIgLSBJbnB1dCB2YWx1ZSAodXN1YWxseSBhIHN0cmluZylcclxuICogQHJldHVybnMgWE1MLWVzY2FwZWQgc3RyaW5nXHJcbiAqL1xyXG5mdW5jdGlvbiBYTUxFc2NhcGUoc3RyKSB7XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIC8vIFRvIGRlYWwgd2l0aCBYU1MuIEJhc2VkIG9uIEVzY2FwZSBpbXBsZW1lbnRhdGlvbnMgb2YgTXVzdGFjaGUuSlMgYW5kIE1hcmtvLCB0aGVuIGN1c3RvbWl6ZWQuXHJcbiAgICB2YXIgbmV3U3RyID0gU3RyaW5nKHN0cik7XHJcbiAgICBpZiAoL1smPD5cIiddLy50ZXN0KG5ld1N0cikpIHtcclxuICAgICAgICByZXR1cm4gbmV3U3RyLnJlcGxhY2UoL1smPD5cIiddL2csIHJlcGxhY2VDaGFyKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBuZXdTdHI7XHJcbiAgICB9XHJcbn1cblxuLyogRU5EIFRZUEVTICovXHJcbnZhciB0ZW1wbGF0ZUxpdFJlZyA9IC9gKD86XFxcXFtcXHNcXFNdfFxcJHsoPzpbXnt9XXx7KD86W157fV18e1tefV0qfSkqfSkqfXwoPyFcXCR7KVteXFxcXGBdKSpgL2c7XHJcbnZhciBzaW5nbGVRdW90ZVJlZyA9IC8nKD86XFxcXFtcXHNcXHdcIidcXFxcYF18W15cXG5cXHInXFxcXF0pKj8nL2c7XHJcbnZhciBkb3VibGVRdW90ZVJlZyA9IC9cIig/OlxcXFxbXFxzXFx3XCInXFxcXGBdfFteXFxuXFxyXCJcXFxcXSkqP1wiL2c7XHJcbi8qKiBFc2NhcGUgc3BlY2lhbCByZWd1bGFyIGV4cHJlc3Npb24gY2hhcmFjdGVycyBpbnNpZGUgYSBzdHJpbmcgKi9cclxuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xyXG4gICAgLy8gRnJvbSBNRE5cclxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvWy4qK1xcLT9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTsgLy8gJCYgbWVhbnMgdGhlIHdob2xlIG1hdGNoZWQgc3RyaW5nXHJcbn1cclxuZnVuY3Rpb24gcGFyc2Uoc3RyLCBjb25maWcpIHtcclxuICAgIHZhciBidWZmZXIgPSBbXTtcclxuICAgIHZhciB0cmltTGVmdE9mTmV4dFN0ciA9IGZhbHNlO1xyXG4gICAgdmFyIGxhc3RJbmRleCA9IDA7XHJcbiAgICB2YXIgcGFyc2VPcHRpb25zID0gY29uZmlnLnBhcnNlO1xyXG4gICAgaWYgKGNvbmZpZy5wbHVnaW5zKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb25maWcucGx1Z2lucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcGx1Z2luID0gY29uZmlnLnBsdWdpbnNbaV07XHJcbiAgICAgICAgICAgIGlmIChwbHVnaW4ucHJvY2Vzc1RlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBzdHIgPSBwbHVnaW4ucHJvY2Vzc1RlbXBsYXRlKHN0ciwgY29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qIEFkZGluZyBmb3IgRUpTIGNvbXBhdGliaWxpdHkgKi9cclxuICAgIGlmIChjb25maWcucm1XaGl0ZXNwYWNlKSB7XHJcbiAgICAgICAgLy8gQ29kZSB0YWtlbiBkaXJlY3RseSBmcm9tIEVKU1xyXG4gICAgICAgIC8vIEhhdmUgdG8gdXNlIHR3byBzZXBhcmF0ZSByZXBsYWNlcyBoZXJlIGFzIGBeYCBhbmQgYCRgIG9wZXJhdG9ycyBkb24ndFxyXG4gICAgICAgIC8vIHdvcmsgd2VsbCB3aXRoIGBcXHJgIGFuZCBlbXB0eSBsaW5lcyBkb24ndCB3b3JrIHdlbGwgd2l0aCB0aGUgYG1gIGZsYWcuXHJcbiAgICAgICAgLy8gRXNzZW50aWFsbHksIHRoaXMgcmVwbGFjZXMgdGhlIHdoaXRlc3BhY2UgYXQgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mXHJcbiAgICAgICAgLy8gZWFjaCBsaW5lIGFuZCByZW1vdmVzIG11bHRpcGxlIG5ld2xpbmVzLlxyXG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9bXFxyXFxuXSsvZywgJ1xcbicpLnJlcGxhY2UoL15cXHMrfFxccyskL2dtLCAnJyk7XHJcbiAgICB9XHJcbiAgICAvKiBFbmQgcm1XaGl0ZXNwYWNlIG9wdGlvbiAqL1xyXG4gICAgdGVtcGxhdGVMaXRSZWcubGFzdEluZGV4ID0gMDtcclxuICAgIHNpbmdsZVF1b3RlUmVnLmxhc3RJbmRleCA9IDA7XHJcbiAgICBkb3VibGVRdW90ZVJlZy5sYXN0SW5kZXggPSAwO1xyXG4gICAgZnVuY3Rpb24gcHVzaFN0cmluZyhzdHJuZywgc2hvdWxkVHJpbVJpZ2h0T2ZTdHJpbmcpIHtcclxuICAgICAgICBpZiAoc3RybmcpIHtcclxuICAgICAgICAgICAgLy8gaWYgc3RyaW5nIGlzIHRydXRoeSBpdCBtdXN0IGJlIG9mIHR5cGUgJ3N0cmluZydcclxuICAgICAgICAgICAgc3RybmcgPSB0cmltV1Moc3RybmcsIGNvbmZpZywgdHJpbUxlZnRPZk5leHRTdHIsIC8vIHRoaXMgd2lsbCBvbmx5IGJlIGZhbHNlIG9uIHRoZSBmaXJzdCBzdHIsIHRoZSBuZXh0IG9uZXMgd2lsbCBiZSBudWxsIG9yIHVuZGVmaW5lZFxyXG4gICAgICAgICAgICBzaG91bGRUcmltUmlnaHRPZlN0cmluZyk7XHJcbiAgICAgICAgICAgIGlmIChzdHJuZykge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVwbGFjZSBcXCB3aXRoIFxcXFwsICcgd2l0aCBcXCdcclxuICAgICAgICAgICAgICAgIC8vIHdlJ3JlIGdvaW5nIHRvIGNvbnZlcnQgYWxsIENSTEYgdG8gTEYgc28gaXQgZG9lc24ndCB0YWtlIG1vcmUgdGhhbiBvbmUgcmVwbGFjZVxyXG4gICAgICAgICAgICAgICAgc3RybmcgPSBzdHJuZy5yZXBsYWNlKC9cXFxcfCcvZywgJ1xcXFwkJicpLnJlcGxhY2UoL1xcclxcbnxcXG58XFxyL2csICdcXFxcbicpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2goc3RybmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIHByZWZpeGVzID0gW3BhcnNlT3B0aW9ucy5leGVjLCBwYXJzZU9wdGlvbnMuaW50ZXJwb2xhdGUsIHBhcnNlT3B0aW9ucy5yYXddLnJlZHVjZShmdW5jdGlvbiAoYWNjdW11bGF0b3IsIHByZWZpeCkge1xyXG4gICAgICAgIGlmIChhY2N1bXVsYXRvciAmJiBwcmVmaXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yICsgJ3wnICsgZXNjYXBlUmVnRXhwKHByZWZpeCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHByZWZpeCkge1xyXG4gICAgICAgICAgICAvLyBhY2N1bXVsYXRvciBpcyBmYWxzeVxyXG4gICAgICAgICAgICByZXR1cm4gZXNjYXBlUmVnRXhwKHByZWZpeCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBwcmVmaXggYW5kIGFjY3VtdWxhdG9yIGFyZSBib3RoIGZhbHN5XHJcbiAgICAgICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcclxuICAgICAgICB9XHJcbiAgICB9LCAnJyk7XHJcbiAgICB2YXIgcGFyc2VPcGVuUmVnID0gbmV3IFJlZ0V4cCgnKFteXSo/KScgKyBlc2NhcGVSZWdFeHAoY29uZmlnLnRhZ3NbMF0pICsgJygtfF8pP1xcXFxzKignICsgcHJlZml4ZXMgKyAnKT9cXFxccyooPyFbXFxcXHMrXFxcXC1fJyArIHByZWZpeGVzICsgJ10pJywgJ2cnKTtcclxuICAgIHZhciBwYXJzZUNsb3NlUmVnID0gbmV3IFJlZ0V4cCgnXFwnfFwifGB8XFxcXC9cXFxcKnwoXFxcXHMqKC18Xyk/JyArIGVzY2FwZVJlZ0V4cChjb25maWcudGFnc1sxXSkgKyAnKScsICdnJyk7XHJcbiAgICAvLyBUT0RPOiBiZW5jaG1hcmsgaGF2aW5nIHRoZSBcXHMqIG9uIGVpdGhlciBzaWRlIHZzIHVzaW5nIHN0ci50cmltKClcclxuICAgIHZhciBtO1xyXG4gICAgd2hpbGUgKChtID0gcGFyc2VPcGVuUmVnLmV4ZWMoc3RyKSkpIHtcclxuICAgICAgICBsYXN0SW5kZXggPSBtWzBdLmxlbmd0aCArIG0uaW5kZXg7XHJcbiAgICAgICAgdmFyIHByZWNlZGluZ1N0cmluZyA9IG1bMV07XHJcbiAgICAgICAgdmFyIHdzTGVmdCA9IG1bMl07XHJcbiAgICAgICAgdmFyIHByZWZpeCA9IG1bM10gfHwgJyc7IC8vIGJ5IGRlZmF1bHQgZWl0aGVyIH4sID0sIG9yIGVtcHR5XHJcbiAgICAgICAgcHVzaFN0cmluZyhwcmVjZWRpbmdTdHJpbmcsIHdzTGVmdCk7XHJcbiAgICAgICAgcGFyc2VDbG9zZVJlZy5sYXN0SW5kZXggPSBsYXN0SW5kZXg7XHJcbiAgICAgICAgdmFyIGNsb3NlVGFnID0gdm9pZCAwO1xyXG4gICAgICAgIHZhciBjdXJyZW50T2JqID0gZmFsc2U7XHJcbiAgICAgICAgd2hpbGUgKChjbG9zZVRhZyA9IHBhcnNlQ2xvc2VSZWcuZXhlYyhzdHIpKSkge1xyXG4gICAgICAgICAgICBpZiAoY2xvc2VUYWdbMV0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gc3RyLnNsaWNlKGxhc3RJbmRleCwgY2xvc2VUYWcuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgcGFyc2VPcGVuUmVnLmxhc3RJbmRleCA9IGxhc3RJbmRleCA9IHBhcnNlQ2xvc2VSZWcubGFzdEluZGV4O1xyXG4gICAgICAgICAgICAgICAgdHJpbUxlZnRPZk5leHRTdHIgPSBjbG9zZVRhZ1syXTtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50VHlwZSA9IHByZWZpeCA9PT0gcGFyc2VPcHRpb25zLmV4ZWNcclxuICAgICAgICAgICAgICAgICAgICA/ICdlJ1xyXG4gICAgICAgICAgICAgICAgICAgIDogcHJlZml4ID09PSBwYXJzZU9wdGlvbnMucmF3XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ3InXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcHJlZml4ID09PSBwYXJzZU9wdGlvbnMuaW50ZXJwb2xhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2knXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudE9iaiA9IHsgdDogY3VycmVudFR5cGUsIHZhbDogY29udGVudCB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hhciA9IGNsb3NlVGFnWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXIgPT09ICcvKicpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29tbWVudENsb3NlSW5kID0gc3RyLmluZGV4T2YoJyovJywgcGFyc2VDbG9zZVJlZy5sYXN0SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21tZW50Q2xvc2VJbmQgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhcnNlRXJyKCd1bmNsb3NlZCBjb21tZW50Jywgc3RyLCBjbG9zZVRhZy5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlQ2xvc2VSZWcubGFzdEluZGV4ID0gY29tbWVudENsb3NlSW5kO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hhciA9PT0gXCInXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVRdW90ZVJlZy5sYXN0SW5kZXggPSBjbG9zZVRhZy5pbmRleDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2luZ2xlUXVvdGVNYXRjaCA9IHNpbmdsZVF1b3RlUmVnLmV4ZWMoc3RyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2luZ2xlUXVvdGVNYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUNsb3NlUmVnLmxhc3RJbmRleCA9IHNpbmdsZVF1b3RlUmVnLmxhc3RJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhcnNlRXJyKCd1bmNsb3NlZCBzdHJpbmcnLCBzdHIsIGNsb3NlVGFnLmluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGFyID09PSAnXCInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG91YmxlUXVvdGVSZWcubGFzdEluZGV4ID0gY2xvc2VUYWcuaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvdWJsZVF1b3RlTWF0Y2ggPSBkb3VibGVRdW90ZVJlZy5leGVjKHN0cik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvdWJsZVF1b3RlTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VDbG9zZVJlZy5sYXN0SW5kZXggPSBkb3VibGVRdW90ZVJlZy5sYXN0SW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQYXJzZUVycigndW5jbG9zZWQgc3RyaW5nJywgc3RyLCBjbG9zZVRhZy5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hhciA9PT0gJ2AnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVMaXRSZWcubGFzdEluZGV4ID0gY2xvc2VUYWcuaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlTGl0TWF0Y2ggPSB0ZW1wbGF0ZUxpdFJlZy5leGVjKHN0cik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBsYXRlTGl0TWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VDbG9zZVJlZy5sYXN0SW5kZXggPSB0ZW1wbGF0ZUxpdFJlZy5sYXN0SW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQYXJzZUVycigndW5jbG9zZWQgc3RyaW5nJywgc3RyLCBjbG9zZVRhZy5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjdXJyZW50T2JqKSB7XHJcbiAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGN1cnJlbnRPYmopO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgUGFyc2VFcnIoJ3VuY2xvc2VkIHRhZycsIHN0ciwgbS5pbmRleCArIHByZWNlZGluZ1N0cmluZy5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1c2hTdHJpbmcoc3RyLnNsaWNlKGxhc3RJbmRleCwgc3RyLmxlbmd0aCksIGZhbHNlKTtcclxuICAgIGlmIChjb25maWcucGx1Z2lucykge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29uZmlnLnBsdWdpbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHBsdWdpbiA9IGNvbmZpZy5wbHVnaW5zW2ldO1xyXG4gICAgICAgICAgICBpZiAocGx1Z2luLnByb2Nlc3NBU1QpIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IHBsdWdpbi5wcm9jZXNzQVNUKGJ1ZmZlciwgY29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBidWZmZXI7XHJcbn1cblxuLyogRU5EIFRZUEVTICovXHJcbi8qKlxyXG4gKiBDb21waWxlcyBhIHRlbXBsYXRlIHN0cmluZyB0byBhIGZ1bmN0aW9uIHN0cmluZy4gTW9zdCBvZnRlbiB1c2VycyBqdXN0IHVzZSBgY29tcGlsZSgpYCwgd2hpY2ggY2FsbHMgYGNvbXBpbGVUb1N0cmluZ2AgYW5kIGNyZWF0ZXMgYSBuZXcgZnVuY3Rpb24gdXNpbmcgdGhlIHJlc3VsdFxyXG4gKlxyXG4gKiAqKkV4YW1wbGUqKlxyXG4gKlxyXG4gKiBgYGBqc1xyXG4gKiBjb21waWxlVG9TdHJpbmcoXCJIaSA8JT0gaXQudXNlciAlPlwiLCBldGEuY29uZmlnKVxyXG4gKiAvLyBcInZhciB0Uj0nJyxpbmNsdWRlPUUuaW5jbHVkZS5iaW5kKEUpLGluY2x1ZGVGaWxlPUUuaW5jbHVkZUZpbGUuYmluZChFKTt0Uis9J0hpICc7dFIrPUUuZShpdC51c2VyKTtpZihjYil7Y2IobnVsbCx0Uil9IHJldHVybiB0UlwiXHJcbiAqIGBgYFxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGlsZVRvU3RyaW5nKHN0ciwgY29uZmlnKSB7XHJcbiAgICB2YXIgYnVmZmVyID0gcGFyc2Uoc3RyLCBjb25maWcpO1xyXG4gICAgdmFyIHJlcyA9IFwidmFyIHRSPScnLF9fbCxfX2xQXCIgK1xyXG4gICAgICAgIChjb25maWcuaW5jbHVkZSA/ICcsaW5jbHVkZT1FLmluY2x1ZGUuYmluZChFKScgOiAnJykgK1xyXG4gICAgICAgIChjb25maWcuaW5jbHVkZUZpbGUgPyAnLGluY2x1ZGVGaWxlPUUuaW5jbHVkZUZpbGUuYmluZChFKScgOiAnJykgK1xyXG4gICAgICAgICdcXG5mdW5jdGlvbiBsYXlvdXQocCxkKXtfX2w9cDtfX2xQPWR9XFxuJyArXHJcbiAgICAgICAgKGNvbmZpZy5nbG9iYWxBd2FpdCA/ICdjb25zdCBfcHJzID0gW107XFxuJyA6ICcnKSArXHJcbiAgICAgICAgKGNvbmZpZy51c2VXaXRoID8gJ3dpdGgoJyArIGNvbmZpZy52YXJOYW1lICsgJ3x8e30peycgOiAnJykgK1xyXG4gICAgICAgIGNvbXBpbGVTY29wZShidWZmZXIsIGNvbmZpZykgK1xyXG4gICAgICAgIChjb25maWcuaW5jbHVkZUZpbGVcclxuICAgICAgICAgICAgPyAnaWYoX19sKXRSPScgK1xyXG4gICAgICAgICAgICAgICAgKGNvbmZpZy5hc3luYyA/ICdhd2FpdCAnIDogJycpICtcclxuICAgICAgICAgICAgICAgIChcImluY2x1ZGVGaWxlKF9fbCxPYmplY3QuYXNzaWduKFwiICsgY29uZmlnLnZhck5hbWUgKyBcIix7Ym9keTp0Un0sX19sUCkpXFxuXCIpXHJcbiAgICAgICAgICAgIDogY29uZmlnLmluY2x1ZGVcclxuICAgICAgICAgICAgICAgID8gJ2lmKF9fbCl0Uj0nICtcclxuICAgICAgICAgICAgICAgICAgICAoY29uZmlnLmFzeW5jID8gJ2F3YWl0ICcgOiAnJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIChcImluY2x1ZGUoX19sLE9iamVjdC5hc3NpZ24oXCIgKyBjb25maWcudmFyTmFtZSArIFwiLHtib2R5OnRSfSxfX2xQKSlcXG5cIilcclxuICAgICAgICAgICAgICAgIDogJycpICtcclxuICAgICAgICAnaWYoY2Ipe2NiKG51bGwsdFIpfSByZXR1cm4gdFInICtcclxuICAgICAgICAoY29uZmlnLnVzZVdpdGggPyAnfScgOiAnJyk7XHJcbiAgICBpZiAoY29uZmlnLnBsdWdpbnMpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbmZpZy5wbHVnaW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBwbHVnaW4gPSBjb25maWcucGx1Z2luc1tpXTtcclxuICAgICAgICAgICAgaWYgKHBsdWdpbi5wcm9jZXNzRm5TdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJlcyA9IHBsdWdpbi5wcm9jZXNzRm5TdHJpbmcocmVzLCBjb25maWcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcztcclxufVxyXG4vKipcclxuICogTG9vcHMgdGhyb3VnaCB0aGUgQVNUIGdlbmVyYXRlZCBieSBgcGFyc2VgIGFuZCB0cmFuc2Zvcm0gZWFjaCBpdGVtIGludG8gSlMgY2FsbHNcclxuICpcclxuICogKipFeGFtcGxlKipcclxuICpcclxuICogYGBganNcclxuICogLy8gQVNUIHZlcnNpb24gb2YgJ0hpIDwlPSBpdC51c2VyICU+J1xyXG4gKiBsZXQgdGVtcGxhdGVBU1QgPSBbJ0hpICcsIHsgdmFsOiAnaXQudXNlcicsIHQ6ICdpJyB9XVxyXG4gKiBjb21waWxlU2NvcGUodGVtcGxhdGVBU1QsIGV0YS5jb25maWcpXHJcbiAqIC8vIFwidFIrPSdIaSAnO3RSKz1FLmUoaXQudXNlcik7XCJcclxuICogYGBgXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21waWxlU2NvcGUoYnVmZiwgY29uZmlnKSB7XHJcbiAgICB2YXIgaTtcclxuICAgIHZhciBidWZmTGVuZ3RoID0gYnVmZi5sZW5ndGg7XHJcbiAgICB2YXIgcmV0dXJuU3RyID0gJyc7XHJcbiAgICB2YXIgUkVQTEFDRU1FTlRfU1RSID0gXCJySjJLcVh6eFFnXCI7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgYnVmZkxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRCbG9jayA9IGJ1ZmZbaV07XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjdXJyZW50QmxvY2sgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHZhciBzdHIgPSBjdXJyZW50QmxvY2s7XHJcbiAgICAgICAgICAgIC8vIHdlIGtub3cgc3RyaW5nIGV4aXN0c1xyXG4gICAgICAgICAgICByZXR1cm5TdHIgKz0gXCJ0Uis9J1wiICsgc3RyICsgXCInXFxuXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IGN1cnJlbnRCbG9jay50OyAvLyB+LCBzLCAhLCA/LCByXHJcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gY3VycmVudEJsb2NrLnZhbCB8fCAnJztcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdyJykge1xyXG4gICAgICAgICAgICAgICAgLy8gcmF3XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmdsb2JhbEF3YWl0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuU3RyICs9IFwiX3Bycy5wdXNoKFwiICsgY29udGVudCArIFwiKTtcXG5cIjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5TdHIgKz0gXCJ0Uis9J1wiICsgUkVQTEFDRU1FTlRfU1RSICsgXCInXFxuXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gJ0UuZmlsdGVyKCcgKyBjb250ZW50ICsgJyknO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5TdHIgKz0gJ3RSKz0nICsgY29udGVudCArICdcXG4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdpJykge1xyXG4gICAgICAgICAgICAgICAgLy8gaW50ZXJwb2xhdGVcclxuICAgICAgICAgICAgICAgIGlmIChjb25maWcuZ2xvYmFsQXdhaXQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5TdHIgKz0gXCJfcHJzLnB1c2goXCIgKyBjb250ZW50ICsgXCIpO1xcblwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblN0ciArPSBcInRSKz0nXCIgKyBSRVBMQUNFTUVOVF9TVFIgKyBcIidcXG5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuZmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSAnRS5maWx0ZXIoJyArIGNvbnRlbnQgKyAnKSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblN0ciArPSAndFIrPScgKyBjb250ZW50ICsgJ1xcbic7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5hdXRvRXNjYXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSAnRS5lKCcgKyBjb250ZW50ICsgJyknO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5TdHIgKz0gJ3RSKz0nICsgY29udGVudCArICdcXG4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdlJykge1xyXG4gICAgICAgICAgICAgICAgLy8gZXhlY3V0ZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuU3RyICs9IGNvbnRlbnQgKyAnXFxuJzsgLy8geW91IG5lZWQgYSBcXG4gaW4gY2FzZSB5b3UgaGF2ZSA8JSB9ICU+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY29uZmlnLmdsb2JhbEF3YWl0KSB7XHJcbiAgICAgICAgcmV0dXJuU3RyICs9IFwiY29uc3QgX3JzdCA9IGF3YWl0IFByb21pc2UuYWxsKF9wcnMpO1xcbnRSID0gdFIucmVwbGFjZSgvXCIgKyBSRVBMQUNFTUVOVF9TVFIgKyBcIi9nLCAoKSA9PiBfcnN0LnNoaWZ0KCkpO1xcblwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldHVyblN0cjtcclxufVxuXG4vKipcclxuICogSGFuZGxlcyBzdG9yYWdlIGFuZCBhY2Nlc3Npbmcgb2YgdmFsdWVzXHJcbiAqXHJcbiAqIEluIHRoaXMgY2FzZSwgd2UgdXNlIGl0IHRvIHN0b3JlIGNvbXBpbGVkIHRlbXBsYXRlIGZ1bmN0aW9uc1xyXG4gKiBJbmRleGVkIGJ5IHRoZWlyIGBuYW1lYCBvciBgZmlsZW5hbWVgXHJcbiAqL1xyXG52YXIgQ2FjaGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQ2FjaGVyKGNhY2hlKSB7XHJcbiAgICAgICAgdGhpcy5jYWNoZSA9IGNhY2hlO1xyXG4gICAgfVxyXG4gICAgQ2FjaGVyLnByb3RvdHlwZS5kZWZpbmUgPSBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcclxuICAgICAgICB0aGlzLmNhY2hlW2tleV0gPSB2YWw7XHJcbiAgICB9O1xyXG4gICAgQ2FjaGVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgLy8gc3RyaW5nIHwgYXJyYXkuXHJcbiAgICAgICAgLy8gVE9ETzogYWxsb3cgYXJyYXkgb2Yga2V5cyB0byBsb29rIGRvd25cclxuICAgICAgICAvLyBUT0RPOiBjcmVhdGUgcGx1Z2luIHRvIGFsbG93IHJlZmVyZW5jaW5nIGhlbHBlcnMsIGZpbHRlcnMgd2l0aCBkb3Qgbm90YXRpb25cclxuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZVtrZXldO1xyXG4gICAgfTtcclxuICAgIENhY2hlci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlW2tleV07XHJcbiAgICB9O1xyXG4gICAgQ2FjaGVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNhY2hlID0ge307XHJcbiAgICB9O1xyXG4gICAgQ2FjaGVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKGNhY2hlT2JqKSB7XHJcbiAgICAgICAgY29weVByb3BzKHRoaXMuY2FjaGUsIGNhY2hlT2JqKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ2FjaGVyO1xyXG59KCkpO1xuXG4vKiBFTkQgVFlQRVMgKi9cclxuLyoqXHJcbiAqIEV0YSdzIHRlbXBsYXRlIHN0b3JhZ2VcclxuICpcclxuICogU3RvcmVzIHBhcnRpYWxzIGFuZCBjYWNoZWQgdGVtcGxhdGVzXHJcbiAqL1xyXG52YXIgdGVtcGxhdGVzID0gbmV3IENhY2hlcih7fSk7XG5cbi8qIEVORCBUWVBFUyAqL1xyXG4vKipcclxuICogSW5jbHVkZSBhIHRlbXBsYXRlIGJhc2VkIG9uIGl0cyBuYW1lIChvciBmaWxlcGF0aCwgaWYgaXQncyBhbHJlYWR5IGJlZW4gY2FjaGVkKS5cclxuICpcclxuICogQ2FsbGVkIGxpa2UgYGluY2x1ZGUodGVtcGxhdGVOYW1lT3JQYXRoLCBkYXRhKWBcclxuICovXHJcbmZ1bmN0aW9uIGluY2x1ZGVIZWxwZXIodGVtcGxhdGVOYW1lT3JQYXRoLCBkYXRhKSB7XHJcbiAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlcy5nZXQodGVtcGxhdGVOYW1lT3JQYXRoKTtcclxuICAgIGlmICghdGVtcGxhdGUpIHtcclxuICAgICAgICB0aHJvdyBFdGFFcnIoJ0NvdWxkIG5vdCBmZXRjaCB0ZW1wbGF0ZSBcIicgKyB0ZW1wbGF0ZU5hbWVPclBhdGggKyAnXCInKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZW1wbGF0ZShkYXRhLCB0aGlzKTtcclxufVxyXG4vKiogRXRhJ3MgYmFzZSAoZ2xvYmFsKSBjb25maWd1cmF0aW9uICovXHJcbnZhciBjb25maWcgPSB7XHJcbiAgICBhc3luYzogZmFsc2UsXHJcbiAgICBhdXRvRXNjYXBlOiB0cnVlLFxyXG4gICAgYXV0b1RyaW06IFtmYWxzZSwgJ25sJ10sXHJcbiAgICBjYWNoZTogZmFsc2UsXHJcbiAgICBlOiBYTUxFc2NhcGUsXHJcbiAgICBpbmNsdWRlOiBpbmNsdWRlSGVscGVyLFxyXG4gICAgcGFyc2U6IHtcclxuICAgICAgICBleGVjOiAnJyxcclxuICAgICAgICBpbnRlcnBvbGF0ZTogJz0nLFxyXG4gICAgICAgIHJhdzogJ34nXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW10sXHJcbiAgICBybVdoaXRlc3BhY2U6IGZhbHNlLFxyXG4gICAgdGFnczogWyc8JScsICclPiddLFxyXG4gICAgdGVtcGxhdGVzOiB0ZW1wbGF0ZXMsXHJcbiAgICB1c2VXaXRoOiBmYWxzZSxcclxuICAgIHZhck5hbWU6ICdpdCdcclxufTtcclxuLyoqXHJcbiAqIFRha2VzIG9uZSBvciB0d28gcGFydGlhbCAobm90IG5lY2Vzc2FyaWx5IGNvbXBsZXRlKSBjb25maWd1cmF0aW9uIG9iamVjdHMsIG1lcmdlcyB0aGVtIDEgbGF5ZXIgZGVlcCBpbnRvIGV0YS5jb25maWcsIGFuZCByZXR1cm5zIHRoZSByZXN1bHRcclxuICpcclxuICogQHBhcmFtIG92ZXJyaWRlIFBhcnRpYWwgY29uZmlndXJhdGlvbiBvYmplY3RcclxuICogQHBhcmFtIGJhc2VDb25maWcgUGFydGlhbCBjb25maWd1cmF0aW9uIG9iamVjdCB0byBtZXJnZSBiZWZvcmUgYG92ZXJyaWRlYFxyXG4gKlxyXG4gKiAqKkV4YW1wbGUqKlxyXG4gKlxyXG4gKiBgYGBqc1xyXG4gKiBsZXQgY3VzdG9tQ29uZmlnID0gZ2V0Q29uZmlnKHt0YWdzOiBbJyEjJywgJyMhJ119KVxyXG4gKiBgYGBcclxuICovXHJcbmZ1bmN0aW9uIGdldENvbmZpZyhvdmVycmlkZSwgYmFzZUNvbmZpZykge1xyXG4gICAgLy8gVE9ETzogcnVuIG1vcmUgdGVzdHMgb24gdGhpc1xyXG4gICAgdmFyIHJlcyA9IHt9OyAvLyBMaW5rZWRcclxuICAgIGNvcHlQcm9wcyhyZXMsIGNvbmZpZyk7IC8vIENyZWF0ZXMgZGVlcCBjbG9uZSBvZiBldGEuY29uZmlnLCAxIGxheWVyIGRlZXBcclxuICAgIGlmIChiYXNlQ29uZmlnKSB7XHJcbiAgICAgICAgY29weVByb3BzKHJlcywgYmFzZUNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICBpZiAob3ZlcnJpZGUpIHtcclxuICAgICAgICBjb3B5UHJvcHMocmVzLCBvdmVycmlkZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzO1xyXG59XHJcbi8qKiBVcGRhdGUgRXRhJ3MgYmFzZSBjb25maWcgKi9cclxuZnVuY3Rpb24gY29uZmlndXJlKG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBjb3B5UHJvcHMoY29uZmlnLCBvcHRpb25zKTtcclxufVxuXG4vKiBFTkQgVFlQRVMgKi9cclxuLyoqXHJcbiAqIFRha2VzIGEgdGVtcGxhdGUgc3RyaW5nIGFuZCByZXR1cm5zIGEgdGVtcGxhdGUgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHdpdGggKGRhdGEsIGNvbmZpZywgW2NiXSlcclxuICpcclxuICogQHBhcmFtIHN0ciAtIFRoZSB0ZW1wbGF0ZSBzdHJpbmdcclxuICogQHBhcmFtIGNvbmZpZyAtIEEgY3VzdG9tIGNvbmZpZ3VyYXRpb24gb2JqZWN0IChvcHRpb25hbClcclxuICpcclxuICogKipFeGFtcGxlKipcclxuICpcclxuICogYGBganNcclxuICogbGV0IGNvbXBpbGVkRm4gPSBldGEuY29tcGlsZShcIkhpIDwlPSBpdC51c2VyICU+XCIpXHJcbiAqIC8vIGZ1bmN0aW9uIGFub255bW91cygpXHJcbiAqIGxldCBjb21waWxlZEZuU3RyID0gY29tcGlsZWRGbi50b1N0cmluZygpXHJcbiAqIC8vIFwiZnVuY3Rpb24gYW5vbnltb3VzKGl0LEUsY2JcXG4pIHtcXG52YXIgdFI9JycsaW5jbHVkZT1FLmluY2x1ZGUuYmluZChFKSxpbmNsdWRlRmlsZT1FLmluY2x1ZGVGaWxlLmJpbmQoRSk7dFIrPSdIaSAnO3RSKz1FLmUoaXQudXNlcik7aWYoY2Ipe2NiKG51bGwsdFIpfSByZXR1cm4gdFJcXG59XCJcclxuICogYGBgXHJcbiAqL1xyXG5mdW5jdGlvbiBjb21waWxlKHN0ciwgY29uZmlnKSB7XHJcbiAgICB2YXIgb3B0aW9ucyA9IGdldENvbmZpZyhjb25maWcgfHwge30pO1xyXG4gICAgLyogQVNZTkMgSEFORExJTkcgKi9cclxuICAgIC8vIFRoZSBiZWxvdyBjb2RlIGlzIG1vZGlmaWVkIGZyb20gbWRlL2Vqcy4gQWxsIGNyZWRpdCBzaG91bGQgZ28gdG8gdGhlbS5cclxuICAgIHZhciBjdG9yID0gb3B0aW9ucy5hc3luYyA/IGdldEFzeW5jRnVuY3Rpb25Db25zdHJ1Y3RvcigpIDogRnVuY3Rpb247XHJcbiAgICAvKiBFTkQgQVNZTkMgSEFORExJTkcgKi9cclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBjdG9yKG9wdGlvbnMudmFyTmFtZSwgJ0UnLCAvLyBFdGFDb25maWdcclxuICAgICAgICAnY2InLCAvLyBvcHRpb25hbCBjYWxsYmFja1xyXG4gICAgICAgIGNvbXBpbGVUb1N0cmluZyhzdHIsIG9wdGlvbnMpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctZnVuY1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFN5bnRheEVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IEV0YUVycignQmFkIHRlbXBsYXRlIHN5bnRheFxcblxcbicgK1xyXG4gICAgICAgICAgICAgICAgZS5tZXNzYWdlICtcclxuICAgICAgICAgICAgICAgICdcXG4nICtcclxuICAgICAgICAgICAgICAgIEFycmF5KGUubWVzc2FnZS5sZW5ndGggKyAxKS5qb2luKCc9JykgK1xyXG4gICAgICAgICAgICAgICAgJ1xcbicgK1xyXG4gICAgICAgICAgICAgICAgY29tcGlsZVRvU3RyaW5nKHN0ciwgb3B0aW9ucykgK1xyXG4gICAgICAgICAgICAgICAgJ1xcbicgLy8gVGhpcyB3aWxsIHB1dCBhbiBleHRyYSBuZXdsaW5lIGJlZm9yZSB0aGUgY2FsbHN0YWNrIGZvciBleHRyYSByZWFkYWJpbGl0eVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxudmFyIF9CT00gPSAvXlxcdUZFRkYvO1xyXG4vKiBFTkQgVFlQRVMgKi9cclxuLyoqXHJcbiAqIEdldCB0aGUgcGF0aCB0byB0aGUgaW5jbHVkZWQgZmlsZSBmcm9tIHRoZSBwYXJlbnQgZmlsZSBwYXRoIGFuZCB0aGVcclxuICogc3BlY2lmaWVkIHBhdGguXHJcbiAqXHJcbiAqIElmIGBuYW1lYCBkb2VzIG5vdCBoYXZlIGFuIGV4dGVuc2lvbiwgaXQgd2lsbCBkZWZhdWx0IHRvIGAuZXRhYFxyXG4gKlxyXG4gKiBAcGFyYW0gbmFtZSBzcGVjaWZpZWQgcGF0aFxyXG4gKiBAcGFyYW0gcGFyZW50ZmlsZSBwYXJlbnQgZmlsZSBwYXRoXHJcbiAqIEBwYXJhbSBpc0RpcmVjdG9yeSB3aGV0aGVyIHBhcmVudGZpbGUgaXMgYSBkaXJlY3RvcnlcclxuICogQHJldHVybiBhYnNvbHV0ZSBwYXRoIHRvIHRlbXBsYXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRXaG9sZUZpbGVQYXRoKG5hbWUsIHBhcmVudGZpbGUsIGlzRGlyZWN0b3J5KSB7XHJcbiAgICB2YXIgaW5jbHVkZVBhdGggPSBwYXRoLnJlc29sdmUoaXNEaXJlY3RvcnkgPyBwYXJlbnRmaWxlIDogcGF0aC5kaXJuYW1lKHBhcmVudGZpbGUpLCAvLyByZXR1cm5zIGRpcmVjdG9yeSB0aGUgcGFyZW50IGZpbGUgaXMgaW5cclxuICAgIG5hbWUgLy8gZmlsZVxyXG4gICAgKSArIChwYXRoLmV4dG5hbWUobmFtZSkgPyAnJyA6ICcuZXRhJyk7XHJcbiAgICByZXR1cm4gaW5jbHVkZVBhdGg7XHJcbn1cclxuLyoqXHJcbiAqIEdldCB0aGUgYWJzb2x1dGUgcGF0aCB0byBhbiBpbmNsdWRlZCB0ZW1wbGF0ZVxyXG4gKlxyXG4gKiBJZiB0aGlzIGlzIGNhbGxlZCB3aXRoIGFuIGFic29sdXRlIHBhdGggKGZvciBleGFtcGxlLCBzdGFydGluZyB3aXRoICcvJyBvciAnQzpcXCcpXHJcbiAqIHRoZW4gRXRhIHdpbGwgYXR0ZW1wdCB0byByZXNvbHZlIHRoZSBhYnNvbHV0ZSBwYXRoIHdpdGhpbiBvcHRpb25zLnZpZXdzLiBJZiBpdCBjYW5ub3QsXHJcbiAqIEV0YSB3aWxsIGZhbGxiYWNrIHRvIG9wdGlvbnMucm9vdCBvciAnLydcclxuICpcclxuICogSWYgdGhpcyBpcyBjYWxsZWQgd2l0aCBhIHJlbGF0aXZlIHBhdGgsIEV0YSB3aWxsOlxyXG4gKiAtIExvb2sgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgdGVtcGxhdGUgKGlmIHRoZSBjdXJyZW50IHRlbXBsYXRlIGhhcyB0aGUgYGZpbGVuYW1lYCBwcm9wZXJ0eSlcclxuICogLSBMb29rIGluc2lkZSBlYWNoIGRpcmVjdG9yeSBpbiBvcHRpb25zLnZpZXdzXHJcbiAqXHJcbiAqIE5vdGU6IGlmIEV0YSBpcyB1bmFibGUgdG8gZmluZCBhIHRlbXBsYXRlIHVzaW5nIHBhdGggYW5kIG9wdGlvbnMsIGl0IHdpbGwgdGhyb3cgYW4gZXJyb3IuXHJcbiAqXHJcbiAqIEBwYXJhbSBwYXRoICAgIHNwZWNpZmllZCBwYXRoXHJcbiAqIEBwYXJhbSBvcHRpb25zIGNvbXBpbGF0aW9uIG9wdGlvbnNcclxuICogQHJldHVybiBhYnNvbHV0ZSBwYXRoIHRvIHRlbXBsYXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQYXRoKHBhdGgsIG9wdGlvbnMpIHtcclxuICAgIHZhciBpbmNsdWRlUGF0aCA9IGZhbHNlO1xyXG4gICAgdmFyIHZpZXdzID0gb3B0aW9ucy52aWV3cztcclxuICAgIHZhciBzZWFyY2hlZFBhdGhzID0gW107XHJcbiAgICAvLyBJZiB0aGVzZSBmb3VyIHZhbHVlcyBhcmUgdGhlIHNhbWUsXHJcbiAgICAvLyBnZXRQYXRoKCkgd2lsbCByZXR1cm4gdGhlIHNhbWUgcmVzdWx0IGV2ZXJ5IHRpbWUuXHJcbiAgICAvLyBXZSBjYW4gY2FjaGUgdGhlIHJlc3VsdCB0byBhdm9pZCBleHBlbnNpdmVcclxuICAgIC8vIGZpbGUgb3BlcmF0aW9ucy5cclxuICAgIHZhciBwYXRoT3B0aW9ucyA9IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBmaWxlbmFtZTogb3B0aW9ucy5maWxlbmFtZSxcclxuICAgICAgICBwYXRoOiBwYXRoLFxyXG4gICAgICAgIHJvb3Q6IG9wdGlvbnMucm9vdCxcclxuICAgICAgICB2aWV3czogb3B0aW9ucy52aWV3c1xyXG4gICAgfSk7XHJcbiAgICBpZiAob3B0aW9ucy5jYWNoZSAmJiBvcHRpb25zLmZpbGVwYXRoQ2FjaGUgJiYgb3B0aW9ucy5maWxlcGF0aENhY2hlW3BhdGhPcHRpb25zXSkge1xyXG4gICAgICAgIC8vIFVzZSB0aGUgY2FjaGVkIGZpbGVwYXRoXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZmlsZXBhdGhDYWNoZVtwYXRoT3B0aW9uc107XHJcbiAgICB9XHJcbiAgICAvKiogQWRkIGEgZmlsZXBhdGggdG8gdGhlIGxpc3Qgb2YgcGF0aHMgd2UndmUgY2hlY2tlZCBmb3IgYSB0ZW1wbGF0ZSAqL1xyXG4gICAgZnVuY3Rpb24gYWRkUGF0aFRvU2VhcmNoZWQocGF0aFNlYXJjaGVkKSB7XHJcbiAgICAgICAgaWYgKCFzZWFyY2hlZFBhdGhzLmluY2x1ZGVzKHBhdGhTZWFyY2hlZCkpIHtcclxuICAgICAgICAgICAgc2VhcmNoZWRQYXRocy5wdXNoKHBhdGhTZWFyY2hlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBUYWtlIGEgZmlsZXBhdGggKGxpa2UgJ3BhcnRpYWxzL215cGFydGlhbC5ldGEnKS4gQXR0ZW1wdCB0byBmaW5kIHRoZSB0ZW1wbGF0ZSBmaWxlIGluc2lkZSBgdmlld3NgO1xyXG4gICAgICogcmV0dXJuIHRoZSByZXN1bHRpbmcgdGVtcGxhdGUgZmlsZSBwYXRoLCBvciBgZmFsc2VgIHRvIGluZGljYXRlIHRoYXQgdGhlIHRlbXBsYXRlIHdhcyBub3QgZm91bmQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHZpZXdzIHRoZSBmaWxlcGF0aCB0aGF0IGhvbGRzIHRlbXBsYXRlcywgb3IgYW4gYXJyYXkgb2YgZmlsZXBhdGhzIHRoYXQgaG9sZCB0ZW1wbGF0ZXNcclxuICAgICAqIEBwYXJhbSBwYXRoIHRoZSBwYXRoIHRvIHRoZSB0ZW1wbGF0ZVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBzZWFyY2hWaWV3cyh2aWV3cywgcGF0aCkge1xyXG4gICAgICAgIHZhciBmaWxlUGF0aDtcclxuICAgICAgICAvLyBJZiB2aWV3cyBpcyBhbiBhcnJheSwgdGhlbiBsb29wIHRocm91Z2ggZWFjaCBkaXJlY3RvcnlcclxuICAgICAgICAvLyBBbmQgYXR0ZW1wdCB0byBmaW5kIHRoZSB0ZW1wbGF0ZVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZpZXdzKSAmJlxyXG4gICAgICAgICAgICB2aWV3cy5zb21lKGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICBmaWxlUGF0aCA9IGdldFdob2xlRmlsZVBhdGgocGF0aCwgdiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBhZGRQYXRoVG9TZWFyY2hlZChmaWxlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhpc3RzU3luYyhmaWxlUGF0aCk7XHJcbiAgICAgICAgICAgIH0pKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBhYm92ZSByZXR1cm5lZCB0cnVlLCB3ZSBrbm93IHRoYXQgdGhlIGZpbGVQYXRoIHdhcyBqdXN0IHNldCB0byBhIHBhdGhcclxuICAgICAgICAgICAgLy8gVGhhdCBleGlzdHMgKEFycmF5LnNvbWUoKSByZXR1cm5zIGFzIHNvb24gYXMgaXQgZmluZHMgYSB2YWxpZCBlbGVtZW50KVxyXG4gICAgICAgICAgICByZXR1cm4gZmlsZVBhdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2aWV3cyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgLy8gU2VhcmNoIGZvciB0aGUgZmlsZSBpZiB2aWV3cyBpcyBhIHNpbmdsZSBkaXJlY3RvcnlcclxuICAgICAgICAgICAgZmlsZVBhdGggPSBnZXRXaG9sZUZpbGVQYXRoKHBhdGgsIHZpZXdzLCB0cnVlKTtcclxuICAgICAgICAgICAgYWRkUGF0aFRvU2VhcmNoZWQoZmlsZVBhdGgpO1xyXG4gICAgICAgICAgICBpZiAoZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaWxlUGF0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBVbmFibGUgdG8gZmluZCBhIGZpbGVcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvLyBQYXRoIHN0YXJ0cyB3aXRoICcvJywgJ0M6XFwnLCBldGMuXHJcbiAgICB2YXIgbWF0Y2ggPSAvXltBLVphLXpdKzpcXFxcfF5cXC8vLmV4ZWMocGF0aCk7XHJcbiAgICAvLyBBYnNvbHV0ZSBwYXRoLCBsaWtlIC9wYXJ0aWFscy9wYXJ0aWFsLmV0YVxyXG4gICAgaWYgKG1hdGNoICYmIG1hdGNoLmxlbmd0aCkge1xyXG4gICAgICAgIC8vIFdlIGhhdmUgdG8gdHJpbSB0aGUgYmVnaW5uaW5nICcvJyBvZmYgdGhlIHBhdGgsIG9yIGVsc2VcclxuICAgICAgICAvLyBwYXRoLnJlc29sdmUoZGlyLCBwYXRoKSB3aWxsIGFsd2F5cyByZXNvbHZlIHRvIGp1c3QgcGF0aFxyXG4gICAgICAgIHZhciBmb3JtYXR0ZWRQYXRoID0gcGF0aC5yZXBsYWNlKC9eXFwvKi8sICcnKTtcclxuICAgICAgICAvLyBGaXJzdCwgdHJ5IHRvIHJlc29sdmUgdGhlIHBhdGggd2l0aGluIG9wdGlvbnMudmlld3NcclxuICAgICAgICBpbmNsdWRlUGF0aCA9IHNlYXJjaFZpZXdzKHZpZXdzLCBmb3JtYXR0ZWRQYXRoKTtcclxuICAgICAgICBpZiAoIWluY2x1ZGVQYXRoKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRoYXQgZmFpbHMsIHNlYXJjaFZpZXdzIHdpbGwgcmV0dXJuIGZhbHNlLiBUcnkgdG8gZmluZCB0aGUgcGF0aFxyXG4gICAgICAgICAgICAvLyBpbnNpZGUgb3B0aW9ucy5yb290IChieSBkZWZhdWx0ICcvJywgdGhlIGJhc2Ugb2YgdGhlIGZpbGVzeXN0ZW0pXHJcbiAgICAgICAgICAgIHZhciBwYXRoRnJvbVJvb3QgPSBnZXRXaG9sZUZpbGVQYXRoKGZvcm1hdHRlZFBhdGgsIG9wdGlvbnMucm9vdCB8fCAnLycsIHRydWUpO1xyXG4gICAgICAgICAgICBhZGRQYXRoVG9TZWFyY2hlZChwYXRoRnJvbVJvb3QpO1xyXG4gICAgICAgICAgICBpbmNsdWRlUGF0aCA9IHBhdGhGcm9tUm9vdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAvLyBSZWxhdGl2ZSBwYXRoc1xyXG4gICAgICAgIC8vIExvb2sgcmVsYXRpdmUgdG8gYSBwYXNzZWQgZmlsZW5hbWUgZmlyc3RcclxuICAgICAgICBpZiAob3B0aW9ucy5maWxlbmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgZmlsZVBhdGggPSBnZXRXaG9sZUZpbGVQYXRoKHBhdGgsIG9wdGlvbnMuZmlsZW5hbWUpO1xyXG4gICAgICAgICAgICBhZGRQYXRoVG9TZWFyY2hlZChmaWxlUGF0aCk7XHJcbiAgICAgICAgICAgIGlmIChleGlzdHNTeW5jKGZpbGVQYXRoKSkge1xyXG4gICAgICAgICAgICAgICAgaW5jbHVkZVBhdGggPSBmaWxlUGF0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBUaGVuIGxvb2sgZm9yIHRoZSB0ZW1wbGF0ZSBpbiBvcHRpb25zLnZpZXdzXHJcbiAgICAgICAgaWYgKCFpbmNsdWRlUGF0aCkge1xyXG4gICAgICAgICAgICBpbmNsdWRlUGF0aCA9IHNlYXJjaFZpZXdzKHZpZXdzLCBwYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpbmNsdWRlUGF0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBFdGFFcnIoJ0NvdWxkIG5vdCBmaW5kIHRoZSB0ZW1wbGF0ZSBcIicgKyBwYXRoICsgJ1wiLiBQYXRocyB0cmllZDogJyArIHNlYXJjaGVkUGF0aHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIElmIGNhY2hpbmcgYW5kIGZpbGVwYXRoQ2FjaGUgYXJlIGVuYWJsZWQsXHJcbiAgICAvLyBjYWNoZSB0aGUgaW5wdXQgJiBvdXRwdXQgb2YgdGhpcyBmdW5jdGlvbi5cclxuICAgIGlmIChvcHRpb25zLmNhY2hlICYmIG9wdGlvbnMuZmlsZXBhdGhDYWNoZSkge1xyXG4gICAgICAgIG9wdGlvbnMuZmlsZXBhdGhDYWNoZVtwYXRoT3B0aW9uc10gPSBpbmNsdWRlUGF0aDtcclxuICAgIH1cclxuICAgIHJldHVybiBpbmNsdWRlUGF0aDtcclxufVxyXG4vKipcclxuICogUmVhZHMgYSBmaWxlIHN5bmNocm9ub3VzbHlcclxuICovXHJcbmZ1bmN0aW9uIHJlYWRGaWxlKGZpbGVQYXRoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiByZWFkRmlsZVN5bmMoZmlsZVBhdGgpLnRvU3RyaW5nKCkucmVwbGFjZShfQk9NLCAnJyk7IC8vIFRPRE86IGlzIHJlcGxhY2luZyBCT00ncyBuZWNlc3Nhcnk/XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoX2EpIHtcclxuICAgICAgICB0aHJvdyBFdGFFcnIoXCJGYWlsZWQgdG8gcmVhZCB0ZW1wbGF0ZSBhdCAnXCIgKyBmaWxlUGF0aCArIFwiJ1wiKTtcclxuICAgIH1cclxufVxuXG4vLyBleHByZXNzIGlzIHNldCBsaWtlOiBhcHAuZW5naW5lKCdodG1sJywgcmVxdWlyZSgnZXRhJykucmVuZGVyRmlsZSlcclxuLyogRU5EIFRZUEVTICovXHJcbi8qKlxyXG4gKiBSZWFkcyBhIHRlbXBsYXRlLCBjb21waWxlcyBpdCBpbnRvIGEgZnVuY3Rpb24sIGNhY2hlcyBpdCBpZiBjYWNoaW5nIGlzbid0IGRpc2FibGVkLCByZXR1cm5zIHRoZSBmdW5jdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0gZmlsZVBhdGggQWJzb2x1dGUgcGF0aCB0byB0ZW1wbGF0ZSBmaWxlXHJcbiAqIEBwYXJhbSBvcHRpb25zIEV0YSBjb25maWd1cmF0aW9uIG92ZXJyaWRlc1xyXG4gKiBAcGFyYW0gbm9DYWNoZSBPcHRpb25hbGx5LCBtYWtlIEV0YSBub3QgY2FjaGUgdGhlIHRlbXBsYXRlXHJcbiAqL1xyXG5mdW5jdGlvbiBsb2FkRmlsZShmaWxlUGF0aCwgb3B0aW9ucywgbm9DYWNoZSkge1xyXG4gICAgdmFyIGNvbmZpZyA9IGdldENvbmZpZyhvcHRpb25zKTtcclxuICAgIHZhciB0ZW1wbGF0ZSA9IHJlYWRGaWxlKGZpbGVQYXRoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgdmFyIGNvbXBpbGVkVGVtcGxhdGUgPSBjb21waWxlKHRlbXBsYXRlLCBjb25maWcpO1xyXG4gICAgICAgIGlmICghbm9DYWNoZSkge1xyXG4gICAgICAgICAgICBjb25maWcudGVtcGxhdGVzLmRlZmluZShjb25maWcuZmlsZW5hbWUsIGNvbXBpbGVkVGVtcGxhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29tcGlsZWRUZW1wbGF0ZTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhyb3cgRXRhRXJyKCdMb2FkaW5nIGZpbGU6ICcgKyBmaWxlUGF0aCArICcgZmFpbGVkOlxcblxcbicgKyBlLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBHZXQgdGhlIHRlbXBsYXRlIGZyb20gYSBzdHJpbmcgb3IgYSBmaWxlLCBlaXRoZXIgY29tcGlsZWQgb24tdGhlLWZseSBvclxyXG4gKiByZWFkIGZyb20gY2FjaGUgKGlmIGVuYWJsZWQpLCBhbmQgY2FjaGUgdGhlIHRlbXBsYXRlIGlmIG5lZWRlZC5cclxuICpcclxuICogSWYgYG9wdGlvbnMuY2FjaGVgIGlzIHRydWUsIHRoaXMgZnVuY3Rpb24gcmVhZHMgdGhlIGZpbGUgZnJvbVxyXG4gKiBgb3B0aW9ucy5maWxlbmFtZWAgc28gaXQgbXVzdCBiZSBzZXQgcHJpb3IgdG8gY2FsbGluZyB0aGlzIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0gb3B0aW9ucyAgIGNvbXBpbGF0aW9uIG9wdGlvbnNcclxuICogQHJldHVybiBFdGEgdGVtcGxhdGUgZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGhhbmRsZUNhY2hlJDEob3B0aW9ucykge1xyXG4gICAgdmFyIGZpbGVuYW1lID0gb3B0aW9ucy5maWxlbmFtZTtcclxuICAgIGlmIChvcHRpb25zLmNhY2hlKSB7XHJcbiAgICAgICAgdmFyIGZ1bmMgPSBvcHRpb25zLnRlbXBsYXRlcy5nZXQoZmlsZW5hbWUpO1xyXG4gICAgICAgIGlmIChmdW5jKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbG9hZEZpbGUoZmlsZW5hbWUsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgLy8gQ2FjaGluZyBpcyBkaXNhYmxlZCwgc28gcGFzcyBub0NhY2hlID0gdHJ1ZVxyXG4gICAgcmV0dXJuIGxvYWRGaWxlKGZpbGVuYW1lLCBvcHRpb25zLCB0cnVlKTtcclxufVxyXG4vKipcclxuICogVHJ5IGNhbGxpbmcgaGFuZGxlQ2FjaGUgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucyBhbmQgZGF0YSBhbmQgY2FsbCB0aGVcclxuICogY2FsbGJhY2sgd2l0aCB0aGUgcmVzdWx0LiBJZiBhbiBlcnJvciBvY2N1cnMsIGNhbGwgdGhlIGNhbGxiYWNrIHdpdGhcclxuICogdGhlIGVycm9yLiBVc2VkIGJ5IHJlbmRlckZpbGUoKS5cclxuICpcclxuICogQHBhcmFtIGRhdGEgdGVtcGxhdGUgZGF0YVxyXG4gKiBAcGFyYW0gb3B0aW9ucyBjb21waWxhdGlvbiBvcHRpb25zXHJcbiAqIEBwYXJhbSBjYiBjYWxsYmFja1xyXG4gKi9cclxuZnVuY3Rpb24gdHJ5SGFuZGxlQ2FjaGUoZGF0YSwgb3B0aW9ucywgY2IpIHtcclxuICAgIGlmIChjYikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIE5vdGU6IGlmIHRoZXJlIGlzIGFuIGVycm9yIHdoaWxlIHJlbmRlcmluZyB0aGUgdGVtcGxhdGUsXHJcbiAgICAgICAgICAgIC8vIEl0IHdpbGwgYnViYmxlIHVwIGFuZCBiZSBjYXVnaHQgaGVyZVxyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGVGbiA9IGhhbmRsZUNhY2hlJDEob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlRm4oZGF0YSwgb3B0aW9ucywgY2IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYihlcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIC8vIE5vIGNhbGxiYWNrLCB0cnkgcmV0dXJuaW5nIGEgcHJvbWlzZVxyXG4gICAgICAgIGlmICh0eXBlb2YgcHJvbWlzZUltcGwgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBwcm9taXNlSW1wbChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZUZuID0gaGFuZGxlQ2FjaGUkMShvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGVtcGxhdGVGbihkYXRhLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgRXRhRXJyKFwiUGxlYXNlIHByb3ZpZGUgYSBjYWxsYmFjayBmdW5jdGlvbiwgdGhpcyBlbnYgZG9lc24ndCBzdXBwb3J0IFByb21pc2VzXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4vKipcclxuICogR2V0IHRoZSB0ZW1wbGF0ZSBmdW5jdGlvbi5cclxuICpcclxuICogSWYgYG9wdGlvbnMuY2FjaGVgIGlzIGB0cnVlYCwgdGhlbiB0aGUgdGVtcGxhdGUgaXMgY2FjaGVkLlxyXG4gKlxyXG4gKiBUaGlzIHJldHVybnMgYSB0ZW1wbGF0ZSBmdW5jdGlvbiBhbmQgdGhlIGNvbmZpZyBvYmplY3Qgd2l0aCB3aGljaCB0aGF0IHRlbXBsYXRlIGZ1bmN0aW9uIHNob3VsZCBiZSBjYWxsZWQuXHJcbiAqXHJcbiAqIEByZW1hcmtzXHJcbiAqXHJcbiAqIEl0J3MgaW1wb3J0YW50IHRoYXQgdGhpcyByZXR1cm5zIGEgY29uZmlnIG9iamVjdCB3aXRoIGBmaWxlbmFtZWAgc2V0LlxyXG4gKiBPdGhlcndpc2UsIHRoZSBpbmNsdWRlZCBmaWxlIHdvdWxkIG5vdCBiZSBhYmxlIHRvIHVzZSByZWxhdGl2ZSBwYXRoc1xyXG4gKlxyXG4gKiBAcGFyYW0gcGF0aCBwYXRoIGZvciB0aGUgc3BlY2lmaWVkIGZpbGUgKGlmIHJlbGF0aXZlLCBzcGVjaWZ5IGB2aWV3c2Agb24gYG9wdGlvbnNgKVxyXG4gKiBAcGFyYW0gb3B0aW9ucyBjb21waWxhdGlvbiBvcHRpb25zXHJcbiAqIEByZXR1cm4gW0V0YSB0ZW1wbGF0ZSBmdW5jdGlvbiwgbmV3IGNvbmZpZyBvYmplY3RdXHJcbiAqL1xyXG5mdW5jdGlvbiBpbmNsdWRlRmlsZShwYXRoLCBvcHRpb25zKSB7XHJcbiAgICAvLyB0aGUgYmVsb3cgY3JlYXRlcyBhIG5ldyBvcHRpb25zIG9iamVjdCwgdXNpbmcgdGhlIHBhcmVudCBmaWxlcGF0aCBvZiB0aGUgb2xkIG9wdGlvbnMgb2JqZWN0IGFuZCB0aGUgcGF0aFxyXG4gICAgdmFyIG5ld0ZpbGVPcHRpb25zID0gZ2V0Q29uZmlnKHsgZmlsZW5hbWU6IGdldFBhdGgocGF0aCwgb3B0aW9ucykgfSwgb3B0aW9ucyk7XHJcbiAgICAvLyBUT0RPOiBtYWtlIHN1cmUgcHJvcGVydGllcyBhcmUgY3VycmVjdGx5IGNvcGllZCBvdmVyXHJcbiAgICByZXR1cm4gW2hhbmRsZUNhY2hlJDEobmV3RmlsZU9wdGlvbnMpLCBuZXdGaWxlT3B0aW9uc107XHJcbn1cclxuZnVuY3Rpb24gcmVuZGVyRmlsZShmaWxlbmFtZSwgZGF0YSwgY29uZmlnLCBjYikge1xyXG4gICAgLypcclxuICAgIEhlcmUgd2UgaGF2ZSBzb21lIGZ1bmN0aW9uIG92ZXJsb2FkaW5nLlxyXG4gICAgRXNzZW50aWFsbHksIHRoZSBmaXJzdCAyIGFyZ3VtZW50cyB0byByZW5kZXJGaWxlIHNob3VsZCBhbHdheXMgYmUgdGhlIGZpbGVuYW1lIGFuZCBkYXRhXHJcbiAgICBIb3dldmVyLCB3aXRoIEV4cHJlc3MsIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB3aWxsIGJlIHBhc3NlZCBhbG9uZyB3aXRoIHRoZSBkYXRhLlxyXG4gICAgVGh1cywgRXhwcmVzcyB3aWxsIGNhbGwgcmVuZGVyRmlsZSB3aXRoIChmaWxlbmFtZSwgZGF0YUFuZE9wdGlvbnMsIGNiKVxyXG4gICAgQW5kIHdlIHdhbnQgdG8gYWxzbyBtYWtlIChmaWxlbmFtZSwgZGF0YSwgb3B0aW9ucywgY2IpIGF2YWlsYWJsZVxyXG4gICAgKi9cclxuICAgIHZhciByZW5kZXJDb25maWc7XHJcbiAgICB2YXIgY2FsbGJhY2s7XHJcbiAgICBkYXRhID0gZGF0YSB8fCB7fTsgLy8gSWYgZGF0YSBpcyB1bmRlZmluZWQsIHdlIGRvbid0IHdhbnQgYWNjZXNzaW5nIGRhdGEuc2V0dGluZ3MgdG8gZXJyb3JcclxuICAgIC8vIEZpcnN0LCBhc3NpZ24gb3VyIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGBjYWxsYmFja2BcclxuICAgIC8vIFdlIGNhbiBsZWF2ZSBpdCB1bmRlZmluZWQgaWYgbmVpdGhlciBwYXJhbWV0ZXIgaXMgYSBmdW5jdGlvbjtcclxuICAgIC8vIENhbGxiYWNrcyBhcmUgb3B0aW9uYWxcclxuICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvLyBUaGUgNHRoIGFyZ3VtZW50IGlzIHRoZSBjYWxsYmFja1xyXG4gICAgICAgIGNhbGxiYWNrID0gY2I7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2YgY29uZmlnID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgLy8gVGhlIDNyZCBhcmcgaXMgdGhlIGNhbGxiYWNrXHJcbiAgICAgICAgY2FsbGJhY2sgPSBjb25maWc7XHJcbiAgICB9XHJcbiAgICAvLyBJZiB0aGVyZSBpcyBhIGNvbmZpZyBvYmplY3QgcGFzc2VkIGluIGV4cGxpY2l0bHksIHVzZSBpdFxyXG4gICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgcmVuZGVyQ29uZmlnID0gZ2V0Q29uZmlnKGNvbmZpZyB8fCB7fSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAvLyBPdGhlcndpc2UsIGdldCB0aGUgY29uZmlnIGZyb20gdGhlIGRhdGEgb2JqZWN0XHJcbiAgICAgICAgLy8gQW5kIHRoZW4gZ3JhYiBzb21lIGNvbmZpZyBvcHRpb25zIGZyb20gZGF0YS5zZXR0aW5nc1xyXG4gICAgICAgIC8vIFdoaWNoIGlzIHdoZXJlIEV4cHJlc3Mgc29tZXRpbWVzIHN0b3JlcyB0aGVtXHJcbiAgICAgICAgcmVuZGVyQ29uZmlnID0gZ2V0Q29uZmlnKGRhdGEpO1xyXG4gICAgICAgIGlmIChkYXRhLnNldHRpbmdzKSB7XHJcbiAgICAgICAgICAgIC8vIFB1bGwgYSBmZXcgdGhpbmdzIGZyb20ga25vd24gbG9jYXRpb25zXHJcbiAgICAgICAgICAgIGlmIChkYXRhLnNldHRpbmdzLnZpZXdzKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJDb25maWcudmlld3MgPSBkYXRhLnNldHRpbmdzLnZpZXdzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnNldHRpbmdzWyd2aWV3IGNhY2hlJ10pIHtcclxuICAgICAgICAgICAgICAgIHJlbmRlckNvbmZpZy5jYWNoZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gVW5kb2N1bWVudGVkIGFmdGVyIEV4cHJlc3MgMiwgYnV0IHN0aWxsIHVzYWJsZSwgZXNwLiBmb3JcclxuICAgICAgICAgICAgLy8gaXRlbXMgdGhhdCBhcmUgdW5zYWZlIHRvIGJlIHBhc3NlZCBhbG9uZyB3aXRoIGRhdGEsIGxpa2UgYHJvb3RgXHJcbiAgICAgICAgICAgIHZhciB2aWV3T3B0cyA9IGRhdGEuc2V0dGluZ3NbJ3ZpZXcgb3B0aW9ucyddO1xyXG4gICAgICAgICAgICBpZiAodmlld09wdHMpIHtcclxuICAgICAgICAgICAgICAgIGNvcHlQcm9wcyhyZW5kZXJDb25maWcsIHZpZXdPcHRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIFNldCB0aGUgZmlsZW5hbWUgb3B0aW9uIG9uIHRoZSB0ZW1wbGF0ZVxyXG4gICAgLy8gVGhpcyB3aWxsIGZpcnN0IHRyeSB0byByZXNvbHZlIHRoZSBmaWxlIHBhdGggKHNlZSBnZXRQYXRoIGZvciBkZXRhaWxzKVxyXG4gICAgcmVuZGVyQ29uZmlnLmZpbGVuYW1lID0gZ2V0UGF0aChmaWxlbmFtZSwgcmVuZGVyQ29uZmlnKTtcclxuICAgIHJldHVybiB0cnlIYW5kbGVDYWNoZShkYXRhLCByZW5kZXJDb25maWcsIGNhbGxiYWNrKTtcclxufVxyXG5mdW5jdGlvbiByZW5kZXJGaWxlQXN5bmMoZmlsZW5hbWUsIGRhdGEsIGNvbmZpZywgY2IpIHtcclxuICAgIHJldHVybiByZW5kZXJGaWxlKGZpbGVuYW1lLCB0eXBlb2YgY29uZmlnID09PSAnZnVuY3Rpb24nID8gX19hc3NpZ24oX19hc3NpZ24oe30sIGRhdGEpLCB7IGFzeW5jOiB0cnVlIH0pIDogZGF0YSwgdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgPyBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgY29uZmlnKSwgeyBhc3luYzogdHJ1ZSB9KSA6IGNvbmZpZywgY2IpO1xyXG59XG5cbi8qIEVORCBUWVBFUyAqL1xyXG4vKipcclxuICogQ2FsbGVkIHdpdGggYGluY2x1ZGVGaWxlKHBhdGgsIGRhdGEpYFxyXG4gKi9cclxuZnVuY3Rpb24gaW5jbHVkZUZpbGVIZWxwZXIocGF0aCwgZGF0YSkge1xyXG4gICAgdmFyIHRlbXBsYXRlQW5kQ29uZmlnID0gaW5jbHVkZUZpbGUocGF0aCwgdGhpcyk7XHJcbiAgICByZXR1cm4gdGVtcGxhdGVBbmRDb25maWdbMF0oZGF0YSwgdGVtcGxhdGVBbmRDb25maWdbMV0pO1xyXG59XG5cbi8qIEVORCBUWVBFUyAqL1xyXG5mdW5jdGlvbiBoYW5kbGVDYWNoZSh0ZW1wbGF0ZSwgb3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMuY2FjaGUgJiYgb3B0aW9ucy5uYW1lICYmIG9wdGlvbnMudGVtcGxhdGVzLmdldChvcHRpb25zLm5hbWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudGVtcGxhdGVzLmdldChvcHRpb25zLm5hbWUpO1xyXG4gICAgfVxyXG4gICAgdmFyIHRlbXBsYXRlRnVuYyA9IHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IHRlbXBsYXRlIDogY29tcGlsZSh0ZW1wbGF0ZSwgb3B0aW9ucyk7XHJcbiAgICAvLyBOb3RlIHRoYXQgd2UgZG9uJ3QgaGF2ZSB0byBjaGVjayBpZiBpdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgY2FjaGU7XHJcbiAgICAvLyBpdCB3b3VsZCBoYXZlIHJldHVybmVkIGVhcmxpZXIgaWYgaXQgaGFkXHJcbiAgICBpZiAob3B0aW9ucy5jYWNoZSAmJiBvcHRpb25zLm5hbWUpIHtcclxuICAgICAgICBvcHRpb25zLnRlbXBsYXRlcy5kZWZpbmUob3B0aW9ucy5uYW1lLCB0ZW1wbGF0ZUZ1bmMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRlbXBsYXRlRnVuYztcclxufVxyXG4vKipcclxuICogUmVuZGVyIGEgdGVtcGxhdGVcclxuICpcclxuICogSWYgYHRlbXBsYXRlYCBpcyBhIHN0cmluZywgRXRhIHdpbGwgY29tcGlsZSBpdCB0byBhIGZ1bmN0aW9uIGFuZCB0aGVuIGNhbGwgaXQgd2l0aCB0aGUgcHJvdmlkZWQgZGF0YS5cclxuICogSWYgYHRlbXBsYXRlYCBpcyBhIHRlbXBsYXRlIGZ1bmN0aW9uLCBFdGEgd2lsbCBjYWxsIGl0IHdpdGggdGhlIHByb3ZpZGVkIGRhdGEuXHJcbiAqXHJcbiAqIElmIGBjb25maWcuYXN5bmNgIGlzIGBmYWxzZWAsIEV0YSB3aWxsIHJldHVybiB0aGUgcmVuZGVyZWQgdGVtcGxhdGUuXHJcbiAqXHJcbiAqIElmIGBjb25maWcuYXN5bmNgIGlzIGB0cnVlYCBhbmQgdGhlcmUncyBhIGNhbGxiYWNrIGZ1bmN0aW9uLCBFdGEgd2lsbCBjYWxsIHRoZSBjYWxsYmFjayB3aXRoIGAoZXJyLCByZW5kZXJlZFRlbXBsYXRlKWAuXHJcbiAqIElmIGBjb25maWcuYXN5bmNgIGlzIGB0cnVlYCBhbmQgdGhlcmUncyBub3QgYSBjYWxsYmFjayBmdW5jdGlvbiwgRXRhIHdpbGwgcmV0dXJuIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByZW5kZXJlZCB0ZW1wbGF0ZS5cclxuICpcclxuICogSWYgYGNvbmZpZy5jYWNoZWAgaXMgYHRydWVgIGFuZCBgY29uZmlnYCBoYXMgYSBgbmFtZWAgb3IgYGZpbGVuYW1lYCBwcm9wZXJ0eSwgRXRhIHdpbGwgY2FjaGUgdGhlIHRlbXBsYXRlIG9uIHRoZSBmaXJzdCByZW5kZXIgYW5kIHVzZSB0aGUgY2FjaGVkIHRlbXBsYXRlIGZvciBhbGwgc3Vic2VxdWVudCByZW5kZXJzLlxyXG4gKlxyXG4gKiBAcGFyYW0gdGVtcGxhdGUgVGVtcGxhdGUgc3RyaW5nIG9yIHRlbXBsYXRlIGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSBkYXRhIERhdGEgdG8gcmVuZGVyIHRoZSB0ZW1wbGF0ZSB3aXRoXHJcbiAqIEBwYXJhbSBjb25maWcgT3B0aW9uYWwgY29uZmlnIG9wdGlvbnNcclxuICogQHBhcmFtIGNiIENhbGxiYWNrIGZ1bmN0aW9uXHJcbiAqL1xyXG5mdW5jdGlvbiByZW5kZXIodGVtcGxhdGUsIGRhdGEsIGNvbmZpZywgY2IpIHtcclxuICAgIHZhciBvcHRpb25zID0gZ2V0Q29uZmlnKGNvbmZpZyB8fCB7fSk7XHJcbiAgICBpZiAob3B0aW9ucy5hc3luYykge1xyXG4gICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAvLyBJZiB1c2VyIHBhc3NlcyBjYWxsYmFja1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgLy8gTm90ZTogaWYgdGhlcmUgaXMgYW4gZXJyb3Igd2hpbGUgcmVuZGVyaW5nIHRoZSB0ZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIC8vIEl0IHdpbGwgYnViYmxlIHVwIGFuZCBiZSBjYXVnaHQgaGVyZVxyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlRm4gPSBoYW5kbGVDYWNoZSh0ZW1wbGF0ZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZUZuKGRhdGEsIG9wdGlvbnMsIGNiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2IoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gTm8gY2FsbGJhY2ssIHRyeSByZXR1cm5pbmcgYSBwcm9taXNlXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvbWlzZUltcGwgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgcHJvbWlzZUltcGwoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoaGFuZGxlQ2FjaGUodGVtcGxhdGUsIG9wdGlvbnMpKGRhdGEsIG9wdGlvbnMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEV0YUVycihcIlBsZWFzZSBwcm92aWRlIGEgY2FsbGJhY2sgZnVuY3Rpb24sIHRoaXMgZW52IGRvZXNuJ3Qgc3VwcG9ydCBQcm9taXNlc1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBoYW5kbGVDYWNoZSh0ZW1wbGF0ZSwgb3B0aW9ucykoZGF0YSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIFJlbmRlciBhIHRlbXBsYXRlIGFzeW5jaHJvbm91c2x5XHJcbiAqXHJcbiAqIElmIGB0ZW1wbGF0ZWAgaXMgYSBzdHJpbmcsIEV0YSB3aWxsIGNvbXBpbGUgaXQgdG8gYSBmdW5jdGlvbiBhbmQgY2FsbCBpdCB3aXRoIHRoZSBwcm92aWRlZCBkYXRhLlxyXG4gKiBJZiBgdGVtcGxhdGVgIGlzIGEgZnVuY3Rpb24sIEV0YSB3aWxsIGNhbGwgaXQgd2l0aCB0aGUgcHJvdmlkZWQgZGF0YS5cclxuICpcclxuICogSWYgdGhlcmUgaXMgYSBjYWxsYmFjayBmdW5jdGlvbiwgRXRhIHdpbGwgY2FsbCBpdCB3aXRoIGAoZXJyLCByZW5kZXJlZFRlbXBsYXRlKWAuXHJcbiAqIElmIHRoZXJlIGlzIG5vdCBhIGNhbGxiYWNrIGZ1bmN0aW9uLCBFdGEgd2lsbCByZXR1cm4gYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJlbmRlcmVkIHRlbXBsYXRlXHJcbiAqXHJcbiAqIEBwYXJhbSB0ZW1wbGF0ZSBUZW1wbGF0ZSBzdHJpbmcgb3IgdGVtcGxhdGUgZnVuY3Rpb25cclxuICogQHBhcmFtIGRhdGEgRGF0YSB0byByZW5kZXIgdGhlIHRlbXBsYXRlIHdpdGhcclxuICogQHBhcmFtIGNvbmZpZyBPcHRpb25hbCBjb25maWcgb3B0aW9uc1xyXG4gKiBAcGFyYW0gY2IgQ2FsbGJhY2sgZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIHJlbmRlckFzeW5jKHRlbXBsYXRlLCBkYXRhLCBjb25maWcsIGNiKSB7XHJcbiAgICAvLyBVc2luZyBPYmplY3QuYXNzaWduIHRvIGxvd2VyIGJ1bmRsZSBzaXplLCB1c2luZyBzcHJlYWQgb3BlcmF0b3IgbWFrZXMgaXQgbGFyZ2VyIGJlY2F1c2Ugb2YgdHlwZXNjcmlwdCBpbmplY3RlZCBwb2x5ZmlsbHNcclxuICAgIHJldHVybiByZW5kZXIodGVtcGxhdGUsIGRhdGEsIE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZywgeyBhc3luYzogdHJ1ZSB9KSwgY2IpO1xyXG59XG5cbi8vIEBkZW5vaWZ5LWlnbm9yZVxyXG5jb25maWcuaW5jbHVkZUZpbGUgPSBpbmNsdWRlRmlsZUhlbHBlcjtcclxuY29uZmlnLmZpbGVwYXRoQ2FjaGUgPSB7fTtcblxuZXhwb3J0IHsgcmVuZGVyRmlsZSBhcyBfX2V4cHJlc3MsIGNvbXBpbGUsIGNvbXBpbGVUb1N0cmluZywgY29uZmlnLCBjb25maWd1cmUsIGNvbmZpZyBhcyBkZWZhdWx0Q29uZmlnLCBnZXRDb25maWcsIGxvYWRGaWxlLCBwYXJzZSwgcmVuZGVyLCByZW5kZXJBc3luYywgcmVuZGVyRmlsZSwgcmVuZGVyRmlsZUFzeW5jLCB0ZW1wbGF0ZXMgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV0YS5lcy5qcy5tYXBcbiIsImltcG9ydCBUZW1wbGF0ZXJQbHVnaW4gZnJvbSBcIm1haW5cIjtcbmltcG9ydCB7IEFwcCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgUnVubmluZ0NvbmZpZyB9IGZyb20gXCJUZW1wbGF0ZXJcIjtcbmltcG9ydCB7IFRQYXJzZXIgfSBmcm9tIFwiVFBhcnNlclwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSW50ZXJuYWxNb2R1bGUgaW1wbGVtZW50cyBUUGFyc2VyIHtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgbmFtZTogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBzdGF0aWNfdGVtcGxhdGVzOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcCgpO1xuICAgIHByb3RlY3RlZCBkeW5hbWljX3RlbXBsYXRlczogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXAoKTtcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBSdW5uaW5nQ29uZmlnO1xuICAgIHByaXZhdGUgc3RhdGljX2NvbnRleHQ6IHtbeDogc3RyaW5nXTogYW55fTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhcHA6IEFwcCwgcHJvdGVjdGVkIHBsdWdpbjogVGVtcGxhdGVyUGx1Z2luKSB7fVxuXG4gICAgZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lXG4gICAgfVxuXG4gICAgYWJzdHJhY3QgY3JlYXRlU3RhdGljVGVtcGxhdGVzKCk6IFByb21pc2U8dm9pZD47XG4gICAgYWJzdHJhY3QgdXBkYXRlVGVtcGxhdGVzKCk6IFByb21pc2U8dm9pZD47XG5cbiAgICBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVN0YXRpY1RlbXBsYXRlcygpO1xuICAgICAgICB0aGlzLnN0YXRpY19jb250ZXh0ID0gT2JqZWN0LmZyb21FbnRyaWVzKHRoaXMuc3RhdGljX3RlbXBsYXRlcyk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2VuZXJhdGVDb250ZXh0KGNvbmZpZzogUnVubmluZ0NvbmZpZyk6IFByb21pc2U8e1t4OiBzdHJpbmddOiBhbnl9PiB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZVRlbXBsYXRlcygpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50aGlzLnN0YXRpY19jb250ZXh0LFxuICAgICAgICAgICAgLi4uT2JqZWN0LmZyb21FbnRyaWVzKHRoaXMuZHluYW1pY190ZW1wbGF0ZXMpLFxuICAgICAgICB9O1xuICAgIH1cbn0iLCJpbXBvcnQgeyBUZW1wbGF0ZXJFcnJvciB9IGZyb20gXCJFcnJvclwiO1xuaW1wb3J0IHsgSW50ZXJuYWxNb2R1bGUgfSBmcm9tIFwiLi4vSW50ZXJuYWxNb2R1bGVcIjtcblxuZXhwb3J0IGNsYXNzIEludGVybmFsTW9kdWxlRGF0ZSBleHRlbmRzIEludGVybmFsTW9kdWxlIHtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJkYXRlXCI7XG5cbiAgICBhc3luYyBjcmVhdGVTdGF0aWNUZW1wbGF0ZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuc3RhdGljX3RlbXBsYXRlcy5zZXQoXCJub3dcIiwgdGhpcy5nZW5lcmF0ZV9ub3coKSk7XG4gICAgICAgIHRoaXMuc3RhdGljX3RlbXBsYXRlcy5zZXQoXCJ0b21vcnJvd1wiLCB0aGlzLmdlbmVyYXRlX3RvbW9ycm93KCkpO1xuICAgICAgICB0aGlzLnN0YXRpY190ZW1wbGF0ZXMuc2V0KFwid2Vla2RheVwiLCB0aGlzLmdlbmVyYXRlX3dlZWtkYXkoKSk7XG4gICAgICAgIHRoaXMuc3RhdGljX3RlbXBsYXRlcy5zZXQoXCJ5ZXN0ZXJkYXlcIiwgdGhpcy5nZW5lcmF0ZV95ZXN0ZXJkYXkoKSk7XG4gICAgfVxuXG4gICAgYXN5bmMgdXBkYXRlVGVtcGxhdGVzKCk6IFByb21pc2U8dm9pZD4ge31cblxuICAgIGdlbmVyYXRlX25vdygpOiBGdW5jdGlvbiB7XG4gICAgICAgIHJldHVybiAoZm9ybWF0OiBzdHJpbmcgPSBcIllZWVktTU0tRERcIiwgb2Zmc2V0PzogbnVtYmVyfHN0cmluZywgcmVmZXJlbmNlPzogc3RyaW5nLCByZWZlcmVuY2VfZm9ybWF0Pzogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVmZXJlbmNlICYmICF3aW5kb3cubW9tZW50KHJlZmVyZW5jZSwgcmVmZXJlbmNlX2Zvcm1hdCkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRlbXBsYXRlckVycm9yKFwiSW52YWxpZCByZWZlcmVuY2UgZGF0ZSBmb3JtYXQsIHRyeSBzcGVjaWZ5aW5nIG9uZSB3aXRoIHRoZSBhcmd1bWVudCAncmVmZXJlbmNlX2Zvcm1hdCdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZHVyYXRpb247XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9mZnNldCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uID0gd2luZG93Lm1vbWVudC5kdXJhdGlvbihvZmZzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9mZnNldCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uID0gd2luZG93Lm1vbWVudC5kdXJhdGlvbihvZmZzZXQsIFwiZGF5c1wiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5tb21lbnQocmVmZXJlbmNlLCByZWZlcmVuY2VfZm9ybWF0KS5hZGQoZHVyYXRpb24pLmZvcm1hdChmb3JtYXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVfdG9tb3Jyb3coKTogRnVuY3Rpb24ge1xuICAgICAgICByZXR1cm4gKGZvcm1hdDogc3RyaW5nID0gXCJZWVlZLU1NLUREXCIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubW9tZW50KCkuYWRkKDEsICdkYXlzJykuZm9ybWF0KGZvcm1hdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZV93ZWVrZGF5KCk6IEZ1bmN0aW9uIHtcbiAgICAgICAgcmV0dXJuIChmb3JtYXQ6IHN0cmluZyA9IFwiWVlZWS1NTS1ERFwiLCB3ZWVrZGF5OiBudW1iZXIsIHJlZmVyZW5jZT86IHN0cmluZywgcmVmZXJlbmNlX2Zvcm1hdD86IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlZmVyZW5jZSAmJiAhd2luZG93Lm1vbWVudChyZWZlcmVuY2UsIHJlZmVyZW5jZV9mb3JtYXQpLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUZW1wbGF0ZXJFcnJvcihcIkludmFsaWQgcmVmZXJlbmNlIGRhdGUgZm9ybWF0LCB0cnkgc3BlY2lmeWluZyBvbmUgd2l0aCB0aGUgYXJndW1lbnQgJ3JlZmVyZW5jZV9mb3JtYXQnXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5tb21lbnQocmVmZXJlbmNlLCByZWZlcmVuY2VfZm9ybWF0KS53ZWVrZGF5KHdlZWtkYXkpLmZvcm1hdChmb3JtYXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVfeWVzdGVyZGF5KCk6IEZ1bmN0aW9uIHtcbiAgICAgICAgcmV0dXJuIChmb3JtYXQ6IHN0cmluZyA9IFwiWVlZWS1NTS1ERFwiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93Lm1vbWVudCgpLmFkZCgtMSwgJ2RheXMnKS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBJbnRlcm5hbE1vZHVsZSB9IGZyb20gXCIuLi9JbnRlcm5hbE1vZHVsZVwiO1xuXG5pbXBvcnQgeyBGaWxlU3lzdGVtQWRhcHRlciwgZ2V0QWxsVGFncywgTWFya2Rvd25WaWV3LCBub3JtYWxpemVQYXRoLCBwYXJzZUxpbmt0ZXh0LCBQbGF0Zm9ybSwgcmVzb2x2ZVN1YnBhdGgsIFRGaWxlLCBURm9sZGVyIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBVTlNVUFBPUlRFRF9NT0JJTEVfVEVNUExBVEUgfSBmcm9tIFwiQ29uc3RhbnRzXCI7XG5pbXBvcnQgeyBUZW1wbGF0ZXJFcnJvciB9IGZyb20gXCJFcnJvclwiO1xuXG5leHBvcnQgY29uc3QgREVQVEhfTElNSVQgPSAxMDtcblxuZXhwb3J0IGNsYXNzIEludGVybmFsTW9kdWxlRmlsZSBleHRlbmRzIEludGVybmFsTW9kdWxlIHtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJmaWxlXCI7XG4gICAgcHJpdmF0ZSBpbmNsdWRlX2RlcHRoOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgY3JlYXRlX25ld19kZXB0aDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGxpbmtwYXRoX3JlZ2V4OiBSZWdFeHAgPSBuZXcgUmVnRXhwKFwiXlxcXFxbXFxcXFsoLiopXFxcXF1cXFxcXSRcIik7XG5cbiAgICBhc3luYyBjcmVhdGVTdGF0aWNUZW1wbGF0ZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuc3RhdGljX3RlbXBsYXRlcy5zZXQoXCJjcmVhdGlvbl9kYXRlXCIsIHRoaXMuZ2VuZXJhdGVfY3JlYXRpb25fZGF0ZSgpKTtcbiAgICAgICAgdGhpcy5zdGF0aWNfdGVtcGxhdGVzLnNldChcImNyZWF0ZV9uZXdcIiwgdGhpcy5nZW5lcmF0ZV9jcmVhdGVfbmV3KCkpO1xuICAgICAgICB0aGlzLnN0YXRpY190ZW1wbGF0ZXMuc2V0KFwiY3Vyc29yXCIsIHRoaXMuZ2VuZXJhdGVfY3Vyc29yKCkpO1xuICAgICAgICB0aGlzLnN0YXRpY190ZW1wbGF0ZXMuc2V0KFwiY3Vyc29yX2FwcGVuZFwiLCB0aGlzLmdlbmVyYXRlX2N1cnNvcl9hcHBlbmQoKSk7XG4gICAgICAgIHRoaXMuc3RhdGljX3RlbXBsYXRlcy5zZXQoXCJleGlzdHNcIiwgdGhpcy5nZW5lcmF0ZV9leGlzdHMoKSk7XG4gICAgICAgIHRoaXMuc3RhdGljX3RlbXBsYXRlcy5zZXQoXCJmaW5kX3RmaWxlXCIsIHRoaXMuZ2VuZXJhdGVfZmluZF90ZmlsZSgpKTtcbiAgICAgICAgdGhpcy5zdGF0aWNfdGVtcGxhdGVzLnNldChcImZvbGRlclwiLCB0aGlzLmdlbmVyYXRlX2ZvbGRlcigpKTtcbiAgICAgICAgdGhpcy5zdGF0aWNfdGVtcGxhdGVzLnNldChcImluY2x1ZGVcIiwgdGhpcy5nZW5lcmF0ZV9pbmNsdWRlKCkpO1xuICAgICAgICB0aGlzLnN0YXRpY190ZW1wbGF0ZXMuc2V0KFwibGFzdF9tb2RpZmllZF9kYXRlXCIsIHRoaXMuZ2VuZXJhdGVfbGFzdF9tb2RpZmllZF9kYXRlKCkpO1xuICAgICAgICB0aGlzLnN0YXRpY190ZW1wbGF0ZXMuc2V0KFwibW92ZVwiLCB0aGlzLmdlbmVyYXRlX21vdmUoKSk7XG4gICAgICAgIHRoaXMuc3RhdGljX3RlbXBsYXRlcy5zZXQoXCJwYXRoXCIsIHRoaXMuZ2VuZXJhdGVfcGF0aCgpKTtcbiAgICAgICAgdGhpcy5zdGF0aWNfdGVtcGxhdGVzLnNldChcInJlbmFtZVwiLCB0aGlzLmdlbmVyYXRlX3JlbmFtZSgpKTtcbiAgICAgICAgdGhpcy5zdGF0aWNfdGVtcGxhdGVzLnNldChcInNlbGVjdGlvblwiLCB0aGlzLmdlbmVyYXRlX3NlbGVjdGlvbigpKTtcbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGVUZW1wbGF0ZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuZHluYW1pY190ZW1wbGF0ZXMuc2V0KFwiY29udGVudFwiLCBhd2FpdCB0aGlzLmdlbmVyYXRlX2NvbnRlbnQoKSk7XG4gICAgICAgIHRoaXMuZHluYW1pY190ZW1wbGF0ZXMuc2V0KFwidGFnc1wiLCB0aGlzLmdlbmVyYXRlX3RhZ3MoKSk7XG4gICAgICAgIHRoaXMuZHluYW1pY190ZW1wbGF0ZXMuc2V0KFwidGl0bGVcIiwgdGhpcy5nZW5lcmF0ZV90aXRsZSgpKTtcbiAgICB9IFxuXG4gICAgYXN5bmMgZ2VuZXJhdGVfY29udGVudCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZCh0aGlzLmNvbmZpZy50YXJnZXRfZmlsZSk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVfY3JlYXRlX25ldygpOiBGdW5jdGlvbiB7XG4gICAgICAgIHJldHVybiBhc3luYyAodGVtcGxhdGU6IFRGaWxlIHwgc3RyaW5nLCBmaWxlbmFtZT86IHN0cmluZywgb3Blbl9uZXc6IGJvb2xlYW4gPSBmYWxzZSwgZm9sZGVyPzogVEZvbGRlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVfbmV3X2RlcHRoICs9IDE7XG4gICAgICAgICAgICBpZiAodGhpcy5jcmVhdGVfbmV3X2RlcHRoID4gREVQVEhfTElNSVQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZV9uZXdfZGVwdGggPSAwO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUZW1wbGF0ZXJFcnJvcihcIlJlYWNoZWQgY3JlYXRlX25ldyBkZXB0aCBsaW1pdCAobWF4ID0gMTApXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBuZXdfZmlsZSA9IGF3YWl0IHRoaXMucGx1Z2luLnRlbXBsYXRlci5jcmVhdGVfbmV3X25vdGVfZnJvbV90ZW1wbGF0ZSh0ZW1wbGF0ZSwgZm9sZGVyLCBmaWxlbmFtZSwgb3Blbl9uZXcpXG5cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlX25ld19kZXB0aCAtPSAxO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3X2ZpbGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZV9jcmVhdGlvbl9kYXRlKCk6IEZ1bmN0aW9uIHtcbiAgICAgICAgcmV0dXJuIChmb3JtYXQ6IHN0cmluZyA9IFwiWVlZWS1NTS1ERCBISDptbVwiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93Lm1vbWVudCh0aGlzLmNvbmZpZy50YXJnZXRfZmlsZS5zdGF0LmN0aW1lKS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlX2N1cnNvcigpOiBGdW5jdGlvbiB7XG4gICAgICAgIHJldHVybiAob3JkZXI/OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIC8vIEhhY2sgdG8gcHJldmVudCBlbXB0eSBvdXRwdXRcbiAgICAgICAgICAgIHJldHVybiBgPCUgdHAuZmlsZS5jdXJzb3IoJHtvcmRlciA/PyAnJ30pICU+YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlX2N1cnNvcl9hcHBlbmQoKTogRnVuY3Rpb24ge1xuICAgICAgICByZXR1cm4gKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVfdmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG4gICAgICAgICAgICBpZiAoYWN0aXZlX3ZpZXcgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5sb2dfZXJyb3IobmV3IFRlbXBsYXRlckVycm9yKFwiTm8gYWN0aXZlIHZpZXcsIGNhbid0IGFwcGVuZCB0byBjdXJzb3IuXCIpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGVkaXRvciA9IGFjdGl2ZV92aWV3LmVkaXRvcjtcbiAgICAgICAgICAgIGNvbnN0IGRvYyA9IGVkaXRvci5nZXREb2MoKTtcbiAgICAgICAgICAgIGRvYy5yZXBsYWNlU2VsZWN0aW9uKGNvbnRlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZV9leGlzdHMoKTogRnVuY3Rpb24ge1xuICAgICAgICByZXR1cm4gKGZpbGVuYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSB0aGlzLCBvbmx5IGhlcmUgdG8gc3VwcG9ydCB0aGUgb2xkIHdheVxuICAgICAgICAgICAgbGV0IG1hdGNoO1xuICAgICAgICAgICAgaWYgKChtYXRjaCA9IHRoaXMubGlua3BhdGhfcmVnZXguZXhlYyhmaWxlbmFtZSkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZmlsZW5hbWUgPSBtYXRjaFsxXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZmlsZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Rmlyc3RMaW5rcGF0aERlc3QoZmlsZW5hbWUsIFwiXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZpbGUgIT0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlX2ZpbmRfdGZpbGUoKTogRnVuY3Rpb24ge1xuICAgICAgICByZXR1cm4gKGZpbGVuYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBub3JtYWxpemVQYXRoKGZpbGVuYW1lKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpcnN0TGlua3BhdGhEZXN0KHBhdGgsIFwiXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVfZm9sZGVyKCk6IEZ1bmN0aW9uIHtcbiAgICAgICAgcmV0dXJuIChyZWxhdGl2ZTogYm9vbGVhbiA9IGZhbHNlKSA9PiB7XG4gICAgICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5jb25maWcudGFyZ2V0X2ZpbGUucGFyZW50O1xuICAgICAgICAgICAgbGV0IGZvbGRlcjtcblxuICAgICAgICAgICAgaWYgKHJlbGF0aXZlKSB7XG4gICAgICAgICAgICAgICAgZm9sZGVyID0gcGFyZW50LnBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb2xkZXIgPSBwYXJlbnQubmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGZvbGRlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlX2luY2x1ZGUoKTogRnVuY3Rpb24ge1xuICAgICAgICByZXR1cm4gYXN5bmMgKGluY2x1ZGVfbGluazogc3RyaW5nIHwgVEZpbGUpID0+IHtcbiAgICAgICAgICAgIC8vIFRPRE86IEFkZCBtdXRleCBmb3IgdGhpcywgdGhpcyBtYXkgY3VycmVudGx5IGxlYWQgdG8gYSByYWNlIGNvbmRpdGlvbi4gXG4gICAgICAgICAgICAvLyBXaGlsZSBub3QgdmVyeSBpbXBhY3RmdWwsIHRoYXQgY291bGQgc3RpbGwgYmUgYW5ub3lpbmcuXG4gICAgICAgICAgICB0aGlzLmluY2x1ZGVfZGVwdGggKz0gMTtcbiAgICAgICAgICAgIGlmICh0aGlzLmluY2x1ZGVfZGVwdGggPiBERVBUSF9MSU1JVCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jbHVkZV9kZXB0aCA9IDA7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRlbXBsYXRlckVycm9yKFwiUmVhY2hlZCBpbmNsdXNpb24gZGVwdGggbGltaXQgKG1heCA9IDEwKVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGluY19maWxlX2NvbnRlbnQ6IHN0cmluZztcblxuICAgICAgICAgICAgaWYgKGluY2x1ZGVfbGluayBpbnN0YW5jZW9mIFRGaWxlKSB7XG4gICAgICAgICAgICAgICAgaW5jX2ZpbGVfY29udGVudCA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQoaW5jbHVkZV9saW5rKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoO1xuICAgICAgICAgICAgICAgIGlmICgobWF0Y2ggPSB0aGlzLmxpbmtwYXRoX3JlZ2V4LmV4ZWMoaW5jbHVkZV9saW5rKSkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRlbXBsYXRlckVycm9yKFwiSW52YWxpZCBmaWxlIGZvcm1hdCwgcHJvdmlkZSBhbiBvYnNpZGlhbiBsaW5rIGJldHdlZW4gcXVvdGVzLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qge3BhdGgsIHN1YnBhdGh9ID0gcGFyc2VMaW5rdGV4dChtYXRjaFsxXSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbmNfZmlsZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Rmlyc3RMaW5rcGF0aERlc3QocGF0aCwgXCJcIik7XG4gICAgICAgICAgICAgICAgaWYgKCFpbmNfZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVGVtcGxhdGVyRXJyb3IoYEZpbGUgJHtpbmNsdWRlX2xpbmt9IGRvZXNuJ3QgZXhpc3RgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5jX2ZpbGVfY29udGVudCA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQoaW5jX2ZpbGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN1YnBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FjaGUgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShpbmNfZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzb2x2ZVN1YnBhdGgoY2FjaGUsIHN1YnBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY19maWxlX2NvbnRlbnQgPSBpbmNfZmlsZV9jb250ZW50LnNsaWNlKHJlc3VsdC5zdGFydC5vZmZzZXQsIHJlc3VsdC5lbmQ/Lm9mZnNldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICBjb25zdCBwYXJzZWRfY29udGVudCA9IGF3YWl0IHRoaXMucGx1Z2luLnRlbXBsYXRlci5wYXJzZXIucGFyc2VUZW1wbGF0ZXMoaW5jX2ZpbGVfY29udGVudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuaW5jbHVkZV9kZXB0aCAtPSAxO1xuICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBwYXJzZWRfY29udGVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlX2xhc3RfbW9kaWZpZWRfZGF0ZSgpOiBGdW5jdGlvbiB7XG4gICAgICAgIHJldHVybiAoZm9ybWF0OiBzdHJpbmcgPSBcIllZWVktTU0tREQgSEg6bW1cIik6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93Lm1vbWVudCh0aGlzLmNvbmZpZy50YXJnZXRfZmlsZS5zdGF0Lm10aW1lKS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlX21vdmUoKTogRnVuY3Rpb24ge1xuICAgICAgICByZXR1cm4gYXN5bmMgKHBhdGg6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3X3BhdGggPSBub3JtYWxpemVQYXRoKGAke3BhdGh9LiR7dGhpcy5jb25maWcudGFyZ2V0X2ZpbGUuZXh0ZW5zaW9ufWApO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHAuZmlsZU1hbmFnZXIucmVuYW1lRmlsZSh0aGlzLmNvbmZpZy50YXJnZXRfZmlsZSwgbmV3X3BhdGgpO1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZV9wYXRoKCk6IEZ1bmN0aW9uIHtcbiAgICAgICAgcmV0dXJuIChyZWxhdGl2ZTogYm9vbGVhbiA9IGZhbHNlKSA9PiB7XG4gICAgICAgICAgICAvLyBUT0RPOiBBZGQgbW9iaWxlIHN1cHBvcnRcbiAgICAgICAgICAgIGlmIChQbGF0Zm9ybS5pc01vYmlsZUFwcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBVTlNVUFBPUlRFRF9NT0JJTEVfVEVNUExBVEU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoISh0aGlzLmFwcC52YXVsdC5hZGFwdGVyIGluc3RhbmNlb2YgRmlsZVN5c3RlbUFkYXB0ZXIpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRlbXBsYXRlckVycm9yKFwiYXBwLnZhdWx0IGlzIG5vdCBhIEZpbGVTeXN0ZW1BZGFwdGVyIGluc3RhbmNlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdmF1bHRfcGF0aCA9IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIuZ2V0QmFzZVBhdGgoKTtcblxuICAgICAgICAgICAgaWYgKHJlbGF0aXZlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnRhcmdldF9maWxlLnBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7dmF1bHRfcGF0aH0vJHt0aGlzLmNvbmZpZy50YXJnZXRfZmlsZS5wYXRofWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZV9yZW5hbWUoKTogRnVuY3Rpb24ge1xuICAgICAgICByZXR1cm4gYXN5bmMgKG5ld190aXRsZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAobmV3X3RpdGxlLm1hdGNoKC9bXFxcXFxcLzpdKy9nKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUZW1wbGF0ZXJFcnJvcihcIkZpbGUgbmFtZSBjYW5ub3QgY29udGFpbiBhbnkgb2YgdGhlc2UgY2hhcmFjdGVyczogXFxcXCAvIDpcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBuZXdfcGF0aCA9IG5vcm1hbGl6ZVBhdGgoYCR7dGhpcy5jb25maWcudGFyZ2V0X2ZpbGUucGFyZW50LnBhdGh9LyR7bmV3X3RpdGxlfS4ke3RoaXMuY29uZmlnLnRhcmdldF9maWxlLmV4dGVuc2lvbn1gKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwLmZpbGVNYW5hZ2VyLnJlbmFtZUZpbGUodGhpcy5jb25maWcudGFyZ2V0X2ZpbGUsIG5ld19wYXRoKTtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVfc2VsZWN0aW9uKCk6IEZ1bmN0aW9uIHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZV92aWV3ID0gdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZVZpZXdPZlR5cGUoTWFya2Rvd25WaWV3KTtcbiAgICAgICAgICAgIGlmIChhY3RpdmVfdmlldyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRlbXBsYXRlckVycm9yKFwiQWN0aXZlIHZpZXcgaXMgbnVsbCwgY2FuJ3QgcmVhZCBzZWxlY3Rpb24uXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBlZGl0b3IgPSBhY3RpdmVfdmlldy5lZGl0b3I7XG4gICAgICAgICAgICByZXR1cm4gZWRpdG9yLmdldFNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE9ETzogVHVybiB0aGlzIGludG8gYSBmdW5jdGlvblxuICAgIGdlbmVyYXRlX3RhZ3MoKTogc3RyaW5nW10ge1xuICAgICAgICBjb25zdCBjYWNoZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKHRoaXMuY29uZmlnLnRhcmdldF9maWxlKTtcbiAgICAgICAgcmV0dXJuIGdldEFsbFRhZ3MoY2FjaGUpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IFR1cm4gdGhpcyBpbnRvIGEgZnVuY3Rpb25cbiAgICBnZW5lcmF0ZV90aXRsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudGFyZ2V0X2ZpbGUuYmFzZW5hbWU7XG4gICAgfVxufSIsImltcG9ydCB7IFRlbXBsYXRlckVycm9yIH0gZnJvbSBcIkVycm9yXCI7XG5pbXBvcnQgeyBJbnRlcm5hbE1vZHVsZSB9IGZyb20gXCIuLi9JbnRlcm5hbE1vZHVsZVwiO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxNb2R1bGVXZWIgZXh0ZW5kcyBJbnRlcm5hbE1vZHVsZSB7XG4gICAgbmFtZSA9IFwid2ViXCI7XG5cbiAgICBhc3luYyBjcmVhdGVTdGF0aWNUZW1wbGF0ZXMoKSB7XG4gICAgICAgIHRoaXMuc3RhdGljX3RlbXBsYXRlcy5zZXQoXCJkYWlseV9xdW90ZVwiLCB0aGlzLmdlbmVyYXRlX2RhaWx5X3F1b3RlKCkpO1xuICAgICAgICB0aGlzLnN0YXRpY190ZW1wbGF0ZXMuc2V0KFwicmFuZG9tX3BpY3R1cmVcIiwgdGhpcy5nZW5lcmF0ZV9yYW5kb21fcGljdHVyZSgpKTtcbiAgICAgICAgLy90aGlzLnN0YXRpY190ZW1wbGF0ZXMuc2V0KFwiZ2V0X3JlcXVlc3RcIiwgdGhpcy5nZW5lcmF0ZV9nZXRfcmVxdWVzdCgpKTtcbiAgICB9XG4gICAgXG4gICAgYXN5bmMgdXBkYXRlVGVtcGxhdGVzKCkge31cblxuICAgIGFzeW5jIGdldFJlcXVlc3QodXJsOiBzdHJpbmcpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUZW1wbGF0ZXJFcnJvcihcIkVycm9yIHBlcmZvcm1pbmcgR0VUIHJlcXVlc3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIGdlbmVyYXRlX2RhaWx5X3F1b3RlKCkge1xuICAgICAgICByZXR1cm4gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5nZXRSZXF1ZXN0KFwiaHR0cHM6Ly9xdW90ZXMucmVzdC9xb2RcIik7XG4gICAgICAgICAgICBsZXQganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgICAgICAgICAgbGV0IGF1dGhvciA9IGpzb24uY29udGVudHMucXVvdGVzWzBdLmF1dGhvcjtcbiAgICAgICAgICAgIGxldCBxdW90ZSA9IGpzb24uY29udGVudHMucXVvdGVzWzBdLnF1b3RlO1xuICAgICAgICAgICAgbGV0IG5ld19jb250ZW50ID0gYD4gJHtxdW90ZX1cXG4+ICZtZGFzaDsgPGNpdGU+JHthdXRob3J9PC9jaXRlPmA7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdfY29udGVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlX3JhbmRvbV9waWN0dXJlKCkge1xuICAgICAgICByZXR1cm4gYXN5bmMgKHNpemU6IHN0cmluZywgcXVlcnk/OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZ2V0UmVxdWVzdChgaHR0cHM6Ly9zb3VyY2UudW5zcGxhc2guY29tL3JhbmRvbS8ke3NpemUgPz8gJyd9PyR7cXVlcnkgPz8gJyd9YCk7XG4gICAgICAgICAgICBsZXQgdXJsID0gcmVzcG9uc2UudXJsO1xuICAgICAgICAgICAgcmV0dXJuIGAhW3RwLndlYi5yYW5kb21fcGljdHVyZV0oJHt1cmx9KWA7ICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZV9nZXRfcmVxdWVzdCgpIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jICh1cmw6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5nZXRSZXF1ZXN0KHVybCk7XG4gICAgICAgICAgICBsZXQganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IEludGVybmFsTW9kdWxlIH0gZnJvbSBcIi4uL0ludGVybmFsTW9kdWxlXCI7XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbE1vZHVsZUZyb250bWF0dGVyIGV4dGVuZHMgSW50ZXJuYWxNb2R1bGUge1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcImZyb250bWF0dGVyXCI7XG5cbiAgICBhc3luYyBjcmVhdGVTdGF0aWNUZW1wbGF0ZXMoKTogUHJvbWlzZTx2b2lkPiB7fVxuXG4gICAgYXN5bmMgdXBkYXRlVGVtcGxhdGVzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBjYWNoZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKHRoaXMuY29uZmlnLnRhcmdldF9maWxlKVxuICAgICAgICB0aGlzLmR5bmFtaWNfdGVtcGxhdGVzID0gbmV3IE1hcChPYmplY3QuZW50cmllcyhjYWNoZT8uZnJvbnRtYXR0ZXIgfHwge30pKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgVGVtcGxhdGVyRXJyb3IgfSBmcm9tIFwiRXJyb3JcIjtcbmltcG9ydCB7IEFwcCwgTW9kYWwgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuZXhwb3J0IGNsYXNzIFByb21wdE1vZGFsIGV4dGVuZHMgTW9kYWwge1xuICAgIHByaXZhdGUgcHJvbXB0RWw6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSByZXNvbHZlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgICBwcml2YXRlIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZDtcbiAgICBwcml2YXRlIHN1Ym1pdHRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHByaXZhdGUgcHJvbXB0X3RleHQ6IHN0cmluZywgcHJpdmF0ZSBkZWZhdWx0X3ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoYXBwKTtcbiAgICB9XG5cbiAgICBvbk9wZW4oKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGl0bGVFbC5zZXRUZXh0KHRoaXMucHJvbXB0X3RleHQpO1xuICAgICAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcbiAgICB9XG5cbiAgICBvbkNsb3NlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpO1xuICAgICAgICBpZiAoIXRoaXMuc3VibWl0dGVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlamVjdChuZXcgVGVtcGxhdGVyRXJyb3IoXCJDYW5jZWxsZWQgcHJvbXB0XCIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZUZvcm0oKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRpdiA9IHRoaXMuY29udGVudEVsLmNyZWF0ZURpdigpO1xuICAgICAgICBkaXYuYWRkQ2xhc3MoXCJ0ZW1wbGF0ZXItcHJvbXB0LWRpdlwiKTtcblxuICAgICAgICBjb25zdCBmb3JtID0gZGl2LmNyZWF0ZUVsKFwiZm9ybVwiKTtcbiAgICAgICAgZm9ybS5hZGRDbGFzcyhcInRlbXBsYXRlci1wcm9tcHQtZm9ybVwiKTtcbiAgICAgICAgZm9ybS50eXBlID0gXCJzdWJtaXRcIjtcbiAgICAgICAgZm9ybS5vbnN1Ym1pdCA9IChlOiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdWJtaXR0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlKHRoaXMucHJvbXB0RWwudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcm9tcHRFbCA9IGZvcm0uY3JlYXRlRWwoXCJpbnB1dFwiKTtcbiAgICAgICAgdGhpcy5wcm9tcHRFbC50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgIHRoaXMucHJvbXB0RWwucGxhY2Vob2xkZXIgPSBcIlR5cGUgdGV4dCBoZXJlLi4uXCI7XG4gICAgICAgIHRoaXMucHJvbXB0RWwudmFsdWUgPSB0aGlzLmRlZmF1bHRfdmFsdWUgPz8gXCJcIjtcbiAgICAgICAgdGhpcy5wcm9tcHRFbC5hZGRDbGFzcyhcInRlbXBsYXRlci1wcm9tcHQtaW5wdXRcIilcbiAgICAgICAgdGhpcy5wcm9tcHRFbC5zZWxlY3QoKTtcbiAgICB9XG5cbiAgICBhc3luYyBvcGVuQW5kR2V0VmFsdWUocmVzb2x2ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICB0aGlzLnJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxufSIsImltcG9ydCB7IFRlbXBsYXRlckVycm9yIH0gZnJvbSBcIkVycm9yXCI7XG5pbXBvcnQgeyBBcHAsIEZ1enp5TWF0Y2gsIEZ1enp5U3VnZ2VzdE1vZGFsIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cblxuZXhwb3J0IGNsYXNzIFN1Z2dlc3Rlck1vZGFsPFQ+IGV4dGVuZHMgRnV6enlTdWdnZXN0TW9kYWw8VD4ge1xuICAgIHByaXZhdGUgcmVzb2x2ZTogKHZhbHVlOiBUKSA9PiB2b2lkO1xuICAgIHByaXZhdGUgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkO1xuICAgIHByaXZhdGUgc3VibWl0dGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcHJpdmF0ZSB0ZXh0X2l0ZW1zOiBzdHJpbmdbXSB8ICgoaXRlbTogVCkgPT4gc3RyaW5nKSwgcHJpdmF0ZSBpdGVtczogVFtdLCBwbGFjZWhvbGRlcjogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKGFwcCk7XG4gICAgICAgIHRoaXMuc2V0UGxhY2Vob2xkZXIocGxhY2Vob2xkZXIpO1xuICAgIH1cblxuICAgIGdldEl0ZW1zKCk6IFRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zO1xuICAgIH1cbiAgICBcbiAgICBvbkNsb3NlKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuc3VibWl0dGVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlamVjdChuZXcgVGVtcGxhdGVyRXJyb3IoXCJDYW5jZWxsZWQgcHJvbXB0XCIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdFN1Z2dlc3Rpb24odmFsdWU6IEZ1enp5TWF0Y2g8VD4sIGV2dDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWJtaXR0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHRoaXMub25DaG9vc2VTdWdnZXN0aW9uKHZhbHVlLCBldnQpO1xuICAgIH1cblxuICAgIGdldEl0ZW1UZXh0KGl0ZW06IFQpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy50ZXh0X2l0ZW1zIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRleHRfaXRlbXMoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dF9pdGVtc1t0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSldIHx8IFwiVW5kZWZpbmVkIFRleHQgSXRlbVwiO1xuICAgIH1cblxuICAgIG9uQ2hvb3NlSXRlbShpdGVtOiBULCBfZXZ0OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlc29sdmUoaXRlbSk7XG4gICAgfVxuXG4gICAgYXN5bmMgb3BlbkFuZEdldFZhbHVlKHJlc29sdmU6ICh2YWx1ZTogVCkgPT4gdm9pZCwgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIHRoaXMucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgVU5TVVBQT1JURURfTU9CSUxFX1RFTVBMQVRFIH0gZnJvbSBcIkNvbnN0YW50c1wiO1xuaW1wb3J0IHsgSW50ZXJuYWxNb2R1bGUgfSBmcm9tIFwiSW50ZXJuYWxUZW1wbGF0ZXMvSW50ZXJuYWxNb2R1bGVcIjtcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBQcm9tcHRNb2RhbCB9IGZyb20gXCIuL1Byb21wdE1vZGFsXCI7XG5pbXBvcnQgeyBTdWdnZXN0ZXJNb2RhbCB9IGZyb20gXCIuL1N1Z2dlc3Rlck1vZGFsXCI7XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbE1vZHVsZVN5c3RlbSBleHRlbmRzIEludGVybmFsTW9kdWxlIHtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJzeXN0ZW1cIjtcblxuICAgIGFzeW5jIGNyZWF0ZVN0YXRpY1RlbXBsYXRlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdGhpcy5zdGF0aWNfdGVtcGxhdGVzLnNldChcImNsaXBib2FyZFwiLCB0aGlzLmdlbmVyYXRlX2NsaXBib2FyZCgpKTtcbiAgICAgICAgdGhpcy5zdGF0aWNfdGVtcGxhdGVzLnNldChcInByb21wdFwiLCB0aGlzLmdlbmVyYXRlX3Byb21wdCgpKTtcbiAgICAgICAgdGhpcy5zdGF0aWNfdGVtcGxhdGVzLnNldChcInN1Z2dlc3RlclwiLCB0aGlzLmdlbmVyYXRlX3N1Z2dlc3RlcigpKTtcbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGVUZW1wbGF0ZXMoKTogUHJvbWlzZTx2b2lkPiB7fVxuXG4gICAgZ2VuZXJhdGVfY2xpcGJvYXJkKCk6IEZ1bmN0aW9uIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIC8vIFRPRE86IEFkZCBtb2JpbGUgc3VwcG9ydFxuICAgICAgICAgICAgaWYgKFBsYXRmb3JtLmlzTW9iaWxlQXBwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFVOU1VQUE9SVEVEX01PQklMRV9URU1QTEFURTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBuYXZpZ2F0b3IuY2xpcGJvYXJkLnJlYWRUZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZV9wcm9tcHQoKTogRnVuY3Rpb24ge1xuICAgICAgICByZXR1cm4gYXN5bmMgKHByb21wdF90ZXh0Pzogc3RyaW5nLCBkZWZhdWx0X3ZhbHVlPzogc3RyaW5nLCB0aHJvd19vbl9jYW5jZWw6IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9tcHQgPSBuZXcgUHJvbXB0TW9kYWwodGhpcy5hcHAsIHByb21wdF90ZXh0LCBkZWZhdWx0X3ZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkgPT4gcHJvbXB0Lm9wZW5BbmRHZXRWYWx1ZShyZXNvbHZlLCByZWplY3QpKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHByb21pc2U7XG4gICAgICAgICAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRocm93X29uX2NhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZV9zdWdnZXN0ZXIoKTogRnVuY3Rpb24ge1xuICAgICAgICByZXR1cm4gYXN5bmMgPFQ+KHRleHRfaXRlbXM6IHN0cmluZ1tdIHwgKChpdGVtOiBUKSA9PiBzdHJpbmcpLCBpdGVtczogVFtdLCB0aHJvd19vbl9jYW5jZWw6IGJvb2xlYW4gPSBmYWxzZSwgcGxhY2Vob2xkZXI6IHN0cmluZyA9IFwiXCIpOiBQcm9taXNlPFQ+ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN1Z2dlc3RlciA9IG5ldyBTdWdnZXN0ZXJNb2RhbCh0aGlzLmFwcCwgdGV4dF9pdGVtcywgaXRlbXMsIHBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZTogKHZhbHVlOiBUKSA9PiB2b2lkLCByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQpID0+IHN1Z2dlc3Rlci5vcGVuQW5kR2V0VmFsdWUocmVzb2x2ZSwgcmVqZWN0KSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBwcm9taXNlXG4gICAgICAgICAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRocm93X29uX2NhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgSW50ZXJuYWxNb2R1bGUgfSBmcm9tIFwiSW50ZXJuYWxUZW1wbGF0ZXMvSW50ZXJuYWxNb2R1bGVcIjtcbmltcG9ydCB7IFJ1bk1vZGUsIFJ1bm5pbmdDb25maWcgfSBmcm9tIFwiVGVtcGxhdGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbE1vZHVsZUNvbmZpZyBleHRlbmRzIEludGVybmFsTW9kdWxlIHtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJjb25maWdcIjtcblxuICAgIGFzeW5jIGNyZWF0ZVN0YXRpY1RlbXBsYXRlcygpOiBQcm9taXNlPHZvaWQ+IHt9XG5cbiAgICBhc3luYyB1cGRhdGVUZW1wbGF0ZXMoKTogUHJvbWlzZTx2b2lkPiB7fVxuXG4gICAgYXN5bmMgZ2VuZXJhdGVDb250ZXh0KGNvbmZpZzogUnVubmluZ0NvbmZpZyk6IFByb21pc2U8e1t4OiBzdHJpbmddOiBhbnl9PiB7XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgfVxufSIsImltcG9ydCB7IEFwcCwgVEZpbGUgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuaW1wb3J0IFRlbXBsYXRlclBsdWdpbiBmcm9tIFwibWFpblwiO1xuaW1wb3J0IHsgVFBhcnNlciB9IGZyb20gXCJUUGFyc2VyXCI7XG5pbXBvcnQgeyBJbnRlcm5hbE1vZHVsZSB9IGZyb20gXCIuL0ludGVybmFsTW9kdWxlXCI7XG5pbXBvcnQgeyBJbnRlcm5hbE1vZHVsZURhdGUgfSBmcm9tIFwiLi9kYXRlL0ludGVybmFsTW9kdWxlRGF0ZVwiO1xuaW1wb3J0IHsgSW50ZXJuYWxNb2R1bGVGaWxlIH0gZnJvbSBcIi4vZmlsZS9JbnRlcm5hbE1vZHVsZUZpbGVcIjtcbmltcG9ydCB7IEludGVybmFsTW9kdWxlV2ViIH0gZnJvbSBcIi4vd2ViL0ludGVybmFsTW9kdWxlV2ViXCI7XG5pbXBvcnQgeyBJbnRlcm5hbE1vZHVsZUZyb250bWF0dGVyIH0gZnJvbSBcIi4vZnJvbnRtYXR0ZXIvSW50ZXJuYWxNb2R1bGVGcm9udG1hdHRlclwiO1xuaW1wb3J0IHsgSW50ZXJuYWxNb2R1bGVTeXN0ZW0gfSBmcm9tIFwiLi9zeXN0ZW0vSW50ZXJuYWxNb2R1bGVTeXN0ZW1cIjtcbmltcG9ydCB7IFJ1bm5pbmdDb25maWcgfSBmcm9tIFwiVGVtcGxhdGVyXCI7XG5pbXBvcnQgeyBJbnRlcm5hbE1vZHVsZUNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZy9JbnRlcm5hbE1vZHVsZUNvbmZpZ1wiO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxUZW1wbGF0ZVBhcnNlciBpbXBsZW1lbnRzIFRQYXJzZXIge1xuICAgIHByaXZhdGUgbW9kdWxlc19hcnJheTogQXJyYXk8SW50ZXJuYWxNb2R1bGU+ID0gbmV3IEFycmF5KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYXBwOiBBcHAsIHByb3RlY3RlZCBwbHVnaW46IFRlbXBsYXRlclBsdWdpbikge1xuICAgICAgICB0aGlzLm1vZHVsZXNfYXJyYXkucHVzaChuZXcgSW50ZXJuYWxNb2R1bGVEYXRlKHRoaXMuYXBwLCB0aGlzLnBsdWdpbikpO1xuICAgICAgICB0aGlzLm1vZHVsZXNfYXJyYXkucHVzaChuZXcgSW50ZXJuYWxNb2R1bGVGaWxlKHRoaXMuYXBwLCB0aGlzLnBsdWdpbikpO1xuICAgICAgICB0aGlzLm1vZHVsZXNfYXJyYXkucHVzaChuZXcgSW50ZXJuYWxNb2R1bGVXZWIodGhpcy5hcHAsIHRoaXMucGx1Z2luKSk7XG4gICAgICAgIHRoaXMubW9kdWxlc19hcnJheS5wdXNoKG5ldyBJbnRlcm5hbE1vZHVsZUZyb250bWF0dGVyKHRoaXMuYXBwLCB0aGlzLnBsdWdpbikpO1xuICAgICAgICB0aGlzLm1vZHVsZXNfYXJyYXkucHVzaChuZXcgSW50ZXJuYWxNb2R1bGVTeXN0ZW0odGhpcy5hcHAsIHRoaXMucGx1Z2luKSk7XG4gICAgICAgIHRoaXMubW9kdWxlc19hcnJheS5wdXNoKG5ldyBJbnRlcm5hbE1vZHVsZUNvbmZpZyh0aGlzLmFwcCwgdGhpcy5wbHVnaW4pKTtcbiAgICB9XG5cbiAgICBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBmb3IgKGNvbnN0IG1vZCBvZiB0aGlzLm1vZHVsZXNfYXJyYXkpIHtcbiAgICAgICAgICAgIGF3YWl0IG1vZC5pbml0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBnZW5lcmF0ZUNvbnRleHQoY29uZmlnOiBSdW5uaW5nQ29uZmlnKTogUHJvbWlzZTx7fT4ge1xuICAgICAgICBjb25zdCBtb2R1bGVzX2NvbnRleHQ6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG5cbiAgICAgICAgZm9yIChjb25zdCBtb2Qgb2YgdGhpcy5tb2R1bGVzX2FycmF5KSB7XG4gICAgICAgICAgICBtb2R1bGVzX2NvbnRleHRbbW9kLmdldE5hbWUoKV0gPSBhd2FpdCBtb2QuZ2VuZXJhdGVDb250ZXh0KGNvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbW9kdWxlc19jb250ZXh0O1xuICAgIH1cbn0iLCJpbXBvcnQgeyBBcHAsIEZpbGVTeXN0ZW1BZGFwdGVyLCBQbGF0Zm9ybSwgVEZpbGUgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IGV4ZWMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSBcInV0aWxcIjtcblxuaW1wb3J0IFRlbXBsYXRlclBsdWdpbiBmcm9tIFwibWFpblwiO1xuaW1wb3J0IHsgQ29udGV4dE1vZGUgfSBmcm9tIFwiVGVtcGxhdGVQYXJzZXJcIjtcbmltcG9ydCB7IFRQYXJzZXIgfSBmcm9tIFwiVFBhcnNlclwiO1xuaW1wb3J0IHsgVU5TVVBQT1JURURfTU9CSUxFX1RFTVBMQVRFIH0gZnJvbSBcIkNvbnN0YW50c1wiO1xuaW1wb3J0IHsgUnVubmluZ0NvbmZpZyB9IGZyb20gXCJUZW1wbGF0ZXJcIjtcbmltcG9ydCB7IGdldFRGaWxlc0Zyb21Gb2xkZXIgfSBmcm9tIFwiVXRpbHNcIjtcbmltcG9ydCB7IFRlbXBsYXRlckVycm9yIH0gZnJvbSBcIkVycm9yXCI7XG5cbmV4cG9ydCBjbGFzcyBVc2VyVGVtcGxhdGVQYXJzZXIgaW1wbGVtZW50cyBUUGFyc2VyIHtcbiAgICBwcml2YXRlIGN3ZDogc3RyaW5nO1xuICAgIHByaXZhdGUgZXhlY19wcm9taXNlOiBGdW5jdGlvbjtcbiAgICBwcml2YXRlIHVzZXJfc3lzdGVtX2NvbW1hbmRfZnVuY3Rpb25zOiBNYXA8c3RyaW5nLCBGdW5jdGlvbj4gPSBuZXcgTWFwKCk7XG4gICAgcHJpdmF0ZSB1c2VyX3NjcmlwdF9mdW5jdGlvbnM6IE1hcDxzdHJpbmcsIEZ1bmN0aW9uPiA9IG5ldyBNYXAoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBwOiBBcHAsIHByaXZhdGUgcGx1Z2luOiBUZW1wbGF0ZXJQbHVnaW4pIHtcbiAgICAgICAgdGhpcy5zZXR1cCgpOyAgICAgICAgXG4gICAgfVxuXG4gICAgc2V0dXAoKTogdm9pZCB7XG4gICAgICAgIGlmIChQbGF0Zm9ybS5pc01vYmlsZUFwcCB8fCAhKHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIgaW5zdGFuY2VvZiBGaWxlU3lzdGVtQWRhcHRlcikpIHtcbiAgICAgICAgICAgIHRoaXMuY3dkID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3dkID0gdGhpcy5hcHAudmF1bHQuYWRhcHRlci5nZXRCYXNlUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5leGVjX3Byb21pc2UgPSBwcm9taXNpZnkoZXhlYyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge31cblxuICAgIGFzeW5jIGdlbmVyYXRlX3VzZXJfc2NyaXB0X2Z1bmN0aW9ucyhjb25maWc6IFJ1bm5pbmdDb25maWcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgbGV0IGZpbGVzID0gZ2V0VEZpbGVzRnJvbUZvbGRlcih0aGlzLmFwcCwgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc2NyaXB0X2ZvbGRlcik7XG5cbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgaWYgKGZpbGUuZXh0ZW5zaW9uLnRvTG93ZXJDYXNlKCkgPT09IFwianNcIikge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMubG9hZF91c2VyX3NjcmlwdF9mdW5jdGlvbihjb25maWcsIGZpbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZF91c2VyX3NjcmlwdF9mdW5jdGlvbihjb25maWc6IFJ1bm5pbmdDb25maWcsIGZpbGU6IFRGaWxlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICghKHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIgaW5zdGFuY2VvZiBGaWxlU3lzdGVtQWRhcHRlcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUZW1wbGF0ZXJFcnJvcihcImFwcC52YXVsdCBpcyBub3QgYSBGaWxlU3lzdGVtQWRhcHRlciBpbnN0YW5jZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmF1bHRfcGF0aCA9IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIuZ2V0QmFzZVBhdGgoKTtcbiAgICAgICAgbGV0IGZpbGVfcGF0aCA9IGAke3ZhdWx0X3BhdGh9LyR7ZmlsZS5wYXRofWA7XG5cbiAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjY2MzM5MDEvcmVsb2FkLW1vZHVsZS1hdC1ydW50aW1lXG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE5NzIyNDIvaG93LXRvLWF1dG8tcmVsb2FkLWZpbGVzLWluLW5vZGUtanNcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHdpbmRvdy5yZXF1aXJlLmNhY2hlKS5jb250YWlucyhmaWxlX3BhdGgpKSB7XG4gICAgICAgICAgICBkZWxldGUgd2luZG93LnJlcXVpcmUuY2FjaGVbd2luZG93LnJlcXVpcmUucmVzb2x2ZShmaWxlX3BhdGgpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVzZXJfZnVuY3Rpb24gPSBhd2FpdCBpbXBvcnQoZmlsZV9wYXRoKTtcbiAgICAgICAgaWYgKCF1c2VyX2Z1bmN0aW9uLmRlZmF1bHQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUZW1wbGF0ZXJFcnJvcihgRmFpbGVkIHRvIGxvYWQgdXNlciBzY3JpcHQgJHtmaWxlX3BhdGh9LiBObyBleHBvcnRzIGRldGVjdGVkLmApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghKHVzZXJfZnVuY3Rpb24uZGVmYXVsdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFRlbXBsYXRlckVycm9yKGBGYWlsZWQgdG8gbG9hZCB1c2VyIHNjcmlwdCAke2ZpbGVfcGF0aH0uIERlZmF1bHQgZXhwb3J0IGlzIG5vdCBhIGZ1bmN0aW9uLmApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXNlcl9zY3JpcHRfZnVuY3Rpb25zLnNldChgJHtmaWxlLmJhc2VuYW1lfWAsIHVzZXJfZnVuY3Rpb24uZGVmYXVsdCk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogQWRkIG1vYmlsZSBzdXBwb3J0XG4gICAgYXN5bmMgZ2VuZXJhdGVfc3lzdGVtX2NvbW1hbmRfdXNlcl9mdW5jdGlvbnMoY29uZmlnOiBSdW5uaW5nQ29uZmlnKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSBhd2FpdCB0aGlzLnBsdWdpbi50ZW1wbGF0ZXIucGFyc2VyLmdlbmVyYXRlQ29udGV4dChjb25maWcsIENvbnRleHRNb2RlLklOVEVSTkFMKTtcblxuICAgICAgICBmb3IgKGxldCBbdGVtcGxhdGUsIGNtZF0gb2YgdGhpcy5wbHVnaW4uc2V0dGluZ3MudGVtcGxhdGVzX3BhaXJzKSB7XG4gICAgICAgICAgICBpZiAodGVtcGxhdGUgPT09IFwiXCIgfHwgY21kID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChQbGF0Zm9ybS5pc01vYmlsZUFwcCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXNlcl9zeXN0ZW1fY29tbWFuZF9mdW5jdGlvbnMuc2V0KHRlbXBsYXRlLCAodXNlcl9hcmdzPzogYW55KTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFVOU1VQUE9SVEVEX01PQklMRV9URU1QTEFURTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY21kID0gYXdhaXQgdGhpcy5wbHVnaW4udGVtcGxhdGVyLnBhcnNlci5wYXJzZVRlbXBsYXRlcyhjbWQsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyX3N5c3RlbV9jb21tYW5kX2Z1bmN0aW9ucy5zZXQodGVtcGxhdGUsIGFzeW5jICh1c2VyX2FyZ3M/OiBhbnkpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzX2VudiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByb2Nlc3MuZW52LFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4udXNlcl9hcmdzLFxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNtZF9vcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dDogdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29tbWFuZF90aW1lb3V0ICogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN3ZDogdGhpcy5jd2QsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnY6IHByb2Nlc3NfZW52LFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKHRoaXMucGx1Z2luLnNldHRpbmdzLnNoZWxsX3BhdGggIT09IFwiXCIgJiYge3NoZWxsOiB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zaGVsbF9wYXRofSksXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtzdGRvdXR9ID0gYXdhaXQgdGhpcy5leGVjX3Byb21pc2UoY21kLCBjbWRfb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3Rkb3V0LnRyaW1SaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVGVtcGxhdGVyRXJyb3IoYEVycm9yIHdpdGggVXNlciBUZW1wbGF0ZSAke3RlbXBsYXRlfWAsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZ2VuZXJhdGVDb250ZXh0KGNvbmZpZzogUnVubmluZ0NvbmZpZyk6IFByb21pc2U8e30+IHtcbiAgICAgICAgdGhpcy51c2VyX3N5c3RlbV9jb21tYW5kX2Z1bmN0aW9ucy5jbGVhcigpO1xuICAgICAgICB0aGlzLnVzZXJfc2NyaXB0X2Z1bmN0aW9ucy5jbGVhcigpO1xuXG4gICAgICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmFibGVfc3lzdGVtX2NvbW1hbmRzKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdlbmVyYXRlX3N5c3RlbV9jb21tYW5kX3VzZXJfZnVuY3Rpb25zKGNvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPOiBBZGQgbW9iaWxlIHN1cHBvcnRcbiAgICAgICAgaWYgKFBsYXRmb3JtLmlzRGVza3RvcEFwcCAmJiB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zY3JpcHRfZm9sZGVyKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmdlbmVyYXRlX3VzZXJfc2NyaXB0X2Z1bmN0aW9ucyhjb25maWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLk9iamVjdC5mcm9tRW50cmllcyh0aGlzLnVzZXJfc3lzdGVtX2NvbW1hbmRfZnVuY3Rpb25zKSxcbiAgICAgICAgICAgIC4uLk9iamVjdC5mcm9tRW50cmllcyh0aGlzLnVzZXJfc2NyaXB0X2Z1bmN0aW9ucyksXG4gICAgICAgIH07XG4gICAgfVxufSIsImltcG9ydCB7IEFwcCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0ICogYXMgRXRhIGZyb20gXCJldGFcIjtcblxuaW1wb3J0IHsgSW50ZXJuYWxUZW1wbGF0ZVBhcnNlciB9IGZyb20gXCIuL0ludGVybmFsVGVtcGxhdGVzL0ludGVybmFsVGVtcGxhdGVQYXJzZXJcIjtcbmltcG9ydCBUZW1wbGF0ZXJQbHVnaW4gZnJvbSBcIi4vbWFpblwiO1xuaW1wb3J0IHsgVXNlclRlbXBsYXRlUGFyc2VyIH0gZnJvbSBcIi4vVXNlclRlbXBsYXRlcy9Vc2VyVGVtcGxhdGVQYXJzZXJcIjtcbmltcG9ydCB7IFRQYXJzZXIgfSBmcm9tIFwiVFBhcnNlclwiO1xuaW1wb3J0IHsgb2JzaWRpYW5fbW9kdWxlIH0gZnJvbSBcIlV0aWxzXCI7XG5pbXBvcnQgeyBSdW5uaW5nQ29uZmlnIH0gZnJvbSBcIlRlbXBsYXRlclwiO1xuXG5leHBvcnQgZW51bSBDb250ZXh0TW9kZSB7XG4gICAgSU5URVJOQUwsXG4gICAgVVNFUl9JTlRFUk5BTCxcbn07XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVBhcnNlciBpbXBsZW1lbnRzIFRQYXJzZXIge1xuICAgIHB1YmxpYyBpbnRlcm5hbFRlbXBsYXRlUGFyc2VyOiBJbnRlcm5hbFRlbXBsYXRlUGFyc2VyO1xuXHRwdWJsaWMgdXNlclRlbXBsYXRlUGFyc2VyOiBVc2VyVGVtcGxhdGVQYXJzZXI7XG4gICAgcHVibGljIGN1cnJlbnRfY29udGV4dDoge307XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhcHA6IEFwcCwgcHJpdmF0ZSBwbHVnaW46IFRlbXBsYXRlclBsdWdpbikge1xuICAgICAgICB0aGlzLmludGVybmFsVGVtcGxhdGVQYXJzZXIgPSBuZXcgSW50ZXJuYWxUZW1wbGF0ZVBhcnNlcih0aGlzLmFwcCwgdGhpcy5wbHVnaW4pO1xuICAgICAgICB0aGlzLnVzZXJUZW1wbGF0ZVBhcnNlciA9IG5ldyBVc2VyVGVtcGxhdGVQYXJzZXIodGhpcy5hcHAsIHRoaXMucGx1Z2luKTtcbiAgICB9XG5cbiAgICBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCB0aGlzLmludGVybmFsVGVtcGxhdGVQYXJzZXIuaW5pdCgpO1xuICAgICAgICBhd2FpdCB0aGlzLnVzZXJUZW1wbGF0ZVBhcnNlci5pbml0KCk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0Q3VycmVudENvbnRleHQoY29uZmlnOiBSdW5uaW5nQ29uZmlnLCBjb250ZXh0X21vZGU6IENvbnRleHRNb2RlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuY3VycmVudF9jb250ZXh0ID0gYXdhaXQgdGhpcy5nZW5lcmF0ZUNvbnRleHQoY29uZmlnLCBjb250ZXh0X21vZGUpO1xuICAgIH1cblxuICAgIGFkZGl0aW9uYWxDb250ZXh0KCk6IHt9IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9ic2lkaWFuOiBvYnNpZGlhbl9tb2R1bGUsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgYXN5bmMgZ2VuZXJhdGVDb250ZXh0KGNvbmZpZzogUnVubmluZ0NvbmZpZywgY29udGV4dF9tb2RlOiBDb250ZXh0TW9kZSA9IENvbnRleHRNb2RlLlVTRVJfSU5URVJOQUwpOiBQcm9taXNlPHt9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB7fTtcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbF9jb250ZXh0ID0gdGhpcy5hZGRpdGlvbmFsQ29udGV4dCgpO1xuICAgICAgICBjb25zdCBpbnRlcm5hbF9jb250ZXh0ID0gYXdhaXQgdGhpcy5pbnRlcm5hbFRlbXBsYXRlUGFyc2VyLmdlbmVyYXRlQ29udGV4dChjb25maWcpO1xuICAgICAgICBsZXQgdXNlcl9jb250ZXh0ID0ge307XG5cbiAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnRfY29udGV4dCkge1xuICAgICAgICAgICAgLy8gSWYgYSB1c2VyIHN5c3RlbSBjb21tYW5kIGlzIHVzaW5nIHRwLmZpbGUuaW5jbHVkZSwgd2UgbmVlZCB0aGUgY29udGV4dCB0byBiZSBzZXQuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRfY29udGV4dCA9IGludGVybmFsX2NvbnRleHQ7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuYXNzaWduKGNvbnRleHQsIGFkZGl0aW9uYWxfY29udGV4dCk7XG4gICAgICAgIHN3aXRjaCAoY29udGV4dF9tb2RlKSB7XG4gICAgICAgICAgICBjYXNlIENvbnRleHRNb2RlLklOVEVSTkFMOlxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY29udGV4dCwgaW50ZXJuYWxfY29udGV4dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENvbnRleHRNb2RlLlVTRVJfSU5URVJOQUw6XG4gICAgICAgICAgICAgICAgdXNlcl9jb250ZXh0ID0gYXdhaXQgdGhpcy51c2VyVGVtcGxhdGVQYXJzZXIuZ2VuZXJhdGVDb250ZXh0KGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmludGVybmFsX2NvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IHVzZXJfY29udGV4dCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cblxuICAgIGFzeW5jIHBhcnNlVGVtcGxhdGVzKGNvbnRlbnQ6IHN0cmluZywgY29udGV4dD86IGFueSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgICAgY29udGV4dCA9IHRoaXMuY3VycmVudF9jb250ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGVudCA9IGF3YWl0IEV0YS5yZW5kZXJBc3luYyhjb250ZW50LCBjb250ZXh0LCB7XG4gICAgICAgICAgICB2YXJOYW1lOiBcInRwXCIsXG4gICAgICAgICAgICBwYXJzZToge1xuICAgICAgICAgICAgICAgIGV4ZWM6IFwiKlwiLFxuICAgICAgICAgICAgICAgIGludGVycG9sYXRlOiBcIn5cIixcbiAgICAgICAgICAgICAgICByYXc6IFwiXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXV0b1RyaW06IGZhbHNlLFxuICAgICAgICAgICAgZ2xvYmFsQXdhaXQ6IHRydWUsXG4gICAgICAgIH0pIGFzIHN0cmluZztcblxuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG59IiwiaW1wb3J0IHsgQXBwLCBNYXJrZG93blBvc3RQcm9jZXNzb3JDb250ZXh0LCBNYXJrZG93blZpZXcsIFRGaWxlLCBURm9sZGVyIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmltcG9ydCB7IEN1cnNvckp1bXBlciB9IGZyb20gXCJDdXJzb3JKdW1wZXJcIjtcbmltcG9ydCBUZW1wbGF0ZXJQbHVnaW4gZnJvbSBcIm1haW5cIjtcbmltcG9ydCB7IENvbnRleHRNb2RlLCBUZW1wbGF0ZVBhcnNlciB9IGZyb20gXCJUZW1wbGF0ZVBhcnNlclwiO1xuaW1wb3J0IHsgVGVtcGxhdGVyRXJyb3IgfSBmcm9tIFwiRXJyb3JcIjtcblxuZXhwb3J0IGVudW0gUnVuTW9kZSB7XG4gICAgQ3JlYXRlTmV3RnJvbVRlbXBsYXRlLFxuICAgIEFwcGVuZEFjdGl2ZUZpbGUsXG4gICAgT3ZlcndyaXRlRmlsZSxcbiAgICBPdmVyd3JpdGVBY3RpdmVGaWxlLFxuICAgIER5bmFtaWNQcm9jZXNzb3IsXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFJ1bm5pbmdDb25maWcge1xuICAgIHRlbXBsYXRlX2ZpbGU6IFRGaWxlLFxuICAgIHRhcmdldF9maWxlOiBURmlsZSxcbiAgICBydW5fbW9kZTogUnVuTW9kZSxcbn07XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZXIge1xuICAgIHB1YmxpYyBwYXJzZXI6IFRlbXBsYXRlUGFyc2VyO1xuICAgIHB1YmxpYyBjdXJzb3JfanVtcGVyOiBDdXJzb3JKdW1wZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcDogQXBwLCBwcml2YXRlIHBsdWdpbjogVGVtcGxhdGVyUGx1Z2luKSB7XG4gICAgICAgIHRoaXMuY3Vyc29yX2p1bXBlciA9IG5ldyBDdXJzb3JKdW1wZXIodGhpcy5hcHApO1xuXHRcdHRoaXMucGFyc2VyID0gbmV3IFRlbXBsYXRlUGFyc2VyKHRoaXMuYXBwLCB0aGlzLnBsdWdpbik7XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0dXAoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMucGFyc2VyLmluaXQoKTtcbiAgICB9XG5cbiAgICBjcmVhdGVfcnVubmluZ19jb25maWcodGVtcGxhdGVfZmlsZTogVEZpbGUsIHRhcmdldF9maWxlOiBURmlsZSwgcnVuX21vZGU6IFJ1bk1vZGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRlbXBsYXRlX2ZpbGU6IHRlbXBsYXRlX2ZpbGUsXG4gICAgICAgICAgICB0YXJnZXRfZmlsZTogdGFyZ2V0X2ZpbGUsXG4gICAgICAgICAgICBydW5fbW9kZTogcnVuX21vZGUsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyByZWFkX2FuZF9wYXJzZV90ZW1wbGF0ZShjb25maWc6IFJ1bm5pbmdDb25maWcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZV9jb250ZW50ID0gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZChjb25maWcudGVtcGxhdGVfZmlsZSk7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlX3RlbXBsYXRlKGNvbmZpZywgdGVtcGxhdGVfY29udGVudCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcGFyc2VfdGVtcGxhdGUoY29uZmlnOiBSdW5uaW5nQ29uZmlnLCB0ZW1wbGF0ZV9jb250ZW50OiBzdHJpbmcpOiBQcm9taXNlIDxzdHJpbmc+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5wYXJzZXIuc2V0Q3VycmVudENvbnRleHQoY29uZmlnLCBDb250ZXh0TW9kZS5VU0VSX0lOVEVSTkFMKTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMucGFyc2VyLnBhcnNlVGVtcGxhdGVzKHRlbXBsYXRlX2NvbnRlbnQpO1xuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG5cbiAgICBhc3luYyBjcmVhdGVfbmV3X25vdGVfZnJvbV90ZW1wbGF0ZSh0ZW1wbGF0ZTogVEZpbGUgfCBzdHJpbmcsIGZvbGRlcj86IFRGb2xkZXIsIGZpbGVuYW1lPzogc3RyaW5nLCBvcGVuX25ld19ub3RlOiBib29sZWFuID0gdHJ1ZSk6IFByb21pc2U8VEZpbGU+IHtcbiAgICAgICAgaWYgKCFmb2xkZXIpIHtcbiAgICAgICAgICAgIGZvbGRlciA9IHRoaXMuYXBwLmZpbGVNYW5hZ2VyLmdldE5ld0ZpbGVQYXJlbnQoXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETzogQ2hhbmdlIHRoYXQsIG5vdCBzdGFibGUgYXRtXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgY3JlYXRlZF9ub3RlID0gYXdhaXQgdGhpcy5hcHAuZmlsZU1hbmFnZXIuY3JlYXRlTmV3TWFya2Rvd25GaWxlKGZvbGRlciwgZmlsZW5hbWUgPz8gXCJVbnRpdGxlZFwiKTtcblxuICAgICAgICBsZXQgcnVubmluZ19jb25maWc6IFJ1bm5pbmdDb25maWc7XG4gICAgICAgIGxldCBvdXRwdXRfY29udGVudDogc3RyaW5nO1xuICAgICAgICBpZiAodGVtcGxhdGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgcnVubmluZ19jb25maWcgPSB0aGlzLmNyZWF0ZV9ydW5uaW5nX2NvbmZpZyh0ZW1wbGF0ZSwgY3JlYXRlZF9ub3RlLCBSdW5Nb2RlLkNyZWF0ZU5ld0Zyb21UZW1wbGF0ZSk7XG4gICAgICAgICAgICBvdXRwdXRfY29udGVudCA9IGF3YWl0IHRoaXMucGx1Z2luLmVycm9yV3JhcHBlcihhc3luYyAoKSA9PiB0aGlzLnJlYWRfYW5kX3BhcnNlX3RlbXBsYXRlKHJ1bm5pbmdfY29uZmlnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBydW5uaW5nX2NvbmZpZyA9IHRoaXMuY3JlYXRlX3J1bm5pbmdfY29uZmlnKHVuZGVmaW5lZCwgY3JlYXRlZF9ub3RlLCBSdW5Nb2RlLkNyZWF0ZU5ld0Zyb21UZW1wbGF0ZSk7XG4gICAgICAgICAgICBvdXRwdXRfY29udGVudCA9IGF3YWl0IHRoaXMucGx1Z2luLmVycm9yV3JhcHBlcihhc3luYyAoKSA9PiB0aGlzLnBhcnNlX3RlbXBsYXRlKHJ1bm5pbmdfY29uZmlnLCB0ZW1wbGF0ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG91dHB1dF9jb250ZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwLnZhdWx0LmRlbGV0ZShjcmVhdGVkX25vdGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5hcHAudmF1bHQubW9kaWZ5KGNyZWF0ZWRfbm90ZSwgb3V0cHV0X2NvbnRlbnQpO1xuXG4gICAgICAgIGlmIChvcGVuX25ld19ub3RlKSB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVfbGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmO1xuICAgICAgICAgICAgaWYgKCFhY3RpdmVfbGVhZikge1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLmxvZ19lcnJvcihuZXcgVGVtcGxhdGVyRXJyb3IoXCJObyBhY3RpdmUgbGVhZlwiKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgYWN0aXZlX2xlYWYub3BlbkZpbGUoY3JlYXRlZF9ub3RlLCB7c3RhdGU6IHttb2RlOiAnc291cmNlJ30sIGVTdGF0ZToge3JlbmFtZTogJ2FsbCd9fSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmN1cnNvcl9qdW1wZXIuanVtcF90b19uZXh0X2N1cnNvcl9sb2NhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNyZWF0ZWRfbm90ZTtcbiAgICB9XG5cbiAgICBhc3luYyBhcHBlbmRfdGVtcGxhdGUodGVtcGxhdGVfZmlsZTogVEZpbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgYWN0aXZlX3ZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuICAgICAgICBpZiAoYWN0aXZlX3ZpZXcgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLmxvZ19lcnJvcihuZXcgVGVtcGxhdGVyRXJyb3IoXCJObyBhY3RpdmUgdmlldywgY2FuJ3QgYXBwZW5kIHRlbXBsYXRlcy5cIikpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJ1bm5pbmdfY29uZmlnID0gdGhpcy5jcmVhdGVfcnVubmluZ19jb25maWcodGVtcGxhdGVfZmlsZSwgYWN0aXZlX3ZpZXcuZmlsZSwgUnVuTW9kZS5BcHBlbmRBY3RpdmVGaWxlKTtcbiAgICAgICAgY29uc3Qgb3V0cHV0X2NvbnRlbnQgPSBhd2FpdCB0aGlzLnBsdWdpbi5lcnJvcldyYXBwZXIoYXN5bmMgKCkgPT4gdGhpcy5yZWFkX2FuZF9wYXJzZV90ZW1wbGF0ZShydW5uaW5nX2NvbmZpZykpO1xuICAgICAgICBpZiAob3V0cHV0X2NvbnRlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZWRpdG9yID0gYWN0aXZlX3ZpZXcuZWRpdG9yO1xuICAgICAgICBjb25zdCBkb2MgPSBlZGl0b3IuZ2V0RG9jKCk7XG4gICAgICAgIGRvYy5yZXBsYWNlU2VsZWN0aW9uKG91dHB1dF9jb250ZW50KTtcblxuICAgICAgICBhd2FpdCB0aGlzLmN1cnNvcl9qdW1wZXIuanVtcF90b19uZXh0X2N1cnNvcl9sb2NhdGlvbigpO1xuICAgIH1cblxuICAgIG92ZXJ3cml0ZV9hY3RpdmVfZmlsZV90ZW1wbGF0ZXMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZV92aWV3ID0gdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZVZpZXdPZlR5cGUoTWFya2Rvd25WaWV3KTtcbiAgICAgICAgaWYgKGFjdGl2ZV92aWV3ID09PSBudWxsKSB7XG5cdFx0XHR0aGlzLnBsdWdpbi5sb2dfZXJyb3IobmV3IFRlbXBsYXRlckVycm9yKFwiQWN0aXZlIHZpZXcgaXMgbnVsbCwgY2FuJ3Qgb3ZlcndyaXRlIGNvbnRlbnRcIikpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3ZlcndyaXRlX2ZpbGVfdGVtcGxhdGVzKGFjdGl2ZV92aWV3LmZpbGUsIHRydWUpO1xuXHR9XG5cbiAgICBhc3luYyBvdmVyd3JpdGVfZmlsZV90ZW1wbGF0ZXMoZmlsZTogVEZpbGUsIGFjdGl2ZV9maWxlOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgcnVubmluZ19jb25maWcgPSB0aGlzLmNyZWF0ZV9ydW5uaW5nX2NvbmZpZyhmaWxlLCBmaWxlLCBhY3RpdmVfZmlsZSA/IFJ1bk1vZGUuT3ZlcndyaXRlQWN0aXZlRmlsZSA6IFJ1bk1vZGUuT3ZlcndyaXRlRmlsZSk7XG4gICAgICAgIGNvbnN0IG91dHB1dF9jb250ZW50ID0gYXdhaXQgdGhpcy5wbHVnaW4uZXJyb3JXcmFwcGVyKGFzeW5jICgpID0+IHRoaXMucmVhZF9hbmRfcGFyc2VfdGVtcGxhdGUocnVubmluZ19jb25maWcpKTtcbiAgICAgICAgaWYgKG91dHB1dF9jb250ZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmFwcC52YXVsdC5tb2RpZnkoZmlsZSwgb3V0cHV0X2NvbnRlbnQpO1xuICAgICAgICBpZiAodGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZUZpbGUoKSA9PT0gZmlsZSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jdXJzb3JfanVtcGVyLmp1bXBfdG9fbmV4dF9jdXJzb3JfbG9jYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHByb2Nlc3NfZHluYW1pY190ZW1wbGF0ZXMoZWw6IEhUTUxFbGVtZW50LCBjdHg6IE1hcmtkb3duUG9zdFByb2Nlc3NvckNvbnRleHQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgZHluYW1pY19jb21tYW5kX3JlZ2V4OiBSZWdFeHAgPSAvKDwlKD86LXxfKT9cXHMqWyp+XXswLDF9KVxcKygoPzoufFxccykqPyU+KS9nO1xuXG4gICAgICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZU5vZGVJdGVyYXRvcihlbCwgTm9kZUZpbHRlci5TSE9XX1RFWFQpO1xuICAgICAgICBsZXQgbm9kZTtcbiAgICAgICAgbGV0IHBhc3MgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKChub2RlID0gd2Fsa2VyLm5leHROb2RlKCkpKSB7XG4gICAgICAgICAgICBsZXQgY29udGVudCA9IG5vZGUubm9kZVZhbHVlO1xuICAgICAgICAgICAgbGV0IG1hdGNoO1xuICAgICAgICAgICAgaWYgKChtYXRjaCA9IGR5bmFtaWNfY29tbWFuZF9yZWdleC5leGVjKGNvbnRlbnQpKSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Rmlyc3RMaW5rcGF0aERlc3QoXCJcIiwgY3R4LnNvdXJjZVBhdGgpO1xuICAgICAgICAgICAgICAgIGlmICghZmlsZSB8fCAhKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXBhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJ1bm5pbmdfY29uZmlnID0gdGhpcy5jcmVhdGVfcnVubmluZ19jb25maWcoZmlsZSwgZmlsZSwgUnVuTW9kZS5EeW5hbWljUHJvY2Vzc29yKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wYXJzZXIuc2V0Q3VycmVudENvbnRleHQocnVubmluZ19jb25maWcsIENvbnRleHRNb2RlLlVTRVJfSU5URVJOQUwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdoaWxlIChtYXRjaCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5vdCB0aGUgbW9zdCBlZmZpY2llbnQgd2F5IHRvIGV4Y2x1ZGUgdGhlICcrJyBmcm9tIHRoZSBjb21tYW5kIGJ1dCBJIGNvdWxkbid0IGZpbmQgc29tZXRoaW5nIGJldHRlclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wbGV0ZV9jb21tYW5kID0gbWF0Y2hbMV0gKyBtYXRjaFsyXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tbWFuZF9vdXRwdXQ6IHN0cmluZyA9IGF3YWl0IHRoaXMucGx1Z2luLmVycm9yV3JhcHBlcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5wYXJzZXIucGFyc2VUZW1wbGF0ZXMoY29tcGxldGVfY29tbWFuZCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29tbWFuZF9vdXRwdXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IGR5bmFtaWNfY29tbWFuZF9yZWdleC5sYXN0SW5kZXggLSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmQgPSBkeW5hbWljX2NvbW1hbmRfcmVnZXgubGFzdEluZGV4O1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5zdWJzdHJpbmcoMCwgc3RhcnQpICsgY29tbWFuZF9vdXRwdXQgKyBjb250ZW50LnN1YnN0cmluZyhlbmQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGR5bmFtaWNfY29tbWFuZF9yZWdleC5sYXN0SW5kZXggKz0gKGNvbW1hbmRfb3V0cHV0Lmxlbmd0aCAtIG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoID0gZHluYW1pY19jb21tYW5kX3JlZ2V4LmV4ZWMoY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5vZGUubm9kZVZhbHVlID0gY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXHR9XG59IiwiLy8gQ29kZU1pcnJvciwgY29weXJpZ2h0IChjKSBieSBNYXJpam4gSGF2ZXJiZWtlIGFuZCBvdGhlcnNcbi8vIERpc3RyaWJ1dGVkIHVuZGVyIGFuIE1JVCBsaWNlbnNlOiBodHRwczovL2NvZGVtaXJyb3IubmV0L0xJQ0VOU0VcblxuKGZ1bmN0aW9uKG1vZCkge1xuICBtb2Qod2luZG93LkNvZGVNaXJyb3IpO1xufSkoZnVuY3Rpb24oQ29kZU1pcnJvcikge1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbkNvZGVNaXJyb3IuZGVmaW5lTW9kZShcImphdmFzY3JpcHRcIiwgZnVuY3Rpb24oY29uZmlnLCBwYXJzZXJDb25maWcpIHtcbiAgdmFyIGluZGVudFVuaXQgPSBjb25maWcuaW5kZW50VW5pdDtcbiAgdmFyIHN0YXRlbWVudEluZGVudCA9IHBhcnNlckNvbmZpZy5zdGF0ZW1lbnRJbmRlbnQ7XG4gIHZhciBqc29ubGRNb2RlID0gcGFyc2VyQ29uZmlnLmpzb25sZDtcbiAgdmFyIGpzb25Nb2RlID0gcGFyc2VyQ29uZmlnLmpzb24gfHwganNvbmxkTW9kZTtcbiAgdmFyIHRyYWNrU2NvcGUgPSBwYXJzZXJDb25maWcudHJhY2tTY29wZSAhPT0gZmFsc2VcbiAgdmFyIGlzVFMgPSBwYXJzZXJDb25maWcudHlwZXNjcmlwdDtcbiAgdmFyIHdvcmRSRSA9IHBhcnNlckNvbmZpZy53b3JkQ2hhcmFjdGVycyB8fCAvW1xcdyRcXHhhMS1cXHVmZmZmXS87XG5cbiAgLy8gVG9rZW5pemVyXG5cbiAgdmFyIGtleXdvcmRzID0gZnVuY3Rpb24oKXtcbiAgICBmdW5jdGlvbiBrdyh0eXBlKSB7cmV0dXJuIHt0eXBlOiB0eXBlLCBzdHlsZTogXCJrZXl3b3JkXCJ9O31cbiAgICB2YXIgQSA9IGt3KFwia2V5d29yZCBhXCIpLCBCID0ga3coXCJrZXl3b3JkIGJcIiksIEMgPSBrdyhcImtleXdvcmQgY1wiKSwgRCA9IGt3KFwia2V5d29yZCBkXCIpO1xuICAgIHZhciBvcGVyYXRvciA9IGt3KFwib3BlcmF0b3JcIiksIGF0b20gPSB7dHlwZTogXCJhdG9tXCIsIHN0eWxlOiBcImF0b21cIn07XG5cbiAgICByZXR1cm4ge1xuICAgICAgXCJpZlwiOiBrdyhcImlmXCIpLCBcIndoaWxlXCI6IEEsIFwid2l0aFwiOiBBLCBcImVsc2VcIjogQiwgXCJkb1wiOiBCLCBcInRyeVwiOiBCLCBcImZpbmFsbHlcIjogQixcbiAgICAgIFwicmV0dXJuXCI6IEQsIFwiYnJlYWtcIjogRCwgXCJjb250aW51ZVwiOiBELCBcIm5ld1wiOiBrdyhcIm5ld1wiKSwgXCJkZWxldGVcIjogQywgXCJ2b2lkXCI6IEMsIFwidGhyb3dcIjogQyxcbiAgICAgIFwiZGVidWdnZXJcIjoga3coXCJkZWJ1Z2dlclwiKSwgXCJ2YXJcIjoga3coXCJ2YXJcIiksIFwiY29uc3RcIjoga3coXCJ2YXJcIiksIFwibGV0XCI6IGt3KFwidmFyXCIpLFxuICAgICAgXCJmdW5jdGlvblwiOiBrdyhcImZ1bmN0aW9uXCIpLCBcImNhdGNoXCI6IGt3KFwiY2F0Y2hcIiksXG4gICAgICBcImZvclwiOiBrdyhcImZvclwiKSwgXCJzd2l0Y2hcIjoga3coXCJzd2l0Y2hcIiksIFwiY2FzZVwiOiBrdyhcImNhc2VcIiksIFwiZGVmYXVsdFwiOiBrdyhcImRlZmF1bHRcIiksXG4gICAgICBcImluXCI6IG9wZXJhdG9yLCBcInR5cGVvZlwiOiBvcGVyYXRvciwgXCJpbnN0YW5jZW9mXCI6IG9wZXJhdG9yLFxuICAgICAgXCJ0cnVlXCI6IGF0b20sIFwiZmFsc2VcIjogYXRvbSwgXCJudWxsXCI6IGF0b20sIFwidW5kZWZpbmVkXCI6IGF0b20sIFwiTmFOXCI6IGF0b20sIFwiSW5maW5pdHlcIjogYXRvbSxcbiAgICAgIFwidGhpc1wiOiBrdyhcInRoaXNcIiksIFwiY2xhc3NcIjoga3coXCJjbGFzc1wiKSwgXCJzdXBlclwiOiBrdyhcImF0b21cIiksXG4gICAgICBcInlpZWxkXCI6IEMsIFwiZXhwb3J0XCI6IGt3KFwiZXhwb3J0XCIpLCBcImltcG9ydFwiOiBrdyhcImltcG9ydFwiKSwgXCJleHRlbmRzXCI6IEMsXG4gICAgICBcImF3YWl0XCI6IENcbiAgICB9O1xuICB9KCk7XG5cbiAgdmFyIGlzT3BlcmF0b3JDaGFyID0gL1srXFwtKiYlPTw+IT98fl5AXS87XG4gIHZhciBpc0pzb25sZEtleXdvcmQgPSAvXkAoY29udGV4dHxpZHx2YWx1ZXxsYW5ndWFnZXx0eXBlfGNvbnRhaW5lcnxsaXN0fHNldHxyZXZlcnNlfGluZGV4fGJhc2V8dm9jYWJ8Z3JhcGgpXCIvO1xuXG4gIGZ1bmN0aW9uIHJlYWRSZWdleHAoc3RyZWFtKSB7XG4gICAgdmFyIGVzY2FwZWQgPSBmYWxzZSwgbmV4dCwgaW5TZXQgPSBmYWxzZTtcbiAgICB3aGlsZSAoKG5leHQgPSBzdHJlYW0ubmV4dCgpKSAhPSBudWxsKSB7XG4gICAgICBpZiAoIWVzY2FwZWQpIHtcbiAgICAgICAgaWYgKG5leHQgPT0gXCIvXCIgJiYgIWluU2V0KSByZXR1cm47XG4gICAgICAgIGlmIChuZXh0ID09IFwiW1wiKSBpblNldCA9IHRydWU7XG4gICAgICAgIGVsc2UgaWYgKGluU2V0ICYmIG5leHQgPT0gXCJdXCIpIGluU2V0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBlc2NhcGVkID0gIWVzY2FwZWQgJiYgbmV4dCA9PSBcIlxcXFxcIjtcbiAgICB9XG4gIH1cblxuICAvLyBVc2VkIGFzIHNjcmF0Y2ggdmFyaWFibGVzIHRvIGNvbW11bmljYXRlIG11bHRpcGxlIHZhbHVlcyB3aXRob3V0XG4gIC8vIGNvbnNpbmcgdXAgdG9ucyBvZiBvYmplY3RzLlxuICB2YXIgdHlwZSwgY29udGVudDtcbiAgZnVuY3Rpb24gcmV0KHRwLCBzdHlsZSwgY29udCkge1xuICAgIHR5cGUgPSB0cDsgY29udGVudCA9IGNvbnQ7XG4gICAgcmV0dXJuIHN0eWxlO1xuICB9XG4gIGZ1bmN0aW9uIHRva2VuQmFzZShzdHJlYW0sIHN0YXRlKSB7XG4gICAgdmFyIGNoID0gc3RyZWFtLm5leHQoKTtcbiAgICBpZiAoY2ggPT0gJ1wiJyB8fCBjaCA9PSBcIidcIikge1xuICAgICAgc3RhdGUudG9rZW5pemUgPSB0b2tlblN0cmluZyhjaCk7XG4gICAgICByZXR1cm4gc3RhdGUudG9rZW5pemUoc3RyZWFtLCBzdGF0ZSk7XG4gICAgfSBlbHNlIGlmIChjaCA9PSBcIi5cIiAmJiBzdHJlYW0ubWF0Y2goL15cXGRbXFxkX10qKD86W2VFXVsrXFwtXT9bXFxkX10rKT8vKSkge1xuICAgICAgcmV0dXJuIHJldChcIm51bWJlclwiLCBcIm51bWJlclwiKTtcbiAgICB9IGVsc2UgaWYgKGNoID09IFwiLlwiICYmIHN0cmVhbS5tYXRjaChcIi4uXCIpKSB7XG4gICAgICByZXR1cm4gcmV0KFwic3ByZWFkXCIsIFwibWV0YVwiKTtcbiAgICB9IGVsc2UgaWYgKC9bXFxbXFxde31cXChcXCksO1xcOlxcLl0vLnRlc3QoY2gpKSB7XG4gICAgICByZXR1cm4gcmV0KGNoKTtcbiAgICB9IGVsc2UgaWYgKGNoID09IFwiPVwiICYmIHN0cmVhbS5lYXQoXCI+XCIpKSB7XG4gICAgICByZXR1cm4gcmV0KFwiPT5cIiwgXCJvcGVyYXRvclwiKTtcbiAgICB9IGVsc2UgaWYgKGNoID09IFwiMFwiICYmIHN0cmVhbS5tYXRjaCgvXig/OnhbXFxkQS1GYS1mX10rfG9bMC03X10rfGJbMDFfXSspbj8vKSkge1xuICAgICAgcmV0dXJuIHJldChcIm51bWJlclwiLCBcIm51bWJlclwiKTtcbiAgICB9IGVsc2UgaWYgKC9cXGQvLnRlc3QoY2gpKSB7XG4gICAgICBzdHJlYW0ubWF0Y2goL15bXFxkX10qKD86bnwoPzpcXC5bXFxkX10qKT8oPzpbZUVdWytcXC1dP1tcXGRfXSspPyk/Lyk7XG4gICAgICByZXR1cm4gcmV0KFwibnVtYmVyXCIsIFwibnVtYmVyXCIpO1xuICAgIH0gZWxzZSBpZiAoY2ggPT0gXCIvXCIpIHtcbiAgICAgIGlmIChzdHJlYW0uZWF0KFwiKlwiKSkge1xuICAgICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQ29tbWVudDtcbiAgICAgICAgcmV0dXJuIHRva2VuQ29tbWVudChzdHJlYW0sIHN0YXRlKTtcbiAgICAgIH0gZWxzZSBpZiAoc3RyZWFtLmVhdChcIi9cIikpIHtcbiAgICAgICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgICAgICByZXR1cm4gcmV0KFwiY29tbWVudFwiLCBcImNvbW1lbnRcIik7XG4gICAgICB9IGVsc2UgaWYgKGV4cHJlc3Npb25BbGxvd2VkKHN0cmVhbSwgc3RhdGUsIDEpKSB7XG4gICAgICAgIHJlYWRSZWdleHAoc3RyZWFtKTtcbiAgICAgICAgc3RyZWFtLm1hdGNoKC9eXFxiKChbZ2lteXVzXSkoPyFbZ2lteXVzXSpcXDIpKStcXGIvKTtcbiAgICAgICAgcmV0dXJuIHJldChcInJlZ2V4cFwiLCBcInN0cmluZy0yXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyZWFtLmVhdChcIj1cIik7XG4gICAgICAgIHJldHVybiByZXQoXCJvcGVyYXRvclwiLCBcIm9wZXJhdG9yXCIsIHN0cmVhbS5jdXJyZW50KCkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2ggPT0gXCJgXCIpIHtcbiAgICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5RdWFzaTtcbiAgICAgIHJldHVybiB0b2tlblF1YXNpKHN0cmVhbSwgc3RhdGUpO1xuICAgIH0gZWxzZSBpZiAoY2ggPT0gXCIjXCIgJiYgc3RyZWFtLnBlZWsoKSA9PSBcIiFcIikge1xuICAgICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgICAgcmV0dXJuIHJldChcIm1ldGFcIiwgXCJtZXRhXCIpO1xuICAgIH0gZWxzZSBpZiAoY2ggPT0gXCIjXCIgJiYgc3RyZWFtLmVhdFdoaWxlKHdvcmRSRSkpIHtcbiAgICAgIHJldHVybiByZXQoXCJ2YXJpYWJsZVwiLCBcInByb3BlcnR5XCIpXG4gICAgfSBlbHNlIGlmIChjaCA9PSBcIjxcIiAmJiBzdHJlYW0ubWF0Y2goXCIhLS1cIikgfHxcbiAgICAgICAgICAgICAgIChjaCA9PSBcIi1cIiAmJiBzdHJlYW0ubWF0Y2goXCItPlwiKSAmJiAhL1xcUy8udGVzdChzdHJlYW0uc3RyaW5nLnNsaWNlKDAsIHN0cmVhbS5zdGFydCkpKSkge1xuICAgICAgc3RyZWFtLnNraXBUb0VuZCgpXG4gICAgICByZXR1cm4gcmV0KFwiY29tbWVudFwiLCBcImNvbW1lbnRcIilcbiAgICB9IGVsc2UgaWYgKGlzT3BlcmF0b3JDaGFyLnRlc3QoY2gpKSB7XG4gICAgICBpZiAoY2ggIT0gXCI+XCIgfHwgIXN0YXRlLmxleGljYWwgfHwgc3RhdGUubGV4aWNhbC50eXBlICE9IFwiPlwiKSB7XG4gICAgICAgIGlmIChzdHJlYW0uZWF0KFwiPVwiKSkge1xuICAgICAgICAgIGlmIChjaCA9PSBcIiFcIiB8fCBjaCA9PSBcIj1cIikgc3RyZWFtLmVhdChcIj1cIilcbiAgICAgICAgfSBlbHNlIGlmICgvWzw+KitcXC18Jj9dLy50ZXN0KGNoKSkge1xuICAgICAgICAgIHN0cmVhbS5lYXQoY2gpXG4gICAgICAgICAgaWYgKGNoID09IFwiPlwiKSBzdHJlYW0uZWF0KGNoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY2ggPT0gXCI/XCIgJiYgc3RyZWFtLmVhdChcIi5cIikpIHJldHVybiByZXQoXCIuXCIpXG4gICAgICByZXR1cm4gcmV0KFwib3BlcmF0b3JcIiwgXCJvcGVyYXRvclwiLCBzdHJlYW0uY3VycmVudCgpKTtcbiAgICB9IGVsc2UgaWYgKHdvcmRSRS50ZXN0KGNoKSkge1xuICAgICAgc3RyZWFtLmVhdFdoaWxlKHdvcmRSRSk7XG4gICAgICB2YXIgd29yZCA9IHN0cmVhbS5jdXJyZW50KClcbiAgICAgIGlmIChzdGF0ZS5sYXN0VHlwZSAhPSBcIi5cIikge1xuICAgICAgICBpZiAoa2V5d29yZHMucHJvcGVydHlJc0VudW1lcmFibGUod29yZCkpIHtcbiAgICAgICAgICB2YXIga3cgPSBrZXl3b3Jkc1t3b3JkXVxuICAgICAgICAgIHJldHVybiByZXQoa3cudHlwZSwga3cuc3R5bGUsIHdvcmQpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdvcmQgPT0gXCJhc3luY1wiICYmIHN0cmVhbS5tYXRjaCgvXihcXHN8XFwvXFwqKFteKl18XFwqKD8hXFwvKSkqP1xcKlxcLykqW1xcW1xcKFxcd10vLCBmYWxzZSkpXG4gICAgICAgICAgcmV0dXJuIHJldChcImFzeW5jXCIsIFwia2V5d29yZFwiLCB3b3JkKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJldChcInZhcmlhYmxlXCIsIFwidmFyaWFibGVcIiwgd29yZClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b2tlblN0cmluZyhxdW90ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgICB2YXIgZXNjYXBlZCA9IGZhbHNlLCBuZXh0O1xuICAgICAgaWYgKGpzb25sZE1vZGUgJiYgc3RyZWFtLnBlZWsoKSA9PSBcIkBcIiAmJiBzdHJlYW0ubWF0Y2goaXNKc29ubGRLZXl3b3JkKSl7XG4gICAgICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5CYXNlO1xuICAgICAgICByZXR1cm4gcmV0KFwianNvbmxkLWtleXdvcmRcIiwgXCJtZXRhXCIpO1xuICAgICAgfVxuICAgICAgd2hpbGUgKChuZXh0ID0gc3RyZWFtLm5leHQoKSkgIT0gbnVsbCkge1xuICAgICAgICBpZiAobmV4dCA9PSBxdW90ZSAmJiAhZXNjYXBlZCkgYnJlYWs7XG4gICAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZCAmJiBuZXh0ID09IFwiXFxcXFwiO1xuICAgICAgfVxuICAgICAgaWYgKCFlc2NhcGVkKSBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQmFzZTtcbiAgICAgIHJldHVybiByZXQoXCJzdHJpbmdcIiwgXCJzdHJpbmdcIik7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRva2VuQ29tbWVudChzdHJlYW0sIHN0YXRlKSB7XG4gICAgdmFyIG1heWJlRW5kID0gZmFsc2UsIGNoO1xuICAgIHdoaWxlIChjaCA9IHN0cmVhbS5uZXh0KCkpIHtcbiAgICAgIGlmIChjaCA9PSBcIi9cIiAmJiBtYXliZUVuZCkge1xuICAgICAgICBzdGF0ZS50b2tlbml6ZSA9IHRva2VuQmFzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBtYXliZUVuZCA9IChjaCA9PSBcIipcIik7XG4gICAgfVxuICAgIHJldHVybiByZXQoXCJjb21tZW50XCIsIFwiY29tbWVudFwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRva2VuUXVhc2koc3RyZWFtLCBzdGF0ZSkge1xuICAgIHZhciBlc2NhcGVkID0gZmFsc2UsIG5leHQ7XG4gICAgd2hpbGUgKChuZXh0ID0gc3RyZWFtLm5leHQoKSkgIT0gbnVsbCkge1xuICAgICAgaWYgKCFlc2NhcGVkICYmIChuZXh0ID09IFwiYFwiIHx8IG5leHQgPT0gXCIkXCIgJiYgc3RyZWFtLmVhdChcIntcIikpKSB7XG4gICAgICAgIHN0YXRlLnRva2VuaXplID0gdG9rZW5CYXNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZCAmJiBuZXh0ID09IFwiXFxcXFwiO1xuICAgIH1cbiAgICByZXR1cm4gcmV0KFwicXVhc2lcIiwgXCJzdHJpbmctMlwiLCBzdHJlYW0uY3VycmVudCgpKTtcbiAgfVxuXG4gIHZhciBicmFja2V0cyA9IFwiKFt7fV0pXCI7XG4gIC8vIFRoaXMgaXMgYSBjcnVkZSBsb29rYWhlYWQgdHJpY2sgdG8gdHJ5IGFuZCBub3RpY2UgdGhhdCB3ZSdyZVxuICAvLyBwYXJzaW5nIHRoZSBhcmd1bWVudCBwYXR0ZXJucyBmb3IgYSBmYXQtYXJyb3cgZnVuY3Rpb24gYmVmb3JlIHdlXG4gIC8vIGFjdHVhbGx5IGhpdCB0aGUgYXJyb3cgdG9rZW4uIEl0IG9ubHkgd29ya3MgaWYgdGhlIGFycm93IGlzIG9uXG4gIC8vIHRoZSBzYW1lIGxpbmUgYXMgdGhlIGFyZ3VtZW50cyBhbmQgdGhlcmUncyBubyBzdHJhbmdlIG5vaXNlXG4gIC8vIChjb21tZW50cykgaW4gYmV0d2Vlbi4gRmFsbGJhY2sgaXMgdG8gb25seSBub3RpY2Ugd2hlbiB3ZSBoaXQgdGhlXG4gIC8vIGFycm93LCBhbmQgbm90IGRlY2xhcmUgdGhlIGFyZ3VtZW50cyBhcyBsb2NhbHMgZm9yIHRoZSBhcnJvd1xuICAvLyBib2R5LlxuICBmdW5jdGlvbiBmaW5kRmF0QXJyb3coc3RyZWFtLCBzdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5mYXRBcnJvd0F0KSBzdGF0ZS5mYXRBcnJvd0F0ID0gbnVsbDtcbiAgICB2YXIgYXJyb3cgPSBzdHJlYW0uc3RyaW5nLmluZGV4T2YoXCI9PlwiLCBzdHJlYW0uc3RhcnQpO1xuICAgIGlmIChhcnJvdyA8IDApIHJldHVybjtcblxuICAgIGlmIChpc1RTKSB7IC8vIFRyeSB0byBza2lwIFR5cGVTY3JpcHQgcmV0dXJuIHR5cGUgZGVjbGFyYXRpb25zIGFmdGVyIHRoZSBhcmd1bWVudHNcbiAgICAgIHZhciBtID0gLzpcXHMqKD86XFx3Kyg/OjxbXj5dKj58XFxbXFxdKT98XFx7W159XSpcXH0pXFxzKiQvLmV4ZWMoc3RyZWFtLnN0cmluZy5zbGljZShzdHJlYW0uc3RhcnQsIGFycm93KSlcbiAgICAgIGlmIChtKSBhcnJvdyA9IG0uaW5kZXhcbiAgICB9XG5cbiAgICB2YXIgZGVwdGggPSAwLCBzYXdTb21ldGhpbmcgPSBmYWxzZTtcbiAgICBmb3IgKHZhciBwb3MgPSBhcnJvdyAtIDE7IHBvcyA+PSAwOyAtLXBvcykge1xuICAgICAgdmFyIGNoID0gc3RyZWFtLnN0cmluZy5jaGFyQXQocG9zKTtcbiAgICAgIHZhciBicmFja2V0ID0gYnJhY2tldHMuaW5kZXhPZihjaCk7XG4gICAgICBpZiAoYnJhY2tldCA+PSAwICYmIGJyYWNrZXQgPCAzKSB7XG4gICAgICAgIGlmICghZGVwdGgpIHsgKytwb3M7IGJyZWFrOyB9XG4gICAgICAgIGlmICgtLWRlcHRoID09IDApIHsgaWYgKGNoID09IFwiKFwiKSBzYXdTb21ldGhpbmcgPSB0cnVlOyBicmVhazsgfVxuICAgICAgfSBlbHNlIGlmIChicmFja2V0ID49IDMgJiYgYnJhY2tldCA8IDYpIHtcbiAgICAgICAgKytkZXB0aDtcbiAgICAgIH0gZWxzZSBpZiAod29yZFJFLnRlc3QoY2gpKSB7XG4gICAgICAgIHNhd1NvbWV0aGluZyA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKC9bXCInXFwvYF0vLnRlc3QoY2gpKSB7XG4gICAgICAgIGZvciAoOzsgLS1wb3MpIHtcbiAgICAgICAgICBpZiAocG9zID09IDApIHJldHVyblxuICAgICAgICAgIHZhciBuZXh0ID0gc3RyZWFtLnN0cmluZy5jaGFyQXQocG9zIC0gMSlcbiAgICAgICAgICBpZiAobmV4dCA9PSBjaCAmJiBzdHJlYW0uc3RyaW5nLmNoYXJBdChwb3MgLSAyKSAhPSBcIlxcXFxcIikgeyBwb3MtLTsgYnJlYWsgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNhd1NvbWV0aGluZyAmJiAhZGVwdGgpIHtcbiAgICAgICAgKytwb3M7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2F3U29tZXRoaW5nICYmICFkZXB0aCkgc3RhdGUuZmF0QXJyb3dBdCA9IHBvcztcbiAgfVxuXG4gIC8vIFBhcnNlclxuXG4gIHZhciBhdG9taWNUeXBlcyA9IHtcImF0b21cIjogdHJ1ZSwgXCJudW1iZXJcIjogdHJ1ZSwgXCJ2YXJpYWJsZVwiOiB0cnVlLCBcInN0cmluZ1wiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgXCJyZWdleHBcIjogdHJ1ZSwgXCJ0aGlzXCI6IHRydWUsIFwiaW1wb3J0XCI6IHRydWUsIFwianNvbmxkLWtleXdvcmRcIjogdHJ1ZX07XG5cbiAgZnVuY3Rpb24gSlNMZXhpY2FsKGluZGVudGVkLCBjb2x1bW4sIHR5cGUsIGFsaWduLCBwcmV2LCBpbmZvKSB7XG4gICAgdGhpcy5pbmRlbnRlZCA9IGluZGVudGVkO1xuICAgIHRoaXMuY29sdW1uID0gY29sdW1uO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5wcmV2ID0gcHJldjtcbiAgICB0aGlzLmluZm8gPSBpbmZvO1xuICAgIGlmIChhbGlnbiAhPSBudWxsKSB0aGlzLmFsaWduID0gYWxpZ247XG4gIH1cblxuICBmdW5jdGlvbiBpblNjb3BlKHN0YXRlLCB2YXJuYW1lKSB7XG4gICAgaWYgKCF0cmFja1Njb3BlKSByZXR1cm4gZmFsc2VcbiAgICBmb3IgKHZhciB2ID0gc3RhdGUubG9jYWxWYXJzOyB2OyB2ID0gdi5uZXh0KVxuICAgICAgaWYgKHYubmFtZSA9PSB2YXJuYW1lKSByZXR1cm4gdHJ1ZTtcbiAgICBmb3IgKHZhciBjeCA9IHN0YXRlLmNvbnRleHQ7IGN4OyBjeCA9IGN4LnByZXYpIHtcbiAgICAgIGZvciAodmFyIHYgPSBjeC52YXJzOyB2OyB2ID0gdi5uZXh0KVxuICAgICAgICBpZiAodi5uYW1lID09IHZhcm5hbWUpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSlMoc3RhdGUsIHN0eWxlLCB0eXBlLCBjb250ZW50LCBzdHJlYW0pIHtcbiAgICB2YXIgY2MgPSBzdGF0ZS5jYztcbiAgICAvLyBDb21tdW5pY2F0ZSBvdXIgY29udGV4dCB0byB0aGUgY29tYmluYXRvcnMuXG4gICAgLy8gKExlc3Mgd2FzdGVmdWwgdGhhbiBjb25zaW5nIHVwIGEgaHVuZHJlZCBjbG9zdXJlcyBvbiBldmVyeSBjYWxsLilcbiAgICBjeC5zdGF0ZSA9IHN0YXRlOyBjeC5zdHJlYW0gPSBzdHJlYW07IGN4Lm1hcmtlZCA9IG51bGwsIGN4LmNjID0gY2M7IGN4LnN0eWxlID0gc3R5bGU7XG5cbiAgICBpZiAoIXN0YXRlLmxleGljYWwuaGFzT3duUHJvcGVydHkoXCJhbGlnblwiKSlcbiAgICAgIHN0YXRlLmxleGljYWwuYWxpZ24gPSB0cnVlO1xuXG4gICAgd2hpbGUodHJ1ZSkge1xuICAgICAgdmFyIGNvbWJpbmF0b3IgPSBjYy5sZW5ndGggPyBjYy5wb3AoKSA6IGpzb25Nb2RlID8gZXhwcmVzc2lvbiA6IHN0YXRlbWVudDtcbiAgICAgIGlmIChjb21iaW5hdG9yKHR5cGUsIGNvbnRlbnQpKSB7XG4gICAgICAgIHdoaWxlKGNjLmxlbmd0aCAmJiBjY1tjYy5sZW5ndGggLSAxXS5sZXgpXG4gICAgICAgICAgY2MucG9wKCkoKTtcbiAgICAgICAgaWYgKGN4Lm1hcmtlZCkgcmV0dXJuIGN4Lm1hcmtlZDtcbiAgICAgICAgaWYgKHR5cGUgPT0gXCJ2YXJpYWJsZVwiICYmIGluU2NvcGUoc3RhdGUsIGNvbnRlbnQpKSByZXR1cm4gXCJ2YXJpYWJsZS0yXCI7XG4gICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDb21iaW5hdG9yIHV0aWxzXG5cbiAgdmFyIGN4ID0ge3N0YXRlOiBudWxsLCBjb2x1bW46IG51bGwsIG1hcmtlZDogbnVsbCwgY2M6IG51bGx9O1xuICBmdW5jdGlvbiBwYXNzKCkge1xuICAgIGZvciAodmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGN4LmNjLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgfVxuICBmdW5jdGlvbiBjb250KCkge1xuICAgIHBhc3MuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBmdW5jdGlvbiBpbkxpc3QobmFtZSwgbGlzdCkge1xuICAgIGZvciAodmFyIHYgPSBsaXN0OyB2OyB2ID0gdi5uZXh0KSBpZiAodi5uYW1lID09IG5hbWUpIHJldHVybiB0cnVlXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIHJlZ2lzdGVyKHZhcm5hbWUpIHtcbiAgICB2YXIgc3RhdGUgPSBjeC5zdGF0ZTtcbiAgICBjeC5tYXJrZWQgPSBcImRlZlwiO1xuICAgIGlmICghdHJhY2tTY29wZSkgcmV0dXJuXG4gICAgaWYgKHN0YXRlLmNvbnRleHQpIHtcbiAgICAgIGlmIChzdGF0ZS5sZXhpY2FsLmluZm8gPT0gXCJ2YXJcIiAmJiBzdGF0ZS5jb250ZXh0ICYmIHN0YXRlLmNvbnRleHQuYmxvY2spIHtcbiAgICAgICAgLy8gRklYTUUgZnVuY3Rpb24gZGVjbHMgYXJlIGFsc28gbm90IGJsb2NrIHNjb3BlZFxuICAgICAgICB2YXIgbmV3Q29udGV4dCA9IHJlZ2lzdGVyVmFyU2NvcGVkKHZhcm5hbWUsIHN0YXRlLmNvbnRleHQpXG4gICAgICAgIGlmIChuZXdDb250ZXh0ICE9IG51bGwpIHtcbiAgICAgICAgICBzdGF0ZS5jb250ZXh0ID0gbmV3Q29udGV4dFxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCFpbkxpc3QodmFybmFtZSwgc3RhdGUubG9jYWxWYXJzKSkge1xuICAgICAgICBzdGF0ZS5sb2NhbFZhcnMgPSBuZXcgVmFyKHZhcm5hbWUsIHN0YXRlLmxvY2FsVmFycylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICAgIC8vIEZhbGwgdGhyb3VnaCBtZWFucyB0aGlzIGlzIGdsb2JhbFxuICAgIGlmIChwYXJzZXJDb25maWcuZ2xvYmFsVmFycyAmJiAhaW5MaXN0KHZhcm5hbWUsIHN0YXRlLmdsb2JhbFZhcnMpKVxuICAgICAgc3RhdGUuZ2xvYmFsVmFycyA9IG5ldyBWYXIodmFybmFtZSwgc3RhdGUuZ2xvYmFsVmFycylcbiAgfVxuICBmdW5jdGlvbiByZWdpc3RlclZhclNjb3BlZCh2YXJuYW1lLCBjb250ZXh0KSB7XG4gICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH0gZWxzZSBpZiAoY29udGV4dC5ibG9jaykge1xuICAgICAgdmFyIGlubmVyID0gcmVnaXN0ZXJWYXJTY29wZWQodmFybmFtZSwgY29udGV4dC5wcmV2KVxuICAgICAgaWYgKCFpbm5lcikgcmV0dXJuIG51bGxcbiAgICAgIGlmIChpbm5lciA9PSBjb250ZXh0LnByZXYpIHJldHVybiBjb250ZXh0XG4gICAgICByZXR1cm4gbmV3IENvbnRleHQoaW5uZXIsIGNvbnRleHQudmFycywgdHJ1ZSlcbiAgICB9IGVsc2UgaWYgKGluTGlzdCh2YXJuYW1lLCBjb250ZXh0LnZhcnMpKSB7XG4gICAgICByZXR1cm4gY29udGV4dFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IENvbnRleHQoY29udGV4dC5wcmV2LCBuZXcgVmFyKHZhcm5hbWUsIGNvbnRleHQudmFycyksIGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTW9kaWZpZXIobmFtZSkge1xuICAgIHJldHVybiBuYW1lID09IFwicHVibGljXCIgfHwgbmFtZSA9PSBcInByaXZhdGVcIiB8fCBuYW1lID09IFwicHJvdGVjdGVkXCIgfHwgbmFtZSA9PSBcImFic3RyYWN0XCIgfHwgbmFtZSA9PSBcInJlYWRvbmx5XCJcbiAgfVxuXG4gIC8vIENvbWJpbmF0b3JzXG5cbiAgZnVuY3Rpb24gQ29udGV4dChwcmV2LCB2YXJzLCBibG9jaykgeyB0aGlzLnByZXYgPSBwcmV2OyB0aGlzLnZhcnMgPSB2YXJzOyB0aGlzLmJsb2NrID0gYmxvY2sgfVxuICBmdW5jdGlvbiBWYXIobmFtZSwgbmV4dCkgeyB0aGlzLm5hbWUgPSBuYW1lOyB0aGlzLm5leHQgPSBuZXh0IH1cblxuICB2YXIgZGVmYXVsdFZhcnMgPSBuZXcgVmFyKFwidGhpc1wiLCBuZXcgVmFyKFwiYXJndW1lbnRzXCIsIG51bGwpKVxuICBmdW5jdGlvbiBwdXNoY29udGV4dCgpIHtcbiAgICBjeC5zdGF0ZS5jb250ZXh0ID0gbmV3IENvbnRleHQoY3guc3RhdGUuY29udGV4dCwgY3guc3RhdGUubG9jYWxWYXJzLCBmYWxzZSlcbiAgICBjeC5zdGF0ZS5sb2NhbFZhcnMgPSBkZWZhdWx0VmFyc1xuICB9XG4gIGZ1bmN0aW9uIHB1c2hibG9ja2NvbnRleHQoKSB7XG4gICAgY3guc3RhdGUuY29udGV4dCA9IG5ldyBDb250ZXh0KGN4LnN0YXRlLmNvbnRleHQsIGN4LnN0YXRlLmxvY2FsVmFycywgdHJ1ZSlcbiAgICBjeC5zdGF0ZS5sb2NhbFZhcnMgPSBudWxsXG4gIH1cbiAgZnVuY3Rpb24gcG9wY29udGV4dCgpIHtcbiAgICBjeC5zdGF0ZS5sb2NhbFZhcnMgPSBjeC5zdGF0ZS5jb250ZXh0LnZhcnNcbiAgICBjeC5zdGF0ZS5jb250ZXh0ID0gY3guc3RhdGUuY29udGV4dC5wcmV2XG4gIH1cbiAgcG9wY29udGV4dC5sZXggPSB0cnVlXG4gIGZ1bmN0aW9uIHB1c2hsZXgodHlwZSwgaW5mbykge1xuICAgIHZhciByZXN1bHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdGF0ZSA9IGN4LnN0YXRlLCBpbmRlbnQgPSBzdGF0ZS5pbmRlbnRlZDtcbiAgICAgIGlmIChzdGF0ZS5sZXhpY2FsLnR5cGUgPT0gXCJzdGF0XCIpIGluZGVudCA9IHN0YXRlLmxleGljYWwuaW5kZW50ZWQ7XG4gICAgICBlbHNlIGZvciAodmFyIG91dGVyID0gc3RhdGUubGV4aWNhbDsgb3V0ZXIgJiYgb3V0ZXIudHlwZSA9PSBcIilcIiAmJiBvdXRlci5hbGlnbjsgb3V0ZXIgPSBvdXRlci5wcmV2KVxuICAgICAgICBpbmRlbnQgPSBvdXRlci5pbmRlbnRlZDtcbiAgICAgIHN0YXRlLmxleGljYWwgPSBuZXcgSlNMZXhpY2FsKGluZGVudCwgY3guc3RyZWFtLmNvbHVtbigpLCB0eXBlLCBudWxsLCBzdGF0ZS5sZXhpY2FsLCBpbmZvKTtcbiAgICB9O1xuICAgIHJlc3VsdC5sZXggPSB0cnVlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZnVuY3Rpb24gcG9wbGV4KCkge1xuICAgIHZhciBzdGF0ZSA9IGN4LnN0YXRlO1xuICAgIGlmIChzdGF0ZS5sZXhpY2FsLnByZXYpIHtcbiAgICAgIGlmIChzdGF0ZS5sZXhpY2FsLnR5cGUgPT0gXCIpXCIpXG4gICAgICAgIHN0YXRlLmluZGVudGVkID0gc3RhdGUubGV4aWNhbC5pbmRlbnRlZDtcbiAgICAgIHN0YXRlLmxleGljYWwgPSBzdGF0ZS5sZXhpY2FsLnByZXY7XG4gICAgfVxuICB9XG4gIHBvcGxleC5sZXggPSB0cnVlO1xuXG4gIGZ1bmN0aW9uIGV4cGVjdCh3YW50ZWQpIHtcbiAgICBmdW5jdGlvbiBleHAodHlwZSkge1xuICAgICAgaWYgKHR5cGUgPT0gd2FudGVkKSByZXR1cm4gY29udCgpO1xuICAgICAgZWxzZSBpZiAod2FudGVkID09IFwiO1wiIHx8IHR5cGUgPT0gXCJ9XCIgfHwgdHlwZSA9PSBcIilcIiB8fCB0eXBlID09IFwiXVwiKSByZXR1cm4gcGFzcygpO1xuICAgICAgZWxzZSByZXR1cm4gY29udChleHApO1xuICAgIH07XG4gICAgcmV0dXJuIGV4cDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXRlbWVudCh0eXBlLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlID09IFwidmFyXCIpIHJldHVybiBjb250KHB1c2hsZXgoXCJ2YXJkZWZcIiwgdmFsdWUpLCB2YXJkZWYsIGV4cGVjdChcIjtcIiksIHBvcGxleCk7XG4gICAgaWYgKHR5cGUgPT0gXCJrZXl3b3JkIGFcIikgcmV0dXJuIGNvbnQocHVzaGxleChcImZvcm1cIiksIHBhcmVuRXhwciwgc3RhdGVtZW50LCBwb3BsZXgpO1xuICAgIGlmICh0eXBlID09IFwia2V5d29yZCBiXCIpIHJldHVybiBjb250KHB1c2hsZXgoXCJmb3JtXCIpLCBzdGF0ZW1lbnQsIHBvcGxleCk7XG4gICAgaWYgKHR5cGUgPT0gXCJrZXl3b3JkIGRcIikgcmV0dXJuIGN4LnN0cmVhbS5tYXRjaCgvXlxccyokLywgZmFsc2UpID8gY29udCgpIDogY29udChwdXNobGV4KFwic3RhdFwiKSwgbWF5YmVleHByZXNzaW9uLCBleHBlY3QoXCI7XCIpLCBwb3BsZXgpO1xuICAgIGlmICh0eXBlID09IFwiZGVidWdnZXJcIikgcmV0dXJuIGNvbnQoZXhwZWN0KFwiO1wiKSk7XG4gICAgaWYgKHR5cGUgPT0gXCJ7XCIpIHJldHVybiBjb250KHB1c2hsZXgoXCJ9XCIpLCBwdXNoYmxvY2tjb250ZXh0LCBibG9jaywgcG9wbGV4LCBwb3Bjb250ZXh0KTtcbiAgICBpZiAodHlwZSA9PSBcIjtcIikgcmV0dXJuIGNvbnQoKTtcbiAgICBpZiAodHlwZSA9PSBcImlmXCIpIHtcbiAgICAgIGlmIChjeC5zdGF0ZS5sZXhpY2FsLmluZm8gPT0gXCJlbHNlXCIgJiYgY3guc3RhdGUuY2NbY3guc3RhdGUuY2MubGVuZ3RoIC0gMV0gPT0gcG9wbGV4KVxuICAgICAgICBjeC5zdGF0ZS5jYy5wb3AoKSgpO1xuICAgICAgcmV0dXJuIGNvbnQocHVzaGxleChcImZvcm1cIiksIHBhcmVuRXhwciwgc3RhdGVtZW50LCBwb3BsZXgsIG1heWJlZWxzZSk7XG4gICAgfVxuICAgIGlmICh0eXBlID09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGNvbnQoZnVuY3Rpb25kZWYpO1xuICAgIGlmICh0eXBlID09IFwiZm9yXCIpIHJldHVybiBjb250KHB1c2hsZXgoXCJmb3JtXCIpLCBwdXNoYmxvY2tjb250ZXh0LCBmb3JzcGVjLCBzdGF0ZW1lbnQsIHBvcGNvbnRleHQsIHBvcGxleCk7XG4gICAgaWYgKHR5cGUgPT0gXCJjbGFzc1wiIHx8IChpc1RTICYmIHZhbHVlID09IFwiaW50ZXJmYWNlXCIpKSB7XG4gICAgICBjeC5tYXJrZWQgPSBcImtleXdvcmRcIlxuICAgICAgcmV0dXJuIGNvbnQocHVzaGxleChcImZvcm1cIiwgdHlwZSA9PSBcImNsYXNzXCIgPyB0eXBlIDogdmFsdWUpLCBjbGFzc05hbWUsIHBvcGxleClcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gXCJ2YXJpYWJsZVwiKSB7XG4gICAgICBpZiAoaXNUUyAmJiB2YWx1ZSA9PSBcImRlY2xhcmVcIikge1xuICAgICAgICBjeC5tYXJrZWQgPSBcImtleXdvcmRcIlxuICAgICAgICByZXR1cm4gY29udChzdGF0ZW1lbnQpXG4gICAgICB9IGVsc2UgaWYgKGlzVFMgJiYgKHZhbHVlID09IFwibW9kdWxlXCIgfHwgdmFsdWUgPT0gXCJlbnVtXCIgfHwgdmFsdWUgPT0gXCJ0eXBlXCIpICYmIGN4LnN0cmVhbS5tYXRjaCgvXlxccypcXHcvLCBmYWxzZSkpIHtcbiAgICAgICAgY3gubWFya2VkID0gXCJrZXl3b3JkXCJcbiAgICAgICAgaWYgKHZhbHVlID09IFwiZW51bVwiKSByZXR1cm4gY29udChlbnVtZGVmKTtcbiAgICAgICAgZWxzZSBpZiAodmFsdWUgPT0gXCJ0eXBlXCIpIHJldHVybiBjb250KHR5cGVuYW1lLCBleHBlY3QoXCJvcGVyYXRvclwiKSwgdHlwZWV4cHIsIGV4cGVjdChcIjtcIikpO1xuICAgICAgICBlbHNlIHJldHVybiBjb250KHB1c2hsZXgoXCJmb3JtXCIpLCBwYXR0ZXJuLCBleHBlY3QoXCJ7XCIpLCBwdXNobGV4KFwifVwiKSwgYmxvY2ssIHBvcGxleCwgcG9wbGV4KVxuICAgICAgfSBlbHNlIGlmIChpc1RTICYmIHZhbHVlID09IFwibmFtZXNwYWNlXCIpIHtcbiAgICAgICAgY3gubWFya2VkID0gXCJrZXl3b3JkXCJcbiAgICAgICAgcmV0dXJuIGNvbnQocHVzaGxleChcImZvcm1cIiksIGV4cHJlc3Npb24sIHN0YXRlbWVudCwgcG9wbGV4KVxuICAgICAgfSBlbHNlIGlmIChpc1RTICYmIHZhbHVlID09IFwiYWJzdHJhY3RcIikge1xuICAgICAgICBjeC5tYXJrZWQgPSBcImtleXdvcmRcIlxuICAgICAgICByZXR1cm4gY29udChzdGF0ZW1lbnQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29udChwdXNobGV4KFwic3RhdFwiKSwgbWF5YmVsYWJlbCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlID09IFwic3dpdGNoXCIpIHJldHVybiBjb250KHB1c2hsZXgoXCJmb3JtXCIpLCBwYXJlbkV4cHIsIGV4cGVjdChcIntcIiksIHB1c2hsZXgoXCJ9XCIsIFwic3dpdGNoXCIpLCBwdXNoYmxvY2tjb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9jaywgcG9wbGV4LCBwb3BsZXgsIHBvcGNvbnRleHQpO1xuICAgIGlmICh0eXBlID09IFwiY2FzZVwiKSByZXR1cm4gY29udChleHByZXNzaW9uLCBleHBlY3QoXCI6XCIpKTtcbiAgICBpZiAodHlwZSA9PSBcImRlZmF1bHRcIikgcmV0dXJuIGNvbnQoZXhwZWN0KFwiOlwiKSk7XG4gICAgaWYgKHR5cGUgPT0gXCJjYXRjaFwiKSByZXR1cm4gY29udChwdXNobGV4KFwiZm9ybVwiKSwgcHVzaGNvbnRleHQsIG1heWJlQ2F0Y2hCaW5kaW5nLCBzdGF0ZW1lbnQsIHBvcGxleCwgcG9wY29udGV4dCk7XG4gICAgaWYgKHR5cGUgPT0gXCJleHBvcnRcIikgcmV0dXJuIGNvbnQocHVzaGxleChcInN0YXRcIiksIGFmdGVyRXhwb3J0LCBwb3BsZXgpO1xuICAgIGlmICh0eXBlID09IFwiaW1wb3J0XCIpIHJldHVybiBjb250KHB1c2hsZXgoXCJzdGF0XCIpLCBhZnRlckltcG9ydCwgcG9wbGV4KTtcbiAgICBpZiAodHlwZSA9PSBcImFzeW5jXCIpIHJldHVybiBjb250KHN0YXRlbWVudClcbiAgICBpZiAodmFsdWUgPT0gXCJAXCIpIHJldHVybiBjb250KGV4cHJlc3Npb24sIHN0YXRlbWVudClcbiAgICByZXR1cm4gcGFzcyhwdXNobGV4KFwic3RhdFwiKSwgZXhwcmVzc2lvbiwgZXhwZWN0KFwiO1wiKSwgcG9wbGV4KTtcbiAgfVxuICBmdW5jdGlvbiBtYXliZUNhdGNoQmluZGluZyh0eXBlKSB7XG4gICAgaWYgKHR5cGUgPT0gXCIoXCIpIHJldHVybiBjb250KGZ1bmFyZywgZXhwZWN0KFwiKVwiKSlcbiAgfVxuICBmdW5jdGlvbiBleHByZXNzaW9uKHR5cGUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIGV4cHJlc3Npb25Jbm5lcih0eXBlLCB2YWx1ZSwgZmFsc2UpO1xuICB9XG4gIGZ1bmN0aW9uIGV4cHJlc3Npb25Ob0NvbW1hKHR5cGUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIGV4cHJlc3Npb25Jbm5lcih0eXBlLCB2YWx1ZSwgdHJ1ZSk7XG4gIH1cbiAgZnVuY3Rpb24gcGFyZW5FeHByKHR5cGUpIHtcbiAgICBpZiAodHlwZSAhPSBcIihcIikgcmV0dXJuIHBhc3MoKVxuICAgIHJldHVybiBjb250KHB1c2hsZXgoXCIpXCIpLCBtYXliZWV4cHJlc3Npb24sIGV4cGVjdChcIilcIiksIHBvcGxleClcbiAgfVxuICBmdW5jdGlvbiBleHByZXNzaW9uSW5uZXIodHlwZSwgdmFsdWUsIG5vQ29tbWEpIHtcbiAgICBpZiAoY3guc3RhdGUuZmF0QXJyb3dBdCA9PSBjeC5zdHJlYW0uc3RhcnQpIHtcbiAgICAgIHZhciBib2R5ID0gbm9Db21tYSA/IGFycm93Qm9keU5vQ29tbWEgOiBhcnJvd0JvZHk7XG4gICAgICBpZiAodHlwZSA9PSBcIihcIikgcmV0dXJuIGNvbnQocHVzaGNvbnRleHQsIHB1c2hsZXgoXCIpXCIpLCBjb21tYXNlcChmdW5hcmcsIFwiKVwiKSwgcG9wbGV4LCBleHBlY3QoXCI9PlwiKSwgYm9keSwgcG9wY29udGV4dCk7XG4gICAgICBlbHNlIGlmICh0eXBlID09IFwidmFyaWFibGVcIikgcmV0dXJuIHBhc3MocHVzaGNvbnRleHQsIHBhdHRlcm4sIGV4cGVjdChcIj0+XCIpLCBib2R5LCBwb3Bjb250ZXh0KTtcbiAgICB9XG5cbiAgICB2YXIgbWF5YmVvcCA9IG5vQ29tbWEgPyBtYXliZW9wZXJhdG9yTm9Db21tYSA6IG1heWJlb3BlcmF0b3JDb21tYTtcbiAgICBpZiAoYXRvbWljVHlwZXMuaGFzT3duUHJvcGVydHkodHlwZSkpIHJldHVybiBjb250KG1heWJlb3ApO1xuICAgIGlmICh0eXBlID09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGNvbnQoZnVuY3Rpb25kZWYsIG1heWJlb3ApO1xuICAgIGlmICh0eXBlID09IFwiY2xhc3NcIiB8fCAoaXNUUyAmJiB2YWx1ZSA9PSBcImludGVyZmFjZVwiKSkgeyBjeC5tYXJrZWQgPSBcImtleXdvcmRcIjsgcmV0dXJuIGNvbnQocHVzaGxleChcImZvcm1cIiksIGNsYXNzRXhwcmVzc2lvbiwgcG9wbGV4KTsgfVxuICAgIGlmICh0eXBlID09IFwia2V5d29yZCBjXCIgfHwgdHlwZSA9PSBcImFzeW5jXCIpIHJldHVybiBjb250KG5vQ29tbWEgPyBleHByZXNzaW9uTm9Db21tYSA6IGV4cHJlc3Npb24pO1xuICAgIGlmICh0eXBlID09IFwiKFwiKSByZXR1cm4gY29udChwdXNobGV4KFwiKVwiKSwgbWF5YmVleHByZXNzaW9uLCBleHBlY3QoXCIpXCIpLCBwb3BsZXgsIG1heWJlb3ApO1xuICAgIGlmICh0eXBlID09IFwib3BlcmF0b3JcIiB8fCB0eXBlID09IFwic3ByZWFkXCIpIHJldHVybiBjb250KG5vQ29tbWEgPyBleHByZXNzaW9uTm9Db21tYSA6IGV4cHJlc3Npb24pO1xuICAgIGlmICh0eXBlID09IFwiW1wiKSByZXR1cm4gY29udChwdXNobGV4KFwiXVwiKSwgYXJyYXlMaXRlcmFsLCBwb3BsZXgsIG1heWJlb3ApO1xuICAgIGlmICh0eXBlID09IFwie1wiKSByZXR1cm4gY29udENvbW1hc2VwKG9ianByb3AsIFwifVwiLCBudWxsLCBtYXliZW9wKTtcbiAgICBpZiAodHlwZSA9PSBcInF1YXNpXCIpIHJldHVybiBwYXNzKHF1YXNpLCBtYXliZW9wKTtcbiAgICBpZiAodHlwZSA9PSBcIm5ld1wiKSByZXR1cm4gY29udChtYXliZVRhcmdldChub0NvbW1hKSk7XG4gICAgcmV0dXJuIGNvbnQoKTtcbiAgfVxuICBmdW5jdGlvbiBtYXliZWV4cHJlc3Npb24odHlwZSkge1xuICAgIGlmICh0eXBlLm1hdGNoKC9bO1xcfVxcKVxcXSxdLykpIHJldHVybiBwYXNzKCk7XG4gICAgcmV0dXJuIHBhc3MoZXhwcmVzc2lvbik7XG4gIH1cblxuICBmdW5jdGlvbiBtYXliZW9wZXJhdG9yQ29tbWEodHlwZSwgdmFsdWUpIHtcbiAgICBpZiAodHlwZSA9PSBcIixcIikgcmV0dXJuIGNvbnQobWF5YmVleHByZXNzaW9uKTtcbiAgICByZXR1cm4gbWF5YmVvcGVyYXRvck5vQ29tbWEodHlwZSwgdmFsdWUsIGZhbHNlKTtcbiAgfVxuICBmdW5jdGlvbiBtYXliZW9wZXJhdG9yTm9Db21tYSh0eXBlLCB2YWx1ZSwgbm9Db21tYSkge1xuICAgIHZhciBtZSA9IG5vQ29tbWEgPT0gZmFsc2UgPyBtYXliZW9wZXJhdG9yQ29tbWEgOiBtYXliZW9wZXJhdG9yTm9Db21tYTtcbiAgICB2YXIgZXhwciA9IG5vQ29tbWEgPT0gZmFsc2UgPyBleHByZXNzaW9uIDogZXhwcmVzc2lvbk5vQ29tbWE7XG4gICAgaWYgKHR5cGUgPT0gXCI9PlwiKSByZXR1cm4gY29udChwdXNoY29udGV4dCwgbm9Db21tYSA/IGFycm93Qm9keU5vQ29tbWEgOiBhcnJvd0JvZHksIHBvcGNvbnRleHQpO1xuICAgIGlmICh0eXBlID09IFwib3BlcmF0b3JcIikge1xuICAgICAgaWYgKC9cXCtcXCt8LS0vLnRlc3QodmFsdWUpIHx8IGlzVFMgJiYgdmFsdWUgPT0gXCIhXCIpIHJldHVybiBjb250KG1lKTtcbiAgICAgIGlmIChpc1RTICYmIHZhbHVlID09IFwiPFwiICYmIGN4LnN0cmVhbS5tYXRjaCgvXihbXjw+XXw8W148Pl0qPikqPlxccypcXCgvLCBmYWxzZSkpXG4gICAgICAgIHJldHVybiBjb250KHB1c2hsZXgoXCI+XCIpLCBjb21tYXNlcCh0eXBlZXhwciwgXCI+XCIpLCBwb3BsZXgsIG1lKTtcbiAgICAgIGlmICh2YWx1ZSA9PSBcIj9cIikgcmV0dXJuIGNvbnQoZXhwcmVzc2lvbiwgZXhwZWN0KFwiOlwiKSwgZXhwcik7XG4gICAgICByZXR1cm4gY29udChleHByKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gXCJxdWFzaVwiKSB7IHJldHVybiBwYXNzKHF1YXNpLCBtZSk7IH1cbiAgICBpZiAodHlwZSA9PSBcIjtcIikgcmV0dXJuO1xuICAgIGlmICh0eXBlID09IFwiKFwiKSByZXR1cm4gY29udENvbW1hc2VwKGV4cHJlc3Npb25Ob0NvbW1hLCBcIilcIiwgXCJjYWxsXCIsIG1lKTtcbiAgICBpZiAodHlwZSA9PSBcIi5cIikgcmV0dXJuIGNvbnQocHJvcGVydHksIG1lKTtcbiAgICBpZiAodHlwZSA9PSBcIltcIikgcmV0dXJuIGNvbnQocHVzaGxleChcIl1cIiksIG1heWJlZXhwcmVzc2lvbiwgZXhwZWN0KFwiXVwiKSwgcG9wbGV4LCBtZSk7XG4gICAgaWYgKGlzVFMgJiYgdmFsdWUgPT0gXCJhc1wiKSB7IGN4Lm1hcmtlZCA9IFwia2V5d29yZFwiOyByZXR1cm4gY29udCh0eXBlZXhwciwgbWUpIH1cbiAgICBpZiAodHlwZSA9PSBcInJlZ2V4cFwiKSB7XG4gICAgICBjeC5zdGF0ZS5sYXN0VHlwZSA9IGN4Lm1hcmtlZCA9IFwib3BlcmF0b3JcIlxuICAgICAgY3guc3RyZWFtLmJhY2tVcChjeC5zdHJlYW0ucG9zIC0gY3guc3RyZWFtLnN0YXJ0IC0gMSlcbiAgICAgIHJldHVybiBjb250KGV4cHIpXG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHF1YXNpKHR5cGUsIHZhbHVlKSB7XG4gICAgaWYgKHR5cGUgIT0gXCJxdWFzaVwiKSByZXR1cm4gcGFzcygpO1xuICAgIGlmICh2YWx1ZS5zbGljZSh2YWx1ZS5sZW5ndGggLSAyKSAhPSBcIiR7XCIpIHJldHVybiBjb250KHF1YXNpKTtcbiAgICByZXR1cm4gY29udChtYXliZWV4cHJlc3Npb24sIGNvbnRpbnVlUXVhc2kpO1xuICB9XG4gIGZ1bmN0aW9uIGNvbnRpbnVlUXVhc2kodHlwZSkge1xuICAgIGlmICh0eXBlID09IFwifVwiKSB7XG4gICAgICBjeC5tYXJrZWQgPSBcInN0cmluZy0yXCI7XG4gICAgICBjeC5zdGF0ZS50b2tlbml6ZSA9IHRva2VuUXVhc2k7XG4gICAgICByZXR1cm4gY29udChxdWFzaSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGFycm93Qm9keSh0eXBlKSB7XG4gICAgZmluZEZhdEFycm93KGN4LnN0cmVhbSwgY3guc3RhdGUpO1xuICAgIHJldHVybiBwYXNzKHR5cGUgPT0gXCJ7XCIgPyBzdGF0ZW1lbnQgOiBleHByZXNzaW9uKTtcbiAgfVxuICBmdW5jdGlvbiBhcnJvd0JvZHlOb0NvbW1hKHR5cGUpIHtcbiAgICBmaW5kRmF0QXJyb3coY3guc3RyZWFtLCBjeC5zdGF0ZSk7XG4gICAgcmV0dXJuIHBhc3ModHlwZSA9PSBcIntcIiA/IHN0YXRlbWVudCA6IGV4cHJlc3Npb25Ob0NvbW1hKTtcbiAgfVxuICBmdW5jdGlvbiBtYXliZVRhcmdldChub0NvbW1hKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgIGlmICh0eXBlID09IFwiLlwiKSByZXR1cm4gY29udChub0NvbW1hID8gdGFyZ2V0Tm9Db21tYSA6IHRhcmdldCk7XG4gICAgICBlbHNlIGlmICh0eXBlID09IFwidmFyaWFibGVcIiAmJiBpc1RTKSByZXR1cm4gY29udChtYXliZVR5cGVBcmdzLCBub0NvbW1hID8gbWF5YmVvcGVyYXRvck5vQ29tbWEgOiBtYXliZW9wZXJhdG9yQ29tbWEpXG4gICAgICBlbHNlIHJldHVybiBwYXNzKG5vQ29tbWEgPyBleHByZXNzaW9uTm9Db21tYSA6IGV4cHJlc3Npb24pO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gdGFyZ2V0KF8sIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IFwidGFyZ2V0XCIpIHsgY3gubWFya2VkID0gXCJrZXl3b3JkXCI7IHJldHVybiBjb250KG1heWJlb3BlcmF0b3JDb21tYSk7IH1cbiAgfVxuICBmdW5jdGlvbiB0YXJnZXROb0NvbW1hKF8sIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IFwidGFyZ2V0XCIpIHsgY3gubWFya2VkID0gXCJrZXl3b3JkXCI7IHJldHVybiBjb250KG1heWJlb3BlcmF0b3JOb0NvbW1hKTsgfVxuICB9XG4gIGZ1bmN0aW9uIG1heWJlbGFiZWwodHlwZSkge1xuICAgIGlmICh0eXBlID09IFwiOlwiKSByZXR1cm4gY29udChwb3BsZXgsIHN0YXRlbWVudCk7XG4gICAgcmV0dXJuIHBhc3MobWF5YmVvcGVyYXRvckNvbW1hLCBleHBlY3QoXCI7XCIpLCBwb3BsZXgpO1xuICB9XG4gIGZ1bmN0aW9uIHByb3BlcnR5KHR5cGUpIHtcbiAgICBpZiAodHlwZSA9PSBcInZhcmlhYmxlXCIpIHtjeC5tYXJrZWQgPSBcInByb3BlcnR5XCI7IHJldHVybiBjb250KCk7fVxuICB9XG4gIGZ1bmN0aW9uIG9ianByb3AodHlwZSwgdmFsdWUpIHtcbiAgICBpZiAodHlwZSA9PSBcImFzeW5jXCIpIHtcbiAgICAgIGN4Lm1hcmtlZCA9IFwicHJvcGVydHlcIjtcbiAgICAgIHJldHVybiBjb250KG9ianByb3ApO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PSBcInZhcmlhYmxlXCIgfHwgY3guc3R5bGUgPT0gXCJrZXl3b3JkXCIpIHtcbiAgICAgIGN4Lm1hcmtlZCA9IFwicHJvcGVydHlcIjtcbiAgICAgIGlmICh2YWx1ZSA9PSBcImdldFwiIHx8IHZhbHVlID09IFwic2V0XCIpIHJldHVybiBjb250KGdldHRlclNldHRlcik7XG4gICAgICB2YXIgbSAvLyBXb3JrIGFyb3VuZCBmYXQtYXJyb3ctZGV0ZWN0aW9uIGNvbXBsaWNhdGlvbiBmb3IgZGV0ZWN0aW5nIHR5cGVzY3JpcHQgdHlwZWQgYXJyb3cgcGFyYW1zXG4gICAgICBpZiAoaXNUUyAmJiBjeC5zdGF0ZS5mYXRBcnJvd0F0ID09IGN4LnN0cmVhbS5zdGFydCAmJiAobSA9IGN4LnN0cmVhbS5tYXRjaCgvXlxccyo6XFxzKi8sIGZhbHNlKSkpXG4gICAgICAgIGN4LnN0YXRlLmZhdEFycm93QXQgPSBjeC5zdHJlYW0ucG9zICsgbVswXS5sZW5ndGhcbiAgICAgIHJldHVybiBjb250KGFmdGVycHJvcCk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09IFwibnVtYmVyXCIgfHwgdHlwZSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICBjeC5tYXJrZWQgPSBqc29ubGRNb2RlID8gXCJwcm9wZXJ0eVwiIDogKGN4LnN0eWxlICsgXCIgcHJvcGVydHlcIik7XG4gICAgICByZXR1cm4gY29udChhZnRlcnByb3ApO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PSBcImpzb25sZC1rZXl3b3JkXCIpIHtcbiAgICAgIHJldHVybiBjb250KGFmdGVycHJvcCk7XG4gICAgfSBlbHNlIGlmIChpc1RTICYmIGlzTW9kaWZpZXIodmFsdWUpKSB7XG4gICAgICBjeC5tYXJrZWQgPSBcImtleXdvcmRcIlxuICAgICAgcmV0dXJuIGNvbnQob2JqcHJvcClcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJbXCIpIHtcbiAgICAgIHJldHVybiBjb250KGV4cHJlc3Npb24sIG1heWJldHlwZSwgZXhwZWN0KFwiXVwiKSwgYWZ0ZXJwcm9wKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJzcHJlYWRcIikge1xuICAgICAgcmV0dXJuIGNvbnQoZXhwcmVzc2lvbk5vQ29tbWEsIGFmdGVycHJvcCk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PSBcIipcIikge1xuICAgICAgY3gubWFya2VkID0gXCJrZXl3b3JkXCI7XG4gICAgICByZXR1cm4gY29udChvYmpwcm9wKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT0gXCI6XCIpIHtcbiAgICAgIHJldHVybiBwYXNzKGFmdGVycHJvcClcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZ2V0dGVyU2V0dGVyKHR5cGUpIHtcbiAgICBpZiAodHlwZSAhPSBcInZhcmlhYmxlXCIpIHJldHVybiBwYXNzKGFmdGVycHJvcCk7XG4gICAgY3gubWFya2VkID0gXCJwcm9wZXJ0eVwiO1xuICAgIHJldHVybiBjb250KGZ1bmN0aW9uZGVmKTtcbiAgfVxuICBmdW5jdGlvbiBhZnRlcnByb3AodHlwZSkge1xuICAgIGlmICh0eXBlID09IFwiOlwiKSByZXR1cm4gY29udChleHByZXNzaW9uTm9Db21tYSk7XG4gICAgaWYgKHR5cGUgPT0gXCIoXCIpIHJldHVybiBwYXNzKGZ1bmN0aW9uZGVmKTtcbiAgfVxuICBmdW5jdGlvbiBjb21tYXNlcCh3aGF0LCBlbmQsIHNlcCkge1xuICAgIGZ1bmN0aW9uIHByb2NlZWQodHlwZSwgdmFsdWUpIHtcbiAgICAgIGlmIChzZXAgPyBzZXAuaW5kZXhPZih0eXBlKSA+IC0xIDogdHlwZSA9PSBcIixcIikge1xuICAgICAgICB2YXIgbGV4ID0gY3guc3RhdGUubGV4aWNhbDtcbiAgICAgICAgaWYgKGxleC5pbmZvID09IFwiY2FsbFwiKSBsZXgucG9zID0gKGxleC5wb3MgfHwgMCkgKyAxO1xuICAgICAgICByZXR1cm4gY29udChmdW5jdGlvbih0eXBlLCB2YWx1ZSkge1xuICAgICAgICAgIGlmICh0eXBlID09IGVuZCB8fCB2YWx1ZSA9PSBlbmQpIHJldHVybiBwYXNzKClcbiAgICAgICAgICByZXR1cm4gcGFzcyh3aGF0KVxuICAgICAgICB9LCBwcm9jZWVkKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09IGVuZCB8fCB2YWx1ZSA9PSBlbmQpIHJldHVybiBjb250KCk7XG4gICAgICBpZiAoc2VwICYmIHNlcC5pbmRleE9mKFwiO1wiKSA+IC0xKSByZXR1cm4gcGFzcyh3aGF0KVxuICAgICAgcmV0dXJuIGNvbnQoZXhwZWN0KGVuZCkpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24odHlwZSwgdmFsdWUpIHtcbiAgICAgIGlmICh0eXBlID09IGVuZCB8fCB2YWx1ZSA9PSBlbmQpIHJldHVybiBjb250KCk7XG4gICAgICByZXR1cm4gcGFzcyh3aGF0LCBwcm9jZWVkKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGNvbnRDb21tYXNlcCh3aGF0LCBlbmQsIGluZm8pIHtcbiAgICBmb3IgKHZhciBpID0gMzsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgIGN4LmNjLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICByZXR1cm4gY29udChwdXNobGV4KGVuZCwgaW5mbyksIGNvbW1hc2VwKHdoYXQsIGVuZCksIHBvcGxleCk7XG4gIH1cbiAgZnVuY3Rpb24gYmxvY2sodHlwZSkge1xuICAgIGlmICh0eXBlID09IFwifVwiKSByZXR1cm4gY29udCgpO1xuICAgIHJldHVybiBwYXNzKHN0YXRlbWVudCwgYmxvY2spO1xuICB9XG4gIGZ1bmN0aW9uIG1heWJldHlwZSh0eXBlLCB2YWx1ZSkge1xuICAgIGlmIChpc1RTKSB7XG4gICAgICBpZiAodHlwZSA9PSBcIjpcIikgcmV0dXJuIGNvbnQodHlwZWV4cHIpO1xuICAgICAgaWYgKHZhbHVlID09IFwiP1wiKSByZXR1cm4gY29udChtYXliZXR5cGUpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBtYXliZXR5cGVPckluKHR5cGUsIHZhbHVlKSB7XG4gICAgaWYgKGlzVFMgJiYgKHR5cGUgPT0gXCI6XCIgfHwgdmFsdWUgPT0gXCJpblwiKSkgcmV0dXJuIGNvbnQodHlwZWV4cHIpXG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVyZXR0eXBlKHR5cGUpIHtcbiAgICBpZiAoaXNUUyAmJiB0eXBlID09IFwiOlwiKSB7XG4gICAgICBpZiAoY3guc3RyZWFtLm1hdGNoKC9eXFxzKlxcdytcXHMraXNcXGIvLCBmYWxzZSkpIHJldHVybiBjb250KGV4cHJlc3Npb24sIGlzS1csIHR5cGVleHByKVxuICAgICAgZWxzZSByZXR1cm4gY29udCh0eXBlZXhwcilcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gaXNLVyhfLCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBcImlzXCIpIHtcbiAgICAgIGN4Lm1hcmtlZCA9IFwia2V5d29yZFwiXG4gICAgICByZXR1cm4gY29udCgpXG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHR5cGVleHByKHR5cGUsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IFwia2V5b2ZcIiB8fCB2YWx1ZSA9PSBcInR5cGVvZlwiIHx8IHZhbHVlID09IFwiaW5mZXJcIiB8fCB2YWx1ZSA9PSBcInJlYWRvbmx5XCIpIHtcbiAgICAgIGN4Lm1hcmtlZCA9IFwia2V5d29yZFwiXG4gICAgICByZXR1cm4gY29udCh2YWx1ZSA9PSBcInR5cGVvZlwiID8gZXhwcmVzc2lvbk5vQ29tbWEgOiB0eXBlZXhwcilcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gXCJ2YXJpYWJsZVwiIHx8IHZhbHVlID09IFwidm9pZFwiKSB7XG4gICAgICBjeC5tYXJrZWQgPSBcInR5cGVcIlxuICAgICAgcmV0dXJuIGNvbnQoYWZ0ZXJUeXBlKVxuICAgIH1cbiAgICBpZiAodmFsdWUgPT0gXCJ8XCIgfHwgdmFsdWUgPT0gXCImXCIpIHJldHVybiBjb250KHR5cGVleHByKVxuICAgIGlmICh0eXBlID09IFwic3RyaW5nXCIgfHwgdHlwZSA9PSBcIm51bWJlclwiIHx8IHR5cGUgPT0gXCJhdG9tXCIpIHJldHVybiBjb250KGFmdGVyVHlwZSk7XG4gICAgaWYgKHR5cGUgPT0gXCJbXCIpIHJldHVybiBjb250KHB1c2hsZXgoXCJdXCIpLCBjb21tYXNlcCh0eXBlZXhwciwgXCJdXCIsIFwiLFwiKSwgcG9wbGV4LCBhZnRlclR5cGUpXG4gICAgaWYgKHR5cGUgPT0gXCJ7XCIpIHJldHVybiBjb250KHB1c2hsZXgoXCJ9XCIpLCB0eXBlcHJvcHMsIHBvcGxleCwgYWZ0ZXJUeXBlKVxuICAgIGlmICh0eXBlID09IFwiKFwiKSByZXR1cm4gY29udChjb21tYXNlcCh0eXBlYXJnLCBcIilcIiksIG1heWJlUmV0dXJuVHlwZSwgYWZ0ZXJUeXBlKVxuICAgIGlmICh0eXBlID09IFwiPFwiKSByZXR1cm4gY29udChjb21tYXNlcCh0eXBlZXhwciwgXCI+XCIpLCB0eXBlZXhwcilcbiAgICBpZiAodHlwZSA9PSBcInF1YXNpXCIpIHsgcmV0dXJuIHBhc3MocXVhc2lUeXBlLCBhZnRlclR5cGUpOyB9XG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVSZXR1cm5UeXBlKHR5cGUpIHtcbiAgICBpZiAodHlwZSA9PSBcIj0+XCIpIHJldHVybiBjb250KHR5cGVleHByKVxuICB9XG4gIGZ1bmN0aW9uIHR5cGVwcm9wcyh0eXBlKSB7XG4gICAgaWYgKHR5cGUubWF0Y2goL1tcXH1cXClcXF1dLykpIHJldHVybiBjb250KClcbiAgICBpZiAodHlwZSA9PSBcIixcIiB8fCB0eXBlID09IFwiO1wiKSByZXR1cm4gY29udCh0eXBlcHJvcHMpXG4gICAgcmV0dXJuIHBhc3ModHlwZXByb3AsIHR5cGVwcm9wcylcbiAgfVxuICBmdW5jdGlvbiB0eXBlcHJvcCh0eXBlLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlID09IFwidmFyaWFibGVcIiB8fCBjeC5zdHlsZSA9PSBcImtleXdvcmRcIikge1xuICAgICAgY3gubWFya2VkID0gXCJwcm9wZXJ0eVwiXG4gICAgICByZXR1cm4gY29udCh0eXBlcHJvcClcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09IFwiP1wiIHx8IHR5cGUgPT0gXCJudW1iZXJcIiB8fCB0eXBlID09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiBjb250KHR5cGVwcm9wKVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PSBcIjpcIikge1xuICAgICAgcmV0dXJuIGNvbnQodHlwZWV4cHIpXG4gICAgfSBlbHNlIGlmICh0eXBlID09IFwiW1wiKSB7XG4gICAgICByZXR1cm4gY29udChleHBlY3QoXCJ2YXJpYWJsZVwiKSwgbWF5YmV0eXBlT3JJbiwgZXhwZWN0KFwiXVwiKSwgdHlwZXByb3ApXG4gICAgfSBlbHNlIGlmICh0eXBlID09IFwiKFwiKSB7XG4gICAgICByZXR1cm4gcGFzcyhmdW5jdGlvbmRlY2wsIHR5cGVwcm9wKVxuICAgIH0gZWxzZSBpZiAoIXR5cGUubWF0Y2goL1s7XFx9XFwpXFxdLF0vKSkge1xuICAgICAgcmV0dXJuIGNvbnQoKVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBxdWFzaVR5cGUodHlwZSwgdmFsdWUpIHtcbiAgICBpZiAodHlwZSAhPSBcInF1YXNpXCIpIHJldHVybiBwYXNzKCk7XG4gICAgaWYgKHZhbHVlLnNsaWNlKHZhbHVlLmxlbmd0aCAtIDIpICE9IFwiJHtcIikgcmV0dXJuIGNvbnQocXVhc2lUeXBlKTtcbiAgICByZXR1cm4gY29udCh0eXBlZXhwciwgY29udGludWVRdWFzaVR5cGUpO1xuICB9XG4gIGZ1bmN0aW9uIGNvbnRpbnVlUXVhc2lUeXBlKHR5cGUpIHtcbiAgICBpZiAodHlwZSA9PSBcIn1cIikge1xuICAgICAgY3gubWFya2VkID0gXCJzdHJpbmctMlwiO1xuICAgICAgY3guc3RhdGUudG9rZW5pemUgPSB0b2tlblF1YXNpO1xuICAgICAgcmV0dXJuIGNvbnQocXVhc2lUeXBlKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gdHlwZWFyZyh0eXBlLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlID09IFwidmFyaWFibGVcIiAmJiBjeC5zdHJlYW0ubWF0Y2goL15cXHMqWz86XS8sIGZhbHNlKSB8fCB2YWx1ZSA9PSBcIj9cIikgcmV0dXJuIGNvbnQodHlwZWFyZylcbiAgICBpZiAodHlwZSA9PSBcIjpcIikgcmV0dXJuIGNvbnQodHlwZWV4cHIpXG4gICAgaWYgKHR5cGUgPT0gXCJzcHJlYWRcIikgcmV0dXJuIGNvbnQodHlwZWFyZylcbiAgICByZXR1cm4gcGFzcyh0eXBlZXhwcilcbiAgfVxuICBmdW5jdGlvbiBhZnRlclR5cGUodHlwZSwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gXCI8XCIpIHJldHVybiBjb250KHB1c2hsZXgoXCI+XCIpLCBjb21tYXNlcCh0eXBlZXhwciwgXCI+XCIpLCBwb3BsZXgsIGFmdGVyVHlwZSlcbiAgICBpZiAodmFsdWUgPT0gXCJ8XCIgfHwgdHlwZSA9PSBcIi5cIiB8fCB2YWx1ZSA9PSBcIiZcIikgcmV0dXJuIGNvbnQodHlwZWV4cHIpXG4gICAgaWYgKHR5cGUgPT0gXCJbXCIpIHJldHVybiBjb250KHR5cGVleHByLCBleHBlY3QoXCJdXCIpLCBhZnRlclR5cGUpXG4gICAgaWYgKHZhbHVlID09IFwiZXh0ZW5kc1wiIHx8IHZhbHVlID09IFwiaW1wbGVtZW50c1wiKSB7IGN4Lm1hcmtlZCA9IFwia2V5d29yZFwiOyByZXR1cm4gY29udCh0eXBlZXhwcikgfVxuICAgIGlmICh2YWx1ZSA9PSBcIj9cIikgcmV0dXJuIGNvbnQodHlwZWV4cHIsIGV4cGVjdChcIjpcIiksIHR5cGVleHByKVxuICB9XG4gIGZ1bmN0aW9uIG1heWJlVHlwZUFyZ3MoXywgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gXCI8XCIpIHJldHVybiBjb250KHB1c2hsZXgoXCI+XCIpLCBjb21tYXNlcCh0eXBlZXhwciwgXCI+XCIpLCBwb3BsZXgsIGFmdGVyVHlwZSlcbiAgfVxuICBmdW5jdGlvbiB0eXBlcGFyYW0oKSB7XG4gICAgcmV0dXJuIHBhc3ModHlwZWV4cHIsIG1heWJlVHlwZURlZmF1bHQpXG4gIH1cbiAgZnVuY3Rpb24gbWF5YmVUeXBlRGVmYXVsdChfLCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBcIj1cIikgcmV0dXJuIGNvbnQodHlwZWV4cHIpXG4gIH1cbiAgZnVuY3Rpb24gdmFyZGVmKF8sIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IFwiZW51bVwiKSB7Y3gubWFya2VkID0gXCJrZXl3b3JkXCI7IHJldHVybiBjb250KGVudW1kZWYpfVxuICAgIHJldHVybiBwYXNzKHBhdHRlcm4sIG1heWJldHlwZSwgbWF5YmVBc3NpZ24sIHZhcmRlZkNvbnQpO1xuICB9XG4gIGZ1bmN0aW9uIHBhdHRlcm4odHlwZSwgdmFsdWUpIHtcbiAgICBpZiAoaXNUUyAmJiBpc01vZGlmaWVyKHZhbHVlKSkgeyBjeC5tYXJrZWQgPSBcImtleXdvcmRcIjsgcmV0dXJuIGNvbnQocGF0dGVybikgfVxuICAgIGlmICh0eXBlID09IFwidmFyaWFibGVcIikgeyByZWdpc3Rlcih2YWx1ZSk7IHJldHVybiBjb250KCk7IH1cbiAgICBpZiAodHlwZSA9PSBcInNwcmVhZFwiKSByZXR1cm4gY29udChwYXR0ZXJuKTtcbiAgICBpZiAodHlwZSA9PSBcIltcIikgcmV0dXJuIGNvbnRDb21tYXNlcChlbHRwYXR0ZXJuLCBcIl1cIik7XG4gICAgaWYgKHR5cGUgPT0gXCJ7XCIpIHJldHVybiBjb250Q29tbWFzZXAocHJvcHBhdHRlcm4sIFwifVwiKTtcbiAgfVxuICBmdW5jdGlvbiBwcm9wcGF0dGVybih0eXBlLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlID09IFwidmFyaWFibGVcIiAmJiAhY3guc3RyZWFtLm1hdGNoKC9eXFxzKjovLCBmYWxzZSkpIHtcbiAgICAgIHJlZ2lzdGVyKHZhbHVlKTtcbiAgICAgIHJldHVybiBjb250KG1heWJlQXNzaWduKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gXCJ2YXJpYWJsZVwiKSBjeC5tYXJrZWQgPSBcInByb3BlcnR5XCI7XG4gICAgaWYgKHR5cGUgPT0gXCJzcHJlYWRcIikgcmV0dXJuIGNvbnQocGF0dGVybik7XG4gICAgaWYgKHR5cGUgPT0gXCJ9XCIpIHJldHVybiBwYXNzKCk7XG4gICAgaWYgKHR5cGUgPT0gXCJbXCIpIHJldHVybiBjb250KGV4cHJlc3Npb24sIGV4cGVjdCgnXScpLCBleHBlY3QoJzonKSwgcHJvcHBhdHRlcm4pO1xuICAgIHJldHVybiBjb250KGV4cGVjdChcIjpcIiksIHBhdHRlcm4sIG1heWJlQXNzaWduKTtcbiAgfVxuICBmdW5jdGlvbiBlbHRwYXR0ZXJuKCkge1xuICAgIHJldHVybiBwYXNzKHBhdHRlcm4sIG1heWJlQXNzaWduKVxuICB9XG4gIGZ1bmN0aW9uIG1heWJlQXNzaWduKF90eXBlLCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBcIj1cIikgcmV0dXJuIGNvbnQoZXhwcmVzc2lvbk5vQ29tbWEpO1xuICB9XG4gIGZ1bmN0aW9uIHZhcmRlZkNvbnQodHlwZSkge1xuICAgIGlmICh0eXBlID09IFwiLFwiKSByZXR1cm4gY29udCh2YXJkZWYpO1xuICB9XG4gIGZ1bmN0aW9uIG1heWJlZWxzZSh0eXBlLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlID09IFwia2V5d29yZCBiXCIgJiYgdmFsdWUgPT0gXCJlbHNlXCIpIHJldHVybiBjb250KHB1c2hsZXgoXCJmb3JtXCIsIFwiZWxzZVwiKSwgc3RhdGVtZW50LCBwb3BsZXgpO1xuICB9XG4gIGZ1bmN0aW9uIGZvcnNwZWModHlwZSwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gXCJhd2FpdFwiKSByZXR1cm4gY29udChmb3JzcGVjKTtcbiAgICBpZiAodHlwZSA9PSBcIihcIikgcmV0dXJuIGNvbnQocHVzaGxleChcIilcIiksIGZvcnNwZWMxLCBwb3BsZXgpO1xuICB9XG4gIGZ1bmN0aW9uIGZvcnNwZWMxKHR5cGUpIHtcbiAgICBpZiAodHlwZSA9PSBcInZhclwiKSByZXR1cm4gY29udCh2YXJkZWYsIGZvcnNwZWMyKTtcbiAgICBpZiAodHlwZSA9PSBcInZhcmlhYmxlXCIpIHJldHVybiBjb250KGZvcnNwZWMyKTtcbiAgICByZXR1cm4gcGFzcyhmb3JzcGVjMilcbiAgfVxuICBmdW5jdGlvbiBmb3JzcGVjMih0eXBlLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlID09IFwiKVwiKSByZXR1cm4gY29udCgpXG4gICAgaWYgKHR5cGUgPT0gXCI7XCIpIHJldHVybiBjb250KGZvcnNwZWMyKVxuICAgIGlmICh2YWx1ZSA9PSBcImluXCIgfHwgdmFsdWUgPT0gXCJvZlwiKSB7IGN4Lm1hcmtlZCA9IFwia2V5d29yZFwiOyByZXR1cm4gY29udChleHByZXNzaW9uLCBmb3JzcGVjMikgfVxuICAgIHJldHVybiBwYXNzKGV4cHJlc3Npb24sIGZvcnNwZWMyKVxuICB9XG4gIGZ1bmN0aW9uIGZ1bmN0aW9uZGVmKHR5cGUsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IFwiKlwiKSB7Y3gubWFya2VkID0gXCJrZXl3b3JkXCI7IHJldHVybiBjb250KGZ1bmN0aW9uZGVmKTt9XG4gICAgaWYgKHR5cGUgPT0gXCJ2YXJpYWJsZVwiKSB7cmVnaXN0ZXIodmFsdWUpOyByZXR1cm4gY29udChmdW5jdGlvbmRlZik7fVxuICAgIGlmICh0eXBlID09IFwiKFwiKSByZXR1cm4gY29udChwdXNoY29udGV4dCwgcHVzaGxleChcIilcIiksIGNvbW1hc2VwKGZ1bmFyZywgXCIpXCIpLCBwb3BsZXgsIG1heWJlcmV0dHlwZSwgc3RhdGVtZW50LCBwb3Bjb250ZXh0KTtcbiAgICBpZiAoaXNUUyAmJiB2YWx1ZSA9PSBcIjxcIikgcmV0dXJuIGNvbnQocHVzaGxleChcIj5cIiksIGNvbW1hc2VwKHR5cGVwYXJhbSwgXCI+XCIpLCBwb3BsZXgsIGZ1bmN0aW9uZGVmKVxuICB9XG4gIGZ1bmN0aW9uIGZ1bmN0aW9uZGVjbCh0eXBlLCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBcIipcIikge2N4Lm1hcmtlZCA9IFwia2V5d29yZFwiOyByZXR1cm4gY29udChmdW5jdGlvbmRlY2wpO31cbiAgICBpZiAodHlwZSA9PSBcInZhcmlhYmxlXCIpIHtyZWdpc3Rlcih2YWx1ZSk7IHJldHVybiBjb250KGZ1bmN0aW9uZGVjbCk7fVxuICAgIGlmICh0eXBlID09IFwiKFwiKSByZXR1cm4gY29udChwdXNoY29udGV4dCwgcHVzaGxleChcIilcIiksIGNvbW1hc2VwKGZ1bmFyZywgXCIpXCIpLCBwb3BsZXgsIG1heWJlcmV0dHlwZSwgcG9wY29udGV4dCk7XG4gICAgaWYgKGlzVFMgJiYgdmFsdWUgPT0gXCI8XCIpIHJldHVybiBjb250KHB1c2hsZXgoXCI+XCIpLCBjb21tYXNlcCh0eXBlcGFyYW0sIFwiPlwiKSwgcG9wbGV4LCBmdW5jdGlvbmRlY2wpXG4gIH1cbiAgZnVuY3Rpb24gdHlwZW5hbWUodHlwZSwgdmFsdWUpIHtcbiAgICBpZiAodHlwZSA9PSBcImtleXdvcmRcIiB8fCB0eXBlID09IFwidmFyaWFibGVcIikge1xuICAgICAgY3gubWFya2VkID0gXCJ0eXBlXCJcbiAgICAgIHJldHVybiBjb250KHR5cGVuYW1lKVxuICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gXCI8XCIpIHtcbiAgICAgIHJldHVybiBjb250KHB1c2hsZXgoXCI+XCIpLCBjb21tYXNlcCh0eXBlcGFyYW0sIFwiPlwiKSwgcG9wbGV4KVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBmdW5hcmcodHlwZSwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gXCJAXCIpIGNvbnQoZXhwcmVzc2lvbiwgZnVuYXJnKVxuICAgIGlmICh0eXBlID09IFwic3ByZWFkXCIpIHJldHVybiBjb250KGZ1bmFyZyk7XG4gICAgaWYgKGlzVFMgJiYgaXNNb2RpZmllcih2YWx1ZSkpIHsgY3gubWFya2VkID0gXCJrZXl3b3JkXCI7IHJldHVybiBjb250KGZ1bmFyZyk7IH1cbiAgICBpZiAoaXNUUyAmJiB0eXBlID09IFwidGhpc1wiKSByZXR1cm4gY29udChtYXliZXR5cGUsIG1heWJlQXNzaWduKVxuICAgIHJldHVybiBwYXNzKHBhdHRlcm4sIG1heWJldHlwZSwgbWF5YmVBc3NpZ24pO1xuICB9XG4gIGZ1bmN0aW9uIGNsYXNzRXhwcmVzc2lvbih0eXBlLCB2YWx1ZSkge1xuICAgIC8vIENsYXNzIGV4cHJlc3Npb25zIG1heSBoYXZlIGFuIG9wdGlvbmFsIG5hbWUuXG4gICAgaWYgKHR5cGUgPT0gXCJ2YXJpYWJsZVwiKSByZXR1cm4gY2xhc3NOYW1lKHR5cGUsIHZhbHVlKTtcbiAgICByZXR1cm4gY2xhc3NOYW1lQWZ0ZXIodHlwZSwgdmFsdWUpO1xuICB9XG4gIGZ1bmN0aW9uIGNsYXNzTmFtZSh0eXBlLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlID09IFwidmFyaWFibGVcIikge3JlZ2lzdGVyKHZhbHVlKTsgcmV0dXJuIGNvbnQoY2xhc3NOYW1lQWZ0ZXIpO31cbiAgfVxuICBmdW5jdGlvbiBjbGFzc05hbWVBZnRlcih0eXBlLCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBcIjxcIikgcmV0dXJuIGNvbnQocHVzaGxleChcIj5cIiksIGNvbW1hc2VwKHR5cGVwYXJhbSwgXCI+XCIpLCBwb3BsZXgsIGNsYXNzTmFtZUFmdGVyKVxuICAgIGlmICh2YWx1ZSA9PSBcImV4dGVuZHNcIiB8fCB2YWx1ZSA9PSBcImltcGxlbWVudHNcIiB8fCAoaXNUUyAmJiB0eXBlID09IFwiLFwiKSkge1xuICAgICAgaWYgKHZhbHVlID09IFwiaW1wbGVtZW50c1wiKSBjeC5tYXJrZWQgPSBcImtleXdvcmRcIjtcbiAgICAgIHJldHVybiBjb250KGlzVFMgPyB0eXBlZXhwciA6IGV4cHJlc3Npb24sIGNsYXNzTmFtZUFmdGVyKTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gXCJ7XCIpIHJldHVybiBjb250KHB1c2hsZXgoXCJ9XCIpLCBjbGFzc0JvZHksIHBvcGxleCk7XG4gIH1cbiAgZnVuY3Rpb24gY2xhc3NCb2R5KHR5cGUsIHZhbHVlKSB7XG4gICAgaWYgKHR5cGUgPT0gXCJhc3luY1wiIHx8XG4gICAgICAgICh0eXBlID09IFwidmFyaWFibGVcIiAmJlxuICAgICAgICAgKHZhbHVlID09IFwic3RhdGljXCIgfHwgdmFsdWUgPT0gXCJnZXRcIiB8fCB2YWx1ZSA9PSBcInNldFwiIHx8IChpc1RTICYmIGlzTW9kaWZpZXIodmFsdWUpKSkgJiZcbiAgICAgICAgIGN4LnN0cmVhbS5tYXRjaCgvXlxccytbXFx3JFxceGExLVxcdWZmZmZdLywgZmFsc2UpKSkge1xuICAgICAgY3gubWFya2VkID0gXCJrZXl3b3JkXCI7XG4gICAgICByZXR1cm4gY29udChjbGFzc0JvZHkpO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PSBcInZhcmlhYmxlXCIgfHwgY3guc3R5bGUgPT0gXCJrZXl3b3JkXCIpIHtcbiAgICAgIGN4Lm1hcmtlZCA9IFwicHJvcGVydHlcIjtcbiAgICAgIHJldHVybiBjb250KGNsYXNzZmllbGQsIGNsYXNzQm9keSk7XG4gICAgfVxuICAgIGlmICh0eXBlID09IFwibnVtYmVyXCIgfHwgdHlwZSA9PSBcInN0cmluZ1wiKSByZXR1cm4gY29udChjbGFzc2ZpZWxkLCBjbGFzc0JvZHkpO1xuICAgIGlmICh0eXBlID09IFwiW1wiKVxuICAgICAgcmV0dXJuIGNvbnQoZXhwcmVzc2lvbiwgbWF5YmV0eXBlLCBleHBlY3QoXCJdXCIpLCBjbGFzc2ZpZWxkLCBjbGFzc0JvZHkpXG4gICAgaWYgKHZhbHVlID09IFwiKlwiKSB7XG4gICAgICBjeC5tYXJrZWQgPSBcImtleXdvcmRcIjtcbiAgICAgIHJldHVybiBjb250KGNsYXNzQm9keSk7XG4gICAgfVxuICAgIGlmIChpc1RTICYmIHR5cGUgPT0gXCIoXCIpIHJldHVybiBwYXNzKGZ1bmN0aW9uZGVjbCwgY2xhc3NCb2R5KVxuICAgIGlmICh0eXBlID09IFwiO1wiIHx8IHR5cGUgPT0gXCIsXCIpIHJldHVybiBjb250KGNsYXNzQm9keSk7XG4gICAgaWYgKHR5cGUgPT0gXCJ9XCIpIHJldHVybiBjb250KCk7XG4gICAgaWYgKHZhbHVlID09IFwiQFwiKSByZXR1cm4gY29udChleHByZXNzaW9uLCBjbGFzc0JvZHkpXG4gIH1cbiAgZnVuY3Rpb24gY2xhc3NmaWVsZCh0eXBlLCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBcIiFcIikgcmV0dXJuIGNvbnQoY2xhc3NmaWVsZClcbiAgICBpZiAodmFsdWUgPT0gXCI/XCIpIHJldHVybiBjb250KGNsYXNzZmllbGQpXG4gICAgaWYgKHR5cGUgPT0gXCI6XCIpIHJldHVybiBjb250KHR5cGVleHByLCBtYXliZUFzc2lnbilcbiAgICBpZiAodmFsdWUgPT0gXCI9XCIpIHJldHVybiBjb250KGV4cHJlc3Npb25Ob0NvbW1hKVxuICAgIHZhciBjb250ZXh0ID0gY3guc3RhdGUubGV4aWNhbC5wcmV2LCBpc0ludGVyZmFjZSA9IGNvbnRleHQgJiYgY29udGV4dC5pbmZvID09IFwiaW50ZXJmYWNlXCJcbiAgICByZXR1cm4gcGFzcyhpc0ludGVyZmFjZSA/IGZ1bmN0aW9uZGVjbCA6IGZ1bmN0aW9uZGVmKVxuICB9XG4gIGZ1bmN0aW9uIGFmdGVyRXhwb3J0KHR5cGUsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IFwiKlwiKSB7IGN4Lm1hcmtlZCA9IFwia2V5d29yZFwiOyByZXR1cm4gY29udChtYXliZUZyb20sIGV4cGVjdChcIjtcIikpOyB9XG4gICAgaWYgKHZhbHVlID09IFwiZGVmYXVsdFwiKSB7IGN4Lm1hcmtlZCA9IFwia2V5d29yZFwiOyByZXR1cm4gY29udChleHByZXNzaW9uLCBleHBlY3QoXCI7XCIpKTsgfVxuICAgIGlmICh0eXBlID09IFwie1wiKSByZXR1cm4gY29udChjb21tYXNlcChleHBvcnRGaWVsZCwgXCJ9XCIpLCBtYXliZUZyb20sIGV4cGVjdChcIjtcIikpO1xuICAgIHJldHVybiBwYXNzKHN0YXRlbWVudCk7XG4gIH1cbiAgZnVuY3Rpb24gZXhwb3J0RmllbGQodHlwZSwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gXCJhc1wiKSB7IGN4Lm1hcmtlZCA9IFwia2V5d29yZFwiOyByZXR1cm4gY29udChleHBlY3QoXCJ2YXJpYWJsZVwiKSk7IH1cbiAgICBpZiAodHlwZSA9PSBcInZhcmlhYmxlXCIpIHJldHVybiBwYXNzKGV4cHJlc3Npb25Ob0NvbW1hLCBleHBvcnRGaWVsZCk7XG4gIH1cbiAgZnVuY3Rpb24gYWZ0ZXJJbXBvcnQodHlwZSkge1xuICAgIGlmICh0eXBlID09IFwic3RyaW5nXCIpIHJldHVybiBjb250KCk7XG4gICAgaWYgKHR5cGUgPT0gXCIoXCIpIHJldHVybiBwYXNzKGV4cHJlc3Npb24pO1xuICAgIGlmICh0eXBlID09IFwiLlwiKSByZXR1cm4gcGFzcyhtYXliZW9wZXJhdG9yQ29tbWEpO1xuICAgIHJldHVybiBwYXNzKGltcG9ydFNwZWMsIG1heWJlTW9yZUltcG9ydHMsIG1heWJlRnJvbSk7XG4gIH1cbiAgZnVuY3Rpb24gaW1wb3J0U3BlYyh0eXBlLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlID09IFwie1wiKSByZXR1cm4gY29udENvbW1hc2VwKGltcG9ydFNwZWMsIFwifVwiKTtcbiAgICBpZiAodHlwZSA9PSBcInZhcmlhYmxlXCIpIHJlZ2lzdGVyKHZhbHVlKTtcbiAgICBpZiAodmFsdWUgPT0gXCIqXCIpIGN4Lm1hcmtlZCA9IFwia2V5d29yZFwiO1xuICAgIHJldHVybiBjb250KG1heWJlQXMpO1xuICB9XG4gIGZ1bmN0aW9uIG1heWJlTW9yZUltcG9ydHModHlwZSkge1xuICAgIGlmICh0eXBlID09IFwiLFwiKSByZXR1cm4gY29udChpbXBvcnRTcGVjLCBtYXliZU1vcmVJbXBvcnRzKVxuICB9XG4gIGZ1bmN0aW9uIG1heWJlQXMoX3R5cGUsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IFwiYXNcIikgeyBjeC5tYXJrZWQgPSBcImtleXdvcmRcIjsgcmV0dXJuIGNvbnQoaW1wb3J0U3BlYyk7IH1cbiAgfVxuICBmdW5jdGlvbiBtYXliZUZyb20oX3R5cGUsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IFwiZnJvbVwiKSB7IGN4Lm1hcmtlZCA9IFwia2V5d29yZFwiOyByZXR1cm4gY29udChleHByZXNzaW9uKTsgfVxuICB9XG4gIGZ1bmN0aW9uIGFycmF5TGl0ZXJhbCh0eXBlKSB7XG4gICAgaWYgKHR5cGUgPT0gXCJdXCIpIHJldHVybiBjb250KCk7XG4gICAgcmV0dXJuIHBhc3MoY29tbWFzZXAoZXhwcmVzc2lvbk5vQ29tbWEsIFwiXVwiKSk7XG4gIH1cbiAgZnVuY3Rpb24gZW51bWRlZigpIHtcbiAgICByZXR1cm4gcGFzcyhwdXNobGV4KFwiZm9ybVwiKSwgcGF0dGVybiwgZXhwZWN0KFwie1wiKSwgcHVzaGxleChcIn1cIiksIGNvbW1hc2VwKGVudW1tZW1iZXIsIFwifVwiKSwgcG9wbGV4LCBwb3BsZXgpXG4gIH1cbiAgZnVuY3Rpb24gZW51bW1lbWJlcigpIHtcbiAgICByZXR1cm4gcGFzcyhwYXR0ZXJuLCBtYXliZUFzc2lnbik7XG4gIH1cblxuICBmdW5jdGlvbiBpc0NvbnRpbnVlZFN0YXRlbWVudChzdGF0ZSwgdGV4dEFmdGVyKSB7XG4gICAgcmV0dXJuIHN0YXRlLmxhc3RUeXBlID09IFwib3BlcmF0b3JcIiB8fCBzdGF0ZS5sYXN0VHlwZSA9PSBcIixcIiB8fFxuICAgICAgaXNPcGVyYXRvckNoYXIudGVzdCh0ZXh0QWZ0ZXIuY2hhckF0KDApKSB8fFxuICAgICAgL1ssLl0vLnRlc3QodGV4dEFmdGVyLmNoYXJBdCgwKSk7XG4gIH1cblxuICBmdW5jdGlvbiBleHByZXNzaW9uQWxsb3dlZChzdHJlYW0sIHN0YXRlLCBiYWNrVXApIHtcbiAgICByZXR1cm4gc3RhdGUudG9rZW5pemUgPT0gdG9rZW5CYXNlICYmXG4gICAgICAvXig/Om9wZXJhdG9yfHNvZnxrZXl3b3JkIFtiY2RdfGNhc2V8bmV3fGV4cG9ydHxkZWZhdWx0fHNwcmVhZHxbXFxbe31cXCgsOzpdfD0+KSQvLnRlc3Qoc3RhdGUubGFzdFR5cGUpIHx8XG4gICAgICAoc3RhdGUubGFzdFR5cGUgPT0gXCJxdWFzaVwiICYmIC9cXHtcXHMqJC8udGVzdChzdHJlYW0uc3RyaW5nLnNsaWNlKDAsIHN0cmVhbS5wb3MgLSAoYmFja1VwIHx8IDApKSkpXG4gIH1cblxuICAvLyBJbnRlcmZhY2VcblxuICByZXR1cm4ge1xuICAgIHN0YXJ0U3RhdGU6IGZ1bmN0aW9uKGJhc2Vjb2x1bW4pIHtcbiAgICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgICAgdG9rZW5pemU6IHRva2VuQmFzZSxcbiAgICAgICAgbGFzdFR5cGU6IFwic29mXCIsXG4gICAgICAgIGNjOiBbXSxcbiAgICAgICAgbGV4aWNhbDogbmV3IEpTTGV4aWNhbCgoYmFzZWNvbHVtbiB8fCAwKSAtIGluZGVudFVuaXQsIDAsIFwiYmxvY2tcIiwgZmFsc2UpLFxuICAgICAgICBsb2NhbFZhcnM6IHBhcnNlckNvbmZpZy5sb2NhbFZhcnMsXG4gICAgICAgIGNvbnRleHQ6IHBhcnNlckNvbmZpZy5sb2NhbFZhcnMgJiYgbmV3IENvbnRleHQobnVsbCwgbnVsbCwgZmFsc2UpLFxuICAgICAgICBpbmRlbnRlZDogYmFzZWNvbHVtbiB8fCAwXG4gICAgICB9O1xuICAgICAgaWYgKHBhcnNlckNvbmZpZy5nbG9iYWxWYXJzICYmIHR5cGVvZiBwYXJzZXJDb25maWcuZ2xvYmFsVmFycyA9PSBcIm9iamVjdFwiKVxuICAgICAgICBzdGF0ZS5nbG9iYWxWYXJzID0gcGFyc2VyQ29uZmlnLmdsb2JhbFZhcnM7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfSxcblxuICAgIHRva2VuOiBmdW5jdGlvbihzdHJlYW0sIHN0YXRlKSB7XG4gICAgICBpZiAoc3RyZWFtLnNvbCgpKSB7XG4gICAgICAgIGlmICghc3RhdGUubGV4aWNhbC5oYXNPd25Qcm9wZXJ0eShcImFsaWduXCIpKVxuICAgICAgICAgIHN0YXRlLmxleGljYWwuYWxpZ24gPSBmYWxzZTtcbiAgICAgICAgc3RhdGUuaW5kZW50ZWQgPSBzdHJlYW0uaW5kZW50YXRpb24oKTtcbiAgICAgICAgZmluZEZhdEFycm93KHN0cmVhbSwgc3RhdGUpO1xuICAgICAgfVxuICAgICAgaWYgKHN0YXRlLnRva2VuaXplICE9IHRva2VuQ29tbWVudCAmJiBzdHJlYW0uZWF0U3BhY2UoKSkgcmV0dXJuIG51bGw7XG4gICAgICB2YXIgc3R5bGUgPSBzdGF0ZS50b2tlbml6ZShzdHJlYW0sIHN0YXRlKTtcbiAgICAgIGlmICh0eXBlID09IFwiY29tbWVudFwiKSByZXR1cm4gc3R5bGU7XG4gICAgICBzdGF0ZS5sYXN0VHlwZSA9IHR5cGUgPT0gXCJvcGVyYXRvclwiICYmIChjb250ZW50ID09IFwiKytcIiB8fCBjb250ZW50ID09IFwiLS1cIikgPyBcImluY2RlY1wiIDogdHlwZTtcbiAgICAgIHJldHVybiBwYXJzZUpTKHN0YXRlLCBzdHlsZSwgdHlwZSwgY29udGVudCwgc3RyZWFtKTtcbiAgICB9LFxuXG4gICAgaW5kZW50OiBmdW5jdGlvbihzdGF0ZSwgdGV4dEFmdGVyKSB7XG4gICAgICBpZiAoc3RhdGUudG9rZW5pemUgPT0gdG9rZW5Db21tZW50IHx8IHN0YXRlLnRva2VuaXplID09IHRva2VuUXVhc2kpIHJldHVybiBDb2RlTWlycm9yLlBhc3M7XG4gICAgICBpZiAoc3RhdGUudG9rZW5pemUgIT0gdG9rZW5CYXNlKSByZXR1cm4gMDtcbiAgICAgIHZhciBmaXJzdENoYXIgPSB0ZXh0QWZ0ZXIgJiYgdGV4dEFmdGVyLmNoYXJBdCgwKSwgbGV4aWNhbCA9IHN0YXRlLmxleGljYWwsIHRvcFxuICAgICAgLy8gS2x1ZGdlIHRvIHByZXZlbnQgJ21heWJlbHNlJyBmcm9tIGJsb2NraW5nIGxleGljYWwgc2NvcGUgcG9wc1xuICAgICAgaWYgKCEvXlxccyplbHNlXFxiLy50ZXN0KHRleHRBZnRlcikpIGZvciAodmFyIGkgPSBzdGF0ZS5jYy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgYyA9IHN0YXRlLmNjW2ldO1xuICAgICAgICBpZiAoYyA9PSBwb3BsZXgpIGxleGljYWwgPSBsZXhpY2FsLnByZXY7XG4gICAgICAgIGVsc2UgaWYgKGMgIT0gbWF5YmVlbHNlICYmIGMgIT0gcG9wY29udGV4dCkgYnJlYWs7XG4gICAgICB9XG4gICAgICB3aGlsZSAoKGxleGljYWwudHlwZSA9PSBcInN0YXRcIiB8fCBsZXhpY2FsLnR5cGUgPT0gXCJmb3JtXCIpICYmXG4gICAgICAgICAgICAgKGZpcnN0Q2hhciA9PSBcIn1cIiB8fCAoKHRvcCA9IHN0YXRlLmNjW3N0YXRlLmNjLmxlbmd0aCAtIDFdKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodG9wID09IG1heWJlb3BlcmF0b3JDb21tYSB8fCB0b3AgPT0gbWF5YmVvcGVyYXRvck5vQ29tbWEpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICEvXlssXFwuPStcXC0qOj9bXFwoXS8udGVzdCh0ZXh0QWZ0ZXIpKSkpXG4gICAgICAgIGxleGljYWwgPSBsZXhpY2FsLnByZXY7XG4gICAgICBpZiAoc3RhdGVtZW50SW5kZW50ICYmIGxleGljYWwudHlwZSA9PSBcIilcIiAmJiBsZXhpY2FsLnByZXYudHlwZSA9PSBcInN0YXRcIilcbiAgICAgICAgbGV4aWNhbCA9IGxleGljYWwucHJldjtcbiAgICAgIHZhciB0eXBlID0gbGV4aWNhbC50eXBlLCBjbG9zaW5nID0gZmlyc3RDaGFyID09IHR5cGU7XG5cbiAgICAgIGlmICh0eXBlID09IFwidmFyZGVmXCIpIHJldHVybiBsZXhpY2FsLmluZGVudGVkICsgKHN0YXRlLmxhc3RUeXBlID09IFwib3BlcmF0b3JcIiB8fCBzdGF0ZS5sYXN0VHlwZSA9PSBcIixcIiA/IGxleGljYWwuaW5mby5sZW5ndGggKyAxIDogMCk7XG4gICAgICBlbHNlIGlmICh0eXBlID09IFwiZm9ybVwiICYmIGZpcnN0Q2hhciA9PSBcIntcIikgcmV0dXJuIGxleGljYWwuaW5kZW50ZWQ7XG4gICAgICBlbHNlIGlmICh0eXBlID09IFwiZm9ybVwiKSByZXR1cm4gbGV4aWNhbC5pbmRlbnRlZCArIGluZGVudFVuaXQ7XG4gICAgICBlbHNlIGlmICh0eXBlID09IFwic3RhdFwiKVxuICAgICAgICByZXR1cm4gbGV4aWNhbC5pbmRlbnRlZCArIChpc0NvbnRpbnVlZFN0YXRlbWVudChzdGF0ZSwgdGV4dEFmdGVyKSA/IHN0YXRlbWVudEluZGVudCB8fCBpbmRlbnRVbml0IDogMCk7XG4gICAgICBlbHNlIGlmIChsZXhpY2FsLmluZm8gPT0gXCJzd2l0Y2hcIiAmJiAhY2xvc2luZyAmJiBwYXJzZXJDb25maWcuZG91YmxlSW5kZW50U3dpdGNoICE9IGZhbHNlKVxuICAgICAgICByZXR1cm4gbGV4aWNhbC5pbmRlbnRlZCArICgvXig/OmNhc2V8ZGVmYXVsdClcXGIvLnRlc3QodGV4dEFmdGVyKSA/IGluZGVudFVuaXQgOiAyICogaW5kZW50VW5pdCk7XG4gICAgICBlbHNlIGlmIChsZXhpY2FsLmFsaWduKSByZXR1cm4gbGV4aWNhbC5jb2x1bW4gKyAoY2xvc2luZyA/IDAgOiAxKTtcbiAgICAgIGVsc2UgcmV0dXJuIGxleGljYWwuaW5kZW50ZWQgKyAoY2xvc2luZyA/IDAgOiBpbmRlbnRVbml0KTtcbiAgICB9LFxuXG4gICAgZWxlY3RyaWNJbnB1dDogL15cXHMqKD86Y2FzZSAuKj86fGRlZmF1bHQ6fFxce3xcXH0pJC8sXG4gICAgYmxvY2tDb21tZW50U3RhcnQ6IGpzb25Nb2RlID8gbnVsbCA6IFwiLypcIixcbiAgICBibG9ja0NvbW1lbnRFbmQ6IGpzb25Nb2RlID8gbnVsbCA6IFwiKi9cIixcbiAgICBibG9ja0NvbW1lbnRDb250aW51ZToganNvbk1vZGUgPyBudWxsIDogXCIgKiBcIixcbiAgICBsaW5lQ29tbWVudDoganNvbk1vZGUgPyBudWxsIDogXCIvL1wiLFxuICAgIGZvbGQ6IFwiYnJhY2VcIixcbiAgICBjbG9zZUJyYWNrZXRzOiBcIigpW117fScnXFxcIlxcXCJgYFwiLFxuXG4gICAgaGVscGVyVHlwZToganNvbk1vZGUgPyBcImpzb25cIiA6IFwiamF2YXNjcmlwdFwiLFxuICAgIGpzb25sZE1vZGU6IGpzb25sZE1vZGUsXG4gICAganNvbk1vZGU6IGpzb25Nb2RlLFxuXG4gICAgZXhwcmVzc2lvbkFsbG93ZWQ6IGV4cHJlc3Npb25BbGxvd2VkLFxuXG4gICAgc2tpcEV4cHJlc3Npb246IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICBwYXJzZUpTKHN0YXRlLCBcImF0b21cIiwgXCJhdG9tXCIsIFwidHJ1ZVwiLCBuZXcgQ29kZU1pcnJvci5TdHJpbmdTdHJlYW0oXCJcIiwgMiwgbnVsbCkpXG4gICAgfVxuICB9O1xufSk7XG5cbkNvZGVNaXJyb3IucmVnaXN0ZXJIZWxwZXIoXCJ3b3JkQ2hhcnNcIiwgXCJqYXZhc2NyaXB0XCIsIC9bXFx3JF0vKTtcblxuQ29kZU1pcnJvci5kZWZpbmVNSU1FKFwidGV4dC9qYXZhc2NyaXB0XCIsIFwiamF2YXNjcmlwdFwiKTtcbkNvZGVNaXJyb3IuZGVmaW5lTUlNRShcInRleHQvZWNtYXNjcmlwdFwiLCBcImphdmFzY3JpcHRcIik7XG5Db2RlTWlycm9yLmRlZmluZU1JTUUoXCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCIsIFwiamF2YXNjcmlwdFwiKTtcbkNvZGVNaXJyb3IuZGVmaW5lTUlNRShcImFwcGxpY2F0aW9uL3gtamF2YXNjcmlwdFwiLCBcImphdmFzY3JpcHRcIik7XG5Db2RlTWlycm9yLmRlZmluZU1JTUUoXCJhcHBsaWNhdGlvbi9lY21hc2NyaXB0XCIsIFwiamF2YXNjcmlwdFwiKTtcbkNvZGVNaXJyb3IuZGVmaW5lTUlNRShcImFwcGxpY2F0aW9uL2pzb25cIiwgeyBuYW1lOiBcImphdmFzY3JpcHRcIiwganNvbjogdHJ1ZSB9KTtcbkNvZGVNaXJyb3IuZGVmaW5lTUlNRShcImFwcGxpY2F0aW9uL3gtanNvblwiLCB7IG5hbWU6IFwiamF2YXNjcmlwdFwiLCBqc29uOiB0cnVlIH0pO1xuQ29kZU1pcnJvci5kZWZpbmVNSU1FKFwiYXBwbGljYXRpb24vbWFuaWZlc3QranNvblwiLCB7IG5hbWU6IFwiamF2YXNjcmlwdFwiLCBqc29uOiB0cnVlIH0pXG5Db2RlTWlycm9yLmRlZmluZU1JTUUoXCJhcHBsaWNhdGlvbi9sZCtqc29uXCIsIHsgbmFtZTogXCJqYXZhc2NyaXB0XCIsIGpzb25sZDogdHJ1ZSB9KTtcbkNvZGVNaXJyb3IuZGVmaW5lTUlNRShcInRleHQvdHlwZXNjcmlwdFwiLCB7IG5hbWU6IFwiamF2YXNjcmlwdFwiLCB0eXBlc2NyaXB0OiB0cnVlIH0pO1xuQ29kZU1pcnJvci5kZWZpbmVNSU1FKFwiYXBwbGljYXRpb24vdHlwZXNjcmlwdFwiLCB7IG5hbWU6IFwiamF2YXNjcmlwdFwiLCB0eXBlc2NyaXB0OiB0cnVlIH0pO1xuXG59KTtcbiIsIi8vIENvZGVNaXJyb3IsIGNvcHlyaWdodCAoYykgYnkgTWFyaWpuIEhhdmVyYmVrZSBhbmQgb3RoZXJzXG4vLyBEaXN0cmlidXRlZCB1bmRlciBhbiBNSVQgbGljZW5zZTogaHR0cHM6Ly9jb2RlbWlycm9yLm5ldC9MSUNFTlNFXG5cbi8vIFV0aWxpdHkgZnVuY3Rpb24gdGhhdCBhbGxvd3MgbW9kZXMgdG8gYmUgY29tYmluZWQuIFRoZSBtb2RlIGdpdmVuXG4vLyBhcyB0aGUgYmFzZSBhcmd1bWVudCB0YWtlcyBjYXJlIG9mIG1vc3Qgb2YgdGhlIG5vcm1hbCBtb2RlXG4vLyBmdW5jdGlvbmFsaXR5LCBidXQgYSBzZWNvbmQgKHR5cGljYWxseSBzaW1wbGUpIG1vZGUgaXMgdXNlZCwgd2hpY2hcbi8vIGNhbiBvdmVycmlkZSB0aGUgc3R5bGUgb2YgdGV4dC4gQm90aCBtb2RlcyBnZXQgdG8gcGFyc2UgYWxsIG9mIHRoZVxuLy8gdGV4dCwgYnV0IHdoZW4gYm90aCBhc3NpZ24gYSBub24tbnVsbCBzdHlsZSB0byBhIHBpZWNlIG9mIGNvZGUsIHRoZVxuLy8gb3ZlcmxheSB3aW5zLCB1bmxlc3MgdGhlIGNvbWJpbmUgYXJndW1lbnQgd2FzIHRydWUgYW5kIG5vdCBvdmVycmlkZGVuLFxuLy8gb3Igc3RhdGUub3ZlcmxheS5jb21iaW5lVG9rZW5zIHdhcyB0cnVlLCBpbiB3aGljaCBjYXNlIHRoZSBzdHlsZXMgYXJlXG4vLyBjb21iaW5lZC5cblxuKGZ1bmN0aW9uKG1vZCkge1xuICBtb2Qod2luZG93LkNvZGVNaXJyb3IpO1xufSkoZnVuY3Rpb24oQ29kZU1pcnJvcikge1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbkNvZGVNaXJyb3IuY3VzdG9tT3ZlcmxheU1vZGUgPSBmdW5jdGlvbihiYXNlLCBvdmVybGF5LCBjb21iaW5lKSB7XG4gIHJldHVybiB7XG4gICAgc3RhcnRTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBiYXNlOiBDb2RlTWlycm9yLnN0YXJ0U3RhdGUoYmFzZSksXG4gICAgICAgIG92ZXJsYXk6IENvZGVNaXJyb3Iuc3RhcnRTdGF0ZShvdmVybGF5KSxcbiAgICAgICAgYmFzZVBvczogMCwgYmFzZUN1cjogbnVsbCxcbiAgICAgICAgb3ZlcmxheVBvczogMCwgb3ZlcmxheUN1cjogbnVsbCxcbiAgICAgICAgc3RyZWFtU2VlbjogbnVsbFxuICAgICAgfTtcbiAgICB9LFxuICAgIGNvcHlTdGF0ZTogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGJhc2U6IENvZGVNaXJyb3IuY29weVN0YXRlKGJhc2UsIHN0YXRlLmJhc2UpLFxuICAgICAgICBvdmVybGF5OiBDb2RlTWlycm9yLmNvcHlTdGF0ZShvdmVybGF5LCBzdGF0ZS5vdmVybGF5KSxcbiAgICAgICAgYmFzZVBvczogc3RhdGUuYmFzZVBvcywgYmFzZUN1cjogbnVsbCxcbiAgICAgICAgb3ZlcmxheVBvczogc3RhdGUub3ZlcmxheVBvcywgb3ZlcmxheUN1cjogbnVsbFxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9rZW46IGZ1bmN0aW9uKHN0cmVhbSwgc3RhdGUpIHtcbiAgICAgIGlmIChzdHJlYW0gIT0gc3RhdGUuc3RyZWFtU2VlbiB8fFxuICAgICAgICAgIE1hdGgubWluKHN0YXRlLmJhc2VQb3MsIHN0YXRlLm92ZXJsYXlQb3MpIDwgc3RyZWFtLnN0YXJ0KSB7XG4gICAgICAgIHN0YXRlLnN0cmVhbVNlZW4gPSBzdHJlYW07XG4gICAgICAgIHN0YXRlLmJhc2VQb3MgPSBzdGF0ZS5vdmVybGF5UG9zID0gc3RyZWFtLnN0YXJ0O1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RyZWFtLnN0YXJ0ID09IHN0YXRlLmJhc2VQb3MpIHtcbiAgICAgICAgc3RhdGUuYmFzZUN1ciA9IGJhc2UudG9rZW4oc3RyZWFtLCBzdGF0ZS5iYXNlKTtcbiAgICAgICAgc3RhdGUuYmFzZVBvcyA9IHN0cmVhbS5wb3M7XG4gICAgICB9XG4gICAgICBpZiAoc3RyZWFtLnN0YXJ0ID09IHN0YXRlLm92ZXJsYXlQb3MpIHtcbiAgICAgICAgc3RyZWFtLnBvcyA9IHN0cmVhbS5zdGFydDtcbiAgICAgICAgc3RhdGUub3ZlcmxheUN1ciA9IG92ZXJsYXkudG9rZW4oc3RyZWFtLCBzdGF0ZS5vdmVybGF5KTtcbiAgICAgICAgc3RhdGUub3ZlcmxheVBvcyA9IHN0cmVhbS5wb3M7XG4gICAgICB9XG4gICAgICBzdHJlYW0ucG9zID0gTWF0aC5taW4oc3RhdGUuYmFzZVBvcywgc3RhdGUub3ZlcmxheVBvcyk7XG5cbiAgICAgIC8vIEVkZ2UgY2FzZSBmb3IgY29kZWJsb2NrcyBpbiB0ZW1wbGF0ZXIgbW9kZVxuICAgICAgaWYgKHN0YXRlLmJhc2VDdXIgJiYgc3RhdGUub3ZlcmxheUN1ciAmJiBzdGF0ZS5iYXNlQ3VyLmNvbnRhaW5zKFwibGluZS1IeXBlck1ELWNvZGVibG9ja1wiKSkge1xuICAgICAgICBzdGF0ZS5vdmVybGF5Q3VyID0gc3RhdGUub3ZlcmxheUN1ci5yZXBsYWNlKFwibGluZS10ZW1wbGF0ZXItaW5saW5lXCIsIFwiXCIpO1xuICAgICAgICBzdGF0ZS5vdmVybGF5Q3VyICs9IGAgbGluZS1iYWNrZ3JvdW5kLUh5cGVyTUQtY29kZWJsb2NrLWJnYDtcbiAgICAgIH1cblxuICAgICAgLy8gc3RhdGUub3ZlcmxheS5jb21iaW5lVG9rZW5zIGFsd2F5cyB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgY29tYmluZSxcbiAgICAgIC8vIHVubGVzcyBzZXQgdG8gbnVsbFxuICAgICAgaWYgKHN0YXRlLm92ZXJsYXlDdXIgPT0gbnVsbCkgcmV0dXJuIHN0YXRlLmJhc2VDdXI7XG4gICAgICBlbHNlIGlmIChzdGF0ZS5iYXNlQ3VyICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgIHN0YXRlLm92ZXJsYXkuY29tYmluZVRva2VucyB8fFxuICAgICAgICAgICAgICAgY29tYmluZSAmJiBzdGF0ZS5vdmVybGF5LmNvbWJpbmVUb2tlbnMgPT0gbnVsbClcbiAgICAgICAgcmV0dXJuIHN0YXRlLmJhc2VDdXIgKyBcIiBcIiArIHN0YXRlLm92ZXJsYXlDdXI7XG4gICAgICBlbHNlIHJldHVybiBzdGF0ZS5vdmVybGF5Q3VyO1xuICAgIH0sXG5cbiAgICBpbmRlbnQ6IGJhc2UuaW5kZW50ICYmIGZ1bmN0aW9uKHN0YXRlLCB0ZXh0QWZ0ZXIsIGxpbmUpIHtcbiAgICAgIHJldHVybiBiYXNlLmluZGVudChzdGF0ZS5iYXNlLCB0ZXh0QWZ0ZXIsIGxpbmUpO1xuICAgIH0sXG4gICAgZWxlY3RyaWNDaGFyczogYmFzZS5lbGVjdHJpY0NoYXJzLFxuXG4gICAgaW5uZXJNb2RlOiBmdW5jdGlvbihzdGF0ZSkgeyByZXR1cm4ge3N0YXRlOiBzdGF0ZS5iYXNlLCBtb2RlOiBiYXNlfTsgfSxcblxuICAgIGJsYW5rTGluZTogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgIHZhciBiYXNlVG9rZW4sIG92ZXJsYXlUb2tlbjtcbiAgICAgIGlmIChiYXNlLmJsYW5rTGluZSkgYmFzZVRva2VuID0gYmFzZS5ibGFua0xpbmUoc3RhdGUuYmFzZSk7XG4gICAgICBpZiAob3ZlcmxheS5ibGFua0xpbmUpIG92ZXJsYXlUb2tlbiA9IG92ZXJsYXkuYmxhbmtMaW5lKHN0YXRlLm92ZXJsYXkpO1xuXG4gICAgICByZXR1cm4gb3ZlcmxheVRva2VuID09IG51bGwgP1xuICAgICAgICBiYXNlVG9rZW4gOlxuICAgICAgICAoY29tYmluZSAmJiBiYXNlVG9rZW4gIT0gbnVsbCA/IGJhc2VUb2tlbiArIFwiIFwiICsgb3ZlcmxheVRva2VuIDogb3ZlcmxheVRva2VuKTtcbiAgICB9XG4gIH07XG59O1xuXG59KTtcbiIsImltcG9ydCB7IEFwcCwgUGxhdGZvcm0gfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBUZW1wbGF0ZXJQbHVnaW4gZnJvbSBcIm1haW5cIjtcbmltcG9ydCB7IFRlbXBsYXRlckVycm9yIH0gZnJvbSBcIkVycm9yXCI7XG5cbmltcG9ydCBcIm1vZGUvamF2YXNjcmlwdFwiO1xuaW1wb3J0IFwibW9kZS9jdXN0b21fb3ZlcmxheVwiO1xuXG5jb25zdCBUUF9DTURfVE9LRU5fQ0xBU1M6IHN0cmluZyA9IFwidGVtcGxhdGVyLWNvbW1hbmRcIjtcbmNvbnN0IFRQX0lOTElORV9DTEFTUzogc3RyaW5nID0gXCJ0ZW1wbGF0ZXItaW5saW5lXCI7XG5cbmNvbnN0IFRQX09QRU5JTkdfVEFHX1RPS0VOX0NMQVNTOiBzdHJpbmcgPSBcInRlbXBsYXRlci1vcGVuaW5nLXRhZ1wiO1xuY29uc3QgVFBfQ0xPU0lOR19UQUdfVE9LRU5fQ0xBU1M6IHN0cmluZyA9IFwidGVtcGxhdGVyLWNsb3NpbmctdGFnXCI7XG5cbmNvbnN0IFRQX0lOVEVSUE9MQVRJT05fVEFHX1RPS0VOX0NMQVNTOiBzdHJpbmcgPSBcInRlbXBsYXRlci1pbnRlcnBvbGF0aW9uLXRhZ1wiO1xuY29uc3QgVFBfUkFXX1RBR19UT0tFTl9DTEFTUzogc3RyaW5nID0gXCJ0ZW1wbGF0ZXItcmF3LXRhZ1wiO1xuY29uc3QgVFBfRVhFQ19UQUdfVE9LRU5fQ0xBU1M6IHN0cmluZyA9IFwidGVtcGxhdGVyLWV4ZWN1dGlvbi10YWdcIjtcblxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlckVkaXRvciB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBwOiBBcHAsIHByaXZhdGUgcGx1Z2luOiBUZW1wbGF0ZXJQbHVnaW4pIHt9XG5cbiAgICBhc3luYyBzZXR1cCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWdpc3RlckNvZGVNaXJyb3JNb2RlKCk7XG4gICAgfVxuXG5cdGFzeW5jIHJlZ2lzdGVyQ29kZU1pcnJvck1vZGUoKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0Ly8gY20tZWRpdG9yLXN5bnRheC1oaWdobGlnaHQtb2JzaWRpYW4gcGx1Z2luXG5cdFx0Ly8gaHR0cHM6Ly9jb2RlbWlycm9yLm5ldC9kb2MvbWFudWFsLmh0bWwjbW9kZWFwaVxuXHRcdC8vIGh0dHBzOi8vY29kZW1pcnJvci5uZXQvbW9kZS9kaWZmL2RpZmYuanNcbiAgICAgICAgLy8gaHR0cHM6Ly9jb2RlbWlycm9yLm5ldC9kZW1vL211c3RhY2hlLmh0bWxcblx0XHQvLyBodHRwczovL21hcmlqbmhhdmVyYmVrZS5ubC9ibG9nL2NvZGVtaXJyb3ItbW9kZS1zeXN0ZW0uaHRtbFxuXG4gICAgICAgIGlmICghdGhpcy5wbHVnaW4uc2V0dGluZ3Muc3ludGF4X2hpZ2hsaWdodGluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETzogQWRkIG1vYmlsZSBzdXBwb3J0XG5cdFx0aWYgKFBsYXRmb3JtLmlzTW9iaWxlQXBwKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG4gICAgICAgIGNvbnN0IGpzX21vZGUgPSB3aW5kb3cuQ29kZU1pcnJvci5nZXRNb2RlKHt9LCBcImphdmFzY3JpcHRcIik7XG5cdFx0aWYgKGpzX21vZGUubmFtZSA9PT0gXCJudWxsXCIpIHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLmxvZ19lcnJvcihuZXcgVGVtcGxhdGVyRXJyb3IoXCJKYXZhc2NyaXB0IHN5bnRheCBtb2RlIGNvdWxkbid0IGJlIGZvdW5kLCBjYW4ndCBlbmFibGUgc3ludGF4IGhpZ2hsaWdodGluZy5cIikpO1xuICAgICAgICAgICAgcmV0dXJuO1xuXHRcdH1cblxuICAgICAgICAvLyBDdXN0b20gb3ZlcmxheSBtb2RlIHVzZWQgdG8gaGFuZGxlIGVkZ2UgY2FzZXNcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCBvdmVybGF5X21vZGUgPSB3aW5kb3cuQ29kZU1pcnJvci5jdXN0b21PdmVybGF5TW9kZTtcbiAgICAgICAgaWYgKG92ZXJsYXlfbW9kZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5sb2dfZXJyb3IobmV3IFRlbXBsYXRlckVycm9yKFwiQ291bGRuJ3QgZmluZCBjdXN0b21PdmVybGF5TW9kZSwgY2FuJ3QgZW5hYmxlIHN5bnRheCBoaWdobGlnaHRpbmcuXCIpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5Db2RlTWlycm9yLmRlZmluZU1vZGUoXCJ0ZW1wbGF0ZXJcIiwgZnVuY3Rpb24oY29uZmlnLCBwYXJzZXJDb25maWcpIHtcblx0XHRcdGNvbnN0IHRlbXBsYXRlck92ZXJsYXkgPSB7XG4gICAgICAgICAgICAgICAgc3RhcnRTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGpzX3N0YXRlID0gd2luZG93LkNvZGVNaXJyb3Iuc3RhcnRTdGF0ZShqc19tb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmpzX3N0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5Db21tYW5kOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZ19jbGFzczogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyZWVMaW5lOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvcHlTdGF0ZTogZnVuY3Rpb24oc3RhdGU6IGFueSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBqc19zdGF0ZSA9IHdpbmRvdy5Db2RlTWlycm9yLnN0YXJ0U3RhdGUoanNfbW9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld19zdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmpzX3N0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5Db21tYW5kOiBzdGF0ZS5pbkNvbW1hbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWdfY2xhc3M6IHN0YXRlLnRhZ19jbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyZWVMaW5lOiBzdGF0ZS5mcmVlTGluZSxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld19zdGF0ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJsYW5rTGluZTogZnVuY3Rpb24oc3RhdGU6IGFueSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUuaW5Db21tYW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYGxpbmUtYmFja2dyb3VuZC10ZW1wbGF0ZXItY29tbWFuZC1iZ2A7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0b2tlbjogZnVuY3Rpb24oc3RyZWFtOiBhbnksIHN0YXRlOiBhbnkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmVhbS5zb2woKSAmJiBzdGF0ZS5pbkNvbW1hbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmZyZWVMaW5lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5pbkNvbW1hbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrZXl3b3JkcyA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyZWFtLm1hdGNoKC9bXFwtX117MCwxfSU+LywgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5pbkNvbW1hbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5mcmVlTGluZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZ19jbGFzcyA9IHN0YXRlLnRhZ19jbGFzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS50YWdfY2xhc3MgPSBcIlwiO1xuIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgbGluZS0ke1RQX0lOTElORV9DTEFTU30gJHtUUF9DTURfVE9LRU5fQ0xBU1N9ICR7VFBfQ0xPU0lOR19UQUdfVE9LRU5fQ0xBU1N9ICR7dGFnX2NsYXNzfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBqc19yZXN1bHQgPSBqc19tb2RlLnRva2VuKHN0cmVhbSwgc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmVhbS5wZWVrKCkgPT0gbnVsbCAmJiBzdGF0ZS5mcmVlTGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXdvcmRzICs9IGAgbGluZS1iYWNrZ3JvdW5kLXRlbXBsYXRlci1jb21tYW5kLWJnYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3RhdGUuZnJlZUxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXl3b3JkcyArPSBgIGxpbmUtJHtUUF9JTkxJTkVfQ0xBU1N9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2tleXdvcmRzfSAke1RQX0NNRF9UT0tFTl9DTEFTU30gJHtqc19yZXN1bHR9YDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gc3RyZWFtLm1hdGNoKC88JVtcXC1fXXswLDF9XFxzKihbKn4rXXswLDF9KS8sIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChtYXRjaFsxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJyonOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS50YWdfY2xhc3MgPSBUUF9FWEVDX1RBR19UT0tFTl9DTEFTUztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnfic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnRhZ19jbGFzcyA9IFRQX1JBV19UQUdfVE9LRU5fQ0xBU1M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnRhZ19jbGFzcyA9IFRQX0lOVEVSUE9MQVRJT05fVEFHX1RPS0VOX0NMQVNTO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmluQ29tbWFuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYGxpbmUtJHtUUF9JTkxJTkVfQ0xBU1N9ICR7VFBfQ01EX1RPS0VOX0NMQVNTfSAke1RQX09QRU5JTkdfVEFHX1RPS0VOX0NMQVNTfSAke3N0YXRlLnRhZ19jbGFzc31gO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHN0cmVhbS5uZXh0KCkgIT0gbnVsbCAmJiAhc3RyZWFtLm1hdGNoKC88JS8sIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cblx0XHRcdH07XG4gICAgICAgICAgICByZXR1cm4gb3ZlcmxheV9tb2RlKHdpbmRvdy5Db2RlTWlycm9yLmdldE1vZGUoY29uZmlnLCBcImh5cGVybWRcIiksIHRlbXBsYXRlck92ZXJsYXkpO1xuXHRcdH0pOyBcblx0fVxufSIsImltcG9ydCB7IGFkZEljb24sIEV2ZW50UmVmLCBNZW51LCBNZW51SXRlbSwgbm9ybWFsaXplUGF0aCwgTm90aWNlLCBQbGF0Zm9ybSwgUGx1Z2luLCBUQWJzdHJhY3RGaWxlLCBURmlsZSwgVEZvbGRlciB9IGZyb20gJ29ic2lkaWFuJztcclxuXHJcbmltcG9ydCB7IERFRkFVTFRfU0VUVElOR1MsIFRlbXBsYXRlclNldHRpbmdzLCBUZW1wbGF0ZXJTZXR0aW5nVGFiIH0gZnJvbSAnU2V0dGluZ3MnO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZXJGdXp6eVN1Z2dlc3RNb2RhbCB9IGZyb20gJ1RlbXBsYXRlckZ1enp5U3VnZ2VzdCc7XHJcbmltcG9ydCB7IElDT05fREFUQSB9IGZyb20gJ0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGRlbGF5LCByZXNvbHZlVEZpbGUgfSBmcm9tICdVdGlscyc7XHJcbmltcG9ydCB7IFRlbXBsYXRlciB9IGZyb20gJ1RlbXBsYXRlcic7XHJcbmltcG9ydCB7IFRlbXBsYXRlckVycm9yIH0gZnJvbSAnRXJyb3InO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZXJFZGl0b3IgfSBmcm9tICdUZW1wbGF0ZXJFZGl0b3InO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVtcGxhdGVyUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcclxuXHRwdWJsaWMgc2V0dGluZ3M6IFRlbXBsYXRlclNldHRpbmdzOyBcclxuXHRwdWJsaWMgZWRpdG9yOiBUZW1wbGF0ZXJFZGl0b3I7XHJcblx0cHVibGljIHRlbXBsYXRlcjogVGVtcGxhdGVyO1xyXG5cdHByaXZhdGUgZnV6enlTdWdnZXN0OiBUZW1wbGF0ZXJGdXp6eVN1Z2dlc3RNb2RhbDtcclxuXHRwcml2YXRlIHRyaWdnZXJfb25fZmlsZV9jcmVhdGlvbl9ldmVudDogRXZlbnRSZWY7XHJcblx0cHJpdmF0ZSBzeW50YXhfaGlnaGxpZ2h0aW5nX2V2ZW50OiBFdmVudFJlZjtcclxuXHJcblx0YXN5bmMgb25sb2FkKCk6IFByb21pc2U8dm9pZD4ge1xyXG5cdFx0YXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcclxuXHJcblx0XHR0aGlzLnRlbXBsYXRlciA9IG5ldyBUZW1wbGF0ZXIodGhpcy5hcHAsIHRoaXMpO1xyXG5cdFx0YXdhaXQgdGhpcy50ZW1wbGF0ZXIuc2V0dXAoKTtcclxuXHJcblx0XHR0aGlzLmVkaXRvciA9IG5ldyBUZW1wbGF0ZXJFZGl0b3IodGhpcy5hcHAsIHRoaXMpO1xyXG5cdFx0YXdhaXQgdGhpcy5lZGl0b3Iuc2V0dXAoKTtcclxuXHRcdHRoaXMudXBkYXRlX3N5bnRheF9oaWdobGlnaHRpbmcoKTtcclxuXHJcblx0XHR0aGlzLmZ1enp5U3VnZ2VzdCA9IG5ldyBUZW1wbGF0ZXJGdXp6eVN1Z2dlc3RNb2RhbCh0aGlzLmFwcCwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5yZWdpc3Rlck1hcmtkb3duUG9zdFByb2Nlc3NvcigoZWwsIGN0eCkgPT4gdGhpcy50ZW1wbGF0ZXIucHJvY2Vzc19keW5hbWljX3RlbXBsYXRlcyhlbCwgY3R4KSk7XHJcblxyXG5cdFx0YWRkSWNvbihcInRlbXBsYXRlci1pY29uXCIsIElDT05fREFUQSk7XHJcblx0XHR0aGlzLmFkZFJpYmJvbkljb24oJ3RlbXBsYXRlci1pY29uJywgJ1RlbXBsYXRlcicsIGFzeW5jICgpID0+IHtcclxuXHRcdFx0dGhpcy5mdXp6eVN1Z2dlc3QuaW5zZXJ0X3RlbXBsYXRlKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogXCJpbnNlcnQtdGVtcGxhdGVyXCIsXHJcblx0XHRcdG5hbWU6IFwiSW5zZXJ0IFRlbXBsYXRlXCIsXHJcblx0XHRcdGhvdGtleXM6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRtb2RpZmllcnM6IFtcIkFsdFwiXSxcclxuXHRcdFx0XHRcdGtleTogJ2UnLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdF0sXHJcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5mdXp6eVN1Z2dlc3QuaW5zZXJ0X3RlbXBsYXRlKCk7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICAgICAgICBpZDogXCJyZXBsYWNlLWluLWZpbGUtdGVtcGxhdGVyXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiUmVwbGFjZSB0ZW1wbGF0ZXMgaW4gdGhlIGFjdGl2ZSBmaWxlXCIsXHJcbiAgICAgICAgICAgIGhvdGtleXM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RpZmllcnM6IFtcIkFsdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBrZXk6ICdyJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy50ZW1wbGF0ZXIub3ZlcndyaXRlX2FjdGl2ZV9maWxlX3RlbXBsYXRlcygpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdGlkOiBcImp1bXAtdG8tbmV4dC1jdXJzb3ItbG9jYXRpb25cIixcclxuXHRcdFx0bmFtZTogXCJKdW1wIHRvIG5leHQgY3Vyc29yIGxvY2F0aW9uXCIsXHJcblx0XHRcdGhvdGtleXM6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRtb2RpZmllcnM6IFtcIkFsdFwiXSxcclxuXHRcdFx0XHRcdGtleTogXCJUYWJcIixcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRdLFxyXG5cdFx0XHRjYWxsYmFjazogKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudGVtcGxhdGVyLmN1cnNvcl9qdW1wZXIuanVtcF90b19uZXh0X2N1cnNvcl9sb2NhdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogXCJjcmVhdGUtbmV3LW5vdGUtZnJvbS10ZW1wbGF0ZVwiLFxyXG5cdFx0XHRuYW1lOiBcIkNyZWF0ZSBuZXcgbm90ZSBmcm9tIHRlbXBsYXRlXCIsXHJcblx0XHRcdGhvdGtleXM6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRtb2RpZmllcnM6IFtcIkFsdFwiXSxcclxuXHRcdFx0XHRcdGtleTogXCJuXCIsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XSxcclxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHtcclxuXHRcdFx0XHR0aGlzLmZ1enp5U3VnZ2VzdC5jcmVhdGVfbmV3X25vdGVfZnJvbV90ZW1wbGF0ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFwcC53b3Jrc3BhY2Uub25MYXlvdXRSZWFkeSgoKSA9PiB7XHJcblx0XHRcdHRoaXMudXBkYXRlX3RyaWdnZXJfZmlsZV9vbl9jcmVhdGlvbigpO1x0XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnJlZ2lzdGVyRXZlbnQoXHJcblx0XHRcdHRoaXMuYXBwLndvcmtzcGFjZS5vbihcImZpbGUtbWVudVwiLCAobWVudTogTWVudSwgZmlsZTogVEZpbGUpID0+IHtcclxuXHRcdFx0XHRpZiAoZmlsZSBpbnN0YW5jZW9mIFRGb2xkZXIpIHtcclxuXHRcdFx0XHRcdG1lbnUuYWRkSXRlbSgoaXRlbTogTWVudUl0ZW0pID0+IHtcclxuXHRcdFx0XHRcdFx0aXRlbS5zZXRUaXRsZShcIkNyZWF0ZSBuZXcgbm90ZSBmcm9tIHRlbXBsYXRlXCIpXHJcblx0XHRcdFx0XHRcdFx0LnNldEljb24oXCJ0ZW1wbGF0ZXItaWNvblwiKVxyXG5cdFx0XHRcdFx0XHRcdC5vbkNsaWNrKGV2dCA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmZ1enp5U3VnZ2VzdC5jcmVhdGVfbmV3X25vdGVfZnJvbV90ZW1wbGF0ZShmaWxlKTtcclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0KTtcclxuXHJcblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IFRlbXBsYXRlclNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHNhdmVTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcclxuXHRcdGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBsb2FkU2V0dGluZ3MoKTogUHJvbWlzZTx2b2lkPiB7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcclxuXHR9XHRcclxuXHJcblx0dXBkYXRlX3RyaWdnZXJfZmlsZV9vbl9jcmVhdGlvbigpOiB2b2lkIHtcclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLnRyaWdnZXJfb25fZmlsZV9jcmVhdGlvbikge1xyXG5cdFx0XHR0aGlzLnRyaWdnZXJfb25fZmlsZV9jcmVhdGlvbl9ldmVudCA9IHRoaXMuYXBwLnZhdWx0Lm9uKFwiY3JlYXRlXCIsIGFzeW5jIChmaWxlOiBUQWJzdHJhY3RGaWxlKSA9PiB7XHJcblx0XHRcdFx0aWYgKCEoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB8fCBmaWxlLmV4dGVuc2lvbiAhPT0gXCJtZFwiKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvKiBBdm9pZHMgdGVtcGxhdGUgcmVwbGFjZW1lbnQgd2hlbiBzeW5jaW5nIGZpbGVzICovXHJcblx0XHRcdFx0Y29uc3QgdGVtcGxhdGVfZm9sZGVyID0gbm9ybWFsaXplUGF0aCh0aGlzLnNldHRpbmdzLnRlbXBsYXRlX2ZvbGRlcik7XHJcblx0XHRcdFx0aWYgKHRlbXBsYXRlX2ZvbGRlciAhPT0gXCIvXCIpIHtcclxuXHRcdFx0XHRcdGxldCBwYXJlbnQgPSBmaWxlLnBhcmVudDtcclxuXHRcdFx0XHRcdHdoaWxlIChwYXJlbnQgIT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRpZiAocGFyZW50LnBhdGggPT09IHRlbXBsYXRlX2ZvbGRlcikge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gVE9ETzogZmluZCBhIGJldHRlciB3YXkgdG8gZG8gdGhpc1xyXG5cdFx0XHRcdC8vIEN1cnJlbnRseSwgSSBoYXZlIHRvIHdhaXQgZm9yIHRoZSBkYWlseSBub3RlIHBsdWdpbiB0byBhZGQgdGhlIGZpbGUgY29udGVudCBiZWZvcmUgcmVwbGFjaW5nXHJcblx0XHRcdFx0Ly8gTm90IGEgcHJvYmxlbSB3aXRoIENhbGVuZGFyIGhvd2V2ZXIgc2luY2UgaXQgY3JlYXRlcyB0aGUgZmlsZSB3aXRoIHRoZSBleGlzdGluZyBjb250ZW50XHJcblx0XHRcdFx0YXdhaXQgZGVsYXkoMzAwKTtcclxuXHJcblx0XHRcdFx0aWYgKGZpbGUuc3RhdC5zaXplID09IDAgJiYgdGhpcy5zZXR0aW5ncy5lbXB0eV9maWxlX3RlbXBsYXRlKSB7XHJcblx0XHRcdFx0XHRjb25zdCB0ZW1wbGF0ZV9maWxlID0gYXdhaXQgdGhpcy5lcnJvcldyYXBwZXIoYXN5bmMgKCk6IFByb21pc2U8VEZpbGU+ID0+IHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc29sdmVURmlsZSh0aGlzLmFwcCwgdGhpcy5zZXR0aW5ncy5lbXB0eV9maWxlX3RlbXBsYXRlICsgXCIubWRcIik7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGlmICghdGVtcGxhdGVfZmlsZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZCh0ZW1wbGF0ZV9maWxlKTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMuYXBwLnZhdWx0Lm1vZGlmeShmaWxlLCBjb250ZW50KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy50ZW1wbGF0ZXIub3ZlcndyaXRlX2ZpbGVfdGVtcGxhdGVzKGZpbGUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5yZWdpc3RlckV2ZW50KHRoaXMudHJpZ2dlcl9vbl9maWxlX2NyZWF0aW9uX2V2ZW50KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICh0aGlzLnRyaWdnZXJfb25fZmlsZV9jcmVhdGlvbl9ldmVudCkge1xyXG5cdFx0XHRcdHRoaXMuYXBwLnZhdWx0Lm9mZnJlZih0aGlzLnRyaWdnZXJfb25fZmlsZV9jcmVhdGlvbl9ldmVudCk7XHJcblx0XHRcdFx0dGhpcy50cmlnZ2VyX29uX2ZpbGVfY3JlYXRpb25fZXZlbnQgPSB1bmRlZmluZWQ7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZV9zeW50YXhfaGlnaGxpZ2h0aW5nKCkge1xyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3Muc3ludGF4X2hpZ2hsaWdodGluZykge1xyXG5cdFx0XHR0aGlzLnN5bnRheF9oaWdobGlnaHRpbmdfZXZlbnQgPSB0aGlzLmFwcC53b3Jrc3BhY2Uub24oXCJjb2RlbWlycm9yXCIsIGNtID0+IHtcclxuXHRcdFx0XHRjbS5zZXRPcHRpb24oXCJtb2RlXCIsIFwidGVtcGxhdGVyXCIpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5hcHAud29ya3NwYWNlLml0ZXJhdGVDb2RlTWlycm9ycyhjbSA9PiB7XHJcblx0XHRcdFx0Y20uc2V0T3B0aW9uKFwibW9kZVwiLCBcInRlbXBsYXRlclwiKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLnN5bnRheF9oaWdobGlnaHRpbmdfZXZlbnQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHRoaXMuc3ludGF4X2hpZ2hsaWdodGluZ19ldmVudCkge1xyXG5cdFx0XHRcdHRoaXMuYXBwLnZhdWx0Lm9mZnJlZih0aGlzLnN5bnRheF9oaWdobGlnaHRpbmdfZXZlbnQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuYXBwLndvcmtzcGFjZS5pdGVyYXRlQ29kZU1pcnJvcnMoY20gPT4ge1xyXG5cdFx0XHRcdGNtLnNldE9wdGlvbihcIm1vZGVcIiwgXCJoeXBlcm1kXCIpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIGVycm9yV3JhcHBlcihmbjogRnVuY3Rpb24pOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0cmV0dXJuIGF3YWl0IGZuKCk7XHJcblx0XHR9IGNhdGNoKGUpIHtcclxuXHRcdFx0aWYgKCEoZSBpbnN0YW5jZW9mIFRlbXBsYXRlckVycm9yKSkge1xyXG5cdFx0XHRcdHRoaXMubG9nX2Vycm9yKG5ldyBUZW1wbGF0ZXJFcnJvcihgVGVtcGxhdGUgcGFyc2luZyBlcnJvciwgYWJvcnRpbmcuYCwgZS5tZXNzYWdlKSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5sb2dfZXJyb3IoZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRsb2dfdXBkYXRlKG1zZzogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRjb25zdCBub3RpY2UgPSBuZXcgTm90aWNlKFwiXCIsIDE1MDAwKTtcclxuXHRcdC8vIFRPRE86IEZpbmQgYmV0dGVyIHdheSBmb3IgdGhpc1xyXG5cdFx0Ly8gQHRzLWlnbm9yZVxyXG5cdFx0bm90aWNlLm5vdGljZUVsLmlubmVySFRNTCA9IGA8Yj5UZW1wbGF0ZXIgdXBkYXRlPC9iPjo8YnIvPiR7bXNnfWA7XHJcblx0fVxyXG5cclxuXHRsb2dfZXJyb3IoZTogRXJyb3IgfCBUZW1wbGF0ZXJFcnJvcik6IHZvaWQge1xyXG5cdFx0Y29uc3Qgbm90aWNlID0gbmV3IE5vdGljZShcIlwiLCA4MDAwKTtcclxuXHRcdGlmIChlIGluc3RhbmNlb2YgVGVtcGxhdGVyRXJyb3IgJiYgZS5jb25zb2xlX21zZykge1xyXG5cdFx0XHQvLyBUT0RPOiBGaW5kIGEgYmV0dGVyIHdheSBmb3IgdGhpc1xyXG5cdFx0XHQvLyBAdHMtaWdub3JlXHJcblx0XHRcdG5vdGljZS5ub3RpY2VFbC5pbm5lckhUTUwgPSBgPGI+VGVtcGxhdGVyIEVycm9yPC9iPjo8YnIvPiR7ZS5tZXNzYWdlfTxici8+Q2hlY2sgY29uc29sZSBmb3IgbW9yZSBpbmZvcm1hdGlvbnNgO1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUubWVzc2FnZSwgZS5jb25zb2xlX21zZyk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxyXG5cdFx0XHRub3RpY2Uubm90aWNlRWwuaW5uZXJIVE1MID0gYDxiPlRlbXBsYXRlciBFcnJvcjwvYj46PGJyLz4ke2UubWVzc2FnZX1gO1xyXG5cdFx0fVxyXG5cdH1cdFxyXG59OyJdLCJuYW1lcyI6WyJQbHVnaW5TZXR0aW5nVGFiIiwiU2V0dGluZyIsImVzY2FwZVJlZ0V4cCIsIm5vcm1hbGl6ZVBhdGgiLCJURmlsZSIsIlRGb2xkZXIiLCJWYXVsdCIsIkZ1enp5U3VnZ2VzdE1vZGFsIiwiTWFya2Rvd25WaWV3IiwicGF0aCIsImV4aXN0c1N5bmMiLCJyZWFkRmlsZVN5bmMiLCJwYXJzZUxpbmt0ZXh0IiwicmVzb2x2ZVN1YnBhdGgiLCJQbGF0Zm9ybSIsIkZpbGVTeXN0ZW1BZGFwdGVyIiwiZ2V0QWxsVGFncyIsIk1vZGFsIiwicHJvbWlzaWZ5IiwiZXhlYyIsIkV0YS5yZW5kZXJBc3luYyIsIlBsdWdpbiIsImFkZEljb24iLCJOb3RpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF1REE7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUs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QUFFLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztBQUM3QixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztBQUNyQyxNQUFNLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdCLEtBQUs7QUFDTCxHQUFHO0FBQ0gsRUFBRSxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO0FBQ2hDLElBQUksSUFBSSxJQUFJLElBQUksVUFBVSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksR0FBRyxFQUFFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN0RyxJQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7QUFDMUMsSUFBSSxJQUFJLElBQUksSUFBSSxRQUFRLEVBQUUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQzlDLElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQ3pCLEdBQUc7QUFDSCxFQUFFLFNBQVMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7QUFDbEMsSUFBSSxJQUFJLEtBQUssSUFBSSxHQUFHLEVBQUUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQztBQUMzRixJQUFJLElBQUksS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLEVBQUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQzFFLElBQUksSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDO0FBQ2xFLElBQUksSUFBSSxLQUFLLElBQUksU0FBUyxJQUFJ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QyxTQUFTLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFDN0QsUUFBUSxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSTtBQUM3QyxRQUFRLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJO0FBQ3RELE9BQU8sQ0FBQztBQUNSLEtBQUs7QUFDTDtBQUNBLElBQUksS0FBSyxFQUFFLFNBQVMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUNuQyxNQUFNLElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVO0FBQ3BDLFVBQVUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFO0FBQ3BFLFFBQVEsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7QUFDbEMsUUFBUSxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUN4RCxPQUFPO0FBQ1A7QUFDQSxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO0FBQ3pDLFFBQVEsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkQsUUFBUSxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDbkMsT0FBTztBQUNQLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUU7QUFDNUMsUUFBUSxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDbEMsUUFBUSxLQUFLLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoRSxRQUFR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
