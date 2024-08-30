import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    
    useEffect(()=>{
        axios.get(`http://localhost:3001/${localStorage.getItem('userId')}`).then((res)=>{
            if(res && res['data'] && res['data']['statusCode'] === 200 && 
                res['data']['result']){
                    const userInfo = res['data']['result'];
                    setFirstName(userInfo['first_name']);
                    setMiddleName(userInfo['middle_name']);
                    setLastName(userInfo['last_name']);
                    setAge(userInfo['age']);
                    setGender(userInfo['gender']);
                    setDob(userInfo['dob'].split('T')[0]);
                }
        })
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        const reqBody = {
            id: localStorage.getItem('userId'),
            updateDetails: { firstName, middleName, lastName, age, gender, dob }
        }
        axios.put('http://localhost:3001/updateUser', reqBody).then((res) => {
            if (res && res['data']) {
            }
        })
    }

    const handleLogout =() =>{
        localStorage.removeItem('userId');
        navigate('/');
    }

    const handleUserList = () =>{
        navigate('/userlist');
    }

    return (
        <div>
            <div className='row head_area'>
                <h4 className='col-8 form_title'>Fill details</h4>
                <div className='col-2'>
                    <a href="" onClick={handleUserList}>User List</a>
                </div>
                <div className='col-2 logout_area'>
                    <span>Logout</span>
                    <IconButton aria-label="exit" onClick={handleLogout}>
                        <ExitToAppIcon />
                    </IconButton>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="user_detail_form">
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='form-group'>
                                <label>First Name:</label>
                                <input type='text' value={firstName} className='form-control' placeholder='Enter your first name'
                                    onChange={(event) => setFirstName(event.target.value)} />
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='form-group'>
                                <label>Middle Name:</label>
                                <input type='text' value={middleName} className='form-control' placeholder='Enter your first name'
                                    onChange={(event) => setMiddleName(event.target.value)} />
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='form-group'>
                                <label>Last Name:</label>
                                <input type='text' value={lastName} className='form-control' placeholder='Enter your first name'
                                    onChange={(event) => setLastName(event.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='form-group'>
                                <label>Age:</label>
                                <input type='number' value={age} className='form-control' placeholder='Enter your age'
                                    onChange={(event) => setAge(event.target.value)} />
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='form-group'>
                                <label>Gender:</label>
                                <input type='text' value={gender} className='form-control' placeholder='Enter your gender'
                                    onChange={(event) => setGender(event.target.value)} />
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='form-group'>
                                <label>Date of birth:</label>
                                <input type='date' value={dob} className='form-control' placeholder='Enter your date of birth'
                                    onChange={(event) => setDob(event.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-5'></div>
                        <button type='submit' className="col-2 btn btn-primary">Save</button>
                        <div className='col-5'></div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Home;