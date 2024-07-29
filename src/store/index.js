import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      token: localStorage.getItem("token"),
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      courseId: sessionStorage.getItem("courseId")
    };
  },
  mutations: {
    SET_COURSE_ID(state, courseId) {
      state.courseId = courseId;
      sessionStorage.setItem("courseId", courseId);
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    REMOVE_INFO(state) {
      state.token = '';
      state.userInfo = {};
      localStorage.setItem("token", '');
      localStorage.setItem("userInfo", JSON.stringify(''));
    }
  },
  getters: {
    getUser(state) {
      return state.userInfo;
    },
    getToken(state) {
      if (state.token == null) {
        return '';
      } else {
        return state.token;
      }
    },
    getCourseId(state) {
      return state.courseId;
    }
  },
  actions: {}
});

export default store;