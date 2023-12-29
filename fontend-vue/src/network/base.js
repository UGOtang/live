import {request} from "./index";

export function allSort() {
    return request({
        url:"/allsort",
        method:'get'
    })
}

export function getOneSort(id) {
    return request({
        url:`/getOneSort?id=${id}`,
        method:'get'
    })
}

export function getMyRoom() {
    return request({
        url:"/room/getmyroom",
        method:"get"
    })
}

export function ChangeImg(data) {
    return request({
        url:"/room/changeImg",
        method:'post',
        data,
        headers:{"Content-Type": "multipart/form-data" }
    })
}

export function GetImg() {
    return request({
        url:'/room/getImg',
        method:"get"
    })
}

export function SetRoom(data) {
    return request({
        url:"/room/setRoom",
        method:"post",
        data
    })
}

export function ChangePass(data) {
    return request({
        url:"/changePass",
        method:"post",
        data
    })
}

export function getSecret() {
    return request({
        url:"/getSecret",
        method:"get"
    })
}

export function IsFollow(RoomId) {
    return request({
        url:`/room/isFollow?RoomId=${RoomId}`,
        method:"get"
    })
}

export function ToFollow(RoomId) {
    return request({
        url:`/room/toFollow?RoomId=${RoomId}`,
        method:"get"
    })
}

export function cancelFollow(RoomId) {
    return request({
        url:`/room/cancelFollow?RoomId=${RoomId}`,
        method:"get"
    })
}

export function searchRoom(RoomName) {
    return request({
        url:`/searchRoom?name=${RoomName}`,
        method:"get"
    })
}

export function queryOrder(data) {
    return request({
        url:`/queryOrder`,
        method:"post",
        data
    })
}

export function getMyName() {
    return request({
        url:"/getMyName",
        method:'get'
    })
}

export function getRoomName(RoomId) {
    return request({
        url:`/getRoomName?RoomId=${RoomId}`,
        method:"get"
    })
}

export function getAllGift() {
    return request({
        url:`/room/getAllGift`,
        method:'get'
    })
}

export function getAvatar() {
    return request({
        url:"/getAvatar",
        method:"get"
    })
}

export function setAvatar(data) {
    return request({
        url:"/setAvatar",
        method:"post",
        data,
        headers:{"Content-Type": "multipart/form-data" }
    })
}

export function getRoomUser(RoomId) {
    return request({
        url:`/room/getRoomUser?RoomId=${RoomId}`,
        method:"get"
    })
}
