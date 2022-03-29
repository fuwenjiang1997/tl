import chalk from 'chalk'
import child_process from 'child_process'

const { exec } = child_process

export default function (program) {
  program
    .command('gitreset')
    .description('执行回退到上一个版本')
    .action(async () => {
      try {
        await exec('git add .')
        const { error, stdout } = await exec('git reset --hard HEAD')
        if (error) {
          console.log('error: ', chalk.red(err))
        }
        if (stdout) {
          console.log(chalk.blue(`${data}`))
        }
      } catch (err) {
        console.log(chalk.red(`err: ${err}`))
      }
    })
}
