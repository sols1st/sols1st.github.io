+++
title = 'ipod touch 4 draft'
date = 2026-02-16T13:41:34+08:00
draft = true
+++
在手机城闲逛，偶然在一个摊位看到一台ipod，让老板拿出来看看，拿到手上就感觉非常轻薄和精致。屏幕和系统与iphone4大概是一样的，机身薄与小很多，且背面成弧形。点亮屏幕，屏幕清晰度出乎意料的高，丝毫没有2010年设备的感觉，在如今还是看不到像素点，色彩也是非常漂亮。
## 设备概况
机型：ipod touch 4 8gb
系统：ios 6.1.6

## 登录iCloud
到手后尝试登录iCloud发现弹窗要求输入二步验证的验证码，另一台设备确实收到了验证码，但ipod上没有弹出验证码输入的窗口。而后搜索得知，获取验证码后，再一次登录时把二步验证的验证码加到密码后面就可登录成功。

登录icloud之后可以同步日历，设置里勾选了同步备忘录，safari，文稿等等，实际上都没有效果，只有日历被同步。

但通过qq邮箱账户同步的备忘录可以同步。

## 越狱
爱思助手不支持ios6.1.6的越狱，也做不到方便的降级。在别处发现有提供支持ios6.1.6的越狱工具以及iTunes版本，但在我的 windows10 主机上安装之后，该版本的iTunes不能识别到ipod。在教程里有提到使用 windows7 就可以识别到ipod7，于是我在 https://massgrave.dev/windows_7_links 中找到了windows7的下载直连，在hyper-v装了windows7，装完后发现hyper-v不支持连接ipod这种外设，只能当做硬盘连接。最后还是下载了Vmware，Vmware被高通收购之后注册账号就可以免费个人使用。注册账号的时候我尝试了qq邮箱和outlook邮箱，都收不到验证码，我搜索发现没有别人遇到这个问题，最后我用了google邮箱才成功收到验证码注册成功。在vmware中安装windows7与相关工具之后，成功识别到了我的ipod，越狱工具自动一条龙完成了，中间ipod重启之后vm可能不会自动重连到ipod上，要手动连接一下。
参考资料：
https://www.bilibili.com/read/cv11640583/
https://www.bilibili.com/video/BV12HAfeCEHN/


## 越狱之后
越狱之后进入手机中的cydia发现显示服务器证书无效，找到了解决方案：
访问该链接 https://tlsroot.litten.ca/ 下载证书后，cydia正常可用。
但要安装第三方ipa包还需要app sync这个插件，在各种源中找到的该插件现行版本对ios6支持不好，安装之后也不能成功安装ipa文件，而后在一篇帖子看到还要装一个app sync for ios6，发现这个cydia源中有 http://apt.gs/，添加好源后安装好里面的app sync和app sync for ios6，通过爱思助手安装ipa文件成功。
参考资料:
https://www.reddit.com/r/jailbreak/comments/4zh8d4/question_help_cydia_unable_to_load_certificate

## 软件安装
网上找到的大部分ipa资源网站，不是停止运营了就是付费，下面有几个好用的。
### iosipa软件网
https://www.88ipa.com/
资源特别多和全 就是要积分 但送的积分很多

### archive
https://archive.org/
资源很多 但不太好搜
https://archive.org/details/ios_40_42_ipa
这个链接收录了非常多ios4可用的ipa游戏

### IPA 软件资源归档
https://ipa.gistwillan.top/
也不太好搜 资源收集的范围有点奇怪

## 效果图

