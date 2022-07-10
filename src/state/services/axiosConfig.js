import axios from 'axios'
import config from '@src/app.config'

const { alegraApiUrl, authToken } = config

axios.defaults.baseURL = alegraApiUrl
axios.defaults.headers.Authorization = `Basic ${authToken}`
axios.defaults.preflightContinue = true
axios.defaults.crossDomain = true

export default axios
