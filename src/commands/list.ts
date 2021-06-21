import { GluegunToolbox, GluegunCommand } from 'gluegun'
import { templates } from '../lib/Templates'
import { CheckForUpdates } from '../lib/tasks/CheckForUpdates'

const command: GluegunCommand = {
  name: 'list',
  description: 'List all templates',
  alias: ['l', 'ls'],
  run: async (toolbox: GluegunToolbox) => {
    const { print } = toolbox
    await new CheckForUpdates().execute({ toolbox })
    const tableInfo = templates.map(template => [
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
