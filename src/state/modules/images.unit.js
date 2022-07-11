import * as imagesModule from './images'

const validImageExample = {
  id: 1,
  name: 'Image Name',
}

describe('@state/modules/images', () => {
  it('exports a valid Vuex module', () => {
    expect(imagesModule).toBeAVuexModule()
  })

  describe('in a store when is consulted', () => {
    let store
    beforeEach(() => {
      store = createModuleStore(imagesModule, {
        current: validImageExample,
      })
    })

    it('actions.fetchImage returns the current seller without fetching it again', () => {
      expect.assertions(2)

      const axios = require('axios')
      const originalAxiosGet = axios.get
      axios.get = jest.fn()

      return store.dispatch('fetchImage', { id: '1' }).then((seller) => {
        expect(seller).toEqual(validImageExample)
        expect(axios.get).not.toHaveBeenCalled()
        axios.get = originalAxiosGet
      })
    })

    it('actions.fetchImage rejects with 400 when provided a bad id', () => {
      expect.assertions(1)

      return store
        .dispatch('fetchImage', { id: null })
        .catch((error) => {
          expect(error.response.status).toEqual(400)
        })
    })
  })
})
