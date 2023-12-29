import React, { useState, useEffect } from 'react'
import { Layout, Input, Icon, Form, Button, Divider, message, Checkbox } from 'antd'
import { withRouter } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import ProForm, { ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import { MobileOutlined, MailOutlined } from '@ant-design/icons';
import '@/style/view-style/login.scss'
import {register,sendPhone} from "../../api/user";

const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

const Register = props => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        setLoading(true);
        // setTimeout(() => {
        //     message.success('注册成功!');
        //     props.history.push('/login')
        // }, 2000)

        await register(values).then(res => {
                console.log(res);
                if(res.status === 200){
                    message.success('注册成功!');
                    props.history.push('/login')
                }else if(res.status === 400){
                    message.error("验证码错误");
                    setLoading(false);
                }else if(res.status === 404){
                    message.error("账号已注册");
                    setLoading(false);
                }else {
                    message.error("服务器错误");
                    setLoading(false);
                }
        })

    };


    return (
        <Layout className='login animated fadeIn'>
            <div className='model'>
                <div className='login-form'>
                    <h3 style={{textAlign:"center"}}>注册虎鱼号</h3>
                    <Divider />
                    <Form
                        name="normal_login"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '请再次输入密码',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两次输入密码不一样'));
                                    },
                                }),
                            ]}
                        >
                            <Input prefix={<LockOutlined className="site-form-item-icon" />}
                                   type="password"
                                   placeholder="请再次输入密码" />
                        </Form.Item>


                        <ProFormText
                            fieldProps={{
                                size: 'middle',
                                prefix: <MobileOutlined />,
                            }}
                            name="phone"
                            placeholder="请输入手机号"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号!',
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: '不合法的手机号格式!',
                                },
                            ]}
                        />
                        <ProFormCaptcha
                            fieldProps={{
                                size: 'middle',
                                prefix: <MailOutlined />,
                            }}
                            captchaProps={{
                                size: 'middle',
                            }}
                            phoneName="phone"
                            name="captcha"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码',
                                },
                            ]}
                            placeholder="请输入验证码"
                            onGetCaptcha={async (phone) => {
                                let res = await sendPhone(phone);
                                console.log(res);
                                if(res.status === 200){
                                    message.success(`手机号 ${phone} 验证码发送成功!`);
                                }else {
                                    message.warning(`手机号 ${phone} 验证码发送失败!`)
                                }
                            }}
                        />

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                                注册
                            </Button>
                            或者 <a href="/live/build/#/login">登录!</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(Register)
