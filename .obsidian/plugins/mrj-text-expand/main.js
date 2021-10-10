'use strict';

var obsidian = require('obsidian');

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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || from);
}

function formatContent(content) {
    return content.split('\n');
}
function getAllExpandersQuery(content) {
    var accum = [];
    for (var i = 0; i < content.length; i++) {
        var line = content[i];
        if (line === '```expander') {
            for (var e = 0; e < content.length - i; e++) {
                var nextline = content[i + e];
                if (nextline === '```') {
                    accum.push({
                        start: i,
                        end: i + e,
                        query: content[i + 1],
                        template: e > 2 ? content.slice(i + 2, i + e).join('\n') : ''
                    });
                    break;
                }
            }
        }
    }
    return accum;
}
function getClosestQuery(queries, lineNumber) {
    if (queries.length === 0) {
        return undefined;
    }
    return queries.reduce(function (a, b) {
        return Math.abs(b.start - lineNumber) < Math.abs(a.start - lineNumber) ? b : a;
    });
}
function getLastLineToReplace(content, query, endline) {
    var lineFrom = query.end;
    for (var i = lineFrom + 1; i < content.length; i++) {
        if (content[i] === endline) {
            return i;
        }
    }
    return lineFrom + 1;
}
function trimContent(s) {
    var removeEmptyLines = function (s) {
        var lines = s.split('\n').map(function (e) { return e.trim(); });
        if (lines.length < 2) {
            return s;
        }
        if (lines.indexOf('') === 0) {
            return removeEmptyLines(lines.slice(1).join('\n'));
        }
        return s;
    };
    var removeFrontMatter = function (s, lookEnding) {
        if (lookEnding === void 0) { lookEnding = false; }
        var lines = s.split('\n');
        if (lookEnding && lines.indexOf('---') === 0) {
            return lines.slice(1).join('\n');
        }
        if (lookEnding) {
            return removeFrontMatter(lines.slice(1).join('\n'), true);
        }
        if (lines.indexOf('---') === 0) {
            return removeFrontMatter(lines.slice(1).join('\n'), true);
        }
        return s;
    };
    return removeFrontMatter(removeEmptyLines(s));
}

