import React from 'react';

import PropTypes from 'prop-types';

import { Container, Card, Button } from 'react-bootstrap';

export class GenreView extends React.Component {

    render() {
        const { Genre, onBackClick } = this.props;

        return (
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Card.Title>Genre</Card.Title>
                        <Card.Text>
                            <span className="label">Name: </span>
                            <span className="value">{Genre.Name}</span>
                        </Card.Text>
                        <Card.Text>
                            <span className="label">Description: </span>
                            <span className="value">{Genre.Description}</span>
                        </Card.Text>

                        <Button onClick={() => { onBackClick(); }}>Back</Button>
                    </Card.Body>
                </Card>

            </Container>
        );
    }
}

GenreView.proptypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
};