import { findSeller } from '@state/services/sellers'

export const state = {
  cached: [],
  current: {}
}

export const getters = {
  currentSeller: (stateRoot) => {
    return stateRoot.current
  }
}

export const mutations = {
  CACHE_SELLER(stateRoot, newSeller) {
    stateRoot.current = newSeller

    stateRoot.cached.push(newSeller)
  },

  CURRENT_SELLER(stateRoot, seller) {
    stateRoot.current = seller
  }
}

export const actions = {
  fetchSeller({ commit, state: stateRoot }, { id }) {
    // 1. Check if we've already fetched and cached the seller.
    const matchedSeller = stateRoot.cached.find((seller) => seller.id === id)

    if (matchedSeller) {
      commit('CURRENT_SELLER', matchedSeller)

      return Promise.resolve(matchedSeller)
    }

    // 2. Fetch the seller from the API and cache it in case
    //    we need it again in the future.
    return findSeller(id).then((seller) => {
      commit('CACHE_SELLER', seller)

      return seller
    })
  }
}
