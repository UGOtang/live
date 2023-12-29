<template>
    <div class="back">
        <div class="a">
            <div class="b">
                <a-form :form="form" class="form" @submit="handleSubmit">
                    <h1>修改密码</h1>
                    <a-form-item v-bind="formItemLayout" label="旧密码">
                        <a-input
                                v-decorator="[
          'oldPassword',
          {
            rules: [
              {
                required: true,
                message: '请输入旧密码',
              },
            ],
          },

        ]"
                                type="password"
                        />
                    </a-form-item>
                    <a-form-item v-bind="formItemLayout" label="新密码" has-feedback>
                        <a-input
                                v-decorator="[
          'newPassword',
          {
            rules: [
              {
                required: true,
                message: '请输入新密码',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
                                type="password"
                        />
                    </a-form-item>
                    <a-form-item v-bind="formItemLayout" label="请再次输入新密码" has-feedback>
                        <a-input
                                v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '请输入与上面相同的新密码',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
                                type="password"
                                @blur="handleConfirmBlur"
                        />
                    </a-form-item>
                    <a-form-item v-bind="tailFormItemLayout">
                        <a-button type="primary" html-type="submit">
                            修改密码
                        </a-button>
                        <a-button style="margin-left: 10px;">
                            <router-link to="/">
                                返回首页
                            </router-link>
                        </a-button>
                    </a-form-item>
                </a-form>
            </div>
            <div class="c">
                <!-- --i是用来计算平面圆柱的动效延迟和距离的
                --w则是用来计算平面圆柱的宽度 -->
                <div class="d" style="--i:1;--w:1.5"></div>
                <div class="d" style="--i:2;--w:1.6"></div>
                <div class="d" style="--i:3;--w:1.4"></div>
                <div class="d" style="--i:4;--w:1.7"></div>
                <div class="e" style="--i:1"></div>
            </div>
            <!-- 设置二维码 -->
            <div class="f"></div>
        </div>
    </div>




</template>

<script>
    import {ChangePass} from "../network/base";
    export default {
        name:"MyInfo",
        data() {
            return {
                confirmDirty: false,
                autoCompleteResult: [],
                formItemLayout: {
                    labelCol: {
                        xs: { span: 24 },
                        sm: { span: 8 },
                    },
                    wrapperCol: {
                        xs: { span: 24 },
                        sm: { span: 16 },
                    },
                },
                tailFormItemLayout: {
                    wrapperCol: {
                        xs: {
                            span: 24,
                            offset: 0,
                        },
                        sm: {
                            span: 16,
                            offset: 8,
                        },
                    },
                },
            };
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'register' });
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        ChangePass(values).then(res => {
                            console.log(res)
                            if(res.status === 400){
                                this.$message.error('旧密码错误');
                            }else {
                                this.$message.success("修改成功,正在跳转...")
                                setTimeout(() => {
                                    this.$router.push('/')
                                },1000)
                            }
                        })
                    }
                });
            },
            handleConfirmBlur(e) {
                const value = e.target.value;
                this.confirmDirty = this.confirmDirty || !!value;
            },
            compareToFirstPassword(rule, value, callback) {
                const form = this.form;
                if (value && value !== form.getFieldValue('newPassword')) {
                    callback('两次密码输入的不一样');
                } else {
                    callback();
                }
            },
            validateToNextPassword(rule, value, callback) {
                const form = this.form;
                if (value && this.confirmDirty) {
                    form.validateFields(['confirm'], { force: true });
                }
                callback();
            },
        }
    };
</script>

<style scoped>
    .back{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        /*justify-content: center;*/
        align-items: center;
        background-image: url("../assets/21.jpg");
        background-size: 100% 100%;
        background-attachment: fixed;
        background-repeat:no-repeat;
    }
    .form{
        /*width: 25%;*/
        /*margin: auto;*/
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .form h1 {
        text-align: center;
    }
    .form:last-child a-botton{
        text-align: center;
    }
    .a{
        position: relative;
        width: 700px;
        height: 400px;
        border: #fff 10px solid;
        background-color: rgb(120,140,200);
        top: 120px;
        border-radius: 20px;
        overflow: hidden;
    }
    .b{
        position: absolute;
        width: 450px;
        height: 300px;
        left: 0;
        /*margin: 75px 50px;*/
        transition: 1s;
    }
    /*.b a{*/
    /*    text-decoration: none;*/
    /*    color: #fff;*/
    /*    font: 900 28px '';*/
    /*}*/
    .b h2{
        /* 鼠标放开时的动画，第一个值是动画的过渡时间
        第二个值是延迟一秒后执行动画 */
        transition: .5s 1s;
        opacity: 0;
        color: rgb(30,210,200);
    }
    .b span{
        transition: .5s 1s;
        color: #fff;
        font: 500 15px '';
        position: absolute;
        top: 70px;
    }
    .c{
        position: absolute;
        top: -130px;
        right: -240px;
    }
    .d,.e{
        position: absolute;
        right: calc(var(--i)*100px);
        width: calc(var(--w)*40px);
        height: 500px;
        overflow: hidden;
        border-radius: 100px;
        transform: rotateZ(220deg) translate(0,0);
        background: rgb(240,220,150);
        transition: .5s .5s;
    }
    .d:nth-child(2){
        background: rgb(240,190,230);
    }
    .e{
        left: -470px;
        top: -140px;
        width: 70px;
        background-color: rgb(90,220,150);
    }
    .a:hover .c div{
        /* 设置延迟动画 */
        transition: .5s calc(var(--i)*.1s);
        /* 移动的轨迹 */
        transform: rotateZ(220deg) translate(-200px,400px);
    }
    .a:hover .b{
        transition: 1s .5s;
        left: 70px;
    }
    .a:hover .b span{
        transition: 1s .5s;
        top: 105px;
    }
    .a:hover .b h2{
        transition: 1s .5s;
        opacity: 1;
    }
    .f{
        width: 250px;
        height: 250px;
        position: absolute;
        /*background-image: url("goat.png");*/
        background-size: cover;
        margin: 70px;
        opacity: 0;
        transition: .5s;
        z-index: -2;
    }
    .a:hover .f{
        transition: 1s 1.3s;
        opacity: 1;
    }
</style>
