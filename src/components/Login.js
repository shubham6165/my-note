import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const Login = (props) => {

    const [credentials, setCredentials] = useState({email: "", password: ""});
    let history = useHistory();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
        });
        const json = await response.json();
        console.log(json);
        if(json.success === true){
            // Save the auth-token and redirect
            localStorage.setItem('token', json.authToken);
            history.push('/');
            props.showAlert("Login Successful!!", "success");
        }else {
            props.showAlert("Invalid Credentials", 'danger');
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <div className="container w-50">
            <h2 className="my-2">Login To Continue</h2>
            <form  onSubmit={handleSubmit} className="my-4">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value = {credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp"/>
                    <div id="emaillabel" className="form-text">Enter Your Registered Email id.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name = "password" value={credentials.password} onChange={onChange} id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
