<template>
    <div class="back">

            <a-form-model class="form" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                <h1>设置直播间</h1>
                <a-form-model-item label="直播间名字">
                    <a-input v-model="form.name" />
                </a-form-model-item>
                <a-form-model-item label="直播间分类">
                    <a-radio-group v-model="form.sort">
                        <a-radio value="0">
                            端游竞技
                        </a-radio>
                        <a-radio value="1">
                            星秀
                        </a-radio>
                        <a-radio value="2">
                            户外
                        </a-radio>
                        <a-radio value="3">
                            日常
                        </a-radio>
                        <a-radio value="4">
                            手游休闲
                        </a-radio>
                        <a-radio value="5">
                            其他
                        </a-radio>
                    </a-radio-group>
                </a-form-model-item>
                <a-form-model-item label="修改直播间封面">
                    <a-input type="file" ref="clearFile" @change="pushFile($event)" class="add-file-right-input" accept=".png,.jpg,.jpeg" />
                </a-form-model-item>
                <a-form-model-item label="目前直播间封面">
                    <img :src="form.coverImg" style="width: 240px;height: 150px;" alt="" />
                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary" @click="onSubmit">
                        进入我的直播间
                    </a-button>
                    <a-button style="margin-left: 10px;">
                        <router-link to="/">
                            返回首页
                        </router-link>
                    </a-button>
                </a-form-model-item>
            </a-form-model>


    </div>

</template>

<script>
    import {getMyRoom,ChangeImg,GetImg,SetRoom} from "../network/base";

    export default {
        name: "MyRoom",
        data() {
            return {
                labelCol: { span: 6},
                wrapperCol: { span: 13 },
                form: {
                    name: '',
                    sort: '',
                    coverImg:''
                },

            };
        },
        beforeMount() {
          getMyRoom().then(res => {
              // console.log(res);
              let {img_url,name,sort} = res.data[0];
              this.form.coverImg = img_url;
              this.form.name = name;
              this.form.sort = sort
          })
        },
        methods: {
            onSubmit() {
                console.log('submit!', this.form);
                SetRoom(this.form).then(res => {
                    console.log(res);
                    if(res.status === 200){
                        this.$router.push("/mySecret")
                    }
                })
            },
            pushFile(event){
                let info = event.target.files[0];
                if(info){
                    let reader = new FormData();
                    reader.append('file',info);
                    reader.append('chunk','0');
                    ChangeImg(reader).then(res => {
                        console.log(res);
                        if(res.status === 200){
                            GetImg().then(res => {
                                console.log(res,2);
                                setTimeout(() => {
                                    this.form.coverImg = res.img_url
                                },500)
                            })
                        }
                    })
                }
            }
        },
    }
</script>

<style scoped>
    .back{
        width: 100%;
        height: 100%;
        background-image: url("../assets/9.jpg");
        background-size: 100% 100%;
        background-attachment: fixed;
        background-repeat:no-repeat;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /*align-items: center;*/
    }
    /*.center{*/
    /*    width: 35%;*/
    /*    height: 100%;*/
    /*    display: flex;*/
    /*    flex-direction: column;*/
    /*    justify-content: center;*/
    /*    align-items: center;*/
    /*    background: white;*/
    /*    opacity: 0.5;*/
    /*}*/
    .form{
        border-radius: 8px;
        width: 35%;
        margin: auto;
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: white;
        opacity: 0.9;
    }
    .form h1 {
        text-align: center;
    }
    .form:last-child{
        text-align: center;
    }
</style>
