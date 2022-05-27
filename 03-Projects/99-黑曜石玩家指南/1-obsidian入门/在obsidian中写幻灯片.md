---
title: 在obsidian中写幻灯片
date: 2022-03-22 12:27:26
excerpt: 这篇就直接就按照幻灯片的方式来写吧
tags: obsidian入门 ppt
rating: ⭐⭐⭐
status: complete
destination: 03-Projects/黑曜石玩家指南
share: false
---


%%这就是第一张封面，不需要多么花里胡哨，title、author、date信息有了就够了%%

### 在obsidian中写幻灯片

sheldonxxd

2022年3月22日

---

### 简洁明了最重要

![[Pasted image 20220322124645.png]]

一张 slide 一张图，一句话足矣。

---

### 幻灯片规则

- 使用三级标题
- 每张幻灯片用 `---` 隔开
- 就这么简单。

---

### 幻灯片预览

![[Pasted image 20220322125059.png|600]]

按快捷键`Ctrl+Shift+E` 可以调用插件开启预览。

---

### 调整插图大小

![[Pasted image 20220322125339.png]]

上一页slide的插图就有点大

可以在插图链接后添加`|width`实现。

---

### 字体高亮

![[Pasted image 20220322125620.png]]

有时候需要对关键词做高亮处理。

「ZH编辑增强插件」提供了快捷键。

选中文本按 <span style="background-color:#ff0000">Ctrl+Alt+数字</span> 即可。

---

### 在浏览器中查看

![[Pasted image 20220322125725.png]]

幻灯片预览面板可以选择在浏览器中打开。

---

### 切换幻灯片

![[幻灯片播放.gif]]

键盘上的方向键就可以实现幻灯片的切换。

---

### 幻灯片播放的其它快捷键

- `F`：focus，全屏展示
- `C`：打开画笔，可以标注
- `D`：可以下载画笔标记数据
- `S`：Speaker，演讲者模式
- `V`：暂停播放
- `M`：Menu
- `O`：Overview
- `Alt+Click`：放大

---

### 导出独立幻灯片文件

![[Pasted image 20220322130547.png]]

如上图所示，操作步骤如下：

```
1. 点击幻灯片预览面板的选项
2. 点击 Export as html后关闭预览，切换到幻灯片编辑草稿面板
3. 可以看到在 vault 根目录生成了一个 folder
4. 运行 QuickAdd: PPT导出 命令
5. 在桌面的 obsidian-slides 目录中可以看到被导出的html
6. 您可以把整个 obsidian-slides 文件夹拷贝到U盘
7. 然后到其它设备使用网络浏览器播放
```

---

### 导出为pdf

![[Pasted image 20220324150712.png|500]]

同上张片子，但选择 <span style="background-color:#ff0000">Print Presentation</span>，
会自动跳转到浏览器去打印，注意配置，打印到桌面即可。

---

### obsidian幻灯片的优势

1. 幻灯片仍然是文本，易于内容搜索和管理
2. 减少使用其它软件按编辑体验的割裂感
3. 导出独立HTML只要有浏览器就能播放
4. 专注于内容，无需担心排版错误
5. 有助于养成简洁风格「一图一句一张片」
6. 轻松撰写公式，如 $y = x_{1}\times\frac{\pi}{\lambda}$

---

### 重要提醒

此类幻灯片仅作为草稿和非正式场合使用，

如果需在比较重要的场合展示，建议使用`quickAdd:👑导出笔记`将草稿和相关素材导出后，

在 Powerpoint 或 Keynote 此类软件中进一步编辑。

---

page:: 7