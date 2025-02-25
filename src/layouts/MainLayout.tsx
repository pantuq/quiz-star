import React, { memo, FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '../components/Logo.tsx'
import UserInfo from '../components/UserInfo.tsx'
import useLoadUserData from '../hooks/useLoadUserData.ts'
import useNavPage from '../hooks/useNavPage.ts'

const { Header, Content, Footer} = Layout

const MainLayout: FC = memo(function MainLayout() {
    const { waitingUserData } = useLoadUserData()
    useNavPage(waitingUserData)
    return (
      <Layout>
        <Header className={styles.header}>
          <div className={styles.left}>
            <Logo />
          </div>
          <div className={styles.right}>
            <UserInfo />
          </div>
        </Header>
        <Content className={styles.main}>
          {waitingUserData ? (
            <div style={{ textAlign: "center", paddingTop: "50px" }}>
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
        <Footer className={styles.footer}>
          问卷 &copy; 2025 - present. Created by tuqian
        </Footer>
      </Layout>
    );
})



export default MainLayout