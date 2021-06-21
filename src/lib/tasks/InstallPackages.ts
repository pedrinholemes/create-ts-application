import { Task, TaskDataExecute, TaskDataExecuteReturns } from '../Task'
import { install } from '../utils/InstallPackages'
import { getOnline } from '../utils/IsOnline'

export class InstallPackages implements Task {
  name = 'install-packages'
  async execute({
    state,
    toolbox
  }: TaskDataExecute): Promise<TaskDataExecuteReturns> {
    const packageManager = state.get('package_manager')
    const projectName = state.get('project_name')

    try {
      const isOnline = await getOnline(packageManager)
      await install({
        useYarn: packageManager === 'yarn',
        isOnline,
        directory: toolbox.filesystem.resolve(projectName)
      })
      return {
        type: 'SUCCESS'
      }
    } catch (e) {
      return {
        type: 'ERROR',
        message: e
      }
    }
  }
}
