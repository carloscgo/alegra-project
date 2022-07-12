import { findImages } from '@state/services/images'

export const state = {
  images: []
}

export const getters = {
  getImages: (stateRoot) => {
    return stateRoot.images
  }
}

export const mutations = {
  SET_IMAGES(stateRoot, items) {
    stateRoot.images = items
  }
}

export const actions = {
  fetchImages({ commit }, { query }) {
    return findImages(query).then((images) => {
      commit('SET_IMAGES', images)

      return images
    })
  }
}
