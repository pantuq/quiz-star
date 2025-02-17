import React, { memo, FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './MainLayout.module.scss'

const { Header, Content, Footer} = Layout

const MainLayout: FC = memo(function MainLayout() {
    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.left}>logo</div>
                <div className={styles.right}>登录</div>
            </Header>
            <Content className={styles.main}>
                <Outlet/>
            </Content>
            <Footer className={styles.footer}>问卷 &copy; 2025 - present. Created by tuqian</Footer>
        </Layout>
    )
})



export default MainLayout