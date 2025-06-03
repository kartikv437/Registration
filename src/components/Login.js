import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../styles/login.css';

function Login(){
    const navigate= useNavigate('');
    const [userName, setUserName]= useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (event)=>{
        event.preventDefault();
        if(!userName){
           return setError('Please enter username');
        }
        if(!password){
            return setError('please enter password');
        }

        axios.post('http://localhost:3001/login',{userName,password}).then((res)=>{
            if(res && res['data'] && res['data']['status']
                && res.data['status'] === 'Success'
            ){
                localStorage.setItem('userId',res['data']['result'])
                navigate('/home');
            }else{
                return setError(res['data']['message'])
            }
        }).catch((err)=>{
            return setError('Something went wrong.');
        })
    }

    return(
        <div className="login_box">
            <h4>Login</h4>
            <form onSubmit={handleSubmit} className="login_form">
                <div className='input-group fields'>
                    <label>User Name : </label>
                    <input type="text" placeholder="Enter username" value={userName} onChange={(e)=> setUserName(e.target.value)}/>
                </div>
                <div className='input-group fields'>
                    <label>Password : </label>
                    <input type="password" placeholder="Enter password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                <div className="action_section">
                    <div>
                    <button type="submit" className="btn btn-primary">Log In</button>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    </div>
                    <div>
                        <button type="button" className="btn btn-secondary" onClick={()=> navigate('/register')}>Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;