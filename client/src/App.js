import logo from './logo.svg';
import './App.css';
import { Routes , Route } from "react-router-dom"

import { UserContext } from './UserContext';
import { useState , useEffect } from 'react';

import Login from './Login';
import Dashboard from './Dashboard'
function App() {
  // fetch("/resolutions").then(res => res.json()).then(data => console.log(data))
  const [user, setUser] = useState()

  useEffect(() => {
    fetch("/me").then(r => {
      if(r.ok){
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  function handleLogout(e){
    fetch("/logout", {
      method: "DELETE"
    }).then(r => {
      console.log(r.ok)
    })
  }
  return (
    <UserContext.Provider value = {user}>
      <button onClick={handleLogout}> Logout </button>
  
        <Routes>
          <Route path = "/" element={<h1>Hello</h1>}></Route>
          <Route path = "/login" element={<Login setUser = {setUser} />}></Route>
          <Route path = "/dashboard" element = {<Dashboard/>}></Route>
        </Routes>
   

    </UserContext.Provider>
    
  );
}

export default App;
