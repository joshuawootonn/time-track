import axios, { AxiosRequestConfig } from 'axios'
import { HOST } from '~/constants/network'
import { getAccessToken } from '~/constants/storage'

export const axiosInstance = axios.create({
  baseURL: HOST(),
})

export const updateAxiosInstanceWithNewURL = () => {
  axiosInstance.defaults.baseURL = HOST()
}

axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const accessToken = getAccessToken()
  //@ts-ignore
  if (config.url.includes('?')) {
    //@ts-ignore
    config.url = config.baseURL + config.url + `&access_token=${accessToken}`
  } else {
    //@ts-ignore
    config.url = config.baseURL + config.url + `?access_token=${accessToken}`
  }

  return config
})

export default axiosInstance
