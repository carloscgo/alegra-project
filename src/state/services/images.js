import consoleLog from '@utils/console-log'
import { googleApiUrl, googleKey, googleCtx } from '@src/app.config'
import axios from './axiosConfig'

export const findImage = query => {
  try {
    return axios.get(`${googleApiUrl}?key=${googleKey}&cx=${googleCtx}&searchType=image&safe=active&q=${query}`)
      .then((response) => response.items.map(({link, title, image: thumbnail}) => ({
        link,
        title,
        thumbnail: {
          link: thumbnail.thumbnailLink,
          height: thumbnail.thumbnailHeight,
          width: thumbnail.thumbnailWidth,
        }
      })))
  } catch (error) {
    consoleLog({error})

    return Promise.resolve([])
  }
}