type BuildType = () => import('gluegun/build/types/domain/builder').Builder

const { build }: { build: BuildType } = require('gluegun')

async function run(argv: string) {
  const cli = build()
    .brand('create-ts-application')
    .src(__dirname)
    .create()

  const toolbox = await cli.run(argv)

  return toolbox
}

module.exports = { run }
