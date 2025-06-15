+++
title = 'LFS-r12.3-systemd Installation'
date = 2025-06-10T10:56:27+08:00
draft = false
+++
Only issues and custom content are logged.

## Environment
- LFS: [r12.3-68-systemd](https://www.linuxfromscratch.org/lfs/view/systemd)
- Host OS: debian-12.11.0
- VM: Hyper-V (Generation 2 without Secure Boot)

## Partitioning
|Device|Size|Type|Description|
|-|-|-|-|
|/dev/sda1|200MB|EFI|EFI System|
|/dev/sda2|200MB|ext2|/boot|
|/dev/sda3|2GB|swap|swap|
|/dev/sda4|18.6G|ext4|debian|
|/dev/sda5|29.1G|ext4|lfs|

## Preparing the Host System
``` sh
sudo apt update && sudo apt upgrade
sudo apt install build-essential bison gawk
```
Then run ```version-check.sh``` to check the requirement and satisfy all requirement.

## Download packages and patches
To download all of the packages and patches by using wget-list-sysv as an input to the wget command line :
```sh
# ustc mirror
wget --input-file=https://mirrors.ustc.edu.cn/lfs/lfs-packages/12.3-rc2/ --continue --directory-prefix=$LFS/sources
```
Read the [security advisories](https://www.linuxfromscratch.org/lfs/advisories/) to figure out if a newer version of any package should be used to avoid security vulnerabilities.

Security advisories for 12.3 until 2025.06.06
- coreutils-9.7
- Expat-2.7.1
- Perl-5.40.2
- Python-3.13.4
- systemd-257.6
- xz-5.8.1

Patches associated also updated

However, when I checked the online manual, I found that many software packages had been updated, and I followed the latest updates mostly.

## Compiling Tools
For convenience, use a alias to extract tar file and enter the directory :
```sh
alias t='function _t() { tar -xf "$1" && cd "$(tar -tf "$1" | head -n 1 | cut -d"/" -f1)"; }; _t'
```
When compiling GCC, I encountered many 'Out of Memory' errors, with both hard disk and memory usage reaching 100% in my real machine. I believe the 100% disk usage was due to excessive swap partition activity caused by memory overflow. To address this, I configured Hyper-V to use a fixed 8GB of memory and limited it to 4 cores, compiled following packages with 4 threads.

## Entering Chroot
If leave this environment, Virtual Kernel File Systems should be mounted again.
```sh
mount -v --bind /dev $LFS/dev

mount -vt devpts devpts -o gid=5,mode=0620 $LFS/dev/pts
mount -vt proc proc $LFS/proc
mount -vt sysfs sysfs $LFS/sys
mount -vt tmpfs tmpfs $LFS/run

if [ -h $LFS/dev/shm ]; then
  install -v -d -m 1777 $LFS$(realpath /dev/shm)
else
  mount -vt tmpfs -o nosuid,nodev tmpfs $LFS/dev/shm
fi
```
Enter the chroot environment:
```bash
chroot "$LFS" /usr/bin/env -i   \
    HOME=/root                  \
    TERM="$TERM"                \
    PS1='(lfs chroot) \u:\w\$ ' \
    PATH=/usr/bin:/usr/sbin     \
    MAKEFLAGS="-j$(nproc)"      \
    TESTSUITEFLAGS="-j$(nproc)" \
    /bin/bash --login
```
Argument `MAKEFLAGS="-j$(nproc)"` means when running make with all cores.
## Installing Basic System Software
When compiling ncureses, error associated with c++ libs in /usr/include occurred, I got solution [here](https://gitlab.archlinux.org/archlinux/packaging/packages/ncurses/-/issues/3) :
```sh
export CFLAGS="$CFLAGS -std=gnu17"
``` 
Many other errors are caused by update, following the latest updates can solve most of them.

## Installation of the kernel
The path to the kernel image may vary depending on the platform being used. I compiled it on x86_64, but the kernel image is still in x86 directory.
``` sh
cp -iv arch/x86/boot/bzImage /boot/vmlinuz-6.14.6-lfs-r12.3-68-systemd
```

## Creating the /etc/fstab File
My `/etc/fstab` file:
```
# Begin /etc/fstab

# / was on /dev/sda5
UUID=deafecd3-6ad3-4227-8020-e1b0ea2fb6f6 /     ext4    errors=remount-ro 0     1
# /boot was on /dev/sda2 during installation
UUID=5b136400-72a8-46dd-afdd-c2bc387de255 /boot           ext2    defaults        0       2
# /boot/efi was on /dev/sda1 during installation
UUID=75C3-45EF  /boot/efi       vfat    umask=0077      0       1
# swap was on /dev/sda3 during installation
UUID=15b914a8-8073-43b6-a0d0-0206ddc5f43b none            swap    sw              0       0
/dev/sr0        /media/cdrom0   udf,iso9660 user,noauto     0       0

# End /etc/fstab
```
## Using GRUB to Set Up the Boot Process with UEFI
Just following the [BLF manuel page](https://www.linuxfromscratch.org/blfs/view/systemd/postlfs/grub-setup.html) is correct. I wasted much time to figure out why kernel panic happens when booting the system.I edited `grub.cfg` again and again but kernel panic still occurred, then finally found it caused by copying wrong kernel image file after compiling.

My `grub.cfg` file : 
```
# Begin /boot/grub/grub.cfg
set default=0
set timeout=5
insmod part_gpt
insmod ext2
insmod fat
insmod efi_gop
insmod efi_uga

set root=(hd0,gpt5)

menuentry "Linux From Scratch 12.3-systemd" {
    set root=(hd0,gpt2)
    linux /vmlinuz-6.14.6-lfs-r12.3-68-systemd root=/dev/sda5 ro
}

menuentry "debian" {
    set root=(hd0,gpt4)
    linux (hd0,gpt2)/vmlinuz-6.1.0-37-amd64 root=/dev/sda4 ro
    initrd (hd0,gpt2)/initrd.img-6.1.0-37-amd64
}

menuentry "Firmware Setup" {
  fwsetup
}

# End /boot/grub/grub.cfg
```
## Network Setting
After successfully booting the system, I discovered that there was no network connectivity. Running `ip link` revealed that the `eth0` network interface was missing, with only the `lo` interface present.

To enable Hyper-V networking support in LFS:
``` sh
make menuconfig  # Enable: Device Drivers → Network → Microsoft Hyper-V Network
make && make modules_install
modprobe hv_netvsc
```
I tried to not reboot, but it doesn't work. I then replaced the old kernel image with the newly compiled one and rebooted the system, which finally works.