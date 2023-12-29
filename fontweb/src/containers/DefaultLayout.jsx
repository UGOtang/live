import React, { useState, useEffect, useReducer } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import {Tag, Avatar, Menu,Dropdown,message } from 'antd'
import ProCard from '@ant-design/pro-card';
import '@ant-design/pro-card/dist/card.min.css'
import "@/style/view-style/default.scss"
import {getItem} from "../utils/other.js"
import { AntDesignOutlined } from '@ant-design/icons';
import {allSort} from "../api/base";
import {useMount,useUpdate,useRequest} from 'ahooks'
import {set} from "husky/lib";


const DefaultLayout = (props) => {
    const [tokens,setToken] = useState(localStorage.getItem("token"));
    const [sort,setSort] = useState([]);
    const [rooms,setRooms] = useState([]);
    // const [sort, dispatch] = useReducer((state,action) => {
    //     switch(action.type) {
    //         case 'all':
    //             return action.sorts;
    //         default:
    //             return state;
    //     }
    // },[]);

    const colorArr = ["red","blue","green","gold","lime","geekblue","cyan"];

    const { data, loading } = useRequest(async() => {
        console.log("aaa");
        let res = await allSort();
        if(res.status === 200){
            setSort(res.data)
        }
    }, {
        refreshDeps: [tokens],
    });

    useMount(() => {
        console.log("mount");
        setToken(localStorage.getItem("token"));
        if (!localStorage.getItem('token')){
             props.history.push('/login');
        }
    });
   // useMount( () => {
   //     console.log("mount")
   //     async function fetchData(){
   //     if (!localStorage.getItem('token')) {
   //          props.history.push('/login');
   //          return
   //     }
   //         let res = await allSort();
   //         console.log(res)
   //         if(res.status === 200){
   //             dispatch({
   //                 type:'all',
   //                 sorts:res.data
   //             })
   //         }
   //     }
   //      fetchData()
   //  });

    const loginOut = () => {
        localStorage.clear();
        props.history.push('/login');
        message.success('登出成功!');
    };

    const requestRoom = (key) => {
        console.log(key)
    };


    // console.log(sort);


    const myMenu = (
        <Menu>
            <Menu.Item key="0" style={{textAlign:"center"}}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    进入我的直播间
                </a>
            </Menu.Item>
            <Menu.Item key="1" style={{textAlign:"center"}}>
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                   个人中心
                </a>
            </Menu.Item>
            <Menu.Item key="2" style={{textAlign:"center"}}>
                <a rel="noopener noreferrer" onClick={loginOut}>
                    退出登录
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <ProCard split="vertical">
            <ProCard title="分类直播" colSpan="20%">
                <div className='left-big'>
                    {loading?"":sort.map((item,index) => {
                        return <Tag key={index} color={getItem(colorArr)} onClick={requestRoom(index)}>{item.sorted}</Tag>
                    })}
                </div>
            </ProCard>
            <ProCard title="直播间" headerBordered>
                <Dropdown overlay={myMenu}>
                <Avatar
                    className="myIcon"
                    size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 40,
                        xl: 40,
                        xxl: 40 ,
                    }}
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    icon={<AntDesignOutlined />}
                />
                </Dropdown>
                <>
                    <ProCard style={{ marginTop: 8 }} gutter={[16, 16]} wrap>
                        <ProCard colSpan={{ xs: 24, sm: 8, md: 8, lg: 8, xl: 8 }} layout="center" bordered>
                            Col
                        </ProCard>
                        <ProCard colSpan={{ xs: 24, sm: 8, md: 8, lg: 8, xl: 8 }} layout="center" bordered>
                            Col
                        </ProCard>
                        <ProCard colSpan={{ xs: 24, sm: 8, md: 8, lg: 8, xl: 8 }} layout="center" bordered>
                            Col
                        </ProCard>
                        <ProCard colSpan={{ xs: 24, sm: 8, md: 8, lg: 8, xl: 8 }} layout="center" bordered>
                            Col
                        </ProCard>
                    </ProCard>
                </>
            </ProCard>
        </ProCard>
    )
};

export default withRouter(DefaultLayout)
