import React, { useEffect, useState } from 'react'
import { Space, Button, Table, Input, Pagination } from 'antd'
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons'
import { CSVLink } from "react-csv"

export default function UserList({users, deleteUser}) {

  const { Search } = Input
  const [usersList,setUsersList] = useState([...users].slice(0,5))
  const [page] = useState(users.length * 2)

  useEffect(() =>{
    setUsersList([...users].slice(0,5))
  },[users])

const vaccineFilter = [{
  text: "SPIKEVAX",
  value: "SPIKEVAX"
},
{
  text: "SPUTNIK V",
  value: "SPUTNIK V"
},
{
  text: "SPUTNIK",
  value: "SPUTNIK"
},
{
  text: "JCOVDEN",
  value: "JCOVDEN"
},
{
  text: "VAXZEVIRA",
  value: "VAXZEVIRA"
},
{
  text: "COVISHIELD",
  value: "COVISHIELD"
},
]

const columns = [
{
  key: 'firstName',
  title: 'FirstName',
  dataIndex: 'firstName',
},
{
  key: 'lastName',
  title: 'LastName',
  dataIndex: 'lastName',
},
{
  key: 'age',
  title: 'Age',
  dataIndex: 'age',
  defaultSortOrder: 'descend',
  filters:[{
    text: "0-16",
    value: [0,16]
  },
  {
    text: "17-30",
    value: [17,30]
  },
  {
    text: "31-45",
    value: [31,45]
  },
  {
    text: "45 above",
    value: [46,100]
  }
],
  sorter: (a, b) => a.age - b.age,
  onFilter: (value, record) => {
    return record.age >= value[0] && record.age <= value[1]}
},
{
  key: 'gender',
  title: 'Gender',
  dataIndex: 'gender',
  filters: [
    {
      text: 'male',
      value: 'male'
    },
    {
      text: 'female',
      value: 'female'
    }
  ],
  onFilter: (value, record) => record.gender.indexOf(value) === 0
},
{
  title: "VaccineDose",
  key: "vaccine",
  filters: vaccineFilter,
  children: [
    {
      key: 'firstDose',
      title: 'FirstDose',
      dataIndex: 'firstDose',
    },
    {
      key: 'secondDose',
      title: 'SeconDdose',
      dataIndex: 'secondDose'
    },
    {
      key: 'thirdDose',
      title: 'ThirdDose',
      dataIndex: 'thirdDose'
    }
  ],
  onFilter: (value, record) => record.firstDose.indexOf(value) === 0 ||
  record.secondDose.indexOf(value) === 0 || record.thirdDose.indexOf(value) === 0,
},
{
  key: 'delete',
  title: 'Action',
  render: (_, record) =>
    users.length >= 1 ? (
      <span>
        <Button type='link' onClick={() => handleDelete(record.key)}>Delete</Button>
        <Button type='link' >Edit</Button>
      </span>
    ) : null
}
];

function onSearch(input){
  const searchReg = new RegExp(`${input}`)
  const newList = users.filter(user => searchReg.test(user.firstName) )
  setUsersList(newList)
}

function handleDelete (key){
  const newData = users.filter((item) => item.key !== key);
  setUsersList(newData)
  deleteUser(key)
};

function userDisplay(pageNumber){
  const arr = [0,5,10,15,20]
  const cellStart = arr[pageNumber-1]
  const cellEnd = arr[pageNumber]
  setUsersList([...users].slice(cellStart,cellEnd))
}

  return (
    <div className="userlist-container">
        <h1>UserList</h1>
        <Search
          style={{width: 500, float: "right", marginBottom: 20}}
          placeholder="input search text"
          allowClear
          enterButton= {<SearchOutlined />}
          size="large"
          onSearch={onSearch}
        />

        <Table id='userlist' 
        columns={columns} 
        expandable={{
        expandedRowRender: (record) => (
          <Space className='vaccine-date' style={{fontWeight: "bold"}}>
            {[`FirstDoseDate:`,record.firstDate,'SecondDoseDate:',record.secondDate,'ThirdDoseDate:',record.thirdDate]}
          </Space>
        ),}} 
        expandRowByClick={true}
        fixed= {true}
        pagination= {false}
        bordered
        scroll={{
          y:325
        }}
        dataSource={usersList}
        >
        </Table>
        <Pagination 
        defaultCurrent={1} total={page}
        style={{display: 'flex', justifyContent: 'center', marginTop: 20}}
        onChange={userDisplay}
        />

        <CSVLink filename="users.csv" data={users}>
          <Button type='primary' icon={<DownloadOutlined />} size='large' style={{float: "right"}}>Export</Button>
        </CSVLink>
    </div>
  )
}