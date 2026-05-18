+++
title = '常用 Unix 工具命令速查表'
date = 2025-12-08T14:56:10+08:00
draft = false
+++

记录部分常用基本 Unix 工具和命令

- [awk](#awk) - 文本处理与字段分析
- [chmod](#chmod) - 修改文件权限
- [curl](#curl) - 传输网络数据
- [cut](#cut) - 提取文本字段
- [df](#df) - 查看磁盘空间使用情况
- [du](#du) - 查看目录或文件大小
- [find](#find) - 查找文件和目录
- [free](#free) - 查看内存使用情况
- [grep](#grep) - 文本搜索
- [gzip/gunzip](#gzipgunzip) - 文件压缩与解压
- [head/tail](#headtail) - 查看文件开头或结尾
- [history](#history) - 查看命令历史
- [ls](#ls) - 列出目录内容
- [ps](#ps) - 查看进程状态
- [sed](#sed) - 文本替换与编辑
- [sort](#sort) - 排序文本内容
- [tar](#tar) - 文件归档与打包
- [top/htop](#tophtop) - 实时监控系统进程
- [uname](#uname) - 查看系统信息
- [uniq](#uniq) - 去除重复行
- [wc](#wc) - 统计文本内容
- [wget](#wget) - 下载网络文件
- [which/whereis](#whichwhereis) - 查找命令位置
- [whoami](#whoami) - 查看当前用户
- [xargs](#xargs) - 构建命令参数

## awk

awk是强大的文本处理工具，特别适合处理结构化文本。

### 基本语法

```bash
awk [选项] '程序' [文件...]
```

### 基本结构

```bash
awk 'BEGIN {初始化} {处理每行} END {结束处理}' 文件
```

### 内置变量

- `$0`：整行内容
- `$1, $2, ...`：第1、2个字段
- `NF`：字段数量
- `NR`：当前行号
- `FS`：字段分隔符（默认为空格）
- `OFS`：输出字段分隔符

### 示例

```bash
# 打印特定列
awk '{print $1, $3}' data.txt

# 使用自定义分隔符
awk -F: '{print $1, $6}' /etc/passwd

# 条件处理
awk '$3 > 100 {print $1, $3}' data.txt

# 计算总和
awk '{sum += $3} END {print "Total:", sum}' data.txt

# 格式化输出
awk '{printf "%-10s %8.2f\n", $1, $3}' data.txt

# 统计
awk '{count++} END {print "Lines:", count}' file.txt
```

---

## chmod

chmod用于修改文件或目录的权限。

### 基本语法

```bash
chmod [选项] 权限 文件...
```

### 常用选项

- `-R`：递归修改目录权限
- `-v`：显示修改过程

### 示例

```bash
# 添加执行权限
chmod +x script.sh

# 设置权限
chmod 755 script.sh
chmod 644 file.txt

# 递归修改目录权限
chmod -R 755 public_html/
```

---

## curl

curl用于通过URL传输数据，支持HTTP、HTTPS、FTP等协议。

### 基本语法

```bash
curl [选项] URL
```

### 常用选项

- `-O`：使用远程文件名保存
- `-o`：指定输出文件名
- `-L`：跟随重定向
- `-I`：只获取响应头
- `-X`：指定HTTP方法
- `-H`：添加请求头
- `-d`：发送POST数据

### 示例

```bash
# 下载文件
curl -O https://example.com/file.zip

# 指定输出文件
curl -o output.html https://example.com

# 查看响应头
curl -I https://example.com

# POST请求
curl -X POST -d "name=test" https://example.com/api
```

---

## cut

cut用于从每行中提取部分内容。

### 常用选项

- `-c`：按字符提取
- `-f`：按字段提取
- `-d`：指定字段分隔符

### 示例

```bash
cut -c1-5 file.txt
cut -f1,3 file.txt
cut -d: -f1,6 /etc/passwd
```

---

## df

df用于显示磁盘空间使用情况。

### 示例

```bash
df -h
df -T
df -i
```

---

## du

du用于显示目录空间使用情况。

### 示例

```bash
du -h
du -sh directory/
du --max-depth=1
```

---

## find

find用于在目录树中搜索文件。

### 基本语法

```bash
find [路径] [表达式]
```

### 常用表达式

- `-name`
- `-iname`
- `-type`
- `-size`
- `-mtime`
- `-exec`
- `-delete`

### 示例

```bash
find . -name "*.txt"
find . -type d -name "src"
find . -size +100M
find . -mtime -7
find . -name "*.tmp" -delete
```

---

## free

free用于显示内存使用情况。

### 示例

```bash
free -h
free -m
free -s 5
```

---

## grep

grep是用于文本搜索的强大工具，支持正则表达式。

### 基本语法

```bash
grep [选项] 模式 [文件...]
```

### 常用选项

- `-i`：忽略大小写
- `-v`：反向匹配
- `-n`：显示行号
- `-r`：递归搜索
- `-w`：匹配整个单词

### 示例

```bash
grep "error" logfile.txt
grep -i "error" logfile.txt
grep -r "function" ./src
grep -n "TODO" *.py
```

---

## gzip/gunzip

gzip用于压缩文件，gunzip用于解压缩。

### 示例

```bash
gzip file.txt
gzip -k file.txt
gzip -9 file.txt

gunzip file.txt.gz
gunzip -k file.txt.gz
```

---

## head/tail

head和tail用于查看文件开头和结尾。

### 示例

```bash
head -n10 file.txt
tail -n10 file.txt
tail -f logfile.txt
```

---

## history

history用于查看命令历史。

### 示例

```bash
history
history 10
!!
!123
```

---

## ls

ls用于列出目录内容。

### 常用选项

- `-l`
- `-a`
- `-h`
- `-t`
- `-S`
- `-R`

### 示例

```bash
ls
ls -la
ls -lh
ls -lt
ls -R
```

---

## ps

ps用于显示当前进程状态。

### 示例

```bash
ps aux
ps -ef
ps -u username
ps -p 1234
ps --forest
```

---

## sed

sed（流编辑器）用于文本替换与编辑。

### 基本语法

```bash
sed [选项] '脚本' [文件...]
```

### 常用选项

- `-i`
- `-e`
- `-f`
- `-n`

### 示例

```bash
sed 's/error/warning/' logfile.txt
sed 's/error/warning/g' logfile.txt
sed '/debug/d' logfile.txt
sed -i 's/old/new/g' file.txt
```

---

## sort

sort用于对文本进行排序。

### 常用选项

- `-n`
- `-r`
- `-k`
- `-t`
- `-u`

### 示例

```bash
sort file.txt
sort -n numbers.txt
sort -r file.txt
sort -u file.txt
```

---

## tar

tar用于归档和打包文件。

### 基本语法

```bash
tar [选项] [归档文件] [文件或目录...]
```

### 常用选项

- `-c`
- `-x`
- `-v`
- `-f`
- `-z`
- `-j`

### 示例

```bash
tar -cvf archive.tar dir/
tar -czvf archive.tar.gz dir/
tar -xvf archive.tar
tar -xzvf archive.tar.gz
```

---

## top/htop

top和htop用于实时监控系统进程。

### 示例

```bash
top
htop
top -p 1234
```

---

## uname

uname用于显示系统信息。

### 示例

```bash
uname -a
uname -r
uname -s
```

---

## uniq

uniq用于去除相邻重复行。

### 常用选项

- `-c`
- `-d`
- `-u`
- `-i`

### 示例

```bash
uniq file.txt
uniq -c file.txt
uniq -d file.txt
uniq -u file.txt
```

---

## wc

wc用于统计文件内容。

### 常用选项

- `-l`
- `-w`
- `-c`
- `-m`

### 示例

```bash
wc file.txt
wc -l file.txt
wc *.txt
```

---

## wget

wget用于从网络下载文件，支持断点续传和递归下载。

### 基本语法

```bash
wget [选项] URL
```

### 常用选项

- `-O`：指定输出文件名
- `-c`：断点续传
- `-r`：递归下载
- `-q`：安静模式
- `--limit-rate`：限制下载速度

### 示例

```bash
# 下载文件
wget https://example.com/file.zip

# 指定输出文件名
wget -O archive.zip https://example.com/file.zip

# 断点续传
wget -c https://example.com/large.iso

# 递归下载网站
wget -r https://example.com/docs/
```

---

## which/whereis

which和whereis用于查找命令位置。

### 示例

```bash
which python
whereis python
```

---

## whoami

whoami用于显示当前用户名。

### 示例

```bash
whoami
who
w
```

---

## xargs

xargs用于构建和执行命令行。

### 常用选项

- `-n`
- `-I`
- `-t`
- `-p`

### 示例

```bash
find . -name "*.tmp" | xargs rm

ls *.txt | xargs -n1 cat

find . -name "*.py" | xargs -I {} cp {} backup/
```
