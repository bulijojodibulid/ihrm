import { router } from '@/router/router'
import store from '@/store/store'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
    nProgress.start()
    if (store.getters.token){
        if (to.name === 'login') {
            next('/home')
            nProgress.done()
        }else {
            if (!store.getters.userId){
                await store.dispatch('user/getUserInfo')
            }
            next()
        }
    }else {
        if (whiteList.includes(to.path)) {
            next()
        }else {
            next('/login')
            nProgress.done()
        }
    }
})

router.afterEach(() => {
    nProgress.done()
})