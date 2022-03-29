import chalk from 'chalk'
import child_process from 'child_process'
import util from 'util'

const exec = util.promisify(child_process.exec)

export default function (program) {
  program
    .command('gitnewbranch <branchName>')
    .description('基于当前分支创建新分支')
    .action(async () => {
      try {
        // todo
      } catch (err) {
        console.log(chalk.red(`err: ${err}`))
      }
    })
}
