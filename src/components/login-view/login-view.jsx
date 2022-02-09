
import React, { useState } from 'react';

import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        // Send a request to the server for authentication, then call props.onLoggedIn(username)
        props.onLoggedIn(username);

    };

    const handleClickRegister = (e) => {
        e.preventDefault();

        props.toRegistrationView('');
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Sign in</Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                        placeholder="Enter Username" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                        placeholder="Password" />
                                </Form.Group>

                                <Button onClick={handleSubmit} variant="primary" type="submit">
                                    Submit
                                </Button>

                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
}