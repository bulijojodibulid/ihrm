import request from '@/utils/request.js'

export function queryAll(){
    return request({
        method: 'get',
        url: '/permission'
    })
}

export function add(data){
    return request({
        method: 'post',
        url: '/permission',
        data
    })
}

export function del(ids){
    return request({
        method: 'delete',
        url: `/permission/${ids.join(',')}`
    })
}

export function update(data){
    return request({
        method: 'put',
        url: '/permission',
        data
    })
}