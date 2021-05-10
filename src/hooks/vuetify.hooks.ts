/* eslint-disable @typescript-eslint/ban-types */

import { reactive, ToRefs, toRefs, watch } from '@vue/composition-api'
import { DataOptions, DataTableHeader } from 'vuetify'
import ext from '@xizher/js-ext'

export interface ITableState<T> {
  headers: DataTableHeader[]
  options: DataOptions | Object
  dataSource: T[]
  total: number
  loading: boolean
  loadDataSource () : void
}

export function useTable<T> (headers: DataTableHeader[], funcLoadDataSource: Function, options?: DataOptions) : ToRefs<ITableState<T>> {
  const tableState : ITableState<T> = reactive({
    headers,
    options: options ?? {},
    dataSource: [],
    total: 0,
    loading: false,
    loadDataSource () {
      tableState.loading = true
      ext(tableState.dataSource).clear()
      const { page, itemsPerPage, sortBy, sortDesc } = tableState.options as DataOptions
      funcLoadDataSource({
        pageIndex: page - 1,
        pageSize: itemsPerPage,
        orders: sortBy.map((name, index) => ({ name, type: sortDesc[index] ? 'desc' : 'asc' }))
      })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .then(res => {
          if (!res.data) {
            // ...
            return
          }
          tableState.total = res.data.total
          tableState.dataSource = res.data.items
        })
        .finally(() => tableState.loading = false)
    },
  })
  watch(() => tableState.options, tableState.loadDataSource, { deep: true })
  return { ...toRefs(tableState) }
}
