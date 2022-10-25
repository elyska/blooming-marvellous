// Login.js
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from './Button';
import SimpleLink from './SimpleLink';
import TextInput from './TextInput';
import colours from '../colours.js';


function Login() {


    return (
        <article>
            <h1>Log in</h1>

            <form>
                <TextInput inputId="username" inputLabel="Username" inputType="text" /><br />
                <TextInput inputId="password" inputLabel="Password" inputType="password" />
               
                <SimpleLink destinationPath="/register" linkText="Don't have an account yet? Register." /><br /><br />

                <Button type="submit" buttonText="Log in" />
            </form>
        </article>
    );
}


export default Login;