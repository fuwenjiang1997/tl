#!/usr/bin/env node

import { Command } from 'commander'
import { randomString } from './utils.js'
import chalk from 'chalk'

console.log(chalk)

const program = new Command()
program.parse(process.argv)

let len = 12
const options = program.args

if (options[0] && Number.isInteger(options[0] * 1)) {
  len = options[0]
}

console.log(chalk.blue(randomString(len)))
