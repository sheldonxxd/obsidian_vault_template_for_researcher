# obsidian_vault_template_for_researcher

从接触到使用 obsidian 已经有一段时间了，感觉这个工具用好了应该对搞科研有较大帮助。

## Obsidian安装和配置

### 下载安装软件

目前 obsidian 是开源免费的跨平台软件，可以直接到[官网](https://obsidian.md/download)下载安装包。

### 子目录结构推荐

安装 obsidian 之后可以新建一个 vault（选择一个空文件夹），然后综合网上各种建议和阅读文献和写日记的需求，可以新建以下几个子文件夹：

- 00-Inbox：临时性内容
- 01-Diary：存放模板化的日志
- 02-Reading：存放文献库和文献阅读笔记
- 03-Projects：存放各种实际的项目
- 08-Assets：存放附件
- 09-Templates： 存放笔记模板

注意子文件夹数目不要超过 10 个，否则会比较混乱。

### 配置软件

![Pasted image 20210928205237](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020210928205237.png)
可以到关于-语言中选择简体中文，默认是英文。

![Pasted image 20210928204919](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020210928204919.png)
指定删除文件到 `.trash` 目录，新建文件到 `00-Inbox` 目录。

![Pasted image 20210928204955](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020210928204955.png)
指定附件添加到`08-Assets` 目录。

![Pasted image 20210928205136](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020210928205136.png)
obsidian 默认黑色，还是有点不习惯，可修改为明亮。至于其它主题，推荐 [YinAndYang](https://github.com/chetachiezikeuzor/Yin-and-Yang-Theme)。

![Pasted image 20210928205411](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020210928205411.png)
核心插件，按需开启，感觉除了**发布**、**同步**、**卡片**、**漫游**之外都可以开启。

![Pasted image 20210928205545](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020210928205545.png)
关闭安全模式，只有这样你才能安装第三方插件。

### 安装插件

obsidian 最大的特色就是有很多插件。但入门阶段用不了那么多。目前我主要是用来做文献阅读笔记，以及简单的写一下日记。基于这些需求，推荐的插件如下：

- `日记`：内置核心插件，根据模板创建日志
- `Calender`：第三方插件，主要与日记连用
- `Recent Files`：显示最近打开过的文档
- `Ozan's Image in Editor Plugin`：支持编辑模式下预览图片
- `Annotator`：文献pdf的批注插件
- `Collapse All`：可以折叠或打开 vault 中的文件夹列表
- `Copy Block Link`：复制块引用，实现更高精度的笔记链接
- `Sliding Panes`：开启多个笔记面板的时候会自动调整
- `Templater`：模板插件，有灵活丰富的自定义玩法
- `QuickAdd`: 组合自定义动作的一个插件，配合模板方便快速插入内容
- `Remember Cursor Position`：记住光标在文档中的位置
- `Mind Map`：将markdown按大纲级别渲染为思维导图
- `Clear Unused Images`：清除一些没有被引用的垃圾图片
- `Gallery`：把所有图片放到一起看
- `Checklist`: 把所有带 todo 标签的代办事项汇总起来查看
- `星标`：内置核心插件，可把非常重要的笔记搞进去

如何开启和安装这些插件不再赘述，可以直接从 obsidian 安装第三方插件，也可自信搜索到github下载，相关教程网上很多。但最好的方式，就是直接使用我的**vault模板**，内置上述提及的所有第三方插件。部分插件的设置将在后面实战部分介绍说明。

### 最终界面一览

![Pasted image 20211010082956](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020211010082956.png)
*使用了 Ying and Yang 这个 obsidian 主题，感觉挺好的。*

## Obsidian简单使用

### 写日记

写日记是最重要最基础的，强烈推荐从每天日记出发，链接延伸到其它笔记去。

#### 设置日志模板

![Pasted image 20211010083521](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020211010083521.png)

#### 设置日记插件

![Pasted image 20211010083642](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020211010083642.png)

#### 创建日记

![Pasted image 20211010083849](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020211010083849.png)

注意日历需要安装 Calender 插件。

#### 一键Tracking

实时跟踪记录自己的行为，需要输入时间戳和内容，并添加到当天日记的 Tracking 部分。为了简化这一串操作，可以使用QuickAdd插件，具体配置如下：

![Pasted image 20211010084816](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020211010084816.png)
在 QuickAdd 设置中新增一个 Capture 命令之后，具体配置如下：

![Pasted image 20211010085018](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020211010085018.png)

然后给这个 `timeStamp` 的命令分配一个快捷键：`Ctrl+Shift+I`

![Pasted image 20211010085141](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020211010085141.png)

然后你只需要按下快捷键，不管当前 active 的是哪个文档，都可以向当日的日记内插入带有时间戳的记录，有点像 fleeting notes。

#### 写日记的建议

- 网上有很多教程推荐 Day Planner 插件，这里并不推荐，因为实际使用过程中，完全不如手机日历好用和实用。每天有一个简单的重要事务清单（最好是不超过3件）即可，更重要的是Tracking。

- Tracking 按照无序列表的方式进行撰写，前面带有时间戳，后面可以跟标签。一般无需在日志中插入图片，如果有这个需求，可以放在两条 track 之间。

- 每天可以从日记开始，从Tracking部分创建双链指向其它笔记，形成一个自然的主干分支结构。

- 每个月（勤快一点可以每周）可以整理回顾一下日志，撰写小结。

### 读文献

使用 obsidian 做文献阅读笔记有着无与伦比的优势（相对于其它工具）。

#### 使用JabRef管理文献库

![Pasted image 20211010091818](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020211010091818.png)

JabRef 是一款开源免费的文献管理工具，甚至可以免安装放到移动硬盘中。它的文献库就是一个 bib 文件，非常简单方便（如果您使用 LaTeX 写作则更方便）。

此文献阅读工作流依赖于 JabRef，但是您无需担心使用 JabRef 管理文献库会影响后续撰写文章插入参考文献。因为现在主流的文献管理工具，如 EndNote、Mendeley、Zotero 都支持从 bib 文件导入文献记录。

#### Reading目录设置

可以在 Reading 目录下新建一个 pdfs 的子文件夹，专门用于存放 JabRef 文献库 bib 文件，以及文献条目对应的全文 pdf 文件。然后修改一下 JabRef 的首选项设置：

![Pasted image 20211010092303](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020211010092303.png)

#### 从DOI创建条目并下载pdf

![Pasted image 20211010092646](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020211010092646.png)
至于下载 pdf，有了 doi 号之后，无论是 scihub 还是从校园网都是比较方便的，可以直接下载到电脑桌面。

#### 重命名并归档pdf

![Pasted image 20211010093111](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020211010093111.png)


#### 生成pdf的阅读笔记页

在 obsidian 中推荐使用 Annotater 插件做 pdf 的阅读笔记，但是这个使用上稍微有点奇葩，你需要自己创建一个页面，然后在 front matter 中指定要被做标记的 pdf 文件：

![Pasted image 20211010093552](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020211010093552.png)

显然每次都要输入这么多信息是比较繁琐的，这里可以结合 QuickAdd、Templater 插件以及我自己写的一段 python 脚本来实现这个阅读笔记页面的自动化创建。由于相对复杂，具体过程不再赘述，如果你使用我的 **vault模板**，敲快捷键 `Ctrl+Shift+R` 就可以根据 pdf文件自动创建其对应的阅读笔记。

```python
import os, glob, sys

def write(wks):
    fps = glob.glob(os.path.join(wks, '*.pdf'))
    keys = [os.path.split(x)[-1].split(' ')[0] for x in fps]
    for idx, key in enumerate(keys):
        md_fp = os.path.join(wks, key+'.md')
        if not os.path.exists(md_fp):
            with open(md_fp, 'w', encoding='utf-8') as f:
                pdf_fname = os.path.split(fps[idx])[-1]
                content = f'---\nannotation-target: {pdf_fname}\nalias: {key}\ntags: pdf笔记\n---\n'
                f.write(content)
                print(f'阅读文献[[{key}]]\n,')  
				# 当被 templater 插件调用时可以直接把内容输入到笔记中

if __name__ == '__main__':
	# 指定 pdf 文件存放目录
    wks = r'X:\projects\playground\02-Reading\pdfs'
    write(wks)
```

#### 阅读标注笔记效果

![Pasted image 20211010094510](https://sheldon-notes.oss-cn-shanghai.aliyuncs.com/img/Pasted%20image%2020211010094510.png)

## Obsidian使用体会

- 学习成本是真的高，不过有了这个教程和 vault 模板后会简单很多。
- 所有资料都在本地 vault 里边，可以放到移动硬盘里边，也可以同步到云盘，比较安全放心。
- 使用插件注意克制，一定要根据自己真实的需求做出选择，实现最佳的自定义。
- 做笔记什么的也要注意克制，不要有太多废话，优先把事情做好。
- 软件、插件都只是工具（提高整理笔记效率），更重要的还是自己有定期整理笔记的习惯。
