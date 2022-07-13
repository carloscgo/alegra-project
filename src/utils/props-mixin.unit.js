import propsMixin from './props-mixin'

describe('@utils/props-mixin', () => {
  it('says hello', () => {
    const result = propsMixin()
    expect(result).toEqual('hello')
  })
})
