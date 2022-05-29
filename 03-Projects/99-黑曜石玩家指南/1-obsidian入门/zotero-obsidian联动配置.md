---
title: zotero-obsidian联动配置
date: 2022-03-21 15:16:11
status: complete
excerpt: 果然完成这个内容又花费了一个小时，所以以后可以按照一小时一节的效率来安排时间。
tags: obsidian入门
rating: ⭐
destination: 03-Projects/黑曜石玩家指南
---

```ad-info
title: 友情提示
在[[软件下载安装]]完成后，我们需要完成一些配置以实现zotero和obsidian的联动，估计耗时10分钟。
```

### 模板库目录结构说明

- 00-MOC：内容地图，主要存放dataview查询表
- 01-Diary：存放模板化的每日日志，其中每周事务是看板笔记默认存放地
- 02-Reading：存放文献库和文献阅读笔记
- 03-Projects：按各种实际的项目分类存储相关笔记
- 06-Cards: 主要存放一些卡片
- 07-Archives：时间久远而且已经结束的project可以进行存档
- 08-Assets：存放附件，包括插图、视频、以及各种其它文件
- 09-Templates： 存放笔记模板

### zotero 设置

![[Pasted image 20220322201722.png]]

打开 zotero 之后，点击菜单栏的 「编辑」，然后选择「首选项」，进入到 zotero 的设置当中。如上图所示，需要对箭头所示的地方做修改。

特别需要注意的是「高级」中的`链接附件根目录` 和 `数据存储位置` 的路径设置。前者必须是 vault 库中存放 pdf 的子目录。

本教程 vault 根目录为 `X:\projects\working`，而`\08-Assets\pdfs`是存在于该 vault 中的子目录，专门保存文献条目的 pdf 附件。设置正确的路径后我们在选择使用`相对路径`，这对于后面调用 zotfile 插件很关键。

数据存储位置您可以选择默认（如果C盘够大）或者指定一个其它不在 vault 中的目录。

### zotfile插件安装和设置

```ad-tip
如果你经常用iPad看文献，且有较强的多平台多设备云同步的需求，建议不要使用zotfile插件，这并不会影响本模板库的使用。
```

![[Pasted image 20220321154948.png]]

zotfile 是 zotero 中最强大的插件，点击 zotero 菜单栏的「工具」> 「插件」，可以进入插件管理器，然后点开齿轮，选择从文件安装插件。插件为`.xpi`后缀的文件，在[[软件下载安装]]中已经提及。后面的 mdnotes 和 better bibtex 插件的安装同此操作。

![[Pasted image 20220322201929.png]]

然后对 zotfile 插件进行设置。点击 zotero 菜单栏的「工具」就能看到 zotfile 的插件设置选项。如上图所示，对箭头所指内容进行修改。

注意**将 pdf下载的临时目录设置为桌面**，以后可以从网上直接下载 pdf 到桌面，再选择pdf对应的文献条目，右键单击后选择`Attach New File`，调用该插件可以自动把 pdf 重命名并转移到**指定目录**（`\08-Assets\pdf`)去，并且创建指向 pdf 的链接。

### mdnotes 插件安装与设置

![[Pasted image 20220322202038.png]]

同 zotfile 的安装方式，其设置选项也在zotero 菜单栏的「工具」中可见，点开后如上图所示做修改，尤其要注意路径的设置。注意 mdnotes 导出目录为 `02-Reading/mdnotes`，而 mdnotes 的模板存放于 `08-Assets/Scripts` 中。

### better bibtex 插件安装与设置

![[Pasted image 20220321155719.png]]

插件安装同 zotfile，但是其设置选项已经被整合到 zotero 首选项中了（说明是个更加高级的大插件）。在这个地方，我们需要修改 citation key 的格式，如上图所示：就作者加年份即可。

此外，还需要修改 Export > Quick-Copy 中的格式为 Roam Cite Key。这样当你使用快捷键 `Ctrl+Shift+C` 从 zotero 中拷贝文献，就会拷贝一个 Roam Cite Key 格式的内容出来。

![[Pasted image 20220321160208.png]]

然后再到「导出」选项中修改 zotero 的便捷复制，选择 Better BibTex Quick Copy: Roam Cite Key，就大功告成了。

如某篇文献的 citation key 是 `xxd2022`，那么对应的 Roam Cite Key 就是 `[[@xxd2022]]`，然后你把这个 Roam Cite Key 直接粘贴到 obsidian 中就完成了引文的插入，非常便捷。

### 导出「我的文库」到 Vault

![[Pasted image 20220321161118.png]]

如上图所示，在完成了上述提及的三个插件的设置之后，我们可以右键点击「我的文库」，然后选择「导出文献库」，并且选择 Better BibLaTeX 的格式并 Keep updated。导出到 **指定目录**（`\08-Assets\Scripts`）去，注意文件名修改为英文`MyLibrary`。


### bib文件检查

完成了上述配置和操作后，请注意检查，在目录`X:\projects\working\08-Assets\Scripts`下应当存在以下文件：

- **MyLibrary.bib**：与 zotero 文献库同步的 bib 文件，由 better bibtex 插件导出并维持更新
- acs-nano.csl：引文格式文件，用于生成 acs nano style 的 bibliography
- markdown.css：html样式文件，用于将笔记导出为 html
- Mdnotes Default Template.md：mdnotes笔记模板文件
- template.docx：用于将笔记导出word文档的模板
- paper2docx.py：导出笔记为docx和html 的python代码


### 关于坚果云同步的说明

此模板库由于本人从不用iPad看文献做笔记的原因，zotero 的附件使用 zotfile 存储于 `08-Assets/pdfs` 目录中，暂时无法使用坚果云 WebDAV 服务实现zotero iPad 和 Desktop 的同步。如果你基本是使用 Zotero iPad 看文献，并且使用坚果云进行同步pdf附件。**不要使用 zotfile 插件即可**。

```ad-info
title: 下节预告
到这里，基本上所有的安装和配置已经弄完了，接下来我们就可以愉快地开始使用 obsidian 了。详见下一节[[开箱写日志]]。
```


---

page:: 2