import chalk from 'chalk'
import { handleExeRes, exec } from '../utils.js'

export default function (program) {
  program
    .command('gitreset')
    .description('执行回退到上一个版本')
    .action(async () => {
      try {
        await exec('git checkout .') // 解决未add的情况下不能reset
        handleExeRes(await exec('git reset --hard HEAD'))
      } catch (err) {
        console.log(chalk.red(`err: ${err}`))
      }
    })
}
