import request from "@/utils/request";
export function getMenuList(typeKey) {
  return request({
    url: "/back/dictionary/menuList?typeKey=" + typeKey,
    method: "get"
  });
}
