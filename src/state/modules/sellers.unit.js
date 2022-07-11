import * as sellersModule from './sellers'

const validSellerExample = {
  id: 1,
  name: 'Seller Name',
}

describe('@state/modules/sellers', () => {
  it('exports a valid Vuex module', () => {
    expect(sellersModule).toBeAVuexModule()
  })

  describe('in a store when is consulted', () => {
    let store
    beforeEach(() => {
      store = createModuleStore(sellersModule, {
        current: validSellerExample,
      })
    })

    it('actions.fetchSeller returns the current seller without fetching it again', () => {
      expect.assertions(2)

      const axios = require('axios')
      const originalAxiosGet = axios.get
      axios.get = jest.fn()

      return store.dispatch('fetchSeller', { id: '1' }).then((seller) => {
        expect(seller).toEqual(validSellerExample)
        expect(axios.get).not.toHaveBeenCalled()
        axios.get = originalAxiosGet
      })
    })

    it('actions.fetchSeller rejects with 400 when provided a bad id', () => {
      expect.assertions(1)

      return store
        .dispatch('fetchSeller', { id: null })
        .catch((error) => {
          expect(error.response.status).toEqual(400)
        })
    })
  })
})
