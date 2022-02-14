import React from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';


import './movie-card.scss';
import { Card } from "react-bootstrap";

export class MovieCard extends React.Component {
    render() {
        const { movieData, onMovieClick } = this.props;

        return (
            <Card>
                <Card.Img variant="top" src={movieData.ImageURL} />
                <Card.Body>
                    <Card.Title> {movieData.Title} </Card.Title>
                    <Card.Text> {movieData.Description} </Card.Text>
                    <Button onClick={() => onMovieClick(movieData)} variant="primary">Open</Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.protoTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};