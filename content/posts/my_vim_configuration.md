+++
title = 'My Vim Configuration'
date = 2025-11-16T13:41:34+08:00
draft = false
+++

_for windows_

## 预备工作

安装vim-plug

```ps
iwr -useb https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim |`
    ni $HOME/vimfiles/autoload/plug.vim -Force
```

## 配置文件

路径为`~/.vimrc`

```vim
" =================== Vim Plugin ===================

call plug#begin('$HOME/vimfiles/plugged')

Plug 'neoclide/coc.nvim', {'branch': 'release'}     " 智能补全 + LSP
Plug 'tmhedberg/SimpylFold'                         " 代码折叠
Plug 'tpope/vim-surround'                           " 改引号
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } } " 模糊搜索
Plug 'junegunn/fzf.vim'
Plug 'morhetz/gruvbox'
Plug 'preservim/nerdtree'
Plug 'airblade/vim-gitgutter'
Plug 'preservim/nerdcommenter'
Plug 'plasticboy/vim-markdown'
Plug 'iamcco/markdown-preview.nvim', { 'do': { -> mkdp#util#install() }, 'for': 'markdown' }
Plug 'tpope/vim-fugitive'
" Plug 'justinmk/vim-sneak'
Plug 'easymotion/vim-easymotion'
Plug 'mhinz/vim-startify'
" Plug 'voldikss/vim-floaterm'

call plug#end()

" ==================== 基础设置 ====================

syntax on                                 " 启用语法高亮
filetype plugin indent on                 " 启用文件类型检测、插件、自动缩进
autocmd FileType * setlocal formatoptions-=c formatoptions-=r formatoptions-=o
set number                                " 显示绝对行号
set autoread                              " 文件被外部修改时自动重新读取
au FocusGained,BufEnter * silent! checktime " 窗口获得焦点或进入缓冲区时自动检查文件变化
set relativenumber                        " 显示相对行号（当前行显示 0）
set cursorline                            " 高亮当前行
set encoding=utf-8                        " 设置文件编码为 UTF-8（支持中文）
set termguicolors                         " 启用真彩色（256 色以上终端）
set tabstop=4                             " Tab 键显示为 4 个空格宽度
set shiftwidth=4                          " 自动缩进宽度为 4 个空格
set expandtab                             " 将 Tab 键输入转换为空格
set ai                                    " 启用自动缩进（auto indent）
set si                                    " 启用智能缩进（smart indent）
set wrap                                  " 自动折行（长行换行显示）
set clipboard=unnamed                     " 使用系统剪贴板（Ctrl+C/V 可用）
set noerrorbells                          " 关闭错误提示音
set novisualbell                          " 关闭视觉错误提示（如屏幕闪烁）
set t_vb=                                 " 禁用终端视觉响铃
set backspace=eol,start,indent            " 允许退格键删除换行、行首、缩进
set so=7                                  " 光标上下保留 7 行缓冲（scroll offset）
set wildmenu                              " 命令模式下显示补全菜单
set hlsearch                              " 高亮搜索结果
set incsearch                             " 启用增量搜索（边输入边匹配）
set nobackup                              " 不创建备份文件（~ 文件）
set nowb                                  " 不创建写入备份
set laststatus=2                          " 始终显示状态栏
set statusline=\ %<%F[%1*%M%*%n%R%H]%=\ %y\ %0(%{&fileformat}\ %{&encoding}\ Ln\ %l,\ Col\ %c/%L%)
set showmatch
set directory=~/vimfiles/swap//
set undodir=~/vimfiles/undo//
set backupdir=~/vimfiles/backup//
set undofile
set hidden
set showtabline=2
set ignorecase
set smartcase
set shell=powershell

" === 回到上次打开状态 ===
autocmd BufReadPost *
            \ if line("'\"") > 0 && line("'\"") <= line("$") && &ft !~# 'commit\|rebase' |
            \   exe "normal! g'\"" |
            \ endif

let &t_SI = "\e[6 q"   " Insert 模式：细线
let &t_EI = "\e[2 q"   " Normal 模式：方块
let &t_SR = "\e[4 q"   " Replace 模式：下划线

colorscheme elflord

" === 防止命令大小写误触 ===
cnoreabbrev W w
cnoreabbrev Q q
cnoreabbrev WQ wq
cnoreabbrev Wq wq
cnoreabbrev Wqa wqa
cnoreabbrev Qa qa
cnoreabbrev QA qa

" ==================== 基础快捷键 ====================

let mapleader = " "
map H 0
map L g_
map <C-a> ggvG$
vnoremap <C-c> "+y
nnoremap <C-c> "+yy
inoremap <C-c> <Esc>"+yya
nnoremap <C-s> :w<CR>
inoremap <C-s> <Esc>:w<CR>a
nnoremap <F5> :w<CR>:!python "%"<CR>
nnoremap <A-r> :w<CR>:!python "%"<CR>
nnoremap <leader>a <C-a>
nnoremap <leader>x <C-x>
nnoremap <leader>r :so $MYVIMRC<CR>


" esc取消搜索高亮显示
nnoremap <silent> <Esc> :noh<CR>

" === 分屏切换快捷键 ===
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l

nnoremap <leader>sj :split<CR><C-w>j
nnoremap <leader>sl :vsplit<CR><C-w>l
nnoremap <leader>sw :close<CR>
nnoremap <leader>sq :close<CR>

" === tab 快捷键 ===
nnoremap <leader>tn :tabnew<CR>
nnoremap <leader>tc :tabclose<CR>
nnoremap <leader>th :tabprev<CR>
nnoremap <leader>tl :tabnext<CR>
nnoremap <leader>tm :tabmove<CR>
nnoremap <tab> :tabnext<CR>
nnoremap <s-tab> :tabprev<CR>
" === buffer 快捷键 ===
nnoremap <leader>ba :Buffers<CR>
nnoremap <leader>bh :bprev<CR>
nnoremap <leader>bl :bnext<CR>
nnoremap <leader>bq :bdelete<CR>
nnoremap <leader>bw :bdelete<CR>

" =================== coc.nvim 配置 ===================

nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gr <Plug>(coc-references)
nmap <silent> rn <Plug>(coc-rename)

" === coc.nvim 用 Enter 确认补全 ===
inoremap <silent><expr> <CR> coc#pum#visible() ? coc#pum#confirm() : "\<CR>"

" === Tab 跳候补选项 ===
inoremap <silent><expr> <TAB> coc#pum#visible() ? coc#pum#next(1) : "\<TAB>"
inoremap <silent><expr> <S-TAB> coc#pum#visible() ? coc#pum#prev(1) : "\<S-TAB>"

" === 快捷键：Shift + Alt + F 格式化 ===
nnoremap <silent> <S-M-f> :<C-u>call CocAction('format')<CR>
xnoremap <silent> <S-M-f> :<C-u>call CocAction('format')<CR>gv
inoremap <silent> <S-M-f> <Esc>:<C-u>call CocAction('format')<CR>a

" === 保存时自动格式化 ===
autocmd BufWritePre *.js,*.ts,*.jsx,*.tsx,*.html,*.css,*.json,*.vue,*.md
            \ silent! call CocAction('format')

let g:coc_global_extensions = [
            \ 'coc-snippets',
            \ 'coc-pyright',
            \ 'coc-prettier',
            \ 'coc-json',
            \ 'coc-html',
            \ 'coc-css',
            \ 'coc-tsserver',
            \ 'coc-vimlsp'
            \ ]

" =================== easymotion 配置 ===================

let g:EasyMotion_smartcase = 1    " 忽略大小写
let g:EasyMotion_use_smartsign_us = 1  " 支持 !@#$ 等符号

nmap <Leader>j <Plug>(easymotion-j)
nmap <Leader>k <Plug>(easymotion-k)
nmap J <Plug>(easymotion-j)
nmap K <Plug>(easymotion-k)
nmap W <Plug>(easymotion-w)
nmap <Leader>w <Plug>(easymotion-bd-w)
nmap <Leader>f <Plug>(easymotion-bd-w)

xmap <Leader>j <Plug>(easymotion-j)
xmap <Leader>k <Plug>(easymotion-k)
xmap J <Plug>(easymotion-j)
xmap K <Plug>(easymotion-k)
xmap W <Plug>(easymotion-w)
xmap <Leader>w <Plug>(easymotion-bd-w)
xmap <Leader>f <Plug>(easymotion-bd-w)

" =================== gitgutter 配置 ===================

let g:gitgutter_map_keys = 0    "禁止gitgutter自动生成leader映射

" =================== Markdown 优化 ===================

let g:vim_markdown_folding_disabled = 1
let g:vim_markdown_conceal = 0
nnoremap <leader>mp :MarkdownPreview<CR>
nnoremap <leader>mt :MarkdownPreviewToggle<CR>

" =================== fzf 模糊搜索 ===================

nnoremap <C-p> :Files<CR>

" ================ NERDCommenter 设置 ================

let g:NERDCreateDefaultMappings = 0   " 关闭默认映射
let g:NERDCompactSexyComs = 1         " 紧凑美观
let g:NERDDefaultAlign = 'left'       " 左对齐
let g:NERDCommentEmptyLines = 1       " 空行也注释
let g:NERDTrimTrailingWhitespace = 1  " 自动去尾空格
let g:NERDSpaceDelims = 1

" === 注释：Ctrl+/ 和 空格 c ===
nnoremap <silent> <C-/> <plug>NERDCommenterToggle
inoremap <silent> <C-/> <Esc><plug>NERDCommenterToggle a
xnoremap <silent> <C-/> <plug>NERDCommenterToggle

" ====================== NERDTree =====================

nnoremap <C-n> :NERDTreeToggle<CR>
" nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <leader>n :NERDTreeFind<CR>

let NERDTreeShowHidden=1
let NERDTreeMinimalUI = 1         " 隐藏帮助行（清爽 + 加速渲染）
let NERDTreeWinSize = 32          " 固定宽度（避免 resize 卡顿）
let NERDTreeHighlightCursorline = 1
let g:NERDTreeAutoResize = 1
let g:NERDTreeChDirMode = 2          " 进入目录自动 :cd
let g:NERDTreeShowBookmarks = 1       " 始终显示书签区
autocmd BufWinEnter * if &buftype != 'quickfix' && getcmdwintype() == '' | silent NERDTreeMirror | endif
autocmd BufEnter * if winnr('$') == 1 && exists('b:NERDTree') && b:NERDTree.isTabTree() | call feedkeys(":quit\<CR>:\<BS>") | endif
autocmd BufEnter * if winnr() == winnr('h') && bufname('#') =~ 'NERD_tree_\d\+' && bufname('%') !~ 'NERD_tree_\d\+' && winnr('$') > 1 |
            \ let buf=bufnr() | buffer# | execute "normal! \<C-W>w" | execute 'buffer'.buf | endif

nnoremap <silent> <leader>p :NERDTreeFromBookmark<space>

" =================== 输入法切换 ===================

if has('win32') || has('win64') || has('win16')
    " im-select 路径
    let g:im_select_path = 'C:\software\im-select.exe'  
    " 默认英文输入法（1033 = 英语（美国））
    let g:default_im = '1033'

    " 切换到英文输入法
    function! IM_ToEnglish()
        if filereadable(g:im_select_path)
            call system(g:im_select_path . ' ' . g:default_im)
        endif
    endfunction

    " 离开插入模式 → 强制切英文
    autocmd InsertLeave * call IM_ToEnglish()
    " autocmd InsertEnter * call system(g:im_select_path . ' restore')

    " Vim 启动时也切回英文 离开切回中文
    autocmd VimEnter * call IM_ToEnglish()
    autocmd VimLeave * call system(g:im_select_path . ' restore')
endif

" =================== vim-startify 配置 ===================
" 自定义启动页面
let g:startify_session_dir = $HOME . '/vimfiles/session'
let g:startify_session_autoload = 1
let g:startify_session_persistence = 1
let g:startify_session_delete_buffers = 1
let g:startify_change_to_vcs_root = 1
let g:startify_padding_left = 4

let g:startify_custom_header = [
            \ '   Welcome back! ' . strftime("%Y-%m-%d %H:%M"),
            \ ]


" 自动增加NERDTree的Bookmarks
if has('win32') || has('win64')
    " Windows: NERDTree 书签文件在 %USERPROFILE%\.NERDTreeBookmarks
    let s:bookmark_file = expand('$USERPROFILE\.NERDTreeBookmarks')

    if filereadable(s:bookmark_file)
        " 读取所有行
        let lines = readfile(s:bookmark_file)
        " 过滤掉注释行和空行，提取路径（每行格式：BOOKMARKNAME PATH）
        let g:startify_bookmarks = []
        for line in lines
            if line !~ '^#' && line !~ '^\s*$' && line =~ '\s'
                let parts = split(line)
                if len(parts) >= 2
                    " 拼接从第2个字段开始的所有部分（路径可能含空格）
                    let path = join(parts[1:], ' ')
                    call add(g:startify_bookmarks, path)
                endif
            endif
        endfor
    else
        " Unix-like 系统保持原逻辑
        let g:startify_bookmarks = systemlist("cut -sd' ' -f 2- ~/.NERDTreeBookmarks")
    endif
endif

" 获取 ~/project 内容
let s:max_files_amount = 100
let s:project_path = '~/project'

function! s:list_files_project_directory(...) abort
    let l:file_amount = get(a:, 1, s:max_files_amount)

    if l:file_amount > s:max_files_amount
        let l:file_amount = s:max_files_amount
    elseif l:file_amount <= 0
        let l:file_amount = 1
    endif

    let l:all_files = split(globpath(s:project_path, '*'), '\n')
    return map(l:all_files[:l:file_amount-1], '{"line": v:val, "cmd": "edit " . v:val }')
endfunction

" 自定义命令列表
let g:startify_commands = [
            \ { 'c': ['Vim Config', ':e $MYVIMRC'] },
            \ ]

" 自定义显示列表
let g:startify_lists = [
            \ { 'type': function('s:list_files_project_directory', [20]),'header': ['   ~/project'],},
            \ { 'type': 'bookmarks', 'header': ['   Bookmarks'] },
            \ { 'type': 'files',     'header': ['   Recent Files'] },
            \ { 'type': 'dir',       'header': ['   Current Dir '. getcwd()] },
            \ { 'type': 'commands',  'header': ['   Commands']},
            \ ]

" 启动时自动进入 Startify（仅当无参数启动）
autocmd VimEnter *
            \   if !argc()
            \ |   Startify
```

## 快捷键

### 通用设置

- `mapleader` = ` `（空格）

### 基础移动与编辑

- `H` → 跳到行首（Normal）
- `L` → 跳到行尾非空白字符（Normal）

### 保存与运行

- `<C-s>` → 保存文件（Normal / Insert）
- `<F5>` → 保存并运行当前 Python 文件（Normal）

### 系统剪贴板集成

- `<C-c>`
  - Normal：复制整行
  - Visual：复制选区
  - Insert：复制当前行后回到插入模式

### 搜索与清除

- `<Esc>` → 取消搜索高亮（Normal）

### 窗口（分屏）管理

- `<C-h>` / `<C-j>` / `<C-k>` / `<C-l>` → 窗口左/下/上/右移动（Normal）
- `<leader>sj` → 水平分屏（`:split`）
- `<leader>sl` → 垂直分屏（`:vsplit`）
- `<leader>sw` → 关闭当前窗口（`:close`）

### Tab 页管理

- `<Tab>` → 切换到下一个 tab（Normal）
- `<S-Tab>` → ❗当前同 `<Tab>`（建议改为 `:tabprev`）
- `<leader>tn` → 新建 tab
- `<leader>tc` → 关闭当前 tab
- `<leader>th` → 上一个 tab
- `<leader>tl` → 下一个 tab
- `<leader>tm` → 交互式移动 tab

### Buffer 切换

- `<leader>h` → 下一个 buffer（`:bnext`）
- `<leader>l` → 上一个 buffer（`:bprev`）

### 快捷操作（Leader 命令）

- `<leader>a` → 全选（`ggvG$`）
- `<leader>x` → 递减数字（`<C-x>`，Normal 模式）

### 注释（NERDCommenter）

- `<C-/>`
  - Normal：切换当前行注释
  - Visual：切换选中行注释
  - Insert：注释当前行后回到插入模式

### NERDTree 文件树

- `<C-n>` → 打开/关闭 NERDTree
- `<leader>n` → 聚焦 NERDTree 窗口
- `<leader>p` → 从书签打开文件（需交互输入）

### 模糊搜索（fzf.vim）

- `<C-p>` → 模糊搜索文件（`:Files`）

### Markdown 预览

- `<leader>mp` → 打开预览
- `<leader>mt` → 切换预览开关

### coc.nvim（LSP/补全/格式化）

- `gd` → 跳转到定义
- `gr` → 查找引用
- `rn` → 重命名符号
- `<CR>`（Insert）→ 补全可见时确认，否则换行
- `<Tab>` / `<S-Tab>`（Insert）→ 补全项下移 / 上移
- `<S-M-f>`（Shift+Alt+F）→ 格式化
  - Normal：全文
  - Visual：选中区域
  - Insert：全文并回到插入模式

## 插件

- coc.nvim：LSP 智能补全/跳转/格式化
- SimpylFold：Python 语法感知折叠
- vim-surround：快速修改/添加/删除引号、括号等包围符
- fzf + fzf.vim：高性能模糊搜索（文件/Buffer/Grep）
- NERDTree：文件树浏览器
- vim-gitgutter：行侧 Git 修改标记（新增/修改/删除）
- NERDCommenter：多语言智能注释/取消注释
- vim-markdown：增强 Markdown 语法高亮
- markdown-preview.nvim：Markdown 实时预览
- vim-fugitive：Git 命令集成
- vim-easymotion：快速跳转
- vim-startify：定制启动页

