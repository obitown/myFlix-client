import React from "react";

import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

import './movie-view.scss';

export class MovieView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Card>
                <Card.Body>

                    <Card.Text className="movie-poster">
                        <img src={movie.ImageURL} crossOrigin="true" />
                    </Card.Text>
                    <Card.Text className="movie-title">
                        <span className="label">Title: </span>
                        <span className="value">{movie.Title}</span>
                    </Card.Text>
                    <Card.Text className="movie-director">
                        <span className="label">Director: </span>
                        <span className="value">
                            <Link to={`/directors/${movie.Director.Name}`} >{movie.Director.Name}</Link>
                        </span>
                    </Card.Text>
                    <Card.Text className="movie-genre">
                        <span className="label">Genre: </span>
                        <span className="value">
                            <Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
                        </span>
                    </Card.Text>
                    <Card.Text className="movie-description">
                        <span className="label">Description: </span>
                        <span className="value">{movie.Description}</span>
                    </Card.Text>

                    <Button variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}