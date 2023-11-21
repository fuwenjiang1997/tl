import inquirer from 'inquirer'
import { exec, replaceFileContent } from '../utils.js'

const prompList = [
  {
    type: 'list',
    name: 'type',
    message: '请选择项目类型',
    choices: [
      {
        key: 'web',
        name: 'web',
        value: 'web',
      },
    ],
  },
  {
    type: 'list',
    name: 'template',
    message: '请选择模版',
    choices: [
      {
        key: 'a',
        name: 'vue3.3+eslint+prettire+pinia+vueRouter+antd+tailwind',
        value: 'vue3-web-admin',
      },
    ],
  },
]

export default function (program) {
  program
    .command('create [projectName]')
    .description('创建新项目')
    .action((projectName) => {
      if (!projectName) {
        prompList.unshift({
          type: 'input',
          message: '项目名称：',
          name: 'projectName',
          default: 'newProject',
        })
      }

      inquirer.prompt(prompList).then(async (answers) => {
        console.log() // 返回的结果，做处理
        if (answers.type === 'web') {
          await exec(
            `git clone https://github.com/fuwenjiang1997/web-admin-template.git ${projectName}`
          )

          exec(`rm -rf ./${projectName}/.git`)

          replaceFileContent(
            `./${projectName}/package.json`,
            `"name": "web-admin"`,
            `"name": "${projectName}"`
          )
        }
      })
    })
}
