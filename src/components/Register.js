import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../styles/register.css';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!confirmPassword) {
      return setError('Please confirm password.');
    }
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    } else {
      setError('')
    }

    axios.post('http://localhost:3001/register', { username, password })
      .then((res) => {
        if (res.data && res.data['result'] && res['data']['status'] === 'Success') {
          console.log(res);
          localStorage.setItem('userId', res.data['result']['_id']);
          localStorage.setItem('userName', res.data['result']['user_name']);
          navigate('/home')
        } else {
          setError(res['data']['message']);
        }
      }).catch((err) => {
        setError(error.res.data.message);
      });
  }

  return (
    <div className='register_box'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className='register_form'>
        <div className='input-group fields'>
          <label>Username : </label>
          <input type="text" name="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <br />
        <div className='input-group fields'>
          <label>Create Password : </label>
          <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <br />
        <div className='input-group fields'>
          <label>Confirm Password : </label>
          <input type='password' value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        </div>
        <br />
        <div className='action_section'>
          <div>
            <button type='submit' className='btn btn-primary'>Register</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </div>
          <div >
            <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>Sign In</button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default Register;
