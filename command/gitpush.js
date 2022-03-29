#!/usr/bin/env node

import child_process from 'child_process'
import util from 'util'
import chalk from 'chalk'

const exec = util.promisify(child_process.exec)

function handleResult({ error, stdout, stderr }) {
  if (error) {
    console.error(`exec error: ${chalk.red(error)}`)
    return false
  }
  if (stderr) {
    console.error(`stderr: ${chalk.red(stderr)}`)
  }
  console.log(chalk.green(stdout))
  return true
}

export default function gitpush(program) {
  program
    .command('gitpush <commitDesc>')
    .description('执行git add/commit/push到服务器')
    .action(async (commitDesc) => {
      try {
        handleResult(await exec('git add . ')) &&
          handleResult(await exec(`git commit -m "${commitDesc}"`)) &&
          handleResult(await exec('git push'))
      } catch (err) {
        console.error(`exec err: ${chalk.red(err)}`)
      }
    })
}
