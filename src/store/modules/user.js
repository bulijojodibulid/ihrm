import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth.js'
import { login, getUserInfo } from '@/api/user'

const state = {
    token: getToken(),
    userInfo: {}
}
const mutations = {
    setToken (state, token) {
        state.token = token
        setToken(token)
    },
    removeToken (state) {
        state.token = null
        removeToken()
    },
    setUserInfo (state, data) {
        state.userInfo = data
    }
}
const actions = {
    async login(context, data) {
        const token = await login(data)
        context.commit('setToken', token)
    },
    async getUserInfo (context) {
        const userInfo = await getUserInfo()
        context.commit('setUserInfo', userInfo)
    },
    loginout (context) {
        context.commit('removeToken')
        context.commit('setUserInfo', {})
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}