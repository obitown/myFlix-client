import React from "react";

import { Container, Card, Button } from "react-bootstrap";

export class DirectorView extends React.Component {
    render() {
        const { director } = this.props;

        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Text>
                            <span>Name: </span>
                            <span>{director.Name}</span>
                        </Card.Text>
                        <Card.Text>
                            <span>Bio: </span>
                            <span>{director.Bio}</span>
                        </Card.Text>
                        <Card.Text>
                            <span>Birth: </span>
                            <span>{director.Birth}</span>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
