import React from 'react'
import { Form, Input, InputNumber, Radio } from 'antd'

export default function UserForm({userFirstName, 
  setFirstName, 
  userLastName, 
  setLastName, 
  userAge,
  setAge, 
  userGender,
  setGender}) {

function handleFirstName(e){
  setFirstName(e.target.value)
}
function handleLastName(e){
  setLastName(e.target.value)
}
function handleAge(value){
  setAge(value)
}
function handleGender(e){
  setGender(e.target.value)
}

  return (
    <Form layout="vertical" className='basic-form form'>
        <Form.Item
          label="Firstname:"
          name="Firstname"
          rules={[{ required: true, min: 3}]}
          initialValue={userFirstName}
        >
        <Input id='firstName' onInput={handleFirstName}/>
        </Form.Item>
        <Form.Item
          label="Lastname:"
          name="Lastname"
          rules={[{ required: true, min: 3}]}
          initialValue={userLastName}
        >
        <Input id='lastName' onInput={handleLastName}/>
        </Form.Item>
        <Form.Item
          label="Age:"
          name="Age"
          rules={[{ required: true}]}
          initialValue={userAge}
        >
        <InputNumber min={1} max={100} id='age' onChange={handleAge}/>
        </Form.Item>
        <Form.Item
          label="Gender:"
          name="gender"
          rules={[{ required: true}]}
          validateFirst
          style={{marginBottom: 0}}
          initialValue={userGender}
        >
          <Radio.Group id='gender' onChange={handleGender}>
            <Radio value={"male"} id='male'>Male</Radio>
            <Radio value={"female"} id='female'>Female</Radio>
          </Radio.Group>
        </Form.Item>
    </Form>
  )
}