import { GluegunToolbox, GluegunCommand } from 'gluegun'
import { State } from '../lib/State'
import { Ask } from '../lib/tasks/Ask'
import { CloneRepo } from '../lib/tasks/CloneRepo'
import { InstallPackages } from '../lib/tasks/InstallPackages'
import { ChangeFiles } from '../lib/tasks/ChangeFiles'
import { InitGit } from '../lib/tasks/InitGit'
import { CheckForUpdates } from '../lib/tasks/CheckForUpdates'

const tasks = [
  Ask,
  CloneRepo,
  InstallPackages,
  ChangeFiles,
  InitGit,
  CheckForUpdates
]

const command: GluegunCommand = {
  name: 'create-ts-application',
  alias: ['new'],
  description: 'Generate a new application',
  run: async (toolbox: GluegunToolbox) => {
    const { print, filesystem } = toolbox

    const state = new State()

    for (const Task of tasks) {
      const task = new Task()

      const result = await task.execute({ toolbox, state })

      if (result.type === 'ERROR') {
        print.error(result.message)
        process.exit(1)
      } else if (result.message) {
        print.info(result.message)
      }
    }

    print.info(`Project created in ${filesystem.resolve()}`)
  }
}

module.exports = command
