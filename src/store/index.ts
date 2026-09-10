import { createStore } from 'vuex'
import user from './modules/user'
import type { RootState } from './modules/user'

const store = createStore<RootState>({
  modules: {
    user
  }
})

export default store
