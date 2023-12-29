<template>
    <div class="back">
        <div class="header">
            <router-link to="/"><a-button class="back-btn" type="primary"><a-icon type="left" />返回主页</a-button></router-link>
            <a-dropdown>
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                    <a-avatar class="icon" size="large" :src="Avatar" />
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
        <div v-if="!errs" class="big-play">
            <div class="content">
                <div class="content-bar">
                    <div class="header-info">
                        <img :src="RoomUrl" alt="" style="height: 60px;width: 60px">
                        <div>
                            <h2>{{RoomName}}</h2>
                            <p>{{RoomUser}}</p>
                        </div>
                    </div>

                    <a-button type="danger" class="follow" v-if="!this.isFollowing" @click="toFollow">
                        + 关注
                    </a-button>
                    <a-button  class="follow" v-else @click="cancelFollow">
                        已关注
                    </a-button>
                </div>
                <div class="content-center">
                    <vue-aliplayer-v2  class="player" @error="playErr" :source="url"
                                       :options="options" ref="VueAliplayerV2"></vue-aliplayer-v2>
                </div>
                <div class="content-gift">
                    <Gift></Gift>
                </div>
            </div>
            <div class="chatRoom">
                <Chat></Chat>
            </div>
        </div>
        <div v-else class="err">
            <h2>主播正在来的路上</h2>
            <a-button type="primary">
                <router-link to="/">
                    返回首页
                </router-link>
            </a-button>
        </div>
    </div>

</template>

<script>
    import {cancelFollow, IsFollow, ToFollow, getMyName, getRoomName, getAvatar, getRoomUser} from "../network/base";
    import Chat from "../components/Chat";
    import Gift from "../components/Gift";
    export default {
        name: "liveRoom",
        components:{
            Chat,
            Gift
        },
        data(){
            return{
                id:"",
                url:"",
                RoomName:"",
                RoomUser:"",
                RoomUrl:"",
                Avatar:"",
                errs:false,
                options:{
                    isLive:true,
                    width:"100%",
                    height:"500px",
                    cover:"",

                },
                isFollowing:false
            }
        },
        methods:{
            logOut(){
                localStorage.removeItem("token")
                window.location.href = "http://110.40.204.35:9200/live/build/#/login"
            },
            playErr(){
              this.errs = true
            },
            toFollow(){
                ToFollow(this.id).then(res => {
                    if(res.status === 200){
                        this.isFollowing = true;
                        this.$message.success("关注成功")
                    }
                })
            },
            cancelFollow(){
                this.$confirm({
                    title:"提示",
                    content:"客官，真的要取关吗",
                    okText:"取关",
                    cancelText:"我再想想",
                    onOk:() => {
                        cancelFollow(this.id).then(res => {
                            if(res.status === 200){
                                this.isFollowing = false
                                this.$message.success("取关成功")
                            }
                        })
                    }
                })
            }
        },
        beforeMount() {
            let href = window.location.href;
            let start = href.lastIndexOf("/")+1;
            let end= href.length;
            this.id = href.slice(start,end);
            this.url = `http://110.40.204.35:7001/live/${href.slice(start,end)}.flv`;
            IsFollow(this.id).then(res=>{
                console.log(res)
                if(res.status === 200){
                    this.isFollowing = res.isFollow
                }
            });
            getRoomName(this.id).then(res => {
                this.RoomName = res.RoomName
            });
            getAvatar().then(res => {
                console.log(res)
                if(res.status === 200){
                    this.Avatar = res.avatar
                }
            });
            getRoomUser(this.id).then(res => {
                console.log(res)
                if(res.status === 200){
                    this.RoomUser = res.user
                    this.RoomUrl = res.url
                }
            })
        }
    }
</script>

<style scoped>
    .back-btn{
        margin-left: 20px;
    }
    .header{
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 60px;
        justify-content: space-between;
        align-items: center;
        background-image: url("../assets/31.jpg");
        background-size: 100% 100%;
        background-attachment: fixed;
        background-repeat:no-repeat;
        border-bottom: 1px solid #e5e4e4;
    }
    .back{
        height: 100%;
        background-image: url("../assets/31.jpg");
        background-size: 100% 100%;
        background-attachment: fixed;
        background-repeat:no-repeat;
        overflow: hidden;
    }
    /*.player{*/
    /*    margin: auto;*/
    /*    position: relative;*/
    /*    top: 5rem;*/
    /*}*/
    .err{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        flex-direction: column;
    }
    .big-play{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        width: 100%;
        margin-top: 60px;
    }
    .follow {
        margin-left: 43%;
        margin-bottom: 0.5rem;
    }
    .content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 2.5;
        border-right: 1px solid #e5e4e4 ;
        /*margin-top: 3rem;*/
    }
    .chatRoom{
        flex: 1;
        height: 585px;
        margin-right: 10px;
    }
    .content-bar{
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        /*background-color: aliceblue;*/
        margin-left: 10px;
        border-radius: 6px;
        height: 95px;
    }
    .content-bar div div {
        padding-left: 2rem;
    }
    .content-center{
        margin-left: 10px;
    }
    .content-gift{
        margin-top: 1rem;
    }
    .header-info{
        display: flex;
    }
</style>