var TextExpander = /** @class */ (function (_super) {
    __extends(TextExpander, _super);
    function TextExpander(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.config = {
            autoExpand: false,
            defaultTemplate: '- $link',
            delay: 5000,
            excludeCurrent: true,
            lineEnding: '<--->'
        };
        _this.seqs = [
            {
                name: '\\$count',
                loop: true,
                format: function (_s, _content, _file, _d, index) { return index ? String(index + 1) : String(1); },
                desc: 'add index number to each produced file'
            },
            {
                name: '\\$filename',
                loop: true,
                format: function (_s, _content, file) { return file.basename; },
                desc: 'name of the founded file'
            },
            {
                name: '\\$link',
                loop: true,
                format: function (_s, _content, file) { return _this.app.fileManager.generateMarkdownLink(file, file.path); },
                desc: 'link based on Obsidian settings'
            },
            {
                name: '\\$lines:\\d+',
                loop: true,
                readContent: true,
                format: function (s, content, _file) {
                    var digits = Number(s.split(':')[1]);
                    return trimContent(content)
                        .split('\n')
                        .filter(function (_, i) { return i < digits; })
                        .join('\n')
                        .replace(new RegExp(_this.config.lineEnding, 'g'), '');
                },
                desc: 'specified count of lines from the found file'
            },
            {
                name: '\\$frontmatter:[\\p\{L\}_-]+',
                loop: true,
                format: function (s, _content, file) { return _this.getFrontMatter(s, file); },
                desc: 'value from the frontmatter key in the found file'
            },
            {
                name: '\\$lines+',
                loop: true,
                readContent: true,
                format: function (s, content, _file) { return content.replace(new RegExp(_this.config.lineEnding, 'g'), ''); },
                desc: 'all content from the found file'
            },
            {
                name: '\\$ext',
                loop: true,
                format: function (s, content, file) { return file.extension; },
                desc: 'return file extension'
            },
            {
                name: '\\$created:format:date',
                loop: true,
                format: function (s, content, file) { return String(new Date(file.stat.ctime).toISOString()).split('T')[0]; },
                desc: 'created time formatted'
            },
            {
                name: '\\$created:format:time',
                loop: true,
                format: function (s, content, file) { return String(new Date(file.stat.ctime).toISOString()).split(/([.T])/)[2]; },
                desc: 'created time formatted'
            },
            {
                name: '\\$created:format',
                loop: true,
                format: function (s, content, file) { return String(new Date(file.stat.ctime).toISOString()); },
                desc: 'created time formatted'
            },
            {
                name: '\\$created',
                loop: true,
                format: function (s, content, file) { return String(file.stat.ctime); },
                desc: 'created time'
            },
            {
                name: '\\$size',
                loop: true,
                format: function (s, content, file) { return String(file.stat.size); },
                desc: 'size of the file'
            },
            {
                name: '\\$path',
                loop: true,
                format: function (s, content, file) { return file.path; },
                desc: 'path to the found file'
            },
            {
                name: '\\$parent',
                loop: true,
                format: function (s, content, file) { return file.parent.name; },
                desc: 'parent folder name'
            },
            {
                name: '^(.+|)\\$header:.+',
                loop: true,
                format: function (s, content, file) {
                    var _a;
                    var prefix = s.slice(0, s.indexOf('$'));
                    var header = s.slice(s.indexOf('$')).replace('$header:', '').replace(/"/g, '');
                    var neededLevel = header.split("#").length - 1;
                    var neededTitle = header.replace(/^#+/g, '').trim();
                    var metadata = _this.app.metadataCache.getFileCache(file);
                    return ((_a = metadata.headings) === null || _a === void 0 ? void 0 : _a.filter(function (e) {
                        var tests = [
                            [neededTitle, e.heading.includes(neededTitle)],
                            [neededLevel, e.level === neededLevel]
                        ].filter(function (e) { return e[0]; });
                        if (tests.length) {
                            return tests.map(function (e) { return e[1]; }).every(function (e) { return e === true; });
                        }
                        return true;
                    }).map(function (h) { return _this.app.fileManager.generateMarkdownLink(file, file.path, '#' + h.heading); }).map(function (link) { return prefix + link; }).join('\n')) || '';
                },
                desc: 'headings from founded files. $header:## - return all level 2 headings. $header:Title - return all heading which match the string. Can be prepended like: - !$header:## to transclude the headings.'
            },
            {
                name: '^(.+|)\\$blocks',
                readContent: true,
                loop: true,
                format: function (s, content, file) {
                    return content
                        .split('\n')
                        .filter(function (e) { return /\^\w+$/.test(e); })
                        .map(function (e) { return s
                        .replace('$blocks', "(" + encodeURIComponent(file.basename) + "#" + e.replace(/^.+?(\^\w+$)/, '$1') + ")"); })
                        .join('\n');
                },
                desc: 'block ids from the found files. Can be prepended.'
            },
            {
                name: '^(.+|)\\$match:header', loop: true, format: function (s, content, file, results) {
                    var _a;
                    var prefix = s.slice(0, s.indexOf('$'));
                    var metadata = _this.app.metadataCache.getFileCache(file);
                    var headings = (_a = metadata.headings) === null || _a === void 0 ? void 0 : _a.filter(function (h) { return results.result.content.filter(function (c) { return h.position.end.offset < c[0]; }).some(function (e) { return e; }); }).slice(-1);
                    return headings
                        .map(function (h) { return _this.app.fileManager.generateMarkdownLink(file, file.path, '#' + h.heading); })
                        .map(function (link) { return prefix + link; })
                        .join('\n') || '';
                }, desc: 'extract found selections'
            },
            {
                name: '^(.+|)\\$match', loop: true, format: function (s, content, file, results) {
                    var _a;
                    var prefix = s.slice(0, s.indexOf('$'));
                    return (_a = results.result.content) === null || _a === void 0 ? void 0 : _a.map(function (t) {
                        var _a;
                        return (_a = results.content).slice.apply(_a, __spreadArray([], __read(t)));
                    }).map(function (t) { return prefix + t; }).join('\n');
                }, desc: 'extract found selections'
            },
        ];
        _this.search = _this.search.bind(_this);
        _this.initExpander = _this.initExpander.bind(_this);
        _this.reformatLinks = _this.reformatLinks.bind(_this);
        return _this;
    }
    TextExpander.prototype.getFrontMatter = function (s, r) {
        var _a = this.app.metadataCache.getCache(r.path).frontmatter, frontmatter = _a === void 0 ? null : _a;
        if (frontmatter) {
            return frontmatter[s.split(':')[1]] || '';
        }
        return '';
    };
    TextExpander.prototype.reformatLinks = function (links, mapFunc) {
        var _a, _b, _c, _e;
        if (mapFunc === void 0) { mapFunc = function (s) { return '[[' + s + ']]'; }; }
        var currentView = this.app.workspace.activeLeaf.view;
        if (currentView instanceof obsidian.FileView) {
            return (_b = (_a = links === null || links === void 0 ? void 0 : links.map(function (e) { return e.basename; }).filter(function (e) { return currentView.file.basename !== e; })) === null || _a === void 0 ? void 0 : _a.map(mapFunc)) === null || _b === void 0 ? void 0 : _b.join('\n');
        }
        return (_e = (_c = links === null || links === void 0 ? void 0 : links.map(function (e) { return e.basename; })) === null || _c === void 0 ? void 0 : _c.map(mapFunc)) === null || _e === void 0 ? void 0 : _e.join('\n');
    };
    TextExpander.prototype.search = function (s) {
        // @ts-ignore
        var globalSearchFn = this.app.internalPlugins.getPluginById('global-search').instance.openGlobalSearch.bind(this);
        var search = function (query) { return globalSearchFn(query); };
        var leftSplitState = {
            // @ts-ignore
            collapsed: this.app.workspace.leftSplit.collapsed,
            // @ts-ignore
            tab: this.app.workspace.leftSplit.children[0].currentTab
        };
        search(s);
        if (leftSplitState.collapsed) {
            // @ts-ignore
            this.app.workspace.leftSplit.collapse();
        }
        // @ts-ignore
        if (leftSplitState.tab !== this.app.workspace.leftSplit.children[0].currentTab) {
            // @ts-ignore
            this.app.workspace.leftSplit.children[0].selectTabIndex(leftSplitState.tab);
        }
    };
    TextExpander.prototype.getFoundAfterDelay = function () {
        return __awaiter(this, void 0, void 0, function () {
            var searchLeaf, view;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchLeaf = this.app.workspace.getLeavesOfType('search')[0];
                        return [4 /*yield*/, searchLeaf.open(searchLeaf.view)];
                    case 1:
                        view = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve) {
                                setTimeout(function () {
                                    // @ts-ignore
                                    var results = view.dom.resultDomLookup;
                                    return resolve(results);
                                }, _this.config.delay);
                            })];
                }
            });
        });
    };
    TextExpander.prototype.startTemplateMode = function (query, lastLine) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var currentView, currentFileName, templateContent, heading, footer, repeatableContent, searchResults, files, filterFiles, format, changed, result, viewBeforeReplace;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        currentView = this.app.workspace.activeLeaf.view;
                        currentFileName = '';
                        templateContent = query.template.split('\n');
                        heading = templateContent.filter(function (e) { return e[0] === '^'; }).map(function (s) { return s.slice(1); });
                        footer = templateContent.filter(function (e) { return e[0] === '>'; }).map(function (s) { return s.slice(1); });
                        repeatableContent = templateContent.filter(function (e) { return e[0] !== '^' && e[0] !== '>'; }).filter(function (e) { return e; }).length === 0
                            ? [this.config.defaultTemplate]
                            : templateContent.filter(function (e) { return e[0] !== '^' && e[0] !== '>'; }).filter(function (e) { return e; });
                        if (currentView instanceof obsidian.FileView) {
                            currentFileName = currentView.file.basename;
                        }
                        return [4 /*yield*/, this.getFoundAfterDelay()];
                    case 1:
                        searchResults = _b.sent();
                        files = Array.from(searchResults.keys());
                        filterFiles = this.config.excludeCurrent
                            ? files.filter(function (file) { return file.basename !== currentFileName; })
                            : files;
                        format = function (r, template, index) { return __awaiter(_this, void 0, void 0, function () {
                            var fileContent, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!(new RegExp(this.seqs.filter(function (e) { return e.readContent; }).map(function (e) { return e.name; }).join('|')).test(template))) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.app.vault.cachedRead(r)];
                                    case 1:
                                        _a = _b.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        _a = '';
                                        _b.label = 3;
                                    case 3:
                                        fileContent = _a;
                                        return [2 /*return*/, this.seqs.reduce(function (acc, seq) {
                                                return acc.replace(new RegExp(seq.name, 'gu'), function (replace) { return seq.format(replace, fileContent, r, searchResults.get(r), index); });
                                            }, template)];
                                }
                            });
                        }); };
                        return [4 /*yield*/, Promise.all(filterFiles
                                .map(function (file, i) { return __awaiter(_this, void 0, void 0, function () {
                                var result;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Promise.all(repeatableContent.map(function (s) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, format(file, s, i)];
                                                    case 1: return [2 /*return*/, _a.sent()];
                                                }
                                            }); }); }))];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/, result.join('\n')];
                                    }
                                });
                            }); }))];
                    case 2:
                        changed = _b.sent();
                        result = [
                            ' ',
                            heading.join('\n'),
                            changed.join('\n'),
                            footer.join('\n'),
                            ' ',
                            this.config.lineEnding
                        ].filter(function (e) { return e; }).join('\n');
                        viewBeforeReplace = this.app.workspace.activeLeaf.view;
                        if (viewBeforeReplace instanceof obsidian.MarkdownView) {
                            if (viewBeforeReplace.file.basename !== currentFileName) {
                                return [2 /*return*/];
                            }
                        }
                        else {
                            return [2 /*return*/];
                        }
                        this.cm.replaceRange(result, { line: query.end + 1, ch: 0 }, { line: lastLine, ch: ((_a = this.cm.getLine(lastLine)) === null || _a === void 0 ? void 0 : _a.length) || 0 });
                        return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    TextExpander.prototype.runQuery = function (query, content) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var lastLine, newContent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!query) {
                            new Notification('Expand query not found');
                            return [2 /*return*/, Promise.resolve()];
                        }
                        lastLine = getLastLineToReplace(content, query, this.config.lineEnding);
                        this.cm.replaceRange(this.config.lineEnding, { line: query.end + 1, ch: 0 }, { line: lastLine, ch: ((_a = this.cm.getLine(lastLine)) === null || _a === void 0 ? void 0 : _a.length) || 0 });
                        newContent = formatContent(this.cm.getValue());
                        this.search(query.query);
                        return [4 /*yield*/, this.startTemplateMode(query, getLastLineToReplace(newContent, query, this.config.lineEnding))];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    TextExpander.prototype.initExpander = function (all) {
        var _this = this;
        if (all === void 0) { all = false; }
        var currentView = this.app.workspace.activeLeaf.view;
        if (!(currentView instanceof obsidian.MarkdownView)) {
            return;
        }
        var cmDoc = this.cm = currentView.sourceMode.cmEditor;
        var curNum = cmDoc.getCursor().line;
        var content = cmDoc.getValue();
        var formatted = formatContent(content);
        var findQueries = getAllExpandersQuery(formatted);
        var closestQuery = getClosestQuery(findQueries, curNum);
        if (all) {
            findQueries.reduce(function (promise, query, i) {
                return promise.then(function () {
                    var newContent = formatContent(cmDoc.getValue());
                    var updatedQueries = getAllExpandersQuery(newContent);
                    return _this.runQuery(updatedQueries[i], newContent);
                });
            }, Promise.resolve());
        }
        else {
            this.runQuery(closestQuery, formatted);
        }
    };
    TextExpander.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.addSettingTab(new SettingTab(this.app, this));
                        this.addCommand({
                            id: 'editor-expand',
                            name: 'expand',
                            callback: this.initExpander,
                            hotkeys: []
                        });
                        this.addCommand({
                            id: 'editor-expand-all',
                            name: 'expand all',
                            callback: function () { return _this.initExpander(true); },
                            hotkeys: []
                        });
                        this.app.workspace.on('file-open', function () { return __awaiter(_this, void 0, void 0, function () {
                            var activeLeaf, activeView, isAllowedView;
                            return __generator(this, function (_a) {
                                if (!this.config.autoExpand) {
                                    return [2 /*return*/];
                                }
                                activeLeaf = this.app.workspace.activeLeaf;
                                if (!activeLeaf) {
                                    return [2 /*return*/];
                                }
                                activeView = activeLeaf.view;
                                isAllowedView = activeView instanceof obsidian.MarkdownView;
                                if (!isAllowedView) {
                                    return [2 /*return*/];
                                }
                                this.initExpander(true);
                                return [2 /*return*/];
                            });
                        }); });
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            this.config = __assign(__assign({}, this.config), data);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TextExpander.prototype.onunload = function () {
        console.log('unloading plugin');
    };
    TextExpander.prototype.saveSettings = function () {
        this.saveData(this.config);
    };
    return TextExpander;
}(obsidian.Plugin));
var SettingTab = /** @class */ (function (_super) {
    __extends(SettingTab, _super);
    function SettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.app = app;
        _this.plugin = plugin;
        return _this;
    }
    SettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Settings for Text Expander' });
        new obsidian.Setting(containerEl)
            .setName('Auto Expand')
            .setDesc('Expand all queries in a file once you open it')
            .addToggle(function (toggle) {
            toggle
                .setValue(_this.plugin.config.autoExpand)
                .onChange(function (value) {
                _this.plugin.config.autoExpand = value;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Delay')
            .setDesc('Text expander don\' wait until search completed. It waits for a delay and paste result after that.')
            .addSlider(function (slider) {
            slider.setLimits(1000, 10000, 1000);
            slider.setValue(_this.plugin.config.delay);
            slider.onChange(function (value) {
                _this.plugin.config.delay = value;
                _this.plugin.saveSettings();
            });
            slider.setDynamicTooltip();
        });
        new obsidian.Setting(containerEl)
            .setName('Line ending')
            .setDesc('You can specify the text which will appear at the bottom of the generated text.')
            .addText(function (text) {
            text.setValue(_this.plugin.config.lineEnding)
                .onChange(function (val) {
                _this.plugin.config.lineEnding = val;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Default template')
            .setDesc('You can specify default template')
            .addText(function (text) {
            text.setValue(_this.plugin.config.defaultTemplate)
                .onChange(function (val) {
                _this.plugin.config.defaultTemplate = val;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Exclude current file')
            .setDesc('You can specify should text expander exclude results from current file or not')
            .addToggle(function (toggle) {
            toggle
                .setValue(_this.plugin.config.excludeCurrent)
                .onChange(function (value) {
                _this.plugin.config.excludeCurrent = value;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Sequences')
            .setDesc('REGEXP - DESCRIPTION')
            .setDesc((function () {
            var fragment = new DocumentFragment();
            var div = fragment.createEl('div');
            _this.plugin.seqs
                .map(function (e) { return e.name + ' - ' + (e.desc || ''); })
                .map(function (e) {
                var el = fragment.createEl('div');
                el.setText(e);
                el.setAttribute('style', "\n                                border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n                                margin-bottom: 0.5rem;\n                                padding-bottom: 0.5rem;\n                            ");
                return el;
            }).forEach(function (el) {
                div.appendChild(el);
            });
            fragment.appendChild(div);
            return fragment;
        })());
    };
    return SettingTab;
}(obsidian.PluginSettingTab));

module.exports = TextExpander;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsImhlbHBlcnMudHMiLCJtYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgZnJvbSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG4iLCJleHBvcnQgaW50ZXJmYWNlIEV4cGFuZGVyUXVlcnkge1xuICAgIHN0YXJ0OiBudW1iZXJcbiAgICBlbmQ6IG51bWJlclxuICAgIHRlbXBsYXRlOiBzdHJpbmdcbiAgICBxdWVyeTogc3RyaW5nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRDb250ZW50KGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gY29udGVudC5zcGxpdCgnXFxuJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbEV4cGFuZGVyc1F1ZXJ5KGNvbnRlbnQ6IHN0cmluZ1tdKTogRXhwYW5kZXJRdWVyeVtdIHtcbiAgICBsZXQgYWNjdW06IEV4cGFuZGVyUXVlcnlbXSA9IFtdXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGxpbmUgPSBjb250ZW50W2ldXG5cbiAgICAgICAgaWYgKGxpbmUgPT09ICdgYGBleHBhbmRlcicpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGUgPSAwOyBlIDwgY29udGVudC5sZW5ndGggLSBpOyBlKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0bGluZSA9IGNvbnRlbnRbaSArIGVdIFxuICAgICAgICAgICAgICAgIGlmIChuZXh0bGluZSA9PT0gJ2BgYCcpIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjdW0ucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogaSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGkgKyBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBjb250ZW50W2kgKyAxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogZSA+IDIgPyBjb250ZW50LnNsaWNlKGkgKyAyLCBpICsgZSkuam9pbignXFxuJykgOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjY3VtXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbG9zZXN0UXVlcnkocXVlcmllczogRXhwYW5kZXJRdWVyeVtdLCBsaW5lTnVtYmVyOiBudW1iZXIpOiBFeHBhbmRlclF1ZXJ5IHwgdW5kZWZpbmVkIHtcbiAgICBpZiAocXVlcmllcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cblxuICAgIHJldHVybiBxdWVyaWVzLnJlZHVjZSgoYSwgYikgPT4ge1xuICAgICAgICByZXR1cm4gTWF0aC5hYnMoYi5zdGFydCAtIGxpbmVOdW1iZXIpIDwgTWF0aC5hYnMoYS5zdGFydCAtIGxpbmVOdW1iZXIpID8gYiA6IGE7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMYXN0TGluZVRvUmVwbGFjZShjb250ZW50OiBzdHJpbmdbXSwgcXVlcnk6IEV4cGFuZGVyUXVlcnksIGVuZGxpbmU6IHN0cmluZykge1xuICAgIGNvbnN0IGxpbmVGcm9tID0gcXVlcnkuZW5kXG5cbiAgICBmb3IgKHZhciBpID0gbGluZUZyb20gKyAxOyBpIDwgY29udGVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY29udGVudFtpXSA9PT0gZW5kbGluZSkge1xuICAgICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsaW5lRnJvbSArIDFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyaW1Db250ZW50KHM6IHN0cmluZykge1xuICAgIGNvbnN0IHJlbW92ZUVtcHR5TGluZXMgPSAoczogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgICAgY29uc3QgbGluZXMgPSBzLnNwbGl0KCdcXG4nKS5tYXAoZSA9PiBlLnRyaW0oKSlcbiAgICAgICAgaWYgKGxpbmVzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBzXG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGluZXMuaW5kZXhPZignJykgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiByZW1vdmVFbXB0eUxpbmVzKGxpbmVzLnNsaWNlKDEpLmpvaW4oJ1xcbicpKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNcbiAgICB9XG4gICAgY29uc3QgcmVtb3ZlRnJvbnRNYXR0ZXIgPSAoczogc3RyaW5nLCBsb29rRW5kaW5nOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcgPT4ge1xuICAgICAgICBjb25zdCBsaW5lcyA9IHMuc3BsaXQoJ1xcbicpXG5cbiAgICAgICAgaWYgKGxvb2tFbmRpbmcgJiYgbGluZXMuaW5kZXhPZignLS0tJykgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBsaW5lcy5zbGljZSgxKS5qb2luKCdcXG4nKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxvb2tFbmRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiByZW1vdmVGcm9udE1hdHRlcihsaW5lcy5zbGljZSgxKS5qb2luKCdcXG4nKSwgdHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaW5lcy5pbmRleE9mKCctLS0nKSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlbW92ZUZyb250TWF0dGVyKGxpbmVzLnNsaWNlKDEpLmpvaW4oJ1xcbicpLCB0cnVlKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNcbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlRnJvbnRNYXR0ZXIocmVtb3ZlRW1wdHlMaW5lcyhzKSlcbn0iLCJpbXBvcnQge1xuICAgIEV4cGFuZGVyUXVlcnksXG4gICAgZm9ybWF0Q29udGVudCxcbiAgICBnZXRBbGxFeHBhbmRlcnNRdWVyeSxcbiAgICBnZXRDbG9zZXN0UXVlcnksXG4gICAgZ2V0TGFzdExpbmVUb1JlcGxhY2UsXG4gICAgdHJpbUNvbnRlbnRcbn0gZnJvbSAnaGVscGVycyc7XG5pbXBvcnQge1xuICAgIEFwcCxcbiAgICBQbHVnaW4sXG4gICAgUGx1Z2luU2V0dGluZ1RhYixcbiAgICBTZXR0aW5nLFxuICAgIFRGaWxlLFxuICAgIEZpbGVWaWV3LFxuICAgIE1hcmtkb3duVmlldyxcbiAgICBQbHVnaW5NYW5pZmVzdFxufSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgQ29kZU1pcnJvciBmcm9tICdjb2RlbWlycm9yJ1xuXG5pbnRlcmZhY2UgUGx1Z2luU2V0dGluZ3Mge1xuICAgIGRlbGF5OiBudW1iZXJcbiAgICBsaW5lRW5kaW5nOiBzdHJpbmdcbiAgICBkZWZhdWx0VGVtcGxhdGU6IHN0cmluZ1xuICAgIGV4Y2x1ZGVDdXJyZW50OiBib29sZWFuXG4gICAgYXV0b0V4cGFuZDogYm9vbGVhblxufVxuXG5pbnRlcmZhY2UgU2VxdWVuY2VzIHtcbiAgICBsb29wOiBib29sZWFuXG4gICAgbmFtZTogc3RyaW5nXG4gICAgZm9ybWF0OiAoczogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcsIGZpbGU6IFRGaWxlLCByZXN1bHRzPzogU2VhcmNoRGV0YWlscywgaW5kZXg/OiBudW1iZXIpID0+IHN0cmluZ1xuICAgIGRlc2M6IHN0cmluZ1xuICAgIHJlYWRDb250ZW50PzogYm9vbGVhblxuICAgIHVzaW5nU2VhcmNoPzogYm9vbGVhblxufVxuXG50eXBlIE51bWJlclR1cGxlID0gW251bWJlciwgbnVtYmVyXVxuXG5pbnRlcmZhY2UgU2VhcmNoRGV0YWlscyB7XG4gICAgYXBwOiBBcHBcbiAgICBjaGlsZHJlbjogYW55W11cbiAgICBjaGlsZHJlbkVsOiBIVE1MRWxlbWVudFxuICAgIGNvbGxhcHNlRWw6IEhUTUxFbGVtZW50XG4gICAgY29sbGFwc2VkOiBib29sZWFuXG4gICAgY29sbGFwc2libGU6IGJvb2xlYW5cbiAgICBjb250YWluZXJFbDogSFRNTEVsZW1lbnRcbiAgICBjb250ZW50OiBzdHJpbmdcbiAgICBkb206IGFueVxuICAgIGVsOiBIVE1MRWxlbWVudFxuICAgIGV4dHJhQ29udGV4dDogKCkgPT4gYm9vbGVhblxuICAgIGZpbGU6IFRGaWxlXG4gICAgaW5mbzogYW55XG4gICAgb25NYXRjaFJlbmRlcjogYW55XG4gICAgcHVzaGVyRWw6IEhUTUxFbGVtZW50XG4gICAgcmVzdWx0OiB7XG4gICAgICAgIGZpbGVuYW1lPzogTnVtYmVyVHVwbGVbXVxuICAgICAgICBjb250ZW50PzogTnVtYmVyVHVwbGVbXVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dEV4cGFuZGVyIGV4dGVuZHMgUGx1Z2luIHtcbiAgICBjbTogQ29kZU1pcnJvci5FZGl0b3JcblxuICAgIGNvbmZpZzogUGx1Z2luU2V0dGluZ3MgPSB7XG4gICAgICAgIGF1dG9FeHBhbmQ6IGZhbHNlLFxuICAgICAgICBkZWZhdWx0VGVtcGxhdGU6ICctICRsaW5rJyxcbiAgICAgICAgZGVsYXk6IDUwMDAsXG4gICAgICAgIGV4Y2x1ZGVDdXJyZW50OiB0cnVlLFxuICAgICAgICBsaW5lRW5kaW5nOiAnPC0tLT4nXG4gICAgfVxuXG4gICAgc2VxczogU2VxdWVuY2VzW10gPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdcXFxcJGNvdW50JyxcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICBmb3JtYXQ6IChfczogc3RyaW5nLCBfY29udGVudDogc3RyaW5nLCBfZmlsZTogVEZpbGUsIF9kLCBpbmRleCkgPT4gaW5kZXggPyBTdHJpbmcoaW5kZXggKyAxKSA6IFN0cmluZygxKSxcbiAgICAgICAgICAgIGRlc2M6ICdhZGQgaW5kZXggbnVtYmVyIHRvIGVhY2ggcHJvZHVjZWQgZmlsZSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1xcXFwkZmlsZW5hbWUnLFxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgIGZvcm1hdDogKF9zOiBzdHJpbmcsIF9jb250ZW50OiBzdHJpbmcsIGZpbGU6IFRGaWxlKSA9PiBmaWxlLmJhc2VuYW1lLFxuICAgICAgICAgICAgZGVzYzogJ25hbWUgb2YgdGhlIGZvdW5kZWQgZmlsZSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1xcXFwkbGluaycsXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgZm9ybWF0OiAoX3M6IHN0cmluZywgX2NvbnRlbnQ6IHN0cmluZywgZmlsZTogVEZpbGUpID0+IHRoaXMuYXBwLmZpbGVNYW5hZ2VyLmdlbmVyYXRlTWFya2Rvd25MaW5rKGZpbGUsIGZpbGUucGF0aCksXG4gICAgICAgICAgICBkZXNjOiAnbGluayBiYXNlZCBvbiBPYnNpZGlhbiBzZXR0aW5ncydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1xcXFwkbGluZXM6XFxcXGQrJyxcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICByZWFkQ29udGVudDogdHJ1ZSxcbiAgICAgICAgICAgIGZvcm1hdDogKHM6IHN0cmluZywgY29udGVudDogc3RyaW5nLCBfZmlsZTogVEZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaWdpdHMgPSBOdW1iZXIocy5zcGxpdCgnOicpWzFdKVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyaW1Db250ZW50KGNvbnRlbnQpXG4gICAgICAgICAgICAgICAgICAgIC5zcGxpdCgnXFxuJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoXzogc3RyaW5nLCBpOiBudW1iZXIpID0+IGkgPCBkaWdpdHMpXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKCdcXG4nKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMuY29uZmlnLmxpbmVFbmRpbmcsICdnJyksICcnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2M6ICdzcGVjaWZpZWQgY291bnQgb2YgbGluZXMgZnJvbSB0aGUgZm91bmQgZmlsZSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1xcXFwkZnJvbnRtYXR0ZXI6W1xcXFxwXFx7TFxcfV8tXSsnLFxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgIGZvcm1hdDogKHM6IHN0cmluZywgX2NvbnRlbnQ6IHN0cmluZywgZmlsZTogVEZpbGUpID0+IHRoaXMuZ2V0RnJvbnRNYXR0ZXIocywgZmlsZSksXG4gICAgICAgICAgICBkZXNjOiAndmFsdWUgZnJvbSB0aGUgZnJvbnRtYXR0ZXIga2V5IGluIHRoZSBmb3VuZCBmaWxlJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnXFxcXCRsaW5lcysnLFxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgIHJlYWRDb250ZW50OiB0cnVlLFxuICAgICAgICAgICAgZm9ybWF0OiAoczogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcsIF9maWxlOiBURmlsZSkgPT4gY29udGVudC5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5jb25maWcubGluZUVuZGluZywgJ2cnKSwgJycpLFxuICAgICAgICAgICAgZGVzYzogJ2FsbCBjb250ZW50IGZyb20gdGhlIGZvdW5kIGZpbGUnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdcXFxcJGV4dCcsXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgZm9ybWF0OiAoczogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcsIGZpbGU6IFRGaWxlKSA9PiBmaWxlLmV4dGVuc2lvbixcbiAgICAgICAgICAgIGRlc2M6ICdyZXR1cm4gZmlsZSBleHRlbnNpb24nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdcXFxcJGNyZWF0ZWQ6Zm9ybWF0OmRhdGUnLFxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgIGZvcm1hdDogKHM6IHN0cmluZywgY29udGVudDogc3RyaW5nLCBmaWxlOiBURmlsZSkgPT4gU3RyaW5nKG5ldyBEYXRlKGZpbGUuc3RhdC5jdGltZSkudG9JU09TdHJpbmcoKSkuc3BsaXQoJ1QnKVswXSxcbiAgICAgICAgICAgIGRlc2M6ICdjcmVhdGVkIHRpbWUgZm9ybWF0dGVkJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnXFxcXCRjcmVhdGVkOmZvcm1hdDp0aW1lJyxcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICBmb3JtYXQ6IChzOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZywgZmlsZTogVEZpbGUpID0+IFN0cmluZyhuZXcgRGF0ZShmaWxlLnN0YXQuY3RpbWUpLnRvSVNPU3RyaW5nKCkpLnNwbGl0KC8oWy5UXSkvKVsyXSxcbiAgICAgICAgICAgIGRlc2M6ICdjcmVhdGVkIHRpbWUgZm9ybWF0dGVkJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnXFxcXCRjcmVhdGVkOmZvcm1hdCcsXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgZm9ybWF0OiAoczogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcsIGZpbGU6IFRGaWxlKSA9PiBTdHJpbmcobmV3IERhdGUoZmlsZS5zdGF0LmN0aW1lKS50b0lTT1N0cmluZygpKSxcbiAgICAgICAgICAgIGRlc2M6ICdjcmVhdGVkIHRpbWUgZm9ybWF0dGVkJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnXFxcXCRjcmVhdGVkJyxcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICBmb3JtYXQ6IChzOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZywgZmlsZTogVEZpbGUpID0+IFN0cmluZyhmaWxlLnN0YXQuY3RpbWUpLFxuICAgICAgICAgICAgZGVzYzogJ2NyZWF0ZWQgdGltZSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1xcXFwkc2l6ZScsXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgZm9ybWF0OiAoczogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcsIGZpbGU6IFRGaWxlKSA9PiBTdHJpbmcoZmlsZS5zdGF0LnNpemUpLFxuICAgICAgICAgICAgZGVzYzogJ3NpemUgb2YgdGhlIGZpbGUnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdcXFxcJHBhdGgnLFxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgIGZvcm1hdDogKHM6IHN0cmluZywgY29udGVudDogc3RyaW5nLCBmaWxlOiBURmlsZSkgPT4gZmlsZS5wYXRoLFxuICAgICAgICAgICAgZGVzYzogJ3BhdGggdG8gdGhlIGZvdW5kIGZpbGUnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdcXFxcJHBhcmVudCcsXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgZm9ybWF0OiAoczogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcsIGZpbGU6IFRGaWxlKSA9PiBmaWxlLnBhcmVudC5uYW1lLFxuICAgICAgICAgICAgZGVzYzogJ3BhcmVudCBmb2xkZXIgbmFtZSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ14oLit8KVxcXFwkaGVhZGVyOi4rJyxcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICBmb3JtYXQ6IChzOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZywgZmlsZTogVEZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmVmaXggPSBzLnNsaWNlKDAsIHMuaW5kZXhPZignJCcpKVxuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IHMuc2xpY2Uocy5pbmRleE9mKCckJykpLnJlcGxhY2UoJyRoZWFkZXI6JywgJycpLnJlcGxhY2UoL1wiL2csICcnKVxuICAgICAgICAgICAgICAgIGNvbnN0IG5lZWRlZExldmVsID0gaGVhZGVyLnNwbGl0KFwiI1wiKS5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgY29uc3QgbmVlZGVkVGl0bGUgPSBoZWFkZXIucmVwbGFjZSgvXiMrL2csICcnKS50cmltKClcblxuICAgICAgICAgICAgICAgIGNvbnN0IG1ldGFkYXRhID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoZmlsZSlcblxuICAgICAgICAgICAgICAgIHJldHVybiBtZXRhZGF0YS5oZWFkaW5ncz8uZmlsdGVyKGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXN0cyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZWVkZWRUaXRsZSwgZS5oZWFkaW5nLmluY2x1ZGVzKG5lZWRlZFRpdGxlKV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmVlZGVkTGV2ZWwsIGUubGV2ZWwgPT09IG5lZWRlZExldmVsXVxuICAgICAgICAgICAgICAgICAgICBdLmZpbHRlcihlID0+IGVbMF0pXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlc3RzLm1hcChlID0+IGVbMV0pLmV2ZXJ5KGUgPT4gZSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcChoID0+IHRoaXMuYXBwLmZpbGVNYW5hZ2VyLmdlbmVyYXRlTWFya2Rvd25MaW5rKGZpbGUsIGZpbGUucGF0aCwgJyMnICsgaC5oZWFkaW5nKSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcChsaW5rID0+IHByZWZpeCArIGxpbmspXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKCdcXG4nKSB8fCAnJ1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzYzogJ2hlYWRpbmdzIGZyb20gZm91bmRlZCBmaWxlcy4gJGhlYWRlcjojIyAtIHJldHVybiBhbGwgbGV2ZWwgMiBoZWFkaW5ncy4gJGhlYWRlcjpUaXRsZSAtIHJldHVybiBhbGwgaGVhZGluZyB3aGljaCBtYXRjaCB0aGUgc3RyaW5nLiBDYW4gYmUgcHJlcGVuZGVkIGxpa2U6IC0gISRoZWFkZXI6IyMgdG8gdHJhbnNjbHVkZSB0aGUgaGVhZGluZ3MuJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnXiguK3wpXFxcXCRibG9ja3MnLFxuICAgICAgICAgICAgcmVhZENvbnRlbnQ6IHRydWUsXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgZm9ybWF0OiAoczogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcsIGZpbGU6IFRGaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGUgPT4gL1xcXlxcdyskLy50ZXN0KGUpKVxuICAgICAgICAgICAgICAgICAgICAubWFwKGUgPT4gc1xuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyRibG9ja3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAoJHtlbmNvZGVVUklDb21wb25lbnQoZmlsZS5iYXNlbmFtZSl9IyR7ZS5yZXBsYWNlKC9eLis/KFxcXlxcdyskKS8sICckMScpfSlgXG4gICAgICAgICAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgICAgICAgICAuam9pbignXFxuJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjOiAnYmxvY2sgaWRzIGZyb20gdGhlIGZvdW5kIGZpbGVzLiBDYW4gYmUgcHJlcGVuZGVkLidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ14oLit8KVxcXFwkbWF0Y2g6aGVhZGVyJywgbG9vcDogdHJ1ZSwgZm9ybWF0OiAoczogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcsIGZpbGU6IFRGaWxlLCByZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJlZml4ID0gcy5zbGljZSgwLCBzLmluZGV4T2YoJyQnKSlcbiAgICAgICAgICAgICAgICBjb25zdCBtZXRhZGF0YSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpXG5cbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkaW5ncyA9IG1ldGFkYXRhLmhlYWRpbmdzXG4gICAgICAgICAgICAgICAgICAgID8uZmlsdGVyKGggPT4gcmVzdWx0cy5yZXN1bHQuY29udGVudC5maWx0ZXIoYyA9PiBoLnBvc2l0aW9uLmVuZC5vZmZzZXQgPCBjWzBdKS5zb21lKGUgPT4gZSkpXG4gICAgICAgICAgICAgICAgICAgIC5zbGljZSgtMSlcblxuICAgICAgICAgICAgICAgIHJldHVybiBoZWFkaW5nc1xuICAgICAgICAgICAgICAgICAgICAubWFwKGggPT4gdGhpcy5hcHAuZmlsZU1hbmFnZXIuZ2VuZXJhdGVNYXJrZG93bkxpbmsoZmlsZSwgZmlsZS5wYXRoLCAnIycgKyBoLmhlYWRpbmcpKVxuICAgICAgICAgICAgICAgICAgICAubWFwKGxpbmsgPT4gcHJlZml4ICsgbGluaylcbiAgICAgICAgICAgICAgICAgICAgLmpvaW4oJ1xcbicpIHx8ICcnXG4gICAgICAgICAgICB9LCBkZXNjOiAnZXh0cmFjdCBmb3VuZCBzZWxlY3Rpb25zJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnXiguK3wpXFxcXCRtYXRjaCcsIGxvb3A6IHRydWUsIGZvcm1hdDogKHM6IHN0cmluZywgY29udGVudDogc3RyaW5nLCBmaWxlOiBURmlsZSwgcmVzdWx0cykgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcHJlZml4ID0gcy5zbGljZSgwLCBzLmluZGV4T2YoJyQnKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cy5yZXN1bHQuY29udGVudD8ubWFwKHQgPT4gcmVzdWx0cy5jb250ZW50LnNsaWNlKC4uLnQpKS5tYXAodCA9PiBwcmVmaXggKyB0KS5qb2luKCdcXG4nKVxuICAgICAgICAgICAgfSwgZGVzYzogJ2V4dHJhY3QgZm91bmQgc2VsZWN0aW9ucydcbiAgICAgICAgfSxcbiAgICBdXG5cbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBQbHVnaW5NYW5pZmVzdCkge1xuICAgICAgICBzdXBlcihhcHAsIHBsdWdpbik7XG5cbiAgICAgICAgdGhpcy5zZWFyY2ggPSB0aGlzLnNlYXJjaC5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMuaW5pdEV4cGFuZGVyID0gdGhpcy5pbml0RXhwYW5kZXIuYmluZCh0aGlzKVxuICAgICAgICB0aGlzLnJlZm9ybWF0TGlua3MgPSB0aGlzLnJlZm9ybWF0TGlua3MuYmluZCh0aGlzKVxuICAgIH1cblxuICAgIGdldEZyb250TWF0dGVyKHM6IHN0cmluZywgcjogVEZpbGUpIHtcbiAgICAgICAgY29uc3Qge2Zyb250bWF0dGVyID0gbnVsbH0gPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldENhY2hlKHIucGF0aClcblxuICAgICAgICBpZiAoZnJvbnRtYXR0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9udG1hdHRlcltzLnNwbGl0KCc6JylbMV1dIHx8ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcnXG4gICAgfVxuXG4gICAgcmVmb3JtYXRMaW5rcyhsaW5rczogVEZpbGVbXSwgbWFwRnVuYyA9IChzOiBzdHJpbmcpID0+ICdbWycgKyBzICsgJ11dJykge1xuICAgICAgICBjb25zdCBjdXJyZW50VmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmLnZpZXdcblxuICAgICAgICBpZiAoY3VycmVudFZpZXcgaW5zdGFuY2VvZiBGaWxlVmlldykge1xuICAgICAgICAgICAgcmV0dXJuIGxpbmtzPy5tYXAoZSA9PiBlLmJhc2VuYW1lKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoZSA9PiBjdXJyZW50Vmlldy5maWxlLmJhc2VuYW1lICE9PSBlKVxuICAgICAgICAgICAgICAgID8ubWFwKG1hcEZ1bmMpPy5qb2luKCdcXG4nKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxpbmtzPy5tYXAoZSA9PiBlLmJhc2VuYW1lKT8ubWFwKG1hcEZ1bmMpPy5qb2luKCdcXG4nKVxuICAgIH1cblxuICAgIHNlYXJjaChzOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCBnbG9iYWxTZWFyY2hGbiA9IHRoaXMuYXBwLmludGVybmFsUGx1Z2lucy5nZXRQbHVnaW5CeUlkKCdnbG9iYWwtc2VhcmNoJykuaW5zdGFuY2Uub3Blbkdsb2JhbFNlYXJjaC5iaW5kKHRoaXMpXG4gICAgICAgIGNvbnN0IHNlYXJjaCA9IChxdWVyeTogc3RyaW5nKSA9PiBnbG9iYWxTZWFyY2hGbihxdWVyeSlcblxuICAgICAgICBjb25zdCBsZWZ0U3BsaXRTdGF0ZSA9IHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGNvbGxhcHNlZDogdGhpcy5hcHAud29ya3NwYWNlLmxlZnRTcGxpdC5jb2xsYXBzZWQsXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0YWI6IHRoaXMuYXBwLndvcmtzcGFjZS5sZWZ0U3BsaXQuY2hpbGRyZW5bMF0uY3VycmVudFRhYlxuICAgICAgICB9XG5cbiAgICAgICAgc2VhcmNoKHMpXG4gICAgICAgIGlmIChsZWZ0U3BsaXRTdGF0ZS5jb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5sZWZ0U3BsaXQuY29sbGFwc2UoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAobGVmdFNwbGl0U3RhdGUudGFiICE9PSB0aGlzLmFwcC53b3Jrc3BhY2UubGVmdFNwbGl0LmNoaWxkcmVuWzBdLmN1cnJlbnRUYWIpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5sZWZ0U3BsaXQuY2hpbGRyZW5bMF0uc2VsZWN0VGFiSW5kZXgobGVmdFNwbGl0U3RhdGUudGFiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0Rm91bmRBZnRlckRlbGF5KCk6IFByb21pc2U8TWFwPFRGaWxlLCBTZWFyY2hEZXRhaWxzPj4ge1xuICAgICAgICBjb25zdCBzZWFyY2hMZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZSgnc2VhcmNoJylbMF1cbiAgICAgICAgY29uc3QgdmlldyA9IGF3YWl0IHNlYXJjaExlYWYub3BlbihzZWFyY2hMZWFmLnZpZXcpXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHRzID0gdmlldy5kb20ucmVzdWx0RG9tTG9va3VwIGFzIE1hcDxURmlsZSwgU2VhcmNoRGV0YWlscz5cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlc3VsdHMpXG4gICAgICAgICAgICB9LCB0aGlzLmNvbmZpZy5kZWxheSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyBzdGFydFRlbXBsYXRlTW9kZShxdWVyeTogRXhwYW5kZXJRdWVyeSwgbGFzdExpbmU6IG51bWJlcikge1xuICAgICAgICBjb25zdCBjdXJyZW50VmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmLnZpZXdcbiAgICAgICAgbGV0IGN1cnJlbnRGaWxlTmFtZSA9ICcnXG5cbiAgICAgICAgY29uc3QgdGVtcGxhdGVDb250ZW50ID0gcXVlcnkudGVtcGxhdGUuc3BsaXQoJ1xcbicpXG5cbiAgICAgICAgY29uc3QgaGVhZGluZyA9IHRlbXBsYXRlQ29udGVudC5maWx0ZXIoZSA9PiBlWzBdID09PSAnXicpLm1hcCgocykgPT4gcy5zbGljZSgxKSlcbiAgICAgICAgY29uc3QgZm9vdGVyID0gdGVtcGxhdGVDb250ZW50LmZpbHRlcihlID0+IGVbMF0gPT09ICc+JykubWFwKChzKSA9PiBzLnNsaWNlKDEpKVxuICAgICAgICBjb25zdCByZXBlYXRhYmxlQ29udGVudCA9XG4gICAgICAgICAgICB0ZW1wbGF0ZUNvbnRlbnQuZmlsdGVyKGUgPT4gZVswXSAhPT0gJ14nICYmIGVbMF0gIT09ICc+JykuZmlsdGVyKGUgPT4gZSkubGVuZ3RoID09PSAwXG4gICAgICAgICAgICAgICAgPyBbdGhpcy5jb25maWcuZGVmYXVsdFRlbXBsYXRlXVxuICAgICAgICAgICAgICAgIDogdGVtcGxhdGVDb250ZW50LmZpbHRlcihlID0+IGVbMF0gIT09ICdeJyAmJiBlWzBdICE9PSAnPicpLmZpbHRlcihlID0+IGUpXG5cbiAgICAgICAgaWYgKGN1cnJlbnRWaWV3IGluc3RhbmNlb2YgRmlsZVZpZXcpIHtcbiAgICAgICAgICAgIGN1cnJlbnRGaWxlTmFtZSA9IGN1cnJlbnRWaWV3LmZpbGUuYmFzZW5hbWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMgPSBhd2FpdCB0aGlzLmdldEZvdW5kQWZ0ZXJEZWxheSgpXG4gICAgICAgIGNvbnN0IGZpbGVzID0gQXJyYXkuZnJvbShzZWFyY2hSZXN1bHRzLmtleXMoKSlcblxuICAgICAgICBjb25zdCBmaWx0ZXJGaWxlcyA9IHRoaXMuY29uZmlnLmV4Y2x1ZGVDdXJyZW50XG4gICAgICAgICAgICA/IGZpbGVzLmZpbHRlcihmaWxlID0+IGZpbGUuYmFzZW5hbWUgIT09IGN1cnJlbnRGaWxlTmFtZSlcbiAgICAgICAgICAgIDogZmlsZXNcblxuICAgICAgICBjb25zdCBmb3JtYXQgPSBhc3luYyAocjogVEZpbGUsIHRlbXBsYXRlOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVDb250ZW50ID0gKG5ldyBSZWdFeHAodGhpcy5zZXFzLmZpbHRlcihlID0+IGUucmVhZENvbnRlbnQpLm1hcChlID0+IGUubmFtZSkuam9pbignfCcpKS50ZXN0KHRlbXBsYXRlKSlcbiAgICAgICAgICAgICAgICA/IGF3YWl0IHRoaXMuYXBwLnZhdWx0LmNhY2hlZFJlYWQocilcbiAgICAgICAgICAgICAgICA6ICcnXG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcXMucmVkdWNlKChhY2MsIHNlcSkgPT5cbiAgICAgICAgICAgICAgICBhY2MucmVwbGFjZShuZXcgUmVnRXhwKHNlcS5uYW1lLCAnZ3UnKSwgcmVwbGFjZSA9PiBzZXEuZm9ybWF0KHJlcGxhY2UsIGZpbGVDb250ZW50LCByLCBzZWFyY2hSZXN1bHRzLmdldChyKSwgaW5kZXgpKSwgdGVtcGxhdGUpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjaGFuZ2VkID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICBmaWx0ZXJGaWxlc1xuICAgICAgICAgICAgICAgIC5tYXAoYXN5bmMgKGZpbGUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5hbGwocmVwZWF0YWJsZUNvbnRlbnQubWFwKGFzeW5jIChzKSA9PiBhd2FpdCBmb3JtYXQoZmlsZSwgcywgaSkpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJ1xcbicpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgKVxuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtcbiAgICAgICAgICAgICcgJyxcbiAgICAgICAgICAgIGhlYWRpbmcuam9pbignXFxuJyksXG4gICAgICAgICAgICBjaGFuZ2VkLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgZm9vdGVyLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgdGhpcy5jb25maWcubGluZUVuZGluZ1xuICAgICAgICBdLmZpbHRlcihlID0+IGUpLmpvaW4oJ1xcbicpXG5cbiAgICAgICAgY29uc3Qgdmlld0JlZm9yZVJlcGxhY2UgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3XG4gICAgICAgIGlmICh2aWV3QmVmb3JlUmVwbGFjZSBpbnN0YW5jZW9mIE1hcmtkb3duVmlldykge1xuICAgICAgICAgICAgaWYgKHZpZXdCZWZvcmVSZXBsYWNlLmZpbGUuYmFzZW5hbWUgIT09IGN1cnJlbnRGaWxlTmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNtLnJlcGxhY2VSYW5nZShyZXN1bHQsXG4gICAgICAgICAgICB7bGluZTogcXVlcnkuZW5kICsgMSwgY2g6IDB9LFxuICAgICAgICAgICAge2xpbmU6IGxhc3RMaW5lLCBjaDogdGhpcy5jbS5nZXRMaW5lKGxhc3RMaW5lKT8ubGVuZ3RoIHx8IDB9KVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgIH1cblxuICAgIGFzeW5jIHJ1blF1ZXJ5KHF1ZXJ5OiBFeHBhbmRlclF1ZXJ5LCBjb250ZW50OiBzdHJpbmdbXSkge1xuICAgICAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICAgICAgICBuZXcgTm90aWZpY2F0aW9uKCdFeHBhbmQgcXVlcnkgbm90IGZvdW5kJylcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhc3RMaW5lID0gZ2V0TGFzdExpbmVUb1JlcGxhY2UoY29udGVudCwgcXVlcnksIHRoaXMuY29uZmlnLmxpbmVFbmRpbmcpXG4gICAgICAgIHRoaXMuY20ucmVwbGFjZVJhbmdlKHRoaXMuY29uZmlnLmxpbmVFbmRpbmcsXG4gICAgICAgICAgICB7bGluZTogcXVlcnkuZW5kICsgMSwgY2g6IDB9LFxuICAgICAgICAgICAge2xpbmU6IGxhc3RMaW5lLCBjaDogdGhpcy5jbS5nZXRMaW5lKGxhc3RMaW5lKT8ubGVuZ3RoIHx8IDB9KVxuXG4gICAgICAgIGNvbnN0IG5ld0NvbnRlbnQgPSBmb3JtYXRDb250ZW50KHRoaXMuY20uZ2V0VmFsdWUoKSlcblxuICAgICAgICB0aGlzLnNlYXJjaChxdWVyeS5xdWVyeSlcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc3RhcnRUZW1wbGF0ZU1vZGUocXVlcnksIGdldExhc3RMaW5lVG9SZXBsYWNlKG5ld0NvbnRlbnQsIHF1ZXJ5LCB0aGlzLmNvbmZpZy5saW5lRW5kaW5nKSlcbiAgICB9XG5cbiAgICBpbml0RXhwYW5kZXIoYWxsID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3XG5cbiAgICAgICAgaWYgKCEoY3VycmVudFZpZXcgaW5zdGFuY2VvZiBNYXJrZG93blZpZXcpKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNtRG9jID0gdGhpcy5jbSA9IGN1cnJlbnRWaWV3LnNvdXJjZU1vZGUuY21FZGl0b3JcbiAgICAgICAgY29uc3QgY3VyTnVtID0gY21Eb2MuZ2V0Q3Vyc29yKCkubGluZVxuICAgICAgICBjb25zdCBjb250ZW50ID0gY21Eb2MuZ2V0VmFsdWUoKVxuXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZCA9IGZvcm1hdENvbnRlbnQoY29udGVudClcbiAgICAgICAgbGV0IGZpbmRRdWVyaWVzID0gZ2V0QWxsRXhwYW5kZXJzUXVlcnkoZm9ybWF0dGVkKVxuICAgICAgICBjb25zdCBjbG9zZXN0UXVlcnkgPSBnZXRDbG9zZXN0UXVlcnkoZmluZFF1ZXJpZXMsIGN1ck51bSlcblxuICAgICAgICBpZiAoYWxsKSB7XG4gICAgICAgICAgICBmaW5kUXVlcmllcy5yZWR1Y2UoKHByb21pc2UsIHF1ZXJ5LCBpKSA9PlxuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0NvbnRlbnQgPSBmb3JtYXRDb250ZW50KGNtRG9jLmdldFZhbHVlKCkpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRRdWVyaWVzID0gZ2V0QWxsRXhwYW5kZXJzUXVlcnkobmV3Q29udGVudClcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ydW5RdWVyeSh1cGRhdGVkUXVlcmllc1tpXSwgbmV3Q29udGVudClcbiAgICAgICAgICAgICAgICB9KSwgUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgICAgIClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucnVuUXVlcnkoY2xvc2VzdFF1ZXJ5LCBmb3JtYXR0ZWQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBvbmxvYWQoKSB7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xuXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICAgICAgICBpZDogJ2VkaXRvci1leHBhbmQnLFxuICAgICAgICAgICAgbmFtZTogJ2V4cGFuZCcsXG4gICAgICAgICAgICBjYWxsYmFjazogdGhpcy5pbml0RXhwYW5kZXIsXG4gICAgICAgICAgICBob3RrZXlzOiBbXVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICAgICAgICBpZDogJ2VkaXRvci1leHBhbmQtYWxsJyxcbiAgICAgICAgICAgIG5hbWU6ICdleHBhbmQgYWxsJyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB0aGlzLmluaXRFeHBhbmRlcih0cnVlKSxcbiAgICAgICAgICAgIGhvdGtleXM6IFtdXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLm9uKCdmaWxlLW9wZW4nLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY29uZmlnLmF1dG9FeHBhbmQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgYWN0aXZlTGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmXG4gICAgICAgICAgICBpZiAoIWFjdGl2ZUxlYWYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgYWN0aXZlVmlldyA9IGFjdGl2ZUxlYWYudmlld1xuICAgICAgICAgICAgY29uc3QgaXNBbGxvd2VkVmlldyA9IGFjdGl2ZVZpZXcgaW5zdGFuY2VvZiBNYXJrZG93blZpZXdcbiAgICAgICAgICAgIGlmICghaXNBbGxvd2VkVmlldykge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmluaXRFeHBhbmRlcih0cnVlKVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMubG9hZERhdGEoKSBhcyBQbHVnaW5TZXR0aW5nc1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5jb25maWcgPSB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5jb25maWcsXG4gICAgICAgICAgICAgICAgLi4uZGF0YVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb251bmxvYWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd1bmxvYWRpbmcgcGx1Z2luJyk7XG4gICAgfVxuXG4gICAgc2F2ZVNldHRpbmdzKCkge1xuICAgICAgICB0aGlzLnNhdmVEYXRhKHRoaXMuY29uZmlnKVxuICAgIH1cbn1cblxuY2xhc3MgU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICAgIHBsdWdpbjogVGV4dEV4cGFuZGVyXG5cbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBUZXh0RXhwYW5kZXIpIHtcbiAgICAgICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuXG4gICAgICAgIHRoaXMuYXBwID0gYXBwXG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luXG4gICAgfVxuXG4gICAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHtjb250YWluZXJFbH0gPSB0aGlzO1xuXG4gICAgICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2gyJywge3RleHQ6ICdTZXR0aW5ncyBmb3IgVGV4dCBFeHBhbmRlcid9KTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdBdXRvIEV4cGFuZCcpXG4gICAgICAgICAgICAuc2V0RGVzYygnRXhwYW5kIGFsbCBxdWVyaWVzIGluIGEgZmlsZSBvbmNlIHlvdSBvcGVuIGl0JylcbiAgICAgICAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHtcbiAgICAgICAgICAgICAgICB0b2dnbGVcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLmNvbmZpZy5hdXRvRXhwYW5kKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uY29uZmlnLmF1dG9FeHBhbmQgPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSgnRGVsYXknKVxuICAgICAgICAgICAgLnNldERlc2MoJ1RleHQgZXhwYW5kZXIgZG9uXFwnIHdhaXQgdW50aWwgc2VhcmNoIGNvbXBsZXRlZC4gSXQgd2FpdHMgZm9yIGEgZGVsYXkgYW5kIHBhc3RlIHJlc3VsdCBhZnRlciB0aGF0LicpXG4gICAgICAgICAgICAuYWRkU2xpZGVyKHNsaWRlciA9PiB7XG4gICAgICAgICAgICAgICAgc2xpZGVyLnNldExpbWl0cygxMDAwLCAxMDAwMCwgMTAwMClcbiAgICAgICAgICAgICAgICBzbGlkZXIuc2V0VmFsdWUodGhpcy5wbHVnaW4uY29uZmlnLmRlbGF5KVxuICAgICAgICAgICAgICAgIHNsaWRlci5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLmNvbmZpZy5kZWxheSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBzbGlkZXIuc2V0RHluYW1pY1Rvb2x0aXAoKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdMaW5lIGVuZGluZycpXG4gICAgICAgICAgICAuc2V0RGVzYygnWW91IGNhbiBzcGVjaWZ5IHRoZSB0ZXh0IHdoaWNoIHdpbGwgYXBwZWFyIGF0IHRoZSBib3R0b20gb2YgdGhlIGdlbmVyYXRlZCB0ZXh0LicpXG4gICAgICAgICAgICAuYWRkVGV4dCh0ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICB0ZXh0LnNldFZhbHVlKHRoaXMucGx1Z2luLmNvbmZpZy5saW5lRW5kaW5nKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UodmFsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLmNvbmZpZy5saW5lRW5kaW5nID0gdmFsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdEZWZhdWx0IHRlbXBsYXRlJylcbiAgICAgICAgICAgIC5zZXREZXNjKCdZb3UgY2FuIHNwZWNpZnkgZGVmYXVsdCB0ZW1wbGF0ZScpXG4gICAgICAgICAgICAuYWRkVGV4dCh0ZXh0ID0+IHtcbiAgICAgICAgICAgICAgICB0ZXh0LnNldFZhbHVlKHRoaXMucGx1Z2luLmNvbmZpZy5kZWZhdWx0VGVtcGxhdGUpXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uY29uZmlnLmRlZmF1bHRUZW1wbGF0ZSA9IHZhbFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSgnRXhjbHVkZSBjdXJyZW50IGZpbGUnKVxuICAgICAgICAgICAgLnNldERlc2MoJ1lvdSBjYW4gc3BlY2lmeSBzaG91bGQgdGV4dCBleHBhbmRlciBleGNsdWRlIHJlc3VsdHMgZnJvbSBjdXJyZW50IGZpbGUgb3Igbm90JylcbiAgICAgICAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHtcbiAgICAgICAgICAgICAgICB0b2dnbGVcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLmNvbmZpZy5leGNsdWRlQ3VycmVudClcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLmNvbmZpZy5leGNsdWRlQ3VycmVudCA9IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdTZXF1ZW5jZXMnKVxuICAgICAgICAgICAgLnNldERlc2MoJ1JFR0VYUCAtIERFU0NSSVBUSU9OJylcbiAgICAgICAgICAgIC5zZXREZXNjKFxuICAgICAgICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZyYWdtZW50ID0gbmV3IERvY3VtZW50RnJhZ21lbnQoKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXYgPSBmcmFnbWVudC5jcmVhdGVFbCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2Vxc1xuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChlID0+IGUubmFtZSArICcgLSAnICsgKGUuZGVzYyB8fCAnJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gZnJhZ21lbnQuY3JlYXRlRWwoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc2V0VGV4dChlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZy1ib3R0b206IDAuNXJlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoZWwpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGRpdilcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnJhZ21lbnRcbiAgICAgICAgICAgICAgICB9KSgpXG4gICAgICAgICAgICApXG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIkZpbGVWaWV3IiwiTWFya2Rvd25WaWV3IiwiUGx1Z2luIiwiU2V0dGluZyIsIlBsdWdpblNldHRpbmdUYWIiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMs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S0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzdKLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDdEUsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDdEUsUUFBUSxPQUFPLENBQUMsRUFBRSxJQUFJO0FBQ3RCLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDekssWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BELFlBQVksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLGdCQUFnQixLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNO0FBQzlDLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDeEUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7QUFDakUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVM7QUFDakUsZ0JBQWdCO0FBQ2hCLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFO0FBQ2hJLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQzFHLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FB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
