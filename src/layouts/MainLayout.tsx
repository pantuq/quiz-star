import React, { memo, FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '../components/Logo.tsx'
import UserInfo from '../components/UserInfo.tsx'

const { Header, Content, Footer} = Layout

const MainLayout: FC = memo(function MainLayout() {
    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.left}>
                    <Logo/>
                </div>
                <div className={styles.right}>
                    <UserInfo/>
                </div>
            </Header>
            <Content className={styles.main}>
                <Outlet/>
            </Content>
            <Footer className={styles.footer}>问卷 &copy; 2025 - present. Created by tuqian</Footer>
        </Layout>
    )
})



export default MainLayout