/* eslint-disable import/no-extraneous-dependencies */
import chalk = require('chalk')
import spawn = require('cross-spawn')

interface InstallArgs {
  /**
   * Indicate whether to install packages using Yarn.
   */
  useYarn: boolean
  /**
   * Indicate whether there is an active Internet connection.
   */
  isOnline: boolean
  /**
   * Indicate whether the given dependencies are devDependencies.
   */
  directory: string
}

/**
 * Spawn a package manager installation with either Yarn or NPM.
 *
 * @returns A Promise that resolves once the installation is finished.
 */
export function install({
  useYarn,
  isOnline,
  directory
}: InstallArgs): Promise<void> {
  /**
   * NPM-specific command-line flags.
   */
  const npmFlags: string[] = []
  /**
   * Yarn-specific command-line flags.
   */
  const yarnFlags: string[] = []
  /**
   * Return a Promise that resolves once the installation is finished.
   */
  return new Promise((resolve, reject) => {
    const command = useYarn ? 'yarn' : 'npm'
    const args = ['install']

    /**
     * If there are no dependencies, run a variation of `{displayCommand}
     * install`.
     */
    if (useYarn) {
      if (!isOnline) {
        console.log(chalk.yellow('You appear to be offline.'))
        console.log(chalk.yellow('Falling back to the local Yarn cache.'))
        console.log()
        args.push('--offline')
      }
    } else {
      if (!isOnline) {
        console.log(chalk.yellow('You appear to be offline.'))
        console.log()
      }
    }
    /**
     * Add any package manager-specific flags.
     */
    if (useYarn) {
      args.push(...yarnFlags)
    } else {
      args.push(...npmFlags)
    }
    /**
     * Spawn the installation process.
     */
    console.log(command, args.join(' '))
    const child = spawn(command, args, {
      stdio: 'inherit',
      cwd: directory,
      env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' }
    })
    child.on('close', code => {
      if (code !== 0) {
        reject(new Error(`${command} ${args.join(' ')}`))
        return
      }
      resolve()
    })
  })
}
