import { createAxios } from '@xizher/axios'
import { ISerivceResult, QueryListDTO } from '.'

export interface PwdDTO {
  readonly id: string
  readonly name: string
  readonly pwd: string
  readonly comment: string
  show: boolean
}

export interface PwdListDTO {
  readonly total: number
  readonly items: PwdDTO[]
}

export function serviceList (params: QueryListDTO) : Promise<ISerivceResult<PwdListDTO>> {
  return createAxios()
    .setUrl('/api/pwd/list')
    .setParams(params)
    .mountGet<ISerivceResult<PwdListDTO>>()
    .then(res => {
      if (res.data) {
        res.data.items.forEach(item => item.show = false)
      }
      return res
    })
}

export interface AddPwdDTO {
  readonly name: string
  readonly pwd: string
  readonly comment: string
}

export function serviceAdd (body: AddPwdDTO) : Promise<ISerivceResult<true>> {
  return createAxios()
    .setUrl('/api/pwd/add')
    .setBody(body)
    .mountPost()
}

export function serviceDelete (id: string) : Promise<ISerivceResult<true>> {
  return createAxios()
    .setUrl('/api/pwd/delete')
    .setBody({ id })
    .mountPost()
}

export interface ModityPwdDTO {
  readonly id: string
  readonly name?: string
  readonly pwd?: string
  readonly comment?: string
}

export function serivceModity (body: ModityPwdDTO) : Promise<ISerivceResult<true>> {
  return createAxios()
    .setUrl('/api/pwd/modity')
    .setBody(body)
    .mountPost()
}
