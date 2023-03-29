import logo from './logo.svg';
import './App.css';
import { Routes , Route } from "react-router-dom"

import { UserContext } from './UserContext';
import { useState , useEffect } from 'react';

import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard'
import NavBar from './NavBar';
import ResolutionsPage from './ResolutionsPage';
function App() {
  // fetch("/resolutions").then(res => res.json()).then(data => console.log(data))
  const [user, setUser] = useState()
  const [resolutions, setResolutions] = useState()

  useEffect(() => {
    fetch("/me").then(r => {
      if(r.ok){
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  useEffect(() => {
    fetch("/resolutions").then(r => r.json()).then(data => setResolutions(data))
  }, [])
  
  console.log(user)
  return (
    <UserContext.Provider value = {user}>
    
        <NavBar setUser = {setUser}></NavBar>
        <Routes>
          <Route path = "/" element={ user ? <h1>{`Hello ${user.name}`}</h1> : <h1>Hello</h1>}> </Route>
          <Route path = "/login" element={<Login setUser = {setUser} />}></Route>
          <Route path = "/dashboard" element = {<Dashboard/>}></Route>
          <Route path = "/signup" element = {<Signup/>}></Route>
          <Route path = "/resolutions" element = {<ResolutionsPage resolutions={resolutions} />}></Route>
        </Routes>
   
    </UserContext.Provider>
    
  );
}

export default App;
