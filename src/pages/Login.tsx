import React, { memo, FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: FC = memo(function Login() {
    const nav = useNavigate()
    return (
        <>
            Login
            <div>
                <button onClick={() => nav(-1)}>返回</button>
            </div>
        </>
    )
})



export default Login