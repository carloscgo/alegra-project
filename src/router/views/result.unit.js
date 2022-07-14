import Result from './result'

describe('@views/result', () => {
  it('is a valid view', () => {
    expect(Result).toBeAViewComponent()
  })

  describe('cyclelife component', () => {
    it('mounted', (done) => {
      const context = {
        fetchAllSellers: () => { /* */ },
      }

      const fetchAllSellers = jest.spyOn(context, 'fetchAllSellers')

      Result.mounted.call(context)

      expect(fetchAllSellers).toHaveBeenCalled()

      done()
    })
  })
})
