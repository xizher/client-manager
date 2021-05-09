import axios, { setGlobelRequest } from '@xizher/axios'
import { storageUtils, cookieUtils } from '@xizher/js-utils'
import { config } from '~/config/app.config'
import { useMessage } from '~/hooks/message.hooks'
import { useRouter } from '~/hooks/router.hooks'

export interface ISerivceResult <T> {
  code: string
  data: T
  error: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export class QueryListDTO {
  readonly pageIndex?: number
  readonly pageSize?: number
  orders?: {
    name: string
    type: 'asc' | 'desc'
  }[]
}

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
      const message = useMessage()
      message.show('登录已过期，请重新登录')
      router.push('/login')
      return Promise.resolve(response)
    }
    return Promise.resolve(response)
  })
  setGlobelRequest(axiosInstance)
}

export default { install }
