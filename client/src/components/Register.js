// src/Register.js
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

function Register() {
    const [email, setEmail] = useState('');
    const [emails, setEmails] = useState([]);

    

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
            backgroundColor: 'orange',
            color: 'white',
            '&:hover': {
                backgroundColor: 'darkorange',
            },
        },
        box: {
            borderColor: 'orange',
            borderWidth: 1,
            borderStyle: 'solid',
            padding: theme.spacing(1),
            margin: theme.spacing(1),
            width: 350,
            backgroundColor: '#f3e5f5', // light purple background
        },
        center: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh',
            backgroundColor: '#ede7f6', // very light purple background
        },
        input: {
            margin: theme.spacing(1),
            padding: theme.spacing(1),
            width: '80%',
            borderRadius: '5px',
            border: '1px solid #673ab7', // deep purple border
        },
    }));

    const classes = useStyles();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('API_URL:', process.env.REACT_APP_API_URL);
        //const response = await fetch('http://localhost:5003/api/register', {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, { // this is the same as the above line (but using the .env file)  
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            console.log('Email registered successfully');
            setEmail('');
        } else {
            console.error('Error registering email');
            const responseData = await response.json();
            console.error('Response data:', responseData);
        }
    };

    const showEmails = async () => {
        //const response = await fetch('http://localhost:5003/api/emails');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`);
        const data = await response.json();
        setEmails(data);
    };

    return (
        <div className={classes.center}>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <Button type="submit" variant="contained" className={classes.button}>Register your Email</Button>
            </form>
            <Button variant="contained" className={classes.button} onClick={showEmails}>Show me the Data</Button>
            <Box className={classes.box}>
                {emails.map(email => (
                    <p key={email.id}>{email.email}</p>
                ))}
            </Box>
        </div>
    );
}

export default Register;