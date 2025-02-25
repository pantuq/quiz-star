import { FormOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import React, { memo, FC, useState, useEffect } from 'react'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
import useGetUserInfo from '../hooks/useGetUserInfo.ts'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router/index.tsx'

const Logo: FC = memo(function Logo() {
    const { Title } = Typography

    const { username } = useGetUserInfo()
    const [pathname, setPathname] = useState(HOME_PATHNAME)

    useEffect(() => {
      if(username){
        setPathname(MANAGE_INDEX_PATHNAME)
      }
    },[username])
    return (
      <div className={styles.container}>
        <Link to={pathname}>
          <Space>
            <Title>
              <FormOutlined />
            </Title>
            <Title>问卷</Title>
          </Space>
        </Link>
      </div>
    );
})



export default Logo