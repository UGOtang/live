<template>
    <div>
        <p>服务器:<span style="font-family: 'Adobe Garamond Pro';color: black;">rtmp://110.40.204.35:1935/live/</span></p>
        <p>串流密钥:<span style="font-family: 'Adobe Garamond Pro';color: black;">{{secret}}</span></p>
        <h3>请自行使用OBS进行推流</h3>
        <a-button>
            <router-link to="/">
                返回首页
            </router-link>
        </a-button>
    </div>
</template>

<script>
    import {getSecret} from "../network/base";

    export default {
        name: "MySecret",
        data(){
            return{
                secret:""
            }
        },
        mounted() {
            getSecret().then(res =>{
                console.log(res)
                if(res.status === 200){
                    this.secret = res.data.data
                }
            })
        }
    }
</script>

<style scoped>
    div{
        margin: auto;
        width: 50%;
        height: 60%;
        padding-top: 10%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    p{
        color: red;
        font-size: 1rem;
    }
</style>
