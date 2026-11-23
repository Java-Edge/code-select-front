/**
 * 筛选数据管理 Composable
 * 统一管理筛选条件的数据获取和状态，字典数据来自 /back/dictionary/list
 */
import { reactive, ref } from 'vue'
import { getDictList, getDictListByMultiTypeKey } from '@/api/common'
import type { RecruitQueryParam } from '@/api/recruit'

export interface FilterOption {
  id: number
  name: string
  active: boolean
}

export interface FilterGroup {
  name: string
  multiple?: boolean
  data: FilterOption[]
}

/** 行业/职位类目树节点（industryData.js / position.json 的条目形状） */
export interface IndustryNode {
  name: string
  code: number
  subLevelModelList?: IndustryNode[]
}

export function useFilterData() {
  const queryParams = ref<Record<string, number[]>>({})
  const salaryType = ref(0)
  const clear = ref(false)

  // 默认筛选：求职类型=社招（字典 recruit_type：1 校招 / 2 实习 / 3 社招）。
  // queryParams 同步预设，保证首次查询不等字典接口就带上该条件；字典回来后再点亮 UI。
  const DEFAULT_RECRUIT_TYPE = 3
  queryParams.value.jobTypeList = [DEFAULT_RECRUIT_TYPE]

  /** 批量字典 typeKey → 前端筛选分组 key */
  const BATCH_GROUP_KEYS: Record<string, keyof typeof selectList> = {
    education_level: 'degressList',
    graduate_year: 'expList',
    salary_range: 'salaryList',
    finance_stage: 'stageList',
    person_scale: 'sizeList',
    recruit_type: 'jobTypeList'
  }

  const selectList = reactive<Record<string, FilterGroup>>({
    jobTypeList: {
      name: '求职类型',
      data: []
    },
    expList: {
      name: '工作经验',
      multiple: true,
      data: []
    },
    salaryList: {
      name: '薪资待遇',
      data: []
    },
    degressList: {
      name: '学历要求',
      multiple: true,
      data: []
    },
    sizeList: {
      name: '公司规模',
      multiple: true,
      data: []
    },
    stageList: {
      name: '融资阶段',
      multiple: true,
      data: []
    }
  })

  const loadOptions = (typeKey: string, callback: (list: FilterOption[]) => void) => {
    getDictList(typeKey).then((response) => {
      const list = response.data.result.list || []
      callback(
        list.map((item) => ({
          id: parseInt(item.value, 10),
          name: item.label,
          active: false
        }))
      )
    })
  }

  /** 批量初始化首屏常用字典；单 key 切换（如实习薪资）仍走单查 */
  const getBatchData = (typeKeys: string[]): void => {
    getDictListByMultiTypeKey(typeKeys).then((response) => {
      for (const dictType of response.data.result) {
        const groupKey = BATCH_GROUP_KEYS[dictType.typeKey]
        if (!groupKey) continue
        selectList[groupKey].data = dictType.list.map((item) => ({
          id: parseInt(item.value, 10),
          name: item.label,
          active: false
        }))
      }
      const jobType = selectList.jobTypeList.data.find((item) => item.id === DEFAULT_RECRUIT_TYPE)
      if (jobType) jobType.active = true
    })
  }

  getBatchData(Object.keys(BATCH_GROUP_KEYS))

  // 切换招聘类型时联动薪资字典：实习用 internship_salary_range，社招/校招用 salary_range
  const handleSelectJobList = (key: string, id?: number) => {
    if (key === 'jobTypeList') {
      salaryType.value = id ?? 0
      const typeKey = id === 2 ? 'internship_salary_range' : 'salary_range'
      loadOptions(typeKey, (result) => {
        selectList.salaryList.data = result
      })
    }
  }

  const changeCheck = (key: string, type?: boolean, id?: number) => {
    const group = selectList[key]
    if (!group) return
    if (id) {
      if (!type) {
        group.data = group.data.map((item) => ({ ...item, active: false }))
      }
      const item = group.data.find((it) => it.id === id)
      if (item) item.active = !item.active
    } else {
      group.data = group.data.map((item) => ({ ...item, active: false }))
    }
    queryParams.value[key] = group.data
      .filter((item) => item.active)
      .map((item) => item.id)
    handleSelectJobList(key, id)
  }

  const changeComCheck = (key: string, data: number[]) => {
    queryParams.value[key] = data
  }

  const reset = () => {
    for (const key of Object.keys(selectList)) {
      selectList[key].data = selectList[key].data.map((item) => ({
        ...item,
        active: false
      }))
    }
    clear.value = true
  }

  const buildQueryParams = (keyword?: string, jobCity?: string): RecruitQueryParam => {
    return {
      eduLevel: queryParams.value.degressList,
      graduateYear: queryParams.value.expList,
      personScale: queryParams.value.sizeList,
      salaryRange: queryParams.value.salaryList,
      scaleTag: queryParams.value.stageList,
      recruitType: queryParams.value.jobTypeList,
      salaryType: salaryType.value,
      // 「全国」不是库里的城市值，视为不按城市过滤
      jobCity: jobCity && jobCity !== '全国' ? jobCity : undefined,
      keyword
    }
  }

  return {
    selectList,
    queryParams,
    salaryType,
    clear,
    changeCheck,
    changeComCheck,
    reset,
    buildQueryParams
  }
}
