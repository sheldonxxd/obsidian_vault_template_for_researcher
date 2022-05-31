---
title: python代码说明与调试方法
date: 2022-05-14 15:10:15
excerpt: 本模板库相关工作流依赖于python脚本实现
tags: obsidian附录 
rating: ⭐⭐⭐
status: complete
destination: 03-99-4 
share: false
obsidianUIMode: source
---

本模板库相关工作流依赖于python脚本实现，本着「能用就行」的原则，代码大多比较粗糙，如有问题，请先确认是否为最新版本（参考[[obsidian模板库更新方法]]）。更新后还有问题，因为本人通常无法及时回应，更多情况下**需要自行调试解决**。

所有代码在使用时通过 quickAdd 命令触发 Templater 插件，然后调用各自系统的 terminal 执行相应的命令。代码文件均存放于 `08-Assets/Scripts` 目录下。没有编程基础的用户可通过斜杠命令在任意行开头输入 `/test` 可以找到相关命令，会同时在当前页面当前位置打印正常输出和报错信息。

![[斜杠命令用于测试.gif|400]]

以草稿归档命令为例，其正常输出为：

- [[test3]]

当 test3 页面中的 destination 错误时，报错信息如下：

```python
Traceback (most recent call last):
  File "./08-Assets/Scripts/auto_transfer.py", line 103, in <module>
    main()
  File "./08-Assets/Scripts/auto_transfer.py", line 37, in main
    if isShortLink(target):
  File "./08-Assets/Scripts/auto_transfer.py", line 53, in isShortLink
    assert '-' in target, "destination is not a valid path!"
AssertionError: destination is not a valid path!
```

由于代码颇为简单，有编程基础的用户可使用熟悉的 IDE （如 VSCode）进入该目录进行底层调试。无编程基础的用户建议先查看本项目已经存在的 issue 寻找解决方案。


### 常见issue列表

- windows 系统无法调用 python，参考 [issue 15](https://github.com/sheldonxxd/obsidian_vault_template_for_researcher/issues/15) 
- 非 windows 系统无法正常调用 python，参考 [issue 16](https://github.com/sheldonxxd/obsidian_vault_template_for_researcher/issues/16) 和 [issue 20](https://github.com/sheldonxxd/obsidian_vault_template_for_researcher/issues/20#issuecomment-1128860155)
- [[AuthorRanking]] 的问题，参考 [issue 13](https://github.com/sheldonxxd/obsidian_vault_template_for_researcher/issues/13) 和 [issue 17](https://github.com/sheldonxxd/obsidian_vault_template_for_researcher/issues/17)
- 引文列表功能的问题，参考  issue [#8](https://github.com/sheldonxxd/obsidian_vault_template_for_researcher/issues/8) 和 [issue 28](https://github.com/sheldonxxd/obsidian_vault_template_for_researcher/issues/28#issuecomment-1141619386) 。
- 任务存档功能的问题，参考 [issue 16](https://github.com/sheldonxxd/obsidian_vault_template_for_researcher/issues/16)
- 草稿归档功能的问题，参考 [issue 15](https://github.com/sheldonxxd/obsidian_vault_template_for_researcher/issues/15) 


---

page:: 29