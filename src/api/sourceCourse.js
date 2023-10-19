import request from "@/utils/request";
export function getCourseList() {
  return request({
    url: "/back/course/courseList",
    method: "get"
  });
}
export function getCarouselData() {
  return request({
    url: "/back/course/getFiveCourse",
    method: "get"
  });
}

export function getCourse(condition) {
  return request({
    url: "/back/course/search",
    data: condition,
    method: "post"
  });
}