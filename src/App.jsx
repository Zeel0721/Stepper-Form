import React, { useEffect, useState } from "react"
import User from "./User"
import Admin from "./Admin"
import { Route, Routes } from "react-router-dom"
import UserList from "./UserList"

const LOCAL_STORAGE = 'user'

export default function App() {
  const [users, setUser] = useState([])
  const [userId, setId] = useState(1)
  const [authenticate,setAuthenticate] = useState(false)

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE))
    if(savedUsers === null) return
      setUser(savedUsers)
  },[])

  useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE, JSON.stringify(users))
    if(users.length > 0)
    {
      const key = users[users.length - 1].key
      setId(key + 1)
    }
  },[users])

  function addUserList(userFirstName,userLastName,userAge,userGender,
    userFirstDose,userFirstDoseDate,userSecondDose,userSecondDoseDate,userThirdDose,userThirdDoseDate){
    setUser(prev => {return [...prev,{
      key: userId,
      firstName: userFirstName,
      lastName: userLastName,
      age: userAge,
      gender: userGender,
      firstDose: userFirstDose,
      firstDate: userFirstDoseDate,
      secondDose: userSecondDose,
      secondDate: userSecondDoseDate,
      thirdDose: userThirdDose,
      thirdDate: userThirdDoseDate
    }]})
  }

  function deleteUser(key){
    const newData = users.filter((item) => item.key !== key);
    setUser(newData)
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element ={<User addUserList = {addUserList} />} />
        <Route path="/admin" element ={authenticate === false ?<Admin
        setAuthenticate = {setAuthenticate} />
        : <UserList 
            users = {users}
            deleteUser = {deleteUser}
          />
        } >
        </Route>
      </Routes>
    </div>
  )
}
