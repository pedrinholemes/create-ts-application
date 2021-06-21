import degit = require('degit')
import { Task, TaskDataExecute, TaskDataExecuteReturns } from '../Task'

export class CloneRepo implements Task {
  name = 'clone-repo'
  async execute({
    state,
    toolbox
  }: TaskDataExecute): Promise<TaskDataExecuteReturns> {
    const template = state.get('project_template')
    const emitter = degit(
      `${template.ownerUsername}/${template.repositoryName}`,
      {
        cache: false,
        force: true,
        verbose: true
      }
    )

    const projectName = state.get('project_name')

    const spin = toolbox.print.spin()

    spin.start('Cloning...')
    emitter.on('warn', info => spin.warn(info.message.split(/ +/)[0]))
    emitter.on('info', info => spin.info(info.message.split(/ +/)[0]))
    try {
      await emitter.clone(projectName)
      spin.succeed('Repository is cloned')
      return { type: 'SUCCESS' }
    } catch {
      spin.fail('Error in clone the repository')
      return { type: 'ERROR', message: 'Error in clone the repository' }
    }
  }
}
