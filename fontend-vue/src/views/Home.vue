<template>
    <div id="backs">
        <div class="header">
            <h2>虎鱼直播平台</h2>
            <div class="sort">
            <p  v-for="val in Sort" @click="showRoom(val.priority)" :key="val.priority" class="tag">
                {{val.sorted}}
            </p>
            </div>
            <a-input-search class="header-input"
                            placeholder="搜索直播间" enter-button @search="onSearch"/>
            <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <a-avatar class="icon" size="large" :src="this.Avatar" />
            </a>
            <a-menu slot="overlay" class="menus">
                <a-menu-item>
                    <router-link to="/myroom"><a>进入我的直播间</a></router-link>
                </a-menu-item>
                <a-menu-item>
                    <router-link to="/myinfo"><a>修改密码</a></router-link>
                </a-menu-item>
                <a-menu-item>
                    <router-link to="/changeAvatar"><a>修改头像</a></router-link>
                </a-menu-item>
                <a-menu-item>
                    <a @click="logOut()">退出登录</a>
                </a-menu-item>
            </a-menu>
        </a-dropdown>
        </div>
        <div class="contain">
                    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }" id="content"
                    >
                        <div v-if="room.length === 0">
                            暂时没有直播间
                        </div>
                        <a-card v-else hoverable style="width: 240px;height: 250px;margin: 10px" v-for="i in room"
                                :key="i.id" @click="intoRoom(i.id)">
                            <img
                                    slot="cover"
                                    alt="example"
                                    :src="i.img_url"
                                    style="width: 240px;height: 150px"
                            />
                            <a-card-meta :title="i.name">
                                <template slot="description">
                                    粉丝:{{i.followers}}
                                </template>
                            </a-card-meta>
                        </a-card>
                    </div>
        </div>
    </div>
</template>

<script>
    import HeaderBar from "../components/HeaderBar";
    import {allSort, getAvatar, getOneSort, searchRoom} from "../network/base";
    export default {
        name: "Home",
        data(){
            return{
                Sort:[],
                room:[],
                Avatar:""
            }
        },
        components:{
            HeaderBar
        },
        beforeMount() {
            if(localStorage.getItem("token") === null){
                window.location.href = "http://110.40.204.35:9200/live/build/#/login"
            }
            allSort().then((res,rej) => {
                console.log(res);
                this.Sort.push(...res.data)
            });
            getAvatar().then(res => {
                this.Avatar = res.avatar
            })

        },
        methods:{
            logOut(){
                localStorage.removeItem("token");
                window.location.href = "http://110.40.204.35:9200/live/build/#/login"
            },
            onSearch(value) {
                console.log(value);
                searchRoom(value).then(res => {
                    console.log(res)
                    this.room = [];
                    this.room.push(...res.data)
                })
            },
            showRoom(id){
                console.log(id)
                getOneSort(id).then(res => {
                    console.log(res);
                    this.room = [];
                    this.room.push(...res.data)
                })
            },
            intoRoom(id){
                this.$router.push(`/liveRoom/${id}`)
            },
            onCollapse(collapsed, type) {
                console.log(collapsed, type);
            },
        }
    }
</script>

<style scoped>
    #backs{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
    }
    .header{
        display: flex;
        flex-direction: row;
        height: 60px;
        justify-content: space-around;
        /*border: 1px solid gray;*/
        background-color: skyblue;
        background-image: url("../assets/8.jpg");
        background-size: 100% 100%;
        background-attachment: fixed;
        background-repeat:no-repeat;
    }
    .header .header-input{
        margin-top: 10px;
        position: relative;
        margin: auto;
    }
    .header h2{
        line-height: 60px;
        position: relative;
        left: 5%;
        /*color: coral;*/
    }
    .header-input{
        width: 30%;
    }

    .icon{
        position: fixed;
        top: 0.2rem;
        right: 1rem;
    }
    .menus{
        position: fixed;
        top: 65px;
        right: 0;
    }
    .menus a {
        text-align: center;
    }

    .sort{
        display: flex;
        flex-direction: row;
        align-items: center;
        /*margin-top: 1rem;*/
        margin-left: 130px;
    }
    .sort .tag{
        text-align: center;
        line-height: 4rem;
        width: 50%;
        height: 4rem;
        border: none;
        /*background-color: white;*/
        margin: 1rem;
        font-size: 16px;
    }

    .tag:hover{
        cursor: pointer;
        color: red;
        border: none;
    }
    .contain{
        width: 100%;
        height: 100%;
        background-image: url("../assets/33.jpg");
        background-size: 100% 100%;
        background-attachment: fixed;
        background-repeat:no-repeat;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    #content{
        width: 900px;
        height: 100%;
        opacity: 0.95;
        display: flex;
        flex-direction: row;
    }
</style>
