import {request} from "./index";

export function allSort() {
    return request({
        url:'/allsort',
        method:'get'
    })
}
