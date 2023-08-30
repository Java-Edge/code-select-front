const state = {
    // 选中的导航栏路由路径
    activePath: '/home'
}

const mutations = {
    setActivePath(state, payload) {
        state.activePath = payload.path
    }
}

export default {
    namespaced: true,
    state,
    mutations
}