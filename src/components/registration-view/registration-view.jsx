import React, { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

import { Form, Button, Container, CardGroup, Card } from "react-bootstrap";


export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    // declare hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');

    // validate user inputs
    const validate = () => {
        let isReq = true;

        if (!username) {
            setUsernameErr('Username required');
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr('Username must be at LEAST 2 characters long');
            isReq = false;
        }

        if (!password) {
            setPasswordErr('Password is required');
            isReq = false;
        } else if (password.length < 6) {
            setPasswordErr('Password must be at LEAST 6 characters long');
            isReq = false;
        }

        if (!email) {
            setEmailErr('Email is required');
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setPasswordErr('Must be a valid email');
            isReq = false;
        }

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        // Send a request to the server for authentication, then call props.onLoggedIn(username)
        axios.post('https://obi-flix.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                alert('You registered successfully!')
                window.open('/', '_self');
            })
            .catch(e => {
                console.error(response);
                alert('unable to register');
            });
    };

    return (
        <Container fluid>
            <Row>
                <CardGroup>
                    <Card>
                        <Card.Body>
                            <Card.Title>Register now!</Card.Title>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        placeholder="Enter username" />
                                    {/* code added here to display validation error */}
                                    {usernameErr && <p>{usernameErr}</p>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        minLength="8"
                                        placeholder="Your password must be 8 or more characters" />
                                    {/* code added here to display validation error */}
                                    {passwordErr && <p>{passwordErr}</p>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="Enter email" />
                                    {/* code added here to display validation error */}
                                    {emailErr && <p>{emailErr}</p>}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Birthday:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={birthday}
                                        onChange={e => setBirthday(e.target.value)}
                                        placeholder="Enter birthday" />
                                </Form.Group>

                                <Button type="submit" onClick={handleSubmit}>Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Row>
        </Container>
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
    }),
    onRegistration: PropTypes.func,
};