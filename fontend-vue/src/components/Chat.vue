<template>
    <div class="chat-back">
        <h2 style="text-align: center">交流区</h2>
            <div id="msg_list" style="border:  1px solid gray;float: left;">
            </div>

        <div class="sends">
            <a-input autocomplete="off" id="msg_box" @keyup.enter="checkEnter()" v-model="word" placeholder="请输入些文字"  />
            <a-button @click="send()">发送</a-button>
        </div>

    </div>
</template>

<script>
    import {getMyName} from "../network/base";

    export default {
        name: "Chat",
        data(){
            return{
                uname:"",
                ws:"",
                msg:"",
                word:""
            }
        },
        methods:{
            checkEnter(){
                    this.send();
            },
              listMsg(data){
                  let msg_list = document.getElementById("msg_list");
                  let msg = document.createElement("p");
                  msg.style.textAlign = "left";
                  msg.style.paddingLeft = '10px';
                  msg.style.fontWeight = "bolder";
                  msg.innerHTML = data;
                  msg_list.appendChild(msg);
                  msg_list.scrollTop = msg_list.scrollHeight;
              },
              sendMsg(msg) {
                    let data = JSON.stringify(msg);
                    this.ws.send(data);
              },
              send(){
                  let msg_box = document.getElementById("msg_box");
                  let content = msg_box.value;
                  let reg = new RegExp("\r\n", "g");
                  content = content.replace(reg, "");
                  let msg = {'content': content.trim(), 'type': 'user'};
                  this.sendMsg(msg);
                  // msg_box.value = '';
                  this.word = "";
              },
                dealUser(user_name, type, name_list){
                    let user_list = document.getElementById("user_list");
                    let user_num = document.getElementById("user_num");
                    while(user_list.hasChildNodes()) {
                        user_list.removeChild(user_list.firstChild);
                    }
                    for (let index in name_list) {
                        let user = document.createElement("p");
                        user.innerHTML = name_list[index];
                        user_list.appendChild(user);
                    }
                    user_num.innerHTML = name_list.length;
                    user_list.scrollTop = user_list.scrollHeight;
                    // let change = type === 'login' ? '进入直播间' : '退出直播间';
                    // let data = '用户' + user_name + '：已' + change;
                    // this.listMsg(data);
                }
        },
        beforeMount() {
            //webSocket TODO
            getMyName().then(res => {
                console.log(res)
                this.uname = res.name;
                this.ws = new WebSocket("ws://110.40.204.35:9727/ws");
                this.ws.onopen = () => {
                    console.log(22);
                    let data = ``;
                    this.listMsg(data);
                };
                this.ws.onmessage = (e) => {
                    this.msg = JSON.parse(e.data);
                    console.log(this.msg)
                    let sender, user_name, name_list, change_type;
                    switch (this.msg.type) {
                        case 'system':
                            sender = '系统消息: ';
                            break;
                        case 'user':
                            sender = this.msg.from + ': ';
                            break;
                        case 'handshake':
                            let user_info = {'type': 'login', 'content': this.uname};
                            this.sendMsg(user_info);
                            return;
                        case 'login':
                        case 'logout':
                            user_name = this.msg.content;
                            name_list = this.msg.user_list;
                            change_type = this.msg.type;
                            this.dealUser(user_name, change_type, name_list);
                            return;
                    }
                    let data = sender + this.msg.content;
                    this.listMsg(data);
                };
                this.ws.onerror = ()=> {
                    let data = "系统消息 : 出错了,请退出重试.";
                    this.listMsg(data);
                };
            })
        },
        destroyed() {
            this.ws.close()
            // let msg = this.msg;
            // console.log(msg,98)
            // let  user_name, name_list, change_type;
            //         user_name = this.uname;
            //         name_list = msg.user_list;
            //         change_type = "logout";
            //         this.dealUser(user_name, change_type, name_list);
            //         return;
        }
    }
</script>

<style scoped>
    /*.msg{*/
    /*    text-align: left;*/
    /*    padding-left: 20px;*/

    /*}*/
    .chat-back{
        margin-left:10px;
        text-align: center;
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    #msg_list{
        border: 1px solid gray;
        float: left;
        flex: 3;
        margin-bottom: 20px;
        border-radius: 5px;
        background-color: white;
    }
    .sends{
        display: flex;
    }
</style>
