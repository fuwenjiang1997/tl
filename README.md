# tl 工具

## 介绍

为了提交开发效率，封装了常用的 shell 命令

## 安装

```shell

git clone https://github.com/bfclouds/tl.git
cd tl
npm i -g

```

## 使用

| 命令            | 介绍                                         | 示例                                                             |
| --------------- | -------------------------------------------- | ---------------------------------------------------------------- |
| tl gitreset     | reset掉当前的修改                            | tl gitreset                                                      |
| tl gitpush      | 省去add/commit等操作，帮助快捷的提交修改     | tl gitpush / tl gitpush 这是commit的注释                         |
| tl gitstash     | 缓存，并切换到其他分支(如果有传入分支名的话) | tl gitstash stash的备注信息 / tl gitstash stash的备注信息 master |
| tl randomCharts | 创建随机字符串，默认长度为12                 | tl randomCharts / tl randomCharts 8                              |
