import request from '@/utils/request.js'

/**
 * 
 * @param {*} params {page, pageSize} 
 * @returns 
 */
export function queryAllRole(params){
    return request({
        method: 'get',
        url: '/role',
        params
    })
}

/**
 * 
 * @param {*} data {name, description, state} 
 * @returns 
 */
export function addRole(data){
    return request({
        method: 'post',
        url: '/role',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

export function delRole(id){
    const url = `/role/${id}`
    return request({
        method: 'delete',
        url
    })
}

export function updateRole(data){
    data = JSON.stringify(data)
    return request({
        method: 'put',
        url: '/role',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data
    })
}

export function getEnableRoleList(){
    return request({
        method: 'get',
        url: '/enableRole'
    })
}