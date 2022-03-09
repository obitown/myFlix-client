import axios from 'axios';
import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //Declare hoooook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    // validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr('Username must be 2 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 6) {
            setPassword('Password must be 6 characters long');
            isReq = false;
        }

        return isReq;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            // Send a request to the server for authentication, then call props.onLoggedIn(username)
            axios.post('https://obi-flix.herokuapp.com/login', {
                Username: username,
                Password: password
            })
                .then(response => {
                    const data = response.data;
                    props.onLoggedIn(data);
                })
                .catch(e => {
                    alert("No Such User");
                    console.log('no such user')
                })
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Sign in</Card.Title>
                            <Form>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                        placeholder="Enter Username" />
                                    {/* code added here to display validattion error */}
                                    {usernameErr && <font color="red"><p>{usernameErr}</p></font>}
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                        placeholder="Password" />
                                    {/* code added here to display validattion error */}
                                    {passwordErr && <font color="red"><p>{passwordErr}</p></font>}
                                </Form.Group>

                                <Button onClick={handleSubmit} variant="primary" type="submit">
                                    Sign In
                                </Button>

                                <Link to="/register">
                                    <Button style={{ margin: "20px" }}>Register</Button>
                                </Link>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
        </Container >

    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired,
};