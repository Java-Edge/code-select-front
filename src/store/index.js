import { createStore } from 'vuex';
import user from './modules/user';

const store = createStore({
  state() {
    return {
      courseId: sessionStorage.getItem("courseId")
    };
  },
  mutations: {
    SET_COURSE_ID(state, courseId) {
      state.courseId = courseId;
      sessionStorage.setItem("courseId", courseId);
    }
  },
  getters: {
    getCourseId(state) {
      return state.courseId;
    }
  },
  actions: {},
  modules: {
    user
  }
});

export default store;