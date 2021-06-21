import { GluegunToolbox } from 'gluegun'
import { State } from './State'

export type TaskDataExecute = {
  toolbox: GluegunToolbox
  state: State
}

interface TaskDataExecuteReturnsWithSuccess {
  type: 'SUCCESS'
  message?: string
}
interface TaskDataExecuteReturnsWithError {
  type: 'ERROR'
  message: string
}

export type TaskDataExecuteReturns =
  | TaskDataExecuteReturnsWithError
  | TaskDataExecuteReturnsWithSuccess

export interface Task {
  name: string
  execute(data: TaskDataExecute): Promise<TaskDataExecuteReturns>
}
