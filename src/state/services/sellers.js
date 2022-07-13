import consoleLog from '@utils/console-log'
import axios from './axiosConfig'

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
      observations: (countPrev + 3).toString()
    }).then((response) => response.data)
  } catch (error) {
    consoleLog({error})

    return Promise.resolve({})
  }
}
