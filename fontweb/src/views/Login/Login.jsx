import React, { useState, useEffect } from 'react'
import { Layout, Input, Icon, Form, Button, Divider, message, Checkbox } from 'antd'
import { withRouter } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import {login} from "../../api/user";
import '@/style/view-style/login.scss'

const Login = props => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        let res = await login(values);
        console.log(res);
        if(res.status === 200){
            localStorage.setItem("token",res.token);
            if(localStorage.getItem("token") !== null){
                setLoading(true);
                // props.history.push('aa/#/live/dist');
                window.location.href = "http://110.40.204.35:9200/live/dist"
                // window.location.href = "http://localhost:8080"
                return
            }
        }else {
            setLoading(true);
            message.error("账号或密码错误")
            setLoading(false)
        }


    };

    return (
        <Layout className='login animated fadeIn'>
            <div className='model'>
                <div className='login-form'>
                    <h3 style={{textAlign:"center"}}>虎鱼直播</h3>
                    <Divider />
                    <Form
                        name="normal_login"
                        initialValues={{ remember: true }}
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
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                忘记密码
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                                登录
                            </Button>
                            或者 <a href="/live/build/#/register">现在注册!</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(Login)
