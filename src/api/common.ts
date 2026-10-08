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
