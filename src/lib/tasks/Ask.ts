import inquirer = require('inquirer')
import { StateType } from '../State'
import { Task, TaskDataExecute, TaskDataExecuteReturns } from '../Task'
import { templates } from '../Templates'

export class Ask implements Task {
  name = 'ask'
  async execute({
    state,
    toolbox
  }: TaskDataExecute): Promise<TaskDataExecuteReturns> {
    const defaultName = toolbox.parameters.first
    const hasYarn = toolbox.packageManager.hasYarn()

    const suffix = toolbox.print.colors.bold.red(' > ')

    try {
      const answers = await inquirer.prompt<StateType>([
        {
          name: 'project_name',
          message: 'Informe nome do projeto',
          type: 'input',
          default: defaultName,
          suffix,
          validate: input => {
            if (input.match(/^[a-zA-Z0-9-]{1,}$/i)) return true
            else {
              return "Your project name should contain only letters, numbers or '-'"
            }
          }
        },
        {
          name: 'project_template',
          type: 'list',
          message: 'Selecione o template do projeto',
          suffix,
          default: 'teste-app',
          choices: templates.map(template => ({
            type: 'choice',
            name: template.name,
            value: template
          }))
        },
        {
          name: 'package_manager',
          message: 'Selecione o seu gerenciador de pacotes',
          type: 'list',
          suffix,
          choices: [
            { type: 'choice', value: 'npm', checked: !hasYarn },
            {
              type: 'choice',
              value: 'yarn',
              checked: hasYarn,
              disabled: !hasYarn
            }
          ]
        },
        {
          name: 'git_initialize',
          type: 'confirm',
          message: 'Você deseja iniciar o projeto com Git',
          suffix,
          default: false
        }
      ])
      for (const name in answers) {
        if (Object.prototype.hasOwnProperty.call(answers, name)) {
          const element = answers[name]
          state.set(name as keyof StateType, element)
        }
      }
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
