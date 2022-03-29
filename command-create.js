#!/usr/bin/env node

const inquirer = require('inquirer')

let prompList = [
  {
    type: 'input', // 密码为密文输入
    message: '项目名称：',
    name: 'projectName',
    default: 'newProject',
  },
  {
    type: 'list',
    name: 'template',
    message: '请选择你想要的小动物？',
    choices: [
      {
        key: 'a',
        name: 'Cat',
        value: 'cat',
      },
      {
        key: 'b',
        name: 'Dog',
        value: 'dog',
      },
      {
        key: 'c',
        name: 'Pig',
        value: 'pig',
      },
    ],
  },
  {
    type: 'checkbox',
    message: '选择颜色:',
    name: 'color',
    choices: [
      {
        name: 'red',
      },
      // new inquirer.Separator(), // 添加分隔符
      {
        name: 'blur',
        checked: true, // 默认选中
      },
      {
        name: 'green',
      },
      // new inquirer.Separator("--- 分隔符 ---"), // 自定义分隔符
    ],
  },
  {
    type: 'password', // 密码为密文输入
    message: '请输入密码：',
    name: 'pwd',
  },
]

inquirer.prompt(prompList).then((answers) => {
  console.log(answers) // 返回的结果
})
