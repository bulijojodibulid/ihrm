import request from '@/utils/request.js'

export function queryAllDepartment(){
    return request({
        url: '/departments'
    })
}

export function querySimpleUsers(){
    return request({
        url: '/simpleUsers'
    })
}

export function addDepartment(data){
    return request({
        method: 'post',
        url: '/department',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

export function updateDepartment(data){
    return request({
        method: 'put',
        url: '/department',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

export function delDepartment(ids){
    return request({
        method: 'delete',
        url: `/department?ids=${ids.join(',')}`,
    })
}