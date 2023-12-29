import {request} from "./index";

export function register(data) {
    return request({
        url:'/users/register',
        method:'post',
        data
    })
}

export function sendPhone(data) {
    return request({
        url:"/users/sendPhone",
        method: 'post',
        data:{
            phone:data
        }
    })
}

export function login(data) {
    return request({
        url:"/users/login",
        method:'post',
        data
    })
}
