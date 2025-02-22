import { Button, Typography } from 'antd'
import React, { memo, FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MANAGE_INDEX_PATHNAME } from '../router/index.tsx'
import styles from './Home.module.scss'
import '../_mock/index.tsx'
import axios from 'axios'

const Home: FC = memo(function Home() {
    const { Title, Paragraph } = Typography
    const nav = useNavigate()

    useEffect(() => {
        // fetch('/api/question').then(res => res.json()).then(data => console.log('fetch data',data))

        // mock.js 只能劫持XMLHttpRequest,不能劫持fetch
        axios.get('/api/test').then(res => {
            console.log('axios data',res.data);
        })
    },[])
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <Title>问卷调查 | 在线投票</Title>
                <Paragraph>已累计创建问卷100份，发布问卷90份，收到答卷980份</Paragraph>
                <div>
                    <Button type='primary' onClick={() => nav(MANAGE_INDEX_PATHNAME)}>开始使用</Button>
                </div>
            </div>
        </div>
    )
})



export default Home