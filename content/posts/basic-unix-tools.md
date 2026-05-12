+++
title = '基础 Unix 工具命令速查表'
date = 2025-12-08T14:56:10+08:00
draft = false
+++
记录部分常用基本 Unix 工具和命令

- [grep](#grep)
  - [基本语法](#基本语法)
  - [常用选项](#常用选项)
  - [示例](#示例)
- [find](#find)
  - [基本语法](#基本语法-1)
  - [常用表达式](#常用表达式)
  - [示例](#示例-1)
- [sed](#sed)
  - [基本语法](#基本语法-2)
  - [常用选项](#常用选项-1)
  - [基本命令](#基本命令)
  - [示例](#示例-2)
- [awk](#awk)
  - [基本语法](#基本语法-3)
  - [基本结构](#基本结构)
  - [内置变量](#内置变量)
  - [示例](#示例-3)
- [sort](#sort)
  - [常用选项](#常用选项-2)
  - [示例](#示例-4)
- [uniq](#uniq)
  - [常用选项](#常用选项-3)
  - [示例](#示例-5)
- [cut](#cut)
  - [常用选项](#常用选项-4)
  - [示例](#示例-6)
- [wc](#wc)
  - [常用选项](#常用选项-5)
  - [示例](#示例-7)
- [head/tail](#headtail)
  - [常用选项](#常用选项-6)
  - [示例](#示例-8)
- [xargs](#xargs)
  - [常用选项](#常用选项-7)
  - [示例](#示例-9)
  - [文件批量处理](#文件批量处理)
  - [数据处理](#数据处理)
- [tar](#tar)
  - [基本语法](#基本语法-4)
  - [常用选项](#常用选项-8)
  - [示例](#示例-10)
- [chmod](#chmod)
  - [基本语法](#基本语法-5)
  - [权限表示法](#权限表示法)
  - [常用选项](#常用选项-9)
  - [示例](#示例-11)
- [gzip/gunzip](#gzipgunzip)
  - [gzip常用选项](#gzip常用选项)
  - [gunzip常用选项](#gunzip常用选项)
  - [示例](#示例-12)
- [ls](#ls)
  - [常用选项](#常用选项-10)
  - [示例](#示例-13)
- [ps](#ps)
  - [常用选项](#常用选项-11)
  - [示例](#示例-14)
- [df](#df)
- [du](#du)
- [top/htop](#tophtop)
- [free](#free)
- [uname](#uname)
- [whoami](#whoami)
- [which/whereis](#whichwhereis)
- [history](#history)

## grep
grep是用于文本搜索的强大工具，支持正则表达式。

### 基本语法
```bash
grep [选项] 模式 [文件...]
```

### 常用选项
- `-i`：忽略大小写
- `-v`：反向匹配，显示不包含模式的行
- `-n`：显示行号
- `-r` 或 `-R`：递归搜索目录
- `-l`：只显示包含匹配的文件名
- `-L`：只显示不包含匹配的文件名
- `-w`：只匹配整个单词
- `-c`：只显示匹配的行数
- `-o`：只显示匹配的文本部分

### 示例
```bash
# 在文件中搜索文本
grep "error" logfile.txt

# 忽略大小写搜索
grep -i "error" logfile.txt

# 递归搜索目录
grep -r "function" /path/to/code

# 显示行号
grep -n "TODO" *.py

# 反向匹配
grep -v "debug" logfile.txt

# 匹配整个单词
grep -w "main" *.c

# 使用正则表达式
grep "^[0-9]" data.txt  # 匹配以数字开头的行
grep "error|warning" logfile.txt  # 匹配error或warning
```

## find
find用于在目录树中搜索文件。

### 基本语法
```bash
find [路径] [表达式]
```

### 常用表达式
- `-name`：按文件名搜索
- `-iname`：按文件名搜索（忽略大小写）
- `-type`：按文件类型搜索（f=文件，d=目录，l=链接）
- `-size`：按文件大小搜索
- `-mtime`：按修改时间搜索
- `-exec`：对找到的文件执行命令
- `-delete`：删除找到的文件

### 示例
```bash
# 按名称查找文件
find . -name "*.txt"

# 忽略大小写查找
find . -iname "README"

# 查找目录
find . -type d -name "src"

# 查找大于100MB的文件
find . -size +100M

# 查找7天内修改过的文件
find . -mtime -7

# 查找并执行命令
find . -name "*.tmp" -delete
find . -name "*.py" -exec python {} \;

# 组合条件
find . -name "*.log" -size +10M -mtime +30
```

## sed
sed（流编辑器）用于对文本进行过滤和转换。

### 基本语法
```bash
sed [选项] '脚本' [文件...]
```

### 常用选项
- `-i`：直接修改文件
- `-e`：执行多个脚本
- `-f`：从文件读取脚本
- `-n`：禁止默认输出

### 基本命令
- `s/模式/替换/`：替换文本
- `d`：删除行
- `p`：打印行
- `a\文本`：在行后添加文本
- `i\文本`：在行前插入文本
- `y/字符集1/字符集2/`：字符转换

### 示例
```bash
# 替换文本（只替换每行第一个）
sed 's/error/warning/' logfile.txt

# 替换所有匹配项
sed 's/error/warning/g' logfile.txt

# 删除包含特定文本的行
sed '/debug/d' logfile.txt

# 打印特定行
sed -n '10,20p' file.txt  # 打印10-20行
sed -n '/error/p' logfile.txt  # 只打印包含error的行

# 在行后添加文本
sed 'a\# 添加的注释' file.txt

# 直接修改文件
sed -i 's/old/new/g' file.txt

# 多个替换
sed -e 's/foo/bar/g' -e 's/baz/qux/g' file.txt

# 使用正则表达式
sed 's/[0-9]\+/[NUM]/g' file.txt
```

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

# 处理多个文件
awk 'FNR==1 {print "Processing:", FILENAME} {print NR, $0}' file1 file2
```

## sort
sort用于对文本行进行排序。

### 常用选项
- `-n`：按数值排序
- `-r`：反向排序
- `-k`：指定排序的字段
- `-t`：指定字段分隔符
- `-u`：去除重复行
- `-f`：忽略大小写
- `-M`：按月份排序

### 示例
```bash
# 基本排序
sort file.txt

# 数值排序
sort -n numbers.txt

# 反向排序
sort -r file.txt

# 按第3列排序
sort -k3 data.txt

# 使用自定义分隔符
sort -t: -k3 /etc/passwd

# 去除重复行
sort -u file.txt

# 组合使用
sort -t: -k3 -n /etc/passwd
```

## uniq
uniq用于去除相邻的重复行。

### 常用选项
- `-c`：显示重复次数
- `-d`：只显示重复行
- `-u`：只显示不重复行
- `-i`：忽略大小写
- `-f`：跳过前几个字段

### 示例
```bash
# 去除相邻重复行
uniq file.txt

# 显示重复次数
uniq -c file.txt

# 只显示重复行
uniq -d file.txt

# 只显示不重复行
uniq -u file.txt

# 忽略前两个字段
uniq -f2 file.txt
```

## cut
cut用于从每行中提取部分内容。

### 常用选项
- `-c`：按字符提取
- `-f`：按字段提取
- `-d`：指定字段分隔符

### 示例
```bash
# 提取前5个字符
cut -c1-5 file.txt

# 提取第1和第3个字段
cut -f1,3 file.txt

# 使用自定义分隔符
cut -d: -f1,6 /etc/passwd

# 提取特定字符范围
cut -c1-10,20-30 file.txt
```

## wc
wc用于统计文件的行数、字数和字符数。

### 常用选项
- `-l`：只统计行数
- `-w`：只统计字数
- `-c`：只统计字符数
- `-m`：只统计字符数（支持多字节字符）

### 示例
```bash
# 统计所有信息
wc file.txt

# 只统计行数
wc -l file.txt

# 统计多个文件
wc *.txt

# 统计命令输出
ls -l | wc -l
```

## head/tail
head和tail分别用于查看文件的开头和结尾部分。

### 常用选项
- `-n`：指定行数
- `-c`：指定字节数
- `-f`：tail的实时跟踪选项

### 示例
```bash
# 查看文件前10行
head -n10 file.txt

# 查看文件后10行
tail -n10 file.txt

# 实时跟踪日志
tail -f logfile.txt

# 查看文件前100字节
head -c100 file.txt
```

## xargs
xargs用于构建和执行命令行。

### 常用选项
- `-n`：每次使用参数的数量
- `-I`：替换字符串
- `-t`：显示执行的命令
- `-p`：执行前询问

### 示例
```bash
# 基本用法
find . -name "*.tmp" | xargs rm

# 限制参数数量
ls *.txt | xargs -n1 cat

# 使用替换字符串
find . -name "*.py" | xargs -I {} cp {} backup/

# 显示执行的命令
ls *.txt | xargs -t rm
```

### 文件批量处理
```bash
# 批量重命名文件
ls *.txt | sed 's/\(.*\)\.txt/mv \1.txt \1_new.txt/' | sh

# 查找并处理大文件
find . -size +100M -exec ls -lh {} \;

# 统计代码行数
find . -name "*.py" | xargs wc -l | tail -1
```

### 数据处理
```bash
# CSV数据处理
awk -F, 'NR>1 {sum += $3} END {print "Average:", sum/(NR-1)}' data.csv

# 提取IP地址并统计
grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+\.[0-9]\+' logfile.txt | sort | uniq -c | sort -nr
```

## tar
tar是Linux中用于归档文件的工具，可以将多个文件和目录打包成一个文件。

### 基本语法
```bash
tar [选项] [归档文件] [文件或目录...]
```

### 常用选项
- `-c`：创建归档
- `-x`：提取归档
- `-v`：显示详细过程
- `-f`：指定归档文件名
- `-z`：使用gzip压缩
- `-j`：使用bzip2压缩
- `-J`：使用xz压缩
- `-t`：列出归档内容
- `-r`：向归档中添加文件
- `-u`：只添加比归档中更新的文件

### 示例
```bash
# 创建归档
tar -cvf archive.tar file1 file2 dir/

# 创建gzip压缩归档
tar -czvf archive.tar.gz file1 file2 dir/

# 创建bzip2压缩归档
tar -cjvf archive.tar.bz2 file1 file2 dir/

# 提取归档
tar -xvf archive.tar

# 提取gzip压缩归档
tar -xzvf archive.tar.gz

# 查看归档内容
tar -tvf archive.tar

# 向现有归档添加文件
tar -rvf archive.tar newfile

# 排除特定文件
tar -czvf backup.tar.gz --exclude='*.tmp' /path/to/backup
```

## chmod
chmod用于修改文件或目录的权限。

### 基本语法
```bash
chmod [选项] 权限 文件...
```

### 权限表示法
- **符号模式**：`[ugoa][+-=][rwx]`
  - `u`：用户（所有者）
  - `g`：组
  - `o`：其他用户
  - `a`：所有用户
  - `+`：添加权限
  - `-`：移除权限
  - `=`：设置权限
  - `r`：读权限（4）
  - `w`：写权限（2）
  - `x`：执行权限（1）

- **数字模式**：三位数字表示权限
  - 第一位：所有者权限
  - 第二位：组权限
  - 第三位：其他用户权限

### 常用选项
- `-R`：递归修改目录及其内容的权限
- `-v`：显示修改的文件

### 示例
```bash
# 使用符号模式
chmod u+x script.sh          # 给所有者添加执行权限
chmod g-w file.txt           # 移除组的写权限
chmod o=r file.txt           # 设置其他用户只读权限
chmod a+r file.txt           # 给所有用户添加读权限

# 使用数字模式
chmod 755 script.sh          # rwxr-xr-x
chmod 644 file.txt           # rw-r--r--
chmod 700 private_dir/       # rwx------

# 递归修改目录权限
chmod -R 755 public_html/

# 批量修改权限
chmod +x *.sh                # 给所有shell脚本添加执行权限
```

## gzip/gunzip
gzip用于压缩文件，gunzip用于解压缩gzip压缩的文件。

### gzip常用选项
- `-d`：解压缩
- `-r`：递归处理目录
- `-k`：保留原文件
- `-l`：显示压缩文件信息
- `-1`到`-9`：指定压缩级别（1最快，9压缩率最高）

### gunzip常用选项
- `-r`：递归处理目录
- `-k`：保留原文件
- `-l`：显示压缩文件信息
- `-c`：输出到标准输出

### 示例
```bash
# 压缩文件
gzip file.txt                # 生成file.txt.gz，删除原文件
gzip -k file.txt             # 保留原文件
gzip -9 file.txt             # 最高压缩率

# 递归压缩目录中的文件
gzip -r directory/

# 解压缩
gunzip file.txt.gz           # 生成file.txt，删除压缩文件
gunzip -k file.txt.gz        # 保留压缩文件

# 查看压缩文件信息
gzip -l file.txt.gz

# 压缩并输出到标准输出
gzip -c file.txt > file.txt.gz

# 解压缩并输出到标准输出
gunzip -c file.txt.gz > file.txt
```

## ls
ls用于列出目录内容。

### 常用选项
- `-l`：长格式显示
- `-a`：显示所有文件（包括隐藏文件）
- `-h`：以人类可读格式显示文件大小
- `-r`：反向排序
- `-t`：按修改时间排序
- `-S`：按文件大小排序
- `-R`：递归列出子目录
- `-d`：列出目录本身而非内容
- `-i`：显示inode号
- `-F`：在文件名后添加类型指示符

### 示例
```bash
# 基本列表
ls

# 长格式显示
ls -l

# 显示所有文件（包括隐藏文件）
ls -la

# 人类可读格式
ls -lh

# 按修改时间排序
ls -lt

# 按文件大小排序
ls -lS

# 递归列出
ls -R

# 列出目录信息而非内容
ls -ld directory/

# 组合使用
ls -lah                    # 最常用的组合
```

## ps
ps用于显示当前进程状态。

### 常用选项
- `aux`：显示所有用户的详细进程信息
- `-ef`：显示所有进程的完整格式
- `-u 用户名`：显示特定用户的进程
- `-p PID`：显示特定PID的进程
- `-C 命令名`：显示特定命令的进程
- `--forest`：以树形结构显示进程
- `-eo`：自定义输出格式

### 示例
```bash
# 显示所有进程详细信息
ps aux

# 显示所有进程完整格式
ps -ef

# 显示特定用户的进程
ps -u username

# 显示特定PID的进程
ps -p 1234

# 显示特定命令的进程
ps -C nginx

# 以树形结构显示进程
ps --forest

# 自定义输出格式
ps -eo pid,ppid,cmd,%mem,%cpu

# 查找特定进程
ps aux | grep nginx

# 实时监控进程（与watch结合）
watch -n 1 'ps aux | head -10'
```

## df
显示磁盘空间使用情况
```bash
df -h                      # 人类可读格式
df -T                      # 显示文件系统类型
df -i                      # 显示inode使用情况
```

## du
显示目录空间使用情况
```bash
du -h                      # 人类可读格式
du -sh directory/          # 显示目录总大小
du -a                      # 显示所有文件大小
du --max-depth=1           # 限制显示深度
```

## top/htop
实时显示系统进程信息
```bash
top                        # 基本top
htop                       # 增强版top（需要安装）
top -p 1234                # 监控特定进程
```

## free
显示内存使用情况
```bash
free -h                    # 人类可读格式
free -m                    # 以MB为单位
free -s 5                  # 每5秒刷新一次
```

## uname
显示系统信息
```bash
uname -a                   # 显示所有信息
uname -r                   # 显示内核版本
uname -s                   # 显示操作系统名称
```

## whoami
显示当前用户名
```bash
whoami                     # 显示当前用户
who                        # 显示登录用户信息
w                          # 显示当前登录用户及活动
```

## which/whereis
查找命令位置
```bash
which python               # 查找python命令路径
whereis python             # 查找python相关文件
```

## history
显示命令历史
```bash
history                    # 显示命令历史
history 10                 # 显示最近10条命令
!123                       # 执行历史记录中的第123条命令
!!                         # 执行上一条命令
```