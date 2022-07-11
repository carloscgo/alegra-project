import consoleLog from './console-log'

describe('@utils/console-log', () => {
  it('says hello', () => {
    const result = consoleLog()
    expect(result).toEqual('hello')
  })
})
