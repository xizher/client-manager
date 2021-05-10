import { reactive, ref, toRaw, toRefs, ToRefs } from '@vue/composition-api'
import { ITableState, useTable } from './vuetify.hooks'
import { AddBlogDTO, BlogDTO, ModityBlogDTO, serivceModity, serviceAdd } from '~services/blog.service'
import { DataTableHeader } from 'vuetify'
import { serviceList } from '~/services/blog.service'
import { useMessage } from './message.hooks'

// eslint-disable-next-line @typescript-eslint/ban-types
const refreshDataSource = ref<Function>(() => null)

export function useList () : ToRefs<ITableState<BlogDTO>> {
  const headers : DataTableHeader[] = [
    { align: 'center', text: '标题', value: 'title', sortable: false },
    { align: 'center', text: '概要', value: 'description', sortable: false },
    { align: 'center', text: '关键词', value: 'keywords', sortable: false },
    { align: 'center', text: '创建时间', value: 'createTime' },
    { align: 'center', text: '最后修改时间', value: 'modityTime' },
    { align: 'center', text: '是否公开', value: 'publish' },
    { align: 'center', text: '操作', value: 'actions', sortable: false },
  ]
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { loadDataSource, dataSource, ...others } = useTable<BlogDTO>(headers, serviceList, {
    sortBy: ['createTime'],
    sortDesc: [true]
  })
  refreshDataSource.value = loadDataSource.value
  return { loadDataSource, dataSource, ...others }
}

export function useCreate () : ToRefs<AddBlogDTO> & { submit () : Promise<boolean> } {
  const message = useMessage()
  const defaultState = {
    title: '',
    description: '',
    keywords: [],
    content: '',
  }
  const state = reactive(defaultState)
  const submit = async () => {
    const result = await serviceAdd(toRaw(state))
    if (result.data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Object.keys(state).forEach(key => state[key] = defaultState[key])
      message.show('添加成功')
      refreshDataSource.value()
      return true
    }
    console.warn(result)
    message.show('添加失败')
    return false
  }
  return { ...toRefs(state), submit }
}


export function useModity () : ToRefs<ModityBlogDTO> & { submit () : Promise<boolean> } {
  const message = useMessage()
  const defaultState = {
    id: '',
    title: '',
    description: '',
    keywords: [],
    content: '',
    publish: undefined
  }
  const state = reactive(defaultState)
  const submit = async () => {
    const result = await serivceModity(toRaw(state))
    if (result.data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Object.keys(state).forEach(key => state[key] = defaultState[key])
      message.show('修改成功')
      refreshDataSource.value()
      return true
    }
    console.warn(result)
    message.show('修改失败')
    return false
  }
  return { ...toRefs(state), submit }
}
