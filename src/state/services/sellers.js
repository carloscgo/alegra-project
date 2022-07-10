import axios from './axiosConfig'

export const findSeller = id => {
  try {
    return axios.get(`contacts/${id}`).then((response) => response.data)
  } catch (error) {
    console.log({error})

    return {}
  }
}
