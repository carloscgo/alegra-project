import materialKit from './material-kit'

describe('@utils/material-kit', () => {
  it('says hello', () => {
    const result = materialKit()
    expect(result).toEqual('hello')
  })
})
