/* istanbul ignore file */

import consoleLog from '@utils/console-log'
import axios from './axiosConfig'

export const findImages = query => {
  try {
    return axios.get(`items/?query=${query}`).then(({data}) => {
      return data.map(({ id, name: title, description: image, customFields}) => ({
        id,
        title,
        image,
        seller_id: customFields[0].value
      }))})
  } catch (error) {
    consoleLog({error})

    return Promise.resolve([])
  }
}
