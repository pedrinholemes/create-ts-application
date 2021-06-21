import { GluegunToolbox, GluegunCommand } from 'gluegun'
import { templates } from '../lib/Templates'
import { CheckForUpdates } from '../lib/tasks/CheckForUpdates'

const command: GluegunCommand = {
  name: 'search',
  description: 'Search in templates',
  alias: ['s', 'find'],
  run: async (toolbox: GluegunToolbox) => {
    const { print, parameters, commandName, runtime } = toolbox
    await new CheckForUpdates().execute({ toolbox })
    const query = parameters.first
    if (!query) {
      print.error(`${print.colors.bold('query')} must be provided
$ ${runtime?.brand || 'create-ts-application'} ${commandName} <query>`)
      process.exit(1)
    }
    const findTemplates = templates.filter(template =>
      template.name.includes(query)
    )
    const tableInfo = findTemplates.map(template => [
      print.colors.bold(template.name),
      `https://github.com/${template.ownerUsername}/${template.repositoryName}`
    ])

    print.table(
      [
        [
          print.colors.highlight('Template name'),
          print.colors.highlight('GitHub repository URL')
        ],
        ...tableInfo
      ],
      { format: 'lean' }
    )
  }
}

module.exports = command
