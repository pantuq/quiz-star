import { Button, Result } from 'antd'
import React, { memo, FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { HOME_PATHNAME } from '../router/index.tsx';

const NotFound: FC = memo(function NotFound() {
    const nav = useNavigate()
    return (
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在"
        extra={<Button type="primary" onClick={() => nav(HOME_PATHNAME)}>Back Home</Button>}
      />
    );
})



export default NotFound