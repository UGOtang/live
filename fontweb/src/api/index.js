import axios from 'axios'

// axios.defaults.headers.common['th-auth'] = localStorage.getItem("token");


export function request(config){

    const instance1 = axios.create({
        baseURL:'http://110.40.204.35:9723'
        // baseURL:"http://localhost:9723"
    })

//axios拦截器
    instance1.interceptors.request.use(config => {
        // console.log(config);
        return config;
    },err => {

    })

    instance1.interceptors.response.use(res => {
        return res.data
    },err => {

    })

    return instance1(config)   //返回promis，所以可以在实例后面直接then
}
