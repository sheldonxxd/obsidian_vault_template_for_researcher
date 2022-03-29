---
title: 文献库作者排序
date: 2021-11-11 20:10:51
top_n: 20
---

1. 点击下方按钮即可对文献库中作者出现的次数进行统计并排序。
2. 如果要修改显示的数量，请修改 front-matter 中 top_n 的数值。
3. 注意此按钮所执行的templater自定义函数仅对此页面生效，所以不可引用。

%%button如果使用模板，则模板应存放于 09-Templates的根目录，不能为其子目录%%

```button
name 🐼作者统计
type append template
action author_count
```
^button-7x0p


