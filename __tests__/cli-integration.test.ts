import { system, filesystem } from 'gluegun'

const src = filesystem.path(__dirname, '..')

const cli = async (cmd: string) =>
  system.run(
    `node ${filesystem.path(src, 'bin', 'create-ts-application')} ${cmd}`
  )

describe('test default command with options', () => {
  test('outputs version', async () => {
    const output = await cli('--version')
    expect(output).toContain('0.0.1')
  })

  test('outputs help', async () => {
    const output = await cli('--help')
    expect(output).toContain('0.0.1')
  })
})
