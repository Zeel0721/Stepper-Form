import React from 'react'
import { Button, Form, Input, message } from 'antd'
import UserList from './UserList'
import { createRoot } from 'react-dom/client'

export default function Admin({ setAuthenticate }) {

  function validateUser(){
    const uname = document.getElementById("username").value,
    pwd = document.getElementById("password").value
    if(uname === "root" && pwd === "root"){
      message.success("Login Successfull")
      setAuthenticate(true)
    }
    else
      message.error("Wrong Credentials")
  }

  return (
    <div className='admin-login'>
      <Form name="basic" labelCol={{span: 8}} wrapperCol={{span: 16}} style={{maxWidth: 600}}
        initialValues={{
          remember: true,
        }}
        onFinish={validateUser}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{
              required: true,
              message: 'Please input your username!',
          }]}
        >
          <Input id='username'/>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{
              required: true,
              message: 'Please input your password!',
          }]}
        >
          <Input.Password id='password'/>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}