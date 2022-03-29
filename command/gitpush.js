#!/usr/bin/env node

import child_process from 'child_process'
import util from 'util'
const exec = util.promisify(child_process.exec)
// import fs from 'fs'

export default function gitpush(program) {
  program
    .command('gitpush <commitDesc>')
    .description('执行git add/commit/push到服务器')
    .action(async (commitDesc) => {
      let { error, stdout, stderr } = await exec(
        `git add . && git commit -m "${commitDesc}" && git push`
      )
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
      console.log(stdout)
      console.error(`stderr: ${stderr}`)
    })
}
