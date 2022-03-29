import chalk from 'chalk'
import child_process from 'child_process'
import util from 'util'

const exec = util.promisify(child_process.exec)

export default function (program) {
  program
    .command('gitreset')
    .description('执行回退到上一个版本')
    .action(async () => {
      try {
        await exec('git add .') // 解决未add的情况下不能reset
        const { error, stdout } = await exec('git reset --hard HEAD')
        if (error) {
          console.log('error: ', chalk.red(error))
        }
        if (stdout) {
          console.log(chalk.blue(`${stdout}`))
        }
      } catch (err) {
        console.log(chalk.red(`err: ${err}`))
      }
    })
}
