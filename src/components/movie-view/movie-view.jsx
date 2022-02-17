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
                    <div className="movie-view">
                        <div className="movie-poster">
                            <img src={movie.ImageURL} crossOrigin="true" />
                        </div>
                        <div className="movie-title">
                            <span className="label">Title: </span>
                            <span className="value">{movie.Title}</span>
                        </div>
                        <div className="movie-director">
                            <span className="label">Director: </span>
                            <span className="value">{movie.Director.Name}</span>
                        </div>
                        <div className="movie-description">
                            <span className="label">Description: </span>
                            <span className="value">{movie.Description}</span>
                        </div>
                        <Button onClick={() => { onBackClick(null); }}>Back</Button>
                        <Link to={`/directors/${movie.Director.Name}`}>
                            <Button variant="link">Director</Button>
                        </Link>

                    </div>
                </Card.Body>
            </Card>


        );
    }
}