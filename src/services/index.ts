import axios, { setGlobelRequest } from '@xizher/axios'
import { storageUtils, cookieUtils } from '@xizher/js-utils'
import { config } from '~/config/app.config'

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
  setGlobelRequest(axiosInstance)
}

export default { install }
