#!/usr/bin/env node

import fs from 'fs'
import chalk from 'chalk'

export default function (program) {
  program
    .command('createGotplhtml')
    .description('生成一个gotplhtml文件')
    .argument('<packageName>', 'packageName, 包名')
    .argument('<fnName>', 'fnName, 函数名')
    .action(async (packageName, fnName) => {
      const str = `<?
package ${packageName}

import (
    "github.com/bronze1man/kmg/kmgNet/kmgHttp"
)

func ${fnName}(ctx *kmgHttp.Context) string {
?>
  <div>${fnName}文件</div>
<?}?>
`
      const tplFileName = `${fnName}.gotplhtml`
      fs.access(tplFileName, fs.constants.F_OK, (err) => {
        // 如果存在就添加gotplhtml文件
        if (err) {
          fs.writeFile(tplFileName, str, 'utf8', () => {
            console.log(chalk.green(`添加 ${tplFileName} 成功！`))
          })
        } else {
          console.log(chalk.red(`${tplFileName} 已存在!`))
        }
      })
    })
}
