import { createAxios } from '@xizher/axios'
import { ISerivceResult, QueryListDTO } from '~/services'

export interface BlogDTO {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly keywords: string[]
  readonly content: string
  readonly publish: boolean
  readonly createtime: number
  readonly moditytime: number
  readonly createTime: string
  readonly modityTime: string
}

export interface BlogListDTO {
  readonly total: number
  readonly items: BlogDTO[]
}

export function serviceList (params: QueryListDTO) : Promise<ISerivceResult<BlogListDTO>> {
  return createAxios()
    .setUrl('/api/blog/list')
    .setParams(params)
    .mountGet<ISerivceResult<BlogListDTO>>()
}

export interface AddBlogDTO {
  title: string
  description: string
  keywords: string[]
  content: string
}

export function serviceAdd (body: AddBlogDTO) : Promise<ISerivceResult<true>> {
  return createAxios()
    .setUrl('/api/blog/add')
    .setBody(body)
    .mountPost()
}

export interface ModityBlogDTO {
  readonly id: string
  readonly title?: string
  readonly description?: string
  readonly keywords?: string[]
  readonly content?: string
  readonly publish?: boolean
}

export function serivceModity (body: ModityBlogDTO) : Promise<ISerivceResult<true>> {
  return createAxios()
    .setUrl('/api/blog/modity')
    .setBody(body)
    .mountPost()
}
