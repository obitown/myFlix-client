
import React, { useState } from 'react';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);

    };
    const handleClickRegister = (e) => {
        e.preventDefault();

        props.toRegistrationView('');
    }

    return (
        <div>
            <h2>Login</h2>
            <div>
                <span>Not registered?</span>
                <button type='submit' onClick={handleClickRegister}>Register</button>
            </div>
        </div>
    );
}