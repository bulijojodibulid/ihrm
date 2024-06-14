import request from '@/utils/request'
/**
 * 响应token
 * @param {*} data {phone, pwd} 
 * @returns 
 */
export function login (data) {
    return request({
        url: '/login',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

/**
 * 响应用户信息
 * @param {*} data  {phone, pwd}
 */
export function getUserInfo () {
    return request({
        url: '/users'
    })
}

/**
 * 修改用户密码
 */
export function updateUserPwd (oldPwd, newPwd) {
    return request({
        url: '/users',
        method: 'put',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            oldPwd,
            newPwd
        }
    })
}