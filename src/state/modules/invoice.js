import { addInvoice, findInvoice } from '@state/services/invoice'

export const state = {
  current: {}
}

export const getters = {
  currentInvoice: (stateRoot) => {
    return stateRoot.current
  }
}

export const mutations = {
  ADD_INVOICE(stateRoot, invoice) {
    stateRoot.current = invoice
  }
}

export const actions = {
  findInvoice({ commit }, { sellerId }) {
    if (sellerId) {
      return findInvoice(sellerId).then((invoice) => {
        commit('ADD_INVOICE', invoice)

        return invoice
      })
    }

    return null
  },

  addInvoice({ commit }, { seller, amount }) {
    return addInvoice(seller, amount).then((invoice) => {
      commit('ADD_INVOICE', invoice)

      return invoice
    })
  }
}
