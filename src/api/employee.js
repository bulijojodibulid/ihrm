import request from '@/utils/request.js'

/**
 * 
 * @param {*} params {page, pageSize, keywork, departmentId:必须的} 
 * @returns 
 */
export function getEmployee (params) {
    return request({
        url: '/emp',
        method: 'get',
        params
    })
}

export function exportEmp () {
    return request({
        method: 'get',
        url: '/export',
        responseType:'blob'
    })
}

export function getTemplate () {
    return request({
        method: 'get',
        url: '/template',
        responseType: 'blob'
    })
}

export function importEmp(data){
    return request({
        method: 'post',
        url: '/template',
        data
    })
}

export function delEmp(id){
    return request({
        method: 'delete',
        url: `/employee/${id}`
    })
}

export function addEmp(data){
    return request({
        method: 'post',
        url: '/employee',
        data
    })
}

export function getOneEmp(id){
    return request({
        method: 'get',
        url: '/employee',
        params: {
            id
        }
    })
}

export function updateEmp(data){
    return request({
        method: 'put',
        url: '/employee',
        data
    })
}

export function updateRole(empId, roleIds){
    const roleIdsUrl = roleIds.length !== 0 ? roleIds.join(',') : '0'
    return request({
        method: 'put',
        url: `/employee/${empId}/${roleIdsUrl}`
    })
}

export function getRoleIds(empId){
    return request({
        method: 'get',
        url: `/roleIds/${empId}`,
    })
}