import debounce from './debounce'

describe('@utils/debounce', () => {
  it('says hello', () => {
    const result = debounce()
    expect(result).toEqual('hello')
  })
})
