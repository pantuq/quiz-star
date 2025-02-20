import React, { memo, FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Login.module.scss'
import { Button, Checkbox, Form, Input, Space, Typography } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { REGISTER_PATHNAME } from '../router/index.tsx'

const USERNAME_KEY = "USERNAME"
const PASSWORD_KEY = "PASSWORD"

function rememberUser(username: string, password: string){
    localStorage.setItem(USERNAME_KEY, username)
    localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUserFromStorage(){
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfoFromStorage(){
    return {
        username: localStorage.getItem(USERNAME_KEY),
        password: localStorage.getItem(PASSWORD_KEY)
    }
}
const Login: FC = memo(function Login() {

    const [form] = Form.useForm() //第三方 hook

    useEffect(() => {
        const { username, password } = getUserInfoFromStorage()
        form.setFieldsValue({
            username,
            password
        })
    },[])
    // 没有写依赖项，只在函数组件开始渲染的时候执行一次

    const onFinish = (value: object) => {
        console.log(value);
        const { username, password, remember } = value;
        if(remember){
            rememberUser(username, password)
        }else {
            deleteUserFromStorage()
        }
    }

    const { Title } = Typography
    return (
      <div className={styles.container}>
        <div>
          <Space>
            <Title level={2}>
              <UserAddOutlined />
            </Title>
            <Title level={2}>用户登录</Title>
          </Space>
        </div>
        <div>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: "请输入用户名" },
                { type: "string", message: "用户名只能是字符串" },
                { min: 3, max: 20, message: "用户名长度不能小于3,大于20" },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "用户名只能是字母、数字、下划线",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 6, span: 16 }}
            >
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
                <Link to={REGISTER_PATHNAME}>注册新用户</Link>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
})



export default Login