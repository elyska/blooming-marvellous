
// Register.js

import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from './Button';
import SimpleLink from './SimpleLink';
import colours from '../colours.js';
import TextInput from './TextInput';

function Register() {

    return (
        <article>
            <h1>Register</h1>

            
            <form>
                
                <TextInput inputId="username" inputLabel="Username" inputType="text" /><br />
                <TextInput inputId="password" inputLabel="Password" inputType="password" /><br />
                <TextInput inputId="password-again" inputLabel="Password Again" inputType="password" />
               
                <SimpleLink destinationPath="/login" linkText="Already have an account? Log in." /><br /><br />

                <Button type="submit" buttonText="Register" />
            </form>
        </article>
    );
}

export default Register;