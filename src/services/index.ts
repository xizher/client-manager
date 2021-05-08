import axios, { setGlobelRequest } from '@xizher/axios'
import { storageUtils, cookieUtils } from '@xizher/js-utils'
import { config } from '~/config/app.config'
import { useRouter } from '~/hooks/router.hooks'

const { timeout, withCookie } = config.serviceConfig

export function getToken () : string | null {
  return storageUtils.local.get('token') ?? cookieUtils.get('token') ?? null
}

function install () : void {
  const axiosInstance = axios.create({
    timeout,
    withCredentials: withCookie,
  })
  axiosInstance.interceptors.request.use(conf => {
    conf.headers['token'] = getToken()
    return conf
  })
  axiosInstance.interceptors.response.use(response => {
    if (response.data.code === '0x101') {
      const router = useRouter()
      router.push('/login')
      return Promise.resolve(response)
    }
    return Promise.resolve(response)
  })
  setGlobelRequest(axiosInstance)
}

export default { install }
