import { computed, reactive, Ref, ref, toRaw, toRefs, ToRefs, watch } from '@vue/composition-api'
import { cryptoUtils, storageUtils } from '@xizher/js-utils'
import { DataTableHeader } from 'vuetify'
import { AddPwdDTO, ModityPwdDTO, PwdDTO, serivceModity, serviceAdd, serviceDelete, serviceList } from '~/services/pwd.service'
import { useMessage } from './message.hooks'
import { ITableState, useTable } from './vuetify.hooks'

const defaultKey = storageUtils.local.get('cryptoKey')

const key = ref((defaultKey && atob(defaultKey)) ?? '')
const iv = computed(() => `${key.value}${key.value}`)
watch(key, k => {
  storageUtils.local.set('cryptoKey', btoa(k))
}, { immediate: true })

export function useCryptoKey () : [Ref<string>, (val: string) => string] {
  const decrypto = (val: string) => {
    return cryptoUtils.decrypto(val, { key: iv.value, iv: key.value })
  }
  return [key, decrypto]
}

export interface IDataSource {
  total: number
  items: (PwdDTO & { visible: boolean })[]
}

// eslint-disable-next-line @typescript-eslint/ban-types
const refreshDataSource = ref<Function>(() => null)

export function useList () : ToRefs<ITableState<PwdDTO>> {
  const headers : DataTableHeader[] = [
    { align: 'center', text: '账户', value: 'name' },
    { align: 'center', sortable: false, text: '口令', value: 'pwd' },
    { align: 'center', text: '备注', value: 'comment' },
    { align: 'center', text: '操作', value: 'actions', sortable: false },
  ]
  const { loadDataSource, ...others } = useTable<PwdDTO>(headers, serviceList)
  refreshDataSource.value = loadDataSource.value
  return { loadDataSource, ...others }
}

export function useCreate () : ToRefs<AddPwdDTO> & { submit () : Promise<boolean> } {
  const message = useMessage()
  const state = reactive({
    name: '',
    pwd: '',
    comment: '',
  })
  const submit = async () => {
    const body = toRaw(state)
    const result = await serviceAdd({
      ...body, pwd: cryptoUtils.encrypto(body.pwd, { key: iv.value, iv: key.value })
    })
    if (result.data) {
      Object.keys(state).forEach(key => (state as { [key: string] : string })[key] = '')
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

export function useModity () : ToRefs<ModityPwdDTO> & { submit () : Promise<boolean> } {
  const message = useMessage()
  const state = reactive({
    id: '',
    name: '',
    pwd: '',
    comment: '',
  })
  const submit = async () => {
    const body = toRaw(state)
    const result = await serivceModity({
      ...body, pwd: cryptoUtils.encrypto(body.pwd, { key: iv.value, iv: key.value })
    })
    if (result.data) {
      Object.keys(state).forEach(key => (state as { [key: string] : string })[key] = '')
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

export function useDelete () : (id: string) => void {
  const message = useMessage()
  return (id: string) => {
    serviceDelete(id).then(res => {
      if (res.data) {
        refreshDataSource.value()
        message.show('删除成功')
      } else {
        Promise.reject(res)
      }
    }).catch(err => {
      console.warn(err)
      message.show('删除失败')
    })
  }
}
