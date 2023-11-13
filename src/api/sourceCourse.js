import request from "@/utils/request";
export function getCourseList() {
  return request({
    url: "/back/video/courseList",
    method: "get"
  });
}
export function getCarouselData() {
  return request({
    url: "/back/video/getFiveCourse",
    method: "get"
  });
}

export function getCourse(condition) {
  return request({
    url: "/back/video/search",
    data: condition,
    method: "post"
  });
}
