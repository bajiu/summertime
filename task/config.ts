// import path from 'path'

const path = require('path');
const chalk = require('chalk')

export const paths = {
  root: path.join(__dirname, '../'),
  lib: path.join(__dirname, '../lib'),
}

export const log = {
  progress: (text: string) => {
    console.log(chalk.green(text))
  },
  error: (text: string) => {
    console.log(chalk.red(text))
  },
}
