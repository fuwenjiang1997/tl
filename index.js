#!/usr/bin/env node

import { Command } from 'commander'
import { readFile } from 'fs/promises'
import createGotplHtml from './command/createGotplhtml.js'
import randomCharts from './command/randomCharts.js'
import gitpush from './command/gitpush.js'

// options
import lsAll from './options/lsAll.js'

const packageJson = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url))
)

export const program = new Command()

program.version(packageJson.version, '-v, --version', 'cli的最新版本')

// program.option('-d, --debug', '调试一下').action((options) => {
//   if (options.debug) {
//     console.log('调试成功')
//   }
// })

program
  .name('command')
  .version('0.0.1')
  .command('create <project-name>', '创建项目')

// options
lsAll(program)

// command
createGotplHtml(program)
randomCharts(program)
gitpush(program)

program.parse(process.argv)
