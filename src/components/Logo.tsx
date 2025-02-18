import { FormOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import React, { memo, FC } from 'react'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'

const Logo: FC = memo(function Logo() {
    const { Title } = Typography
    return (
      <div className={styles.container}>
        <Link to={"/"}>
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