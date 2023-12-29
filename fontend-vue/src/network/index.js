import axios from 'axios'

if(localStorage.getItem("token") !== null){
    axios.defaults.headers.common['th-auth'] = localStorage.getItem("token");
}


export function request(config){
    const instance1 = axios.create({
        baseURL:'http://110.40.204.35:9723'
        // baseURL:'http://localhost:3002'
    });

    instance1.interceptors.request.use(config => {
        return config;
    },err => {

    });

    instance1.interceptors.response.use(res => {
        return res.data
    },err => {

    });

    return instance1(config)
}
