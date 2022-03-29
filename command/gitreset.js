import chalk from 'chalk'
import child_process from 'child_process'

const { spawn } = child_process

export default function (program) {
  program
    .command('gitreset')
    .description('执行回退到上一个版本')
    .action(() => {
      try {
        const gitreset = spawn('git reset', ['--hard', 'HEAD'], {
          shell: true,
        })
        gitreset.stdout.on('data', (data) => {
          console.log(chalk.blue(`${data}`))
        })
        gitreset.stderr.on('data', (err) => {
          console.log('stderr: ', chalk.red(err))
        })
        gitreset.on('error', (err) => {
          console.log('error: ', chalk.red(err))
        })
        gitreset.on('close', (code) => {
          console.log(`child process exited with code ${code}`)
        })
      } catch (err) {
        console.log(chalk.red(`err: ${err}`))
      }
    })
}
