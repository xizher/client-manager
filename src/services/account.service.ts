import { createAxios } from '@xizher/axios'
import { cryptoUtils } from '@xizher/js-utils'
import { getToken } from '.'

interface ISerivceResult <T> {
  code: string
  data: T
  error: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface AccountInfoDTO {
  id: string
  username: string
  email: string
}

export function serviceCheck () : Promise<ISerivceResult<false | AccountInfoDTO>> {
  const token = getToken()
  return createAxios()
    .setUrl('/api/account/check')
    .setBody({ token })
    .mountPost()
}

export interface AccountLoginErrorDTO {
  readonly success: false
}

export interface AccountLoginSuccessDTO {
  readonly success: true
  readonly token: string
  readonly account: AccountInfoDTO
}

export type AccountLoginResultDTO = AccountLoginSuccessDTO | AccountLoginErrorDTO

export function serivceLogin (account: string, password: string) : Promise<ISerivceResult<AccountLoginResultDTO>> {
  return createAxios()
    .setUrl('/api/account/login')
    .setBody({ account })
    .setBody({ password: cryptoUtils.encrypto(cryptoUtils.encrypto(password)) })
    .mountPost()
}
