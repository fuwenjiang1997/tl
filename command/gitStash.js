import chalk from 'chalk'
import child_process from 'child_process'
import util from 'util'
import { handleExeRes } from '../utils.js'

const exec = util.promisify(child_process.exec)

// 暂存当前的修改，并切换到其它分支（如果有branch传入的话）
export default function (program) {
  program
    .command('gitstash <message> [branchName]')
    .description('本地暂存当前的修改，并切换到branchName分支')
    .action(async (message, branchName) => {
      try {
        await exec(`git stash save -u ${message}`)
        if (branchName) {
          handleExeRes(await exec(`git branch ${branchName}`))
        }
      } catch (err) {
        console.log(chalk.red(`err: ${err}`))
      }
    })
}
