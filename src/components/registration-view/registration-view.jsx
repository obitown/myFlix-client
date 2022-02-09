import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './registration-view.scss';
import { Form, Button } from 'react-bootstrap';

export function RegistrationView(props) {
    // Shorthands used with { useState } Reat Hook 
    // https://reactjs.org/docs/hooks-state.html
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    // Modify state of MainView to be registered and logged in with new user
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onRegister(true, username);
    };

    return (
        <div>
            <h2>Sign up for a free Obi-Flix account:</h2>

            <Form>

                <Form.Group>
                    <Form.Label>
                        Username:
                    </Form.Label>
                    <Form.Control
                        type="text"
                        value={username} onChange={e => setUsername(e.target.value)} />
                    <Form.Text>5+ characters, no spaces</Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Enter desired password:
                    </Form.Label>
                    <Form.Control type="text" value={password1} onChange={e => setPassword1(e.target.value)} />
                    <Form.Text>must not be blank</Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Re-enter password:
                    </Form.Label>
                    <Form.Control type="text" value={password2} onChange={e => setPassword2(e.target.value)} />
                    <Form.Text>passwords must match</Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Email:
                    </Form.Label>
                    <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    <Form.Text>required</Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Birthday:
                    </Form.Label>
                    <Form.Control type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
                    <Form.Text>optional</Form.Text>
                </Form.Group>


                <Button type="submit" onClick={handleSubmit}>Register</Button>
            </Form>

        </div>
    )
}

// prop-types
// Give informational warnings in browser if data does not match required shape
RegistrationView.propTypes = {
    onRegister: PropTypes.func.isRequired
};