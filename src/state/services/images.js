import consoleLog from '@utils/console-log'
// import { findSeller } from '@state/services/sellers'
import axios from './axiosConfig'

/* export const findImages = query => {
  try {
    return axios.get(`${googleApiUrl}?key=${googleKey}&cx=${googleCtx}&searchType=image&safe=active&q=${query}`)
      .then(({data}) => {
        return data.items.map(({link, title, image: thumbnail}) => ({
        link,
        title,
        thumbnail: {
          link: thumbnail.thumbnailLink,
          height: thumbnail.thumbnailHeight,
          width: thumbnail.thumbnailWidth,
        }
      }))})
  } catch (error) {
    consoleLog({error})

    return Promise.resolve([])
  }
} */

export const getBase64FromUrl = async (url) => {
  const data = await fetch(url)
  const blob = await data.blob()

  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.readAsDataURL(blob)

    reader.onloadend = () => {
      const base64data = reader.result

      resolve(base64data)
    }
  })
}

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
