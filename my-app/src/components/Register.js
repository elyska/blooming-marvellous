
// Register.js

import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from './Button';
import SimpleLink from './SimpleLink';
import colours from '../colours.js';
import TextInput from './TextInput';
import { useNavigate} from "react-router-dom";

function Register() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordAgain, setPasswordAgain] = useState('');
	const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        
        event.preventDefault();
		const user = {username, password, passwordAgain};
	
	    const response = await fetch('https://herberttrinity-definesigma-5000.codio-box.uk/register', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(user)
		})
		console.log(response)
		if (response.ok){
			console.log('response worked!')
            navigate("/login");
		}
        else {
			console.log('response did not work')
            setPasswordError(true)
        }
	}
    return (
        <article>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                
                <TextInput
                    handleInputChange={e => setUsername(e.target.value)} 
                    inputId="username" inputLabel="Username" inputType="text" /><br />
                <TextInput 
                    error={passwordError}
                    helperText={ passwordError ? "Passwords do not match." : ""}
                    handleInputChange={e => setPassword(e.target.value)} 
                    inputId="password" inputLabel="Password" inputType="password" /><br />
                <TextInput 
                    error={passwordError}
                    helperText={ passwordError ? "Passwords do not match." : ""}
                    handleInputChange={e => setPasswordAgain(e.target.value)} 
                    inputId="password-again" inputLabel="Password Again" inputType="password" />
               
                <SimpleLink destinationPath="/login" linkText="Already have an account? Log in." /><br /><br />

                <Button type="submit" buttonText="Register" />
            </form>
        </article>
    );
}

export default Register;