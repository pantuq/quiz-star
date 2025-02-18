import React, { memo, FC } from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router/index.tsx'

const UserInfo: FC = memo(function UserInfo() {
    // todo:对于已经登录用户的显示
    return (
        <>
           <Link to={LOGIN_PATHNAME}>登录</Link>
        </>
    )
})



export default UserInfo