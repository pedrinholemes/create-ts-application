import { Task, TaskDataExecute, TaskDataExecuteReturns } from '../Task'
import { tryGitInit } from '../utils/Git'

export class InitGit implements Task {
  name = 'init-git'
  async execute({
    state,
    toolbox
  }: TaskDataExecute): Promise<TaskDataExecuteReturns> {
    try {
      const { resolve } = toolbox.filesystem
      const name = state.get('project_name')
      const initializeGit = state.get('git_initialize')
      if (!initializeGit) return { type: 'SUCCESS' }

      const directory = resolve(name)
      tryGitInit(directory)
      return { type: 'SUCCESS' }
    } catch {
      return {
        type: 'ERROR',
        message: 'Error in initialize git in the project'
      }
    }
  }
}
