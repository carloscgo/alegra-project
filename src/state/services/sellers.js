/* istanbul ignore file */

import consoleLog from '@utils/console-log'
import axios from './axiosConfig'

export const POINTS = 3
export const MAX_POINTS = 20

export const findSeller = id => {
  try {
    return axios.get(`sellers/${id}`).then((response) => response.data)
  } catch (error) {
    consoleLog({error})

    return Promise.resolve({})
  }
}

export const getAllSellers = () => {
  try {
    return axios.get('sellers/').then((response) => response.data)
  } catch (error) {
    consoleLog({error})

    return Promise.resolve({})
  }
}

export const addCountSeller = (id, countPrev) => {
  try {
    return axios.put(`sellers/${id}`, {
      observations: (countPrev + POINTS).toString()
    }).then((response) => response.data)
  } catch (error) {
    consoleLog({error})

    return Promise.resolve({})
  }
}
