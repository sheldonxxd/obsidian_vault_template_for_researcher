## ISSUE TEMPLATE

In order to solve the problem more efficiently, please submit the issue according to this template. 

### Environment

1. **Vault template release version**: v1.5
2. **Operating system**: windows
3. **Python version**: 3.7.10 (anaconda)
4. **Zotero version**: 6.0
5. **Pandoc version**: 2.12
6. **Obsidian version**: 0.13

### Bug descryption

Please descibe the problem in short.

### Obsidian console information

Press `Ctrl+Shift+I` to open the obsidian console for more details. Please copy the error stack as complete as possible.

For example:

```js
Uncaught (in promise) TypeError: Cannot read property 'frontmatter' of undefined
    at ViewModeByFrontmatterPlugin.eval (eval at <anonymous> (app.js:1), <anonymous>:66:76)
    at Generator.next (<anonymous>)
    at eval (eval at <anonymous> (app.js:1), <anonymous>:31:71)
    at new Promise (<anonymous>)
    at __awaiter (eval at <anonymous> (app.js:1), <anonymous>:27:12)
    at readViewModeFromFrontmatterAndToggle (eval at <anonymous> (app.js:1), <anonymous>:49:68)
    at a (app.js:1)
2VM200:166 Uncaught TypeError: Cannot read property 'length' of null
    at HTMLDocument.eval (eval at <anonymous> (app.js:1), <anonymous>:166:54)
4VM113:4170 Uncaught TypeError: Cannot read property 'functions' of undefined
    at Documentation.get_all_functions_documentation (eval at <anonymous> (app.js:1), <anonymous>:4170:45)
    at Autocomplete.getSuggestions (eval at <anonymous> (app.js:1), <anonymous>:4230:40)
    at Autocomplete.t.trigger (app.js:1)
    at e.trigger (app.js:1)
    at app.js:1
    at a (app.js:1)
VM113:82 Templater Error: Template parsing error, aborting. 
 tp.user.test is not a function
log_error @ VM113:82
```


