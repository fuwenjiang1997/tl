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
        value: 'https://github.com/fuwenjiang1997/web-admin-template-antd.git',
      },
      {
        key: 'b',
        name: 'vue3.3+eslint+prettire+pinia+vueRouter+arco+tailwind',
        value: 'https://github.com/fuwenjiang1997/web-admin-template-arco.git',
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
        if (answers.type === 'web') {
          const { template: gitPath } = answers
          await exec(`git clone ${gitPath} ${projectName}`)

          exec(`rm -rf ./${projectName}/.git`)

          replaceFileContent(
            `./${projectName}/package.json`,
            /"name": "\S+"/g,
            `"name": "${projectName}"`
          )

          console.log(`cd ${projectName}`)
          console.log(`pnpm install`)
          console.log(`pnpm run dev`)
        }
      })
    })
}
