---
title: obsidian新建个人相片集
date: 2022-03-31 15:48:48
excerpt: 为啥要做？做完后有何收获感想体会？
tags: obsidian入门
rating: ⭐
status: complete
destination: 99-4
share: false
obsidianUIMode: source
cssclass: img-grid
---

### 新建相册页

![[Pasted image 20220331155245.png]]

如上图所示，已经设置了针对单个目录应用单独的模板，所以你可以直接在`05-Life/01-Album`子目录中新建页面，会自动根据[[相册模板]]生成未命名的相册页。

### 切换为编辑模式并插入图片

由于[[相册模板]]设置了 obsidianUIMode 为 preview，所以新建的页面一篇空白，你需要按 Ctrl+E 切换为可编辑模式。

由于 Blue Topaz 主题内置了 img-grid 的 css 样式，而且我们相册模板中已经启用了这个样式，`cssclass: img-grid`，所以你可以直接在页面中**连续插入图片而不用换行**，css样式会自动调整图片的布局。

![[Pasted image 20220331160342.png]] ![[Pasted image 20220331160458.png]] ![[Pasted image 20220331160611.png]] 

但是需要注意，一行插入的图片不要超过4张，否则缩放得太小就不好看了。另外多张图片最好可以用空格隔开。

### 页面容量限制与图片压缩

预览时obsidian加载显示图片的速度会受到整个页面的图片数据大小。经测试不建议在一个页面中存入超过 100 M 的图片。

由于我们的操作中主要使用复制粘贴的方式，直接将图片粘贴到页面中，一般是会保存为 png 格式，所以可以使用 `quickAdd：🏋️‍压缩图片` 命令实现对图片的压缩，将 png 文件转换为 jpg 格式。

此命令依赖于 python 代码，使用到了 **PIL** 模块对图像进行处理。处理完毕后你需要使用 **Ctrl+H** 将相册页面中的 `.png` 全部转换为 `.jpg`，实现替换。然后再重新预览相册页面时，打开速度会流畅很多。

注意之前的原始png图像并没有被删除，如果你觉得后期太占用存储空间，可以打开obsidian全局命令面板，执行 clear unused images 命令：

![[Pasted image 20220331161432.png]]

当然了，按照我们的设定，这个 clear 的操作只是把没有 link 的单独的图片文件给转移到 `.Trash`，而不是完全从 vault 中删除了。这是一种防误删的操作。