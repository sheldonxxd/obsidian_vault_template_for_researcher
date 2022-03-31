---
title: 文献库作者排序
date: 2021-11-11 20:10:51
top_n: 30
obsidianUIMode: preview
---

1. 点击下方按钮即可对文献库中作者出现的次数进行统计并排序。
2. 如果要修改显示的数量，请修改 front-matter 中 top_n 的数值，不要超过100。
3. 注意此按钮所执行的templater自定义函数仅对此页面生效，所以不可引用。

%%button如果使用模板，则模板应存放于 09-Templates的根目录，不能为其子目录%%

```button
name 🐼作者统计
type append template
action author_count
replace [22,122]
```
^button-7x0p

### 2022-03-30
[[Ralf Jungmann]] : 43
[[Chunhai Fan]] : 28
[[Florian Schueder]] : 18
[[Qian Li]] : 18
[[Peng Yin]] : 16
[[Maximilian T. Strauss]] : 14
[[Jiye Shi]] : 11
[[Lihua Wang]] : 11
[[Philip Tinnefeld]] : 11
[[Thomas Schlichthaerle]] : 10
[[Petra Schwille]] : 10
[[Jonas Ries]] : 10
[[Zhilei Ge]] : 9
[[Fei Wang]] : 8
[[Friedrich C. Simmel]] : 8
[[Mingjie Dai]] : 8
[[Jiang Li]] : 8
[[Johannes B. Woehrstein]] : 7
[[Khalid Salaita]] : 7
[[Xiaoguo Liu]] : 7
[[Xiaolei Zuo]] : 7
[[Hao Yan]] : 7
[[Mike Heilemann]] : 7
[[Aleksandra Radenovic]] : 6
[[Alexander Auer]] : 6
[[Johannes Stein]] : 6
[[Florian Stehr]] : 6
[[Baoquan Ding]] : 6
[[Weihong Tan]] : 6
[[George M. Church]] : 6

