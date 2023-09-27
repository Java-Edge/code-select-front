import request from "@/utils/request";
export function getList(params) {
  return request({
    url: "/back/sourceCourse/list",
    method: "get"
  });
}
export function getCarouselData() {
    return request({
      url: "/back/sourceCourse/getFiveCourse",
      method: "get"
    });
  }