import globalMixins from './global-mixins'

describe('@utils/global-mixins', () => {
  it('says hello', () => {
    const result = globalMixins()
    expect(result).toEqual('hello')
  })
})
