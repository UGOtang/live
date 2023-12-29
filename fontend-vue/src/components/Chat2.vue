<template>
    <div style="width: 800px;height: 600px;margin: 30px auto;text-align: center">
        <div style="width: 800px;border: 1px solid gray;height: 300px;">
            <div style="width: 200px;height: 300px;float: left;text-align: left;">
                <p><span>当前在线:</span><span id="user_num">0</span></p>
                <div id="user_list" style="overflow: auto;">
                </div>
            </div>
            <div id="msg_list" style="width: 598px;border:  1px solid gray; height: 300px;overflow: scroll;float: left;">
            </div>
        </div>
        <textarea id="msg_box" rows="6" cols="50"></textarea><br>
        <input type="button" value="发送" @click="send()">
    </div>
</template>

<script>
    import {getMyName} from "../network/base";

    export default {
        name: "Chat",
        data(){
            return{
                uname:"",
                ws:""
            }
        },
        methods:{
              listMsg(data){
                  let msg_list = document.getElementById("msg_list");
                  let msg = document.createElement("p");
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
                  msg_box.value = '';
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
                    let change = type === 'login' ? '上线' : '下线';
                    let data = '系统消息: ' + user_name + ' 已' + change;
                    this.listMsg(data);
                }
        },
        beforeMount() {
            //webSocket TODO
            getMyName().then(res => {
                console.log(res)
                this.uname = res.name;
                this.ws = new WebSocket("ws://127.0.0.1:3002/ws");
                this.ws.onopen = () => {
                    console.log(22);
                    let data = ``;
                    this.listMsg(data);
                };
                this.ws.onmessage = (e) => {
                    let msg = JSON.parse(e.data);
                    console.log(msg)
                    let sender, user_name, name_list, change_type;
                    switch (msg.type) {
                        case 'system':
                            sender = '系统消息: ';
                            break;
                        case 'user':
                            sender = msg.from + ': ';
                            break;
                        case 'handshake':
                            let user_info = {'type': 'login', 'content': this.uname};
                            this.sendMsg(user_info);
                            return;
                        case 'login':
                        case 'logout':
                            user_name = msg.content;
                            name_list = msg.user_list;
                            change_type = msg.type;
                            this.dealUser(user_name, change_type, name_list);
                            return;
                    }
                    let data = sender + msg.content;
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
                    let msg = JSON.parse(e.data);
                    console.log(msg,98)
                    let  user_name, name_list, change_type;
                            user_name = this.uname;
                            name_list = msg.user_list;
                            change_type = "logout";
                            this.dealUser(user_name, change_type, name_list);
                            return;
            }
    }
</script>

<style scoped>
    p {
        text-align: left;
        padding-left: 20px;
    }
</style>
