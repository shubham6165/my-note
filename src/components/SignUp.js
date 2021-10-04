import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const SignUp = (props) => {

    const [credentials, setCredentials] = useState({name: "", email: "", password: ""});
    let history = useHistory();
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        let pswrd = document.getElementById("exampleInputPassword1").value;
        let cpswrd = document.getElementById("exampleInputCPassword1").value;
        if(pswrd !== cpswrd){
             props.showAlert("Password and Confirm Password do not match!!", 'danger'); 
        }else {
        const response = await fetch('http://localhost:5000/api/auth/signup',{
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
            props.showAlert("Hurray!! You can now save all your notes Here", 'success');

        }else {
            props.showAlert(`${json.error}`, 'danger');
        }
    }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <div className="container w-50 mt-4">
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} required aria-describedby="email"/>
                    <div id="emailHelp" class ="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} minLength={5} required onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                    <input type="text" className="form-control" id="exampleInputCPassword1" onChange={onChange} required/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" required/>
                    <label class ="form-check-label" htmlFor="exampleCheck1">I agree with all Terms and Conditions.</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>     
        </div>
    )
}

export default SignUp
