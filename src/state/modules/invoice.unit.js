import * as invoiceModule from './invoice'

describe('@state/modules/invoice', () => {
  it('exports a valid Vuex module', () => {
    expect(invoiceModule).toBeAVuexModule()
  })
})
