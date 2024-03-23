import React, { useState } from 'react'
import { Button, message, Steps, theme } from 'antd'
import UserForm from './UserForm'
import VaccineForm from './VaccineForm'

export default function User({ addUserList}) {
  const [userFirstName, setFirstName] = useState("")
  const [userLastName, setLastName] = useState("")
  const [userAge, setAge] = useState("")
  const [userGender, setGender] = useState("")
  const [userFirstDose, setFirstDose] = useState("")
  const [userFirstDoseDate, setFirstDate] = useState("")
  const [userSecondDose, setSecondDose] = useState("")
  const [userSecondDoseDate, setSecondDate] = useState("")
  const [userThirdDose, setThirdDose] = useState("")
  const [userThirdDoseDate, setThirdDate] = useState("")

function addUser(){
  addUserList(userFirstName,userLastName,userAge,userGender,
    userFirstDose,userFirstDoseDate,userSecondDose,userSecondDoseDate,userThirdDose,userThirdDoseDate)
    message.success('User Added!')
    setFirstName("")
    setLastName("")
    setAge("")
    setGender("")
    setCurrent(0)
}

const steps = [
{
    title: 'User Basic Information',
    content: <UserForm 
    userFirstName={userFirstName}
    setFirstName={setFirstName}
    userLastName={userLastName}
    setLastName={setLastName} 
    userAge={userAge}
    setAge={setAge}
    userGender={userGender}
    setGender={setGender}
    />,
},
{
    title: 'User Vaccine Information',
    content: <VaccineForm setFirstDose= {setFirstDose} setSecondDose={setSecondDose} setThirdDose={setThirdDose}
    setFirstDate= {setFirstDate} setSecondDate={setSecondDate} setThirdDate={setThirdDate}/>,
}
];

const { token } = theme.useToken();
const [current, setCurrent] = useState(0);
const next = () => {
  if(current === 0){
    if(userFirstName === "") return message.error("Firstname cannot be empty")
    if(userLastName === "") return message.error("Lastname cannot be empty")
    if(userAge === "") return message.error("Please enter Age")
    if(userGender === "") return message.error("Please select gender")
  }
    setCurrent(current + 1);
};
const prev = () => {
    setCurrent(current - 1);
};
const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
}));
const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    height: 400
};

  return (
    <>
        <Steps current={current} items={items} />
        <div className='container' style={contentStyle}>{steps[current].content}</div>
        <div style={{marginTop: 24}}></div>
        {current > 0 && (
        <Button style={{margin: '0 8px', float: "left"}}onClick={() => prev()}>
          Previous
        </Button> 
          
        )}
        {current === steps.length - 1 && (
          <Button style={{float: "right"}} type="primary" onClick={() => addUser()}>
            Done
          </Button>
        )}
        {current < steps.length - 1 && (
        <Button style={{float: "right"}} type="primary" onClick={() => next()}>
          Next
        </Button>
        )}
    </>
  )
}