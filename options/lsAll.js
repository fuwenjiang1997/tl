#!/usr/bin/env node

import child_process from 'child_process'
const { spawn } = child_process

export default function lsAll(program) {
  program.option('-l, --ls', '当前目录列表').action(() => {
    try {
      const lsAl = spawn('ls', ['-al'])
      lsAl.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
      })

      lsAl.stderr.on('data', (err) => {
        console.log(err)
      })

      lsAl.on('error', (err) => {
        console.error('err: ', err)
      })

      lsAl.on('close', (code) => {
        if (code !== 0) {
          console.log(`grep process exited with code ${code}`)
        }
      })
    } catch (err) {
      console.log(err)
    }
  })
}
