import globalComponents from './global-components'

describe('@utils/global-components', () => {
  it('says hello', () => {
    const result = globalComponents()
    expect(result).toEqual('hello')
  })
})
