+++
title = 'GPG Command Cheat Sheet'
date = 2025-08-19T16:47:15+08:00
draft = false
+++
### 前置条件
- Windows: Gpg4win
- Linux: Gnupg

### 常用GPG命令

1. **生成密钥对**：
   ```bash
   gpg --gen-key
   ```

2. **列出密钥**：
   ```bash
   gpg --list-keys
   ```
   显示本地存储的所有公钥。

3. **导出公钥**：
   ```bash
   gpg --export -a "user@example.com" > public_key.asc
   ```
   将公钥导出为ASCII格式文件。

4. **导入公钥**：
   ```bash
   gpg --import public_key.asc
   ```
   导入他人的公钥。

5. **加密文件**：
   ```bash
   gpg --encrypt --recipient "user@example.com" file.txt
   ```
   使用指定接收者的公钥加密文件，生成`file.txt.gpg`。

6. **解密文件**：
   ```bash
   gpg --decrypt file.txt.gpg > file_decrypted.txt
   ```
   使用私钥解密文件，需输入私钥密码。

7. **签名文件**：
   ```bash
   gpg --sign file.txt
   ```
   使用私钥对文件签名，生成`file.txt.gpg`。

8. **验证签名**：
   ```bash
   gpg --verify file.txt.gpg
   ```
   使用公钥验证文件签名。

9. **删除密钥**：
   ```bash
   gpg --delete-key "user@example.com"
   ```
   删除指定公钥。

### 例子：加密和解密一个txt文件
#### 方法一：使用对称加密（密码保护）
对称加密使用单一密码加密和解密。

1. **加密文件**：
    ```bash
    gpg --symmetric example.txt
    ```
   - 提示输入密码。
   - 确认密码后，GPG会生成加密文件`example.txt.gpg`。

2. **解密文件**：
     ```bash
     gpg --decrypt example.txt.gpg > decrypted.txt
     ```
   - 输入加密时使用的密码。
   - 解密后的内容会保存到`decrypted.txt`。

#### 方法二：使用非对称加密（公钥/私钥）
非对称加密使用公钥加密、私钥解密，适合分享给特定接收者。

1. **导出公钥**（分享给加密者）：
   - 运行：
     ```bash
     gpg --export -a "your_email@example.com" > mypublickey.asc
     ```
   - 将`mypublickey.asc`发送给需要加密文件的人。

2. **加密者导入公钥**：
   - 假设你是加密者，接收到对方的公钥文件`mypublickey.asc`，导入：
     ```bash
     gpg --import mypublickey.asc
     ```
   - 验证导入：
     ```bash
     gpg --list-keys
     ```

3. **加密文件**：
   - 使用接收者的公钥加密：
     ```bash
     gpg --encrypt --recipient "receiver_email@example.com" example.txt
     ```
   - 生成加密文件`example.txt.gpg`。
   - 将`example.txt.gpg`发送给接收者。

4. **接收者解密文件**：
   - 接收者使用私钥解密：
     ```bash
     gpg --decrypt example.txt.gpg > decrypted.txt
     ```
   - 输入私钥密码，解密后得到`decrypted.txt`。

#### 高级选项
- **输出指定文件**：加密时指定输出文件名：
  ```bash
  gpg --output encrypted_file.gpg --symmetric example.txt
  ```
- **ASCII格式输出**：生成可读的加密文件（适合邮件传输）：
  ```bash
  gpg --armor --symmetric example.txt
  ```
  输出文件为`example.txt.asc`。
- **签名并加密**：确保文件完整性和来源：
  ```bash
  gpg --encrypt --sign --recipient "receiver_email@example.com" example.txt
  ```