import React, { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

import { Form, Button, Container, CardGroup, Card } from "react-bootstrap";


export function LoginView(props) {
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
                            <Card.Title>Register</Card.Title>
                            <Form>
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