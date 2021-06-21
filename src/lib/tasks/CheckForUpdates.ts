import { Task, TaskDataExecute, TaskDataExecuteReturns } from '../Task'
import updateCheck from 'update-check'

export class CheckForUpdates implements Task {
  name = 'check-for-updates'
  async execute({
    toolbox
  }: Pick<TaskDataExecute, 'toolbox'>): Promise<TaskDataExecuteReturns> {
    try {
      const packageJSON = await toolbox.filesystem.readAsync(
        toolbox.filesystem.resolve(__dirname, '..', '..', '..', ' package.json')
      )
      const result = await updateCheck(JSON.parse(packageJSON))
      if (result) {
        console.log(`The latest version is ${result.latest}. Please update!`)
      }
      return { type: 'SUCCESS' }
    } catch {
      return { type: 'ERROR', message: 'Error in edit the project files' }
    }
  }
}
