#!/usr/bin/env node

import { Command } from 'commander'
import { readFile } from 'fs/promises'

const program = new Command()

const packageJson = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url))
)

program.version(packageJson.version, '-v, --version', 'cli的最新版本')

try {
  const commandFiles = [
    'createGotplhtml',
    'createProject',
    'gitNewBranch',
    'gitPush',
    'gitreset',
    'gitStash',
    'randomCharts',
  ]
  for (let i = 0; i < commandFiles.length; i++) {
    const fileName = commandFiles[i]
    let model = await import(`./command/${fileName}.js`)
    if (typeof model?.default === 'function') {
      model.default(program)
    }
  }

  // 自动导入添加options
  // await fs.promises.readdir(path.join('options'))
  const optionFiles = ['lsAll']
  for (let i = 0; i < optionFiles.length; i++) {
    const fileName = optionFiles[i]
    let model = await import(`./options/${fileName}.js`)
    model.default(program)
  }
} catch (err) {
  console.log('import err: ?>>>> ', err)
}
program.parse(process.argv)
