---
title: obsidian模板库更新方法
date: 2022-05-14 14:46:54
excerpt: obsidian和插件的各种功能都在更新，因此这个模板库也得跟上。
tags: obsidian附录 
rating: ⭐⭐
status: complete
destination: 03-99-4 
share: false
obsidianUIMode: source
---

此模板库会不定期提交 commit 以及时修改一些 bug。经过一段时间后会发布功能和更新较大的 release。所以更新的方式分为两种：

1. 直接从 [github 仓库首页](https://github.com/sheldonxxd/obsidian_vault_template_for_researcher)下载最新内容的压缩包

![[Pasted image 20220514145542.png|400]]

2. 到 github 仓库[ Release 页面](https://github.com/sheldonxxd/obsidian_vault_template_for_researcher/releases)下载带版本号的压缩包

![[Pasted image 20220514145752.png|400]]


下载完成后，您可以将其解压到任意位置。注意从 ***v1.3*** 版本之后，每次更新仅对以下目录及内容进行修改：

- / .obsidian ：存放了obsidian主题插件以及相关配置文件
- /00-MOC：存放了常用的 dataview query page
- /03-Projects/99-黑曜石玩家指南：存放了本模板库的详细说明
- /08-Assets/Scripts：存放了本模板库依赖的python脚本和相关文件
- /09-Templates ：存放一些模板
- /README.md：位于 vault 根目录的简要说明文档

如果您没有对以上内容做自定义的修改，可以直接将解压后的上述内容复制替换您已有的 vault 库。否则请谨慎操作。

```ad-warning
为了测试方便，08-Assets/Scripts 中存放了 MyLibrary.bib，复制更新时注意先删除此文件，避免对您已有的文件造成覆盖。
```

---

page:: 28