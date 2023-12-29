<template>
    <div class="Avatar-back">
        <div class="cards">
            <h2>修改头像</h2>
            <p>点击头像进行修改</p>
            <a-upload
                    name="avatar"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    :header="this.header"
                    action="http://110.40.204.35:9723/setAvatar"
                    :before-upload="beforeUpload"
                    @change="handleChange"
            >
                <img class="img-ava" v-if="imageUrl" :src="this.imageUrl" alt="avatar" />
                <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">
                        上传
                    </div>
                </div>
            </a-upload>
            <div class="bottom">
                <a-button type="primary" @click="sendImg()">
                    修改
                </a-button>
                <a-button>
                    <router-link to="/">
                        返回主页
                    </router-link>
                </a-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {getAvatar, setAvatar} from "../network/base";

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    export default {
        name: "ChangeAvatar",
        data() {
            return {
                loading: false,
                imageUrl: '',
                header:{
                    "th-auth":localStorage.getItem("token")
                }
            };
        },
        mounted() {
            getAvatar().then(res => {
                console.log(res)
                this.imageUrl = res.avatar
            })
        },
        methods:{

            /*将base64转换为file*/
            convertBase64UrlToBlob(urlData){
                let arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {type:mime});
            },
            sendImg(){
                let formData = new FormData() ;
                let blobDate = this.convertBase64UrlToBlob( this.imageUrl );
                formData.append("file", blobDate); // 文件对象
                setAvatar(formData).then(res => {
                    console.log(res);
                    if(res.status === 200){
                        this.$message.success("头像修改成功")
                    }
                })
            },
            handleChange(info) {
                if (info.file.status === 'uploading') {
                    this.loading = true;
                    return;
                }
                if (info.file.status === 'done') {
                    // Get this url from response in real world.
                    getBase64(info.file.originFileObj, imageUrl => {
                        this.imageUrl = imageUrl;
                        this.loading = false;
                    });
                }
            },
            beforeUpload(file) {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                    this.$message.error('You can only upload JPG file!');
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('Image must smaller than 2MB!');
                }
                return isJpgOrPng && isLt2M;
            },
        }
    }
</script>

<style scoped>
    .Avatar-back{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content:space-evenly;
        flex-direction: column;
        align-items: center;
        background-image: url("../assets/3.jpg");
        background-size: 100% 100%;
        background-attachment: fixed;
        background-repeat:no-repeat;
    }
    .avatar-uploader{
        width: 128px;
        height: 128px;
        display: flex;
        justify-content: center;
    }
    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }
    .bottom{
        display: flex;
        justify-content: space-around;
        width: 200px;
    }
    .cards{
        width: 500px;
        height: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid;
        border-radius: 8px;
        justify-content: space-around;
        background-color: aliceblue;
    }
    .img-ava{
        width: 100px;
        height: 100px;
    }
</style>
