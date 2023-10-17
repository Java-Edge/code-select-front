import request from "@/utils/request";
export function getList(params) {
  return request({
    url: "/back/sideline/getByPage",
    method: "get",
    params
  });
}
