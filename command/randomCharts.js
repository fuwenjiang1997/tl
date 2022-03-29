#!/usr/bin/env node

import { randomString } from '../utils.js'
import chalk from 'chalk'

export default function (program) {
  program
    .command('randomCharts [length]')
    .description('生成一个随机字符串，默认12位')
    .action(async (len) => {
      const lenVal = Number.isInteger(len * 1) ? len * 1 : undefined
      console.log(chalk.blue(randomString(lenVal)))
    })
}
