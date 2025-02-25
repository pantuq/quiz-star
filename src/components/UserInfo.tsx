import React, { memo, FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router/index.tsx'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user.ts'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { removeToken } from '../utils/user-token.ts'
import useGetUserInfo from '../hooks/useGetUserInfo.ts'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/useReducer.ts'

const UserInfo: FC = memo(function UserInfo() {
    const nav = useNavigate()
    const dispatch = useDispatch()

    // const { data } = useRequest(getUserInfoService)
    // const { username, nickname } = data || {}
    const { username, nickname } = useGetUserInfo()

    function logout(){
        dispatch(logoutReducer())       //清空的redux中user的数据
        removeToken()       // 删除token
        message.success('退出成功')
        nav(LOGIN_PATHNAME)
    }

    const UserInfo = (
        <>
            <span style={{ color: '#e8e8e8'}}>
                <UserOutlined/>
                {nickname}
            </span>
            <Button type='link' onClick={logout}>退出</Button>
        </>
    )

    const Login = (
        <Link to={LOGIN_PATHNAME}>登录</Link>
    )

    return (
        <div>
           {username ? UserInfo : Login}
        </div>
    )
})



export default UserInfo