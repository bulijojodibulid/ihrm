import axios from 'axios'
import store from '@/store/store'
import message from '@/utils/message'
import { router } from '@/router/router'
const service = axios.create({
    baseURL: '/ihrm',
    timeout: 10000
})

service.interceptors.request.use((config) => {
    if (store.getters.token) {
        config.headers.token = store.getters.token
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

service.interceptors.response.use((res) => {
    const msg = res.data.msg
    if(res.data instanceof Blob){
        return res.data
    }
    if (msg === 'success'){
        return res.data.data
    }else {
        message(msg)
        return Promise.reject(new Error(msg))
    }
}, async (error) => {
    if (error.response.status === 401){
        await store.dispatch('user/loginout')
        router.push('/login')
        message(error.response.data.msg)
    }
    if (error.response.status === 500) {
        message('系统关闭!')
    }
    return Promise.reject(error)
})

export default service