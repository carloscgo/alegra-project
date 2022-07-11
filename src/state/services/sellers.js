import consoleLog from '@utils/console-log'
import axios from './axiosConfig'

export const findSeller = id => {
  try {
    return axios.get(`contacts/${id}`).then((response) => response.data)
  } catch (error) {
    consoleLog({error})

    return Promise.resolve({})
  }
}
