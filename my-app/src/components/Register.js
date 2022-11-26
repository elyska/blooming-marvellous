
// Register.js

import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from './Button';
import SimpleLink from './SimpleLink';
import colours from '../colours.js';
import TextInput from './TextInput';
import { useNavigate} from "react-router-dom";
import { useCookies } from 'react-cookie';
import { createGlobalStyle } from 'styled-components'; 

const GlobalStyle = createGlobalStyle`
    @media (min-width: 1115px) {
        body {
            background: url("/images/bg.png") !important;
            background-repeat: no-repeat !important;
            background-size: cover !important;
        }
    }
`;

function Register() {
    // get user input
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
    
    // controls visibility of error messages
	const [passwordAgain, setPasswordAgain] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [usernameError, setUsernameError] = useState(false);

    const [cookies, setCookie] = useCookies(['auth']);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        // do not refresh the page
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
            const date = new Date();
            date.setDate(date.getDate() + 365);
            setCookie('auth', username, { path: '/', expires:date });
            navigate("/my-plants");
		}
        else if (response.status == 403) {
            // passwords do not match
            setPasswordError(true)
        }
        else {
            // username is taken
            setUsernameError(true)
        }
	}
    return (
        <article>
            <GlobalStyle/>
            
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                
                <TextInput
                    error={usernameError}
                    helperText={ usernameError ? "Username is already taken" : ""}
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