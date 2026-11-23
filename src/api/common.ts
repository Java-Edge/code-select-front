import type { AxiosResponse } from "axios";
import request from "@/axios";
import type { ApiResponse } from "@/types/api";
import type { CategoryNode } from "@/components/special-category.vue";

export function getMenuList(typeKey: string): Promise<AxiosResponse<ApiResponse<CategoryNode[]>>> {
  return request({
    url: "/back/dictionary/menuList?typeKey=" + typeKey,
    method: "get"
  });
}

/** 字典选项（/back/dictionary/list 返回的 DictionaryType.list 条目） */
export interface DictionaryOption {
  value: string;
  label: string;
}

/** 按类型键查询字典选项（招聘筛选框的学历/经验/薪资/融资/规模/招聘类型） */
export function getDictList(typeKey: string): Promise<AxiosResponse<ApiResponse<{ list: DictionaryOption[] }>>> {
  return request({
    url: "/back/dictionary/list?typeKey=" + typeKey,
    method: "get"
  });
}

/** 字典类型条目（批量接口返回的 DictionaryType 形状，仅取前端所需字段） */
export interface DictionaryTypeOption {
  typeKey: string;
  list: DictionaryOption[];
}

/** 按 typeKeys 批量查询字典选项（替代多次 /dictionary/list，减少首屏请求数） */
export function getDictListByMultiTypeKey(typeKeys: string[]): Promise<AxiosResponse<ApiResponse<DictionaryTypeOption[]>>> {
  return request({
    url: "/back/dictionary/listByMultiTypeKey?typeKeys=" + typeKeys.join(","),
    method: "get"
  });
}
