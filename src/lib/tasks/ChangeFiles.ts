import { Task, TaskDataExecute, TaskDataExecuteReturns } from '../Task'
import ini = require('ini')

export class ChangeFiles implements Task {
  name = 'change-files'
  async execute({
    state,
    toolbox
  }: TaskDataExecute): Promise<TaskDataExecuteReturns> {
    try {
      const { resolve, readAsync, isFile, writeAsync } = toolbox.filesystem
      const name = state.get('project_name')
      const directory = resolve(name)
      const packageJSONFile = await readAsync(
        resolve(directory, 'package.json')
      )
      const packageJSON = JSON.parse(packageJSONFile)

      const homeDirectory =
        process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE

      const gitConfigDirectory = resolve(homeDirectory, '.gitconfig')
      const gitConfigIsFile = isFile(gitConfigDirectory)
      if (gitConfigIsFile) {
        const gitConfigFile = await readAsync(gitConfigDirectory)
        const gitConfig = ini.parse(gitConfigFile)
        packageJSON.author = `${gitConfig.user.name} <${gitConfig.user.email}>`
      }

      packageJSON.name = name
      packageJSON.private = false

      await writeAsync(
        resolve(directory, 'package.json'),
        JSON.stringify(packageJSON, null, 2),
        { jsonIndent: 2 }
      )

      return { type: 'SUCCESS' }
    } catch {
      return { type: 'ERROR', message: 'Error in edit the project files' }
    }
  }
}
