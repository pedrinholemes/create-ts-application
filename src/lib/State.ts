import { Template } from './Templates'

export interface StateType {
  project_name: string
  project_template: Template
  package_manager: 'yarn' | 'npm'
  git_initialize: boolean
}
type StateKeys = keyof StateType

export class State {
  private map = new Map<StateKeys, StateType[StateKeys]>()
  get<K extends StateKeys>(key: K): StateType[K] | null {
    return this.map.get(key) as StateType[K]
  }

  set<K extends StateKeys>(key: K, value: StateType[K]): this {
    this.map.set(key, value as string)
    return this
  }

  has<K extends StateKeys>(key: K): boolean {
    return this.map.has(key)
  }
}
