import React, { useState } from 'react'
import {Form, Select, DatePicker} from 'antd'
import dayjs from 'dayjs'

export default function VaccineForm({setFirstDose,
  setSecondDose, 
  setThirdDose, 
  setFirstDate, 
  setSecondDate, 
  setThirdDate
}) {

  const options = [
  {
    label: "SPIKEVAX",
    value: "SPIKEVAX"
  },
  {
    label: "SPUTNIK V",
    value: "SPUTNIK V"
  },
  {
    label: "SPUTNIK",
    value: "SPUTNIK"
  },
  {
    label: "JCOVDEN",
    value: "JCOVDEN"
  },
  {
    label: "VAXZEVIRA",
    value: "VAXZEVIRA"
  },
  {
    label: "COVISHIELD",
    value: "COVISHIELD"
  }
]

const [userSecondDose, setUserSecondDose] = useState()
const [userThirdDose, setUserThirdDose] = useState()
const [secondDisabled, setSecondDisabled] = useState(true)
const [thirdDisabled, setThirdDisabled] = useState(true)

function firstDose(value){
  setFirstDose(value)
}
function secondDose(value){
  setSecondDose(value)
}
function thirdDose(value){
  setThirdDose(value)
}

function firstDate(date, dateString){
  if(date === null) {return setSecondDisabled(true)}
  setFirstDate(dateString)
  setSecondDisabled(false)
  const setDate = dayjs(dateString).add(1 , 'month')
  setUserSecondDose(setDate)
}
function secondDate(date, dateString){
  if(date === null) {return setThirdDisabled(true)}
  setSecondDate(dateString)
  setThirdDisabled(false)
  const setDate = dayjs(dateString).add(1 , 'month')
  setUserThirdDose(setDate)
}
function thirdDate(date, dateString){
  setThirdDate(dateString)
}

  return (
    <Form layout="vertical" className="vaccine-form form">
        <Form.Item
          label="Firstdose: "
          className='vaccine-form-item-container'
        >
          <div className='vaccine-form-item'>
          <Select id='firstdosename' options={options} onChange={firstDose} />
          <DatePicker id='firstdosedate' className='date' onChange={firstDate} />
          </div>
        </Form.Item>
        <Form.Item
          label="Firstdose: "
          className='vaccine-form-item-container'
        >
          <div className='vaccine-form-item'>
          <Select id='seconddosename' options={options} onChange={secondDose} disabled = {secondDisabled} />
          <DatePicker id='seconddosedate' className='date' 
          onChange={secondDate} minDate={userSecondDose} disabled = {secondDisabled} />
          </div>
        </Form.Item>
        <Form.Item
          label="Firstdose: "
          className='vaccine-form-item-container'
          style={{marginBottom: 0}}
        >
          <div className='vaccine-form-item'>
          <Select id='thirddosename' options={options} onChange={thirdDose} disabled = {thirdDisabled}/>
          <DatePicker id='thirddosedate' className='date' 
          onChange={thirdDate} minDate={userThirdDose} disabled = {thirdDisabled}/>
          </div>
        </Form.Item>
    </Form>
  )
}