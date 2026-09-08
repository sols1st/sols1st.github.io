#!/bin/bash
PUBLIC_KEY_URL="https://solsist.me/keys/ssh-keys.txt"

TEMP_FILE="/tmp/ssh_keys_download_$$"

die() {
    echo "错误: $*" >&2
    exit 1
}

command -v curl >/dev/null 2>&1 || command -v wget >/dev/null 2>&1 || \
    die "本脚本需要 curl 或 wget，请先安装其中之一。"

echo "正在从 $PUBLIC_KEY_URL 下载公钥..."
if command -v curl >/dev/null 2>&1; then
    curl -sSL -o "$TEMP_FILE" "$PUBLIC_KEY_URL" || die "下载失败（curl）"
else
    wget -q -O "$TEMP_FILE" "$PUBLIC_KEY_URL" || die "下载失败（wget）"
fi

if [ ! -s "$TEMP_FILE" ]; then
    die "下载的文件为空，请检查 URL 是否正确。"
fi

if ! grep -qE '^ssh-(rsa|dss|ed25519|ecdsa)' "$TEMP_FILE"; then
    die "下载的文件中未找到有效的 SSH 公钥（以 ssh-rsa/ssh-ed25519 等开头）。"
fi

mkdir -p ~/.ssh || die "无法创建 ~/.ssh 目录"
chmod 700 ~/.ssh

AUTH_KEYS="$HOME/.ssh/authorized_keys"
touch "$AUTH_KEYS" || die "无法创建/写入 $AUTH_KEYS"
chmod 600 "$AUTH_KEYS"

added_count=0
while IFS= read -r line; do
    [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue

    if grep -Fxq "$line" "$AUTH_KEYS"; then
        echo "公钥已存在，跳过: ${line:0:60}..."
    else
        echo "$line" >> "$AUTH_KEYS"
        echo "已添加新公钥: ${line:0:60}..."
        ((added_count++))
    fi
done < "$TEMP_FILE"

rm -f "$TEMP_FILE"

if [ $added_count -eq 0 ]; then
    echo "没有新的公钥被添加（所有密钥已存在）。"
else
    echo "成功添加了 $added_count 个新公钥到 $AUTH_KEYS"
fi

echo "操作完成。"