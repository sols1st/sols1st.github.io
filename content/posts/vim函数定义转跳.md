+++
title = 'Vim函数定义转跳'
date = 2023-12-22T23:42:35+08:00
draft = true
tags = ['vim']
categories = ['tools']
+++

## 安装

1. 安装 ctags (ubuntu 下执行命令: sudo apt-get install ctags)
2. 在项目工程目录下(即源文件目录)执行命令: ctags -R \* (会生成一个 tags 文件即可)

## 使用

| 功能               | 快捷键 |
| ------------------ | ------ |
| 转跳到到函数定义处 | ctrl+] |
| 转跳到函数调用处   | ctrl+o |

## 注意

如果 ``ctrl+]`` 显示 ``E433: No tags file``

在 ~/.vimrc 文件中添加：

```vim
set tags=./tags,./TAGS,tags;,TAGS;
set autochdir
```
