import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Register from './components/Register'
import UserList from './components/UserList'
import Login from './components/Login'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path='/userList' element={<UserList />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

