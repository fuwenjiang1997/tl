import chalk from 'chalk'
import chokidar from 'chokidar'
import { exec, spawn, spawnSync } from 'child_process'
import colors from 'colors'

// 监听文件变化，执行命令
export default function (program) {
  program
    .command('watch')
    .description('执行命令，监听并运行服务')
    .argument('<watchFiles>', 'watchFiles, 监听的文件类型')
    .argument('<run>', 'run command, 运行的命令')
    .action((watchFiles, command) => {
      if (!command) {
        command = watchFiles
        watchFiles = ''
      }

      let filesType = watchFiles.split(',')
      filesType = filesType.map((item) => {
        if (!/^./g.test(item)) {
          return `.${item}`
        }

        return item
      })
      const watcher = chokidar.watch(process.cwd(), {
        ignored: ['**/node_modules/**', '**/.git/**', '**/outputRes/**'],
        persistent: true,
      })

      let subProcess = null
      function runCommand() {
        try {
          exec(command)

          // if (!!subProcess) {
          //   // console.log(process, subProcess.pid)
          //   subProcess.unref()
          //   process.kill(-subProcess.pid)
          // }
          // const runStr =
          //   'gorun picMath/picMathServerEp web -ClusterName Local -IsDevMode true -Addr 127.0.0.1:13579 -SelfIp 127.0.0.1'

          // subProcess = spawn('kmg', runStr.split(' '), {
          //   detached: true,
          //   stdio: 'ignore',
          // })
          // subProcess.stdout.on('data', (data) => {
          //   console.log(`stdout: ${data}`)
          // })
        } catch (error) {
          console.log(error)
        }
      }
      watcher.on('change', (path) => {
        console.log(path, filesType)
        if (filesType.length > 0) {
          const res = filesType.findIndex((item) => path.endsWith(item))
          if (res !== -1) {
            runCommand()
          }
          return
        }
        runCommand()
      })

      runCommand()
    })
}
