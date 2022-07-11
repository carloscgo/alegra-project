import globalDirectives from './global-directives'

describe('@utils/global-directives', () => {
  it('says hello', () => {
    const result = globalDirectives()
    expect(result).toEqual('hello')
  })
})
