
// Login.js

import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from './Button';
import SimpleLink from './SimpleLink';
import TextInput from './TextInput';
import colours from '../colours.js';
import { useCookies } from 'react-cookie';
import { useNavigate} from "react-router-dom";
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

function Login() {
    // get user input
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
    // controls visibility of error messages
	const [passwordError, setPasswordError] = useState(false);

    const [cookies, setCookie] = useCookies(['auth']);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        // do not refresh the page
        event.preventDefault();

		const user = {username, password};

	    const response = await fetch('https://herberttrinity-definesigma-5000.codio-box.uk/login', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(user)
		})
		if (response.ok){
			console.log('response worked!')
            // go to my plants on success
            navigate("/my-plants");

            const date = new Date();
            date.setDate(date.getDate() + 365);
            setCookie('auth', username, { path: '/', expires:date });
		}
        else {
			console.log('response not worked!')
            // show error messages
            setPasswordError(true)
        }
	}

    return (
        <article>
            <GlobalStyle/>
            
            <h1>Log in</h1>

            <form onSubmit={handleSubmit}>
                <TextInput 
                    error={passwordError}
                    handleInputChange={e => setUsername(e.target.value)} 
                    inputId="username" inputLabel="Username" inputType="text" /><br />
                <TextInput
                    error={passwordError}
                    helperText={ passwordError ? "Incorrect username or password" : ""}
                    handleInputChange={e => setPassword(e.target.value)}  
                    inputId="password" inputLabel="Password" inputType="password" />
               
                <SimpleLink destinationPath="/register" linkText="Don't have an account yet? Register." />
                <br /><br />

                <Button type="submit" buttonText="Log in" />
            </form>
        </article>
    );
}


export default Login;