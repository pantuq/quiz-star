import { UserAddOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Space, Typography } from 'antd'
import React, { memo, FC } from 'react'
import styles from './Register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router/index.tsx'
import { useRequest } from 'ahooks'
import { registerService } from '../services/user.ts'

const Register: FC = memo(function Register() {
    const { Title } = Typography

    const nav = useNavigate()

    const { run } = useRequest(async (values) => {
      const { username, password, nickname } = values
      await registerService(username, password, nickname)
    },{
      manual: true,
      onSuccess(){
        message.success('注册成功')
        nav(LOGIN_PATHNAME)
      }
    })

    const onFinish = (value: object) => {
        run(value)
    }
    return (
      <div className={styles.container}>
        <div>
          <Space>
            <Title level={2}>
              <UserAddOutlined />
            </Title>
            <Title>注册新用户</Title>
          </Space>
        </div>
        <div>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
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
              label="确认密码"
              name="confirm"
              dependencies={["password"]}       //依赖于 password，password 变化时，会触发校验
              rules={[
                { required: true, message: "请输入密码" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(new Error("两次密码不一致"));
                    }
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item label="昵称" name="nickname">
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  注册
                </Button>
                <Link to={LOGIN_PATHNAME}>已有账户，登录</Link>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
})



export default Register