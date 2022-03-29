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
