import child_process from 'child_process'
import chalk from 'chalk'
import util from 'util'
import fs from 'fs'

export function randomString(e) {
  e = e || 12
  var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length,
    n = ''
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}

export function handleExeRes(error, stdout) {
  if (error) {
    console.log('error: ', chalk.red(error))
  }
  if (stdout) {
    console.log(chalk.blue(`${stdout}`))
  }
}

export const exec = util.promisify(child_process.exec)

export function replaceFileContent(filePath, regOrOldContent, newContent) {
  try {
    const content = fs.readFileSync(filePath)
    const data = content.toString().replaceAll(regOrOldContent, newContent)
    fs.writeFileSync(filePath, data)
  } catch (error) {
    console.error(`replaceFileContent error: ${chalk.red(error)}`)
  }
}
