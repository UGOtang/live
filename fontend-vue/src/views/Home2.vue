<template>
    <a-layout id="components-layout-demo-responsive">
        <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <a-avatar class="icon" size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </a>
            <a-menu slot="overlay" class="menus">
                <a-menu-item>
                    <router-link to="/myroom"><a>进入我的直播间</a></router-link>
                </a-menu-item>
                <a-menu-item>
                    <router-link to="/myinfo"><a>修改密码</a></router-link>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:">退出登录</a>
                </a-menu-item>
            </a-menu>
        </a-dropdown>

        <a-layout-sider
                breakpoint="lg"
                collapsed-width="0"
                @collapse="onCollapse"
                theme="light"
        >
            <h3>分类直播</h3>
            <div class="sort">
                <a-tag :color="getColor()" v-for="val in Sort" @click="showRoom(val.priority)" :key="val.priority" class="tag">
                    {{val.sorted}}
                </a-tag>
            </div>
        </a-layout-sider>
        <a-layout >
            <a-layout-header :style="{ background: '#fff', padding: 0 }">虎鱼直播平台</a-layout-header>
            <a-layout-content :style="{ margin: '8px 8px 0' }">
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
            </a-layout-content>
        </a-layout>
        </a-layout>
</template>
<script>
    import {allSort,getOneSort} from "../network/base";

    export default {
        data(){
            return{
                Sort:[],
                colorArr:["red","blue","green","gold","lime","geekblue","cyan"],
                room:[]
            }
        },
        beforeMount() {
            allSort().then((res,rej) => {
                console.log(res);
                this.Sort.push(...res.data)
            })
        },
        methods: {
            intoRoom(id){
                this.$router.push(`/liveRoom/${id}`)
            },
            onCollapse(collapsed, type) {
                console.log(collapsed, type);
            },
            onBreakpoint(broken) {
                console.log(broken);
            },
            showRoom(id){
                console.log(id)
                getOneSort(id).then(res => {
                    console.log(res);
                    this.room = [];
                    this.room.push(...res.data)
                })
            },
            getColor(){
                return this.colorArr[Math.floor((Math.random()*(this.colorArr.length-1)))];
            }
        },
    };
</script>

<style scoped>
    #components-layout-demo-responsive{
        width: 100%;
        height: 100%;
    }
    #content{
        height: 100%;
        display: flex;
        flex-direction: row;
    }
    h3{
        text-align: center;
        font-family: cursive;
        margin-top: 20px;
    }
    .tag:hover{
        cursor: pointer;
        border: white;
    }
    .sort{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1rem;
    }
    .sort .tag{
        text-align: center;
        line-height: 4rem;
        width: 50%;
        height: 4rem;
        margin: 1.5rem;
    }
    .icon{
        position: fixed;
        top: 0.5rem;
        right: 1rem;
    }
    .ant-layout-header{
        text-align: center;
        font-size: 1.5rem;
    }
    .menus{
        position: fixed;
        top: 65px;
        right: 0;
    }
    .menus a {
        text-align: center;
    }
</style>
