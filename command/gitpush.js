import child_process from 'child_process'
import util from 'util'
import chalk from 'chalk'

const exec = util.promisify(child_process.exec)
const { spawn } = child_process

function handleResult({ error, stdout }) {
  if (!error && !stdout) {
    return true
  }
  console.log('\n', '-------------------分  割  线--------------------', '\n')
  if (error) {
    console.error(`exec error: ${chalk.red(error)}`)
    return false
  }
  console.log(chalk.green(stdout))
  return true
}

export default function (program) {
  program
    .command('gitpush [commitDesc]')
    .description('执行git add/commit/push到服务器')
    .action(async (commitDesc = '默认提交') => {
      try {
        let { error, stdout } = await exec('git status')
        if (error) {
          console.error(`exec error: ${chalk.red(error)}`)
        } else {
          const regRes = [...stdout.matchAll(/\n\n(\s|\S)*?\n\n/gi)]
          let changeFilesStr = regRes[0][0]
          if (changeFilesStr) {
            changeFilesStr = changeFilesStr.replace(/\n\n/g, '')
            const onBranchStr = stdout.match(/^(On branch \S+)\n/gi)[0]
            console.log(
              '\n',
              '-------------------分  割  线--------------------'
            )
            console.log('\n', onBranchStr)
            console.log(chalk.red(changeFilesStr))
            if (regRes[1]?.[0]) {
              console.log('\n\tadd:\n')
              const str = regRes[1][0].replace(/\n\n/g, '')
              console.log(chalk.red(str))
            }
          }
        }

        handleResult(await exec('git add . ')) &&
          handleResult(await exec(`git commit -m "${commitDesc}"`))

        console.log(
          '\n',
          '-------------------分  割  线--------------------',
          '\n'
        )

        const push = spawn('git push', {
          shell: true,
        })
        push.stdout.on('data', (data) => {
          console.log(chalk.blue(`${data}`))
        })
        push.stderr.on('data', (err) => {
          // console.log('stderr: ', chalk.red(err))
        })
        push.on('error', (err) => {
          console.log('error: ', chalk.red(err))
        })
        push.on('close', (code) => {
          console.log(`child process exited with code ${code}`)
        })
      } catch (err) {
        console.error(`exec err: ${chalk.red(err)}`)
      }
    })
}
