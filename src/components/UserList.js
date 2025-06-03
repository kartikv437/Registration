import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../styles/userList.css'
import { IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'


function UserList() {
    const [userTableData, setUserTableData] = useState([]);
    const navigate =useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3001/getUserList').then((res) => {
            console.log(res.data);
            if (res['data'] && res['data']['result'] && res['data']['result'].length > 0) {
                setUserTableData(res['data']['result']);
            }
        })
    }, [])

    const handleBack = () => {
        window.location.href = '/home'
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
    }
    return (
        <div>
            <div className='head_area'>
                <div className='back'>
                    <IconButton area-label='back' onClick={handleBack}>
                        <ArrowBackIcon />
                    </IconButton>
                </div>
                <div className='logout_area'>
                    <span onClick={handleLogout}>Logout</span>
                    <IconButton aria-label="exit" onClick={handleLogout}>
                        <ExitToAppIcon />
                    </IconButton>
                </div>
            </div>
            <table className='user_table'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {userTableData.map((user, index) => (
                        <tr key={index}>
                            <td>{user.first_name}</td>
                            <td>{user.middle_name}</td>
                            <td>{user.last_name}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default UserList;