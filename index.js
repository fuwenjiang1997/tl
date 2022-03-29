#!/usr/bin/env node

import { Command } from 'commander'
import { readFile } from 'fs/promises'
import fs from 'fs'
import path from 'path'

export const program = new Command()

const packageJson = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url))
)

program.version(packageJson.version, '-v, --version', 'cli的最新版本')

try {
  // 自动导入添加command
  const commandFiles = await fs.promises.readdir(path.join('command'))
  for (let i = 0; i < commandFiles.length; i++) {
    const fileName = commandFiles[i]
    let model = await import(`./command/${fileName}`)
    if (typeof model?.default === 'function') {
      model.default(program)
    }
  }

  // 自动导入添加options
  const optionFiles = await fs.promises.readdir(path.join('options'))
  for (let i = 0; i < optionFiles.length; i++) {
    const fileName = optionFiles[i]
    let model = await import(`./options/${fileName}`)
    model.default(program)
  }
} catch (err) {
  console.log('import err: ?>>>> ', err)
}

// command
// createGotplHtml(program)
// randomCharts(program)
// gitpush(program)
// createProject(program)

// program
//   .name('command')
//   .version('0.0.1')
//   .command('create <project-name>', '创建项目')

program.parse(process.argv)
