import chalk from 'chalk'

export default function (program) {
  program.command('gitreset').action(() => {
    try {
      const gitreset = spawn('git reset', ['HEAD^'], {
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
