import React from "react";
import PropTypes from "prop-types";


import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movieData, onMovieClick } = this.props;

        return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}> {movieData.Title} </div>;
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