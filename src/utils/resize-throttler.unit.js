import resizeThrottler from './resize-throttler'

describe('@utils/resize-throttler', () => {
  it('says hello', () => {
    const result = resizeThrottler()
    expect(result).toEqual('hello')
  })
})
