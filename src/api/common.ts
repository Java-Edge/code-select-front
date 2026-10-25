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
