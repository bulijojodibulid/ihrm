import message from '@/utils/message.js'

/**
 * 函数节流，防止用户重复触发接口，如果重复触发，弹出框提示
 */
function throttle (func, time) {
    let lastFire = 0
    return () => {
        const now = new Date().getTime()
        if ( now - lastFire < time){
            message('请勿重复点击')
            return
        }
        lastFire = now
        func()
    }
}

export default throttle