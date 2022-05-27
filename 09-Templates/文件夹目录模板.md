<!--此模板用于插入FolderNote页面中以实现自定义的目录概览作用-->

```tagcloud
source: query
query: "<% tp.file.folder(true) %>"
minFontSize: 5
weight: 3
shuffle: true
```

```dataview
TABLE excerpt AS Comment, file.cday AS Date 
FROM "<% tp.file.folder(true) %>"
WHERE date>0
SORT date asc
```
