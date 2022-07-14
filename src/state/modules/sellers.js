/* istanbul ignore file */

import { findSeller, getAllSellers, addCountSeller } from '@state/services/sellers'
import isEmpty from 'lodash/isEmpty'
import isNull from 'lodash/isNull'

export const castCount = (count) => isNull(count) ? 0 : Number(count)

export const state = {
  cached: [],
  current: {}
}

export const getters = {
  currentSeller: (stateRoot) => {
    return stateRoot.current
  },

  allSellers: (stateRoot) => {
    return stateRoot.cached
  }
}

export const mutations = {
  CACHE_SELLER(stateRoot, newSeller) {
    const seller = {
      ...newSeller,
      count: castCount(newSeller.observations)
    }

    stateRoot.current = seller
    stateRoot.cached.push(seller)
  },

  CACHE_ALL_SELLERS(stateRoot, sellers) {
    stateRoot.cached = sellers.map(seller => ({
      ...seller,
      count: castCount(seller.observations)
    }))
  },

  CURRENT_SELLER(stateRoot, seller) {
    stateRoot.current = {
      ...seller,
      count: castCount(seller.observations)
    }
  }
}

export const actions = {
  increaseCountSeller({ state: stateRoot }, { id }) {
    const countPrev = stateRoot.cached.find((seller) => seller.id === Number(id)).count

    return addCountSeller(id, countPrev)
  },

  fetchAllSellers({ commit }) {
    return getAllSellers().then((sellers) => {
      commit('CACHE_ALL_SELLERS', sellers)

      return sellers
    })
  },

  fetchSeller({ commit, state: stateRoot }, { id }) {
    // 1. Check if we've already fetched and cached the seller.
    const matchedSeller = stateRoot.cached.find((seller) => seller.id === Number(id))

    if (!isEmpty(matchedSeller)) {
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
