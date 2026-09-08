import request from "@/axios";
export function getMenuList(typeKey: string) {
  return request({
    url: "/back/dictionary/menuList?typeKey=" + typeKey,
    method: "get"
  });
}
