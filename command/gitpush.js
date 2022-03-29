#!/usr/bin/env node

import child_process from 'child_process'
import util from 'util'
import chalk from 'chalk'

const exec = util.promisify(child_process.exec)
const { spawn } = child_process

function handleResult({ error, stdout }) {
  if (!error && !stdout) {
    return true
  }
  console.log('\n', '-------------------分  割  线--------------------')
  if (error) {
    console.error(`exec error: ${chalk.red(error)}`)
    return false
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
        let { error, stdout } = await exec('git status')
        if (error) {
          console.error(`exec error: ${chalk.red(error)}`)
        } else {
          let changeFilesStr = stdout.match(/\n\n(\s|\S)*?\n\n/gi)?.[0]
          if (changeFilesStr) {
            changeFilesStr = changeFilesStr.replaceAll('\n\n', '')
            const onBranchStr = stdout.match(/^(On branch \S+)\n/gi)[0]
            console.log(
              '\n',
              '-------------------分  割  线--------------------'
            )
            console.log('\n', onBranchStr)
            console.log(chalk.red(changeFilesStr))
          }
        }

        handleResult(await exec('git add . ')) &&
          handleResult(await exec(`git commit -m "${commitDesc}"`))

        const push = spawn('git push', {
          shell: true,
        })
        push.stdout.on('data', (data) => {
          console.log(data)
        })
        push.stdout.on('error', (err) => {
          console.log(console.log(chalk.red(err)))
        })
        push.on('close', (code) => {
          console.log(`child process exited with code ${code}`)
        })
      } catch (err) {
        console.error(`exec err: ${chalk.red(err)}`)
      }
    })
}
