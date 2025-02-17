import React, { memo, FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home: FC = memo(function Home() {
    const nav = useNavigate()

    function clickHandler(){
        nav({
            pathname: '/login',
            search: 'a=20'
        })
    }
    return (
        <>
            Home
            <div>
                <button onClick={clickHandler}>登录</button>
                <Link to={'/register?a=20'}>注册</Link>
            </div>
        </>
    )
})



export default Home