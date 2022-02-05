import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './login-view.scss';


export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);

    };

    return (
        <div className='lv-1'>
            <h2>Login</h2>
            <div>
                <form>
                    <label className='lv-2'>
                        Username:
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label className='lv-2'>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
            <div>
                <button>Register now</button>
            </div>
        </div>
    );
}


LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
};