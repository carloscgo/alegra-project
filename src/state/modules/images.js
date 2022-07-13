import { findImages } from '@state/services/images'
import lowerCase from 'lodash/lowerCase'
import isEmpty from 'lodash/isEmpty'

export const state = {
  cached: [],
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

    stateRoot.cached.push(items)
  }
}

export const actions = {
  fetchImages({ commit, state: stateRoot }, { query }) {
    // 1. Check if we've already fetched and cached the image.
    const matchedImages = stateRoot.cached.filter((image) => lowerCase(image.name).indexOf(lowerCase(query)) > -1)

    if (!isEmpty(matchedImages)) {
      commit('SET_IMAGES', matchedImages)

      return Promise.resolve(matchedImages)
    }

    return findImages(query).then((images) => {
      commit('SET_IMAGES', images)

      return images
    })
  }
}
