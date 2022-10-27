
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


function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
    const [cookies, setCookie] = useCookies(['auth']);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

		const user = {username, password};

		console.log(user)
	    const response = await fetch('https://herberttrinity-definesigma-5000.codio-box.uk/login', {
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
            navigate("/my-plants");

            const date = new Date();
            date.setDate(date.getDate() + 365);
            setCookie('auth', username, { path: '/', expires:date });
		}
        else {
			console.log('response not worked!')
            setPasswordError(true)
        }
	}

    return (
        <article>
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
               
                <SimpleLink destinationPath="/register" linkText="Don't have an account yet? Register." /><br /><br />

                <Button type="submit" buttonText="Log in" />
            </form>
        </article>
    );
}


export default Login;