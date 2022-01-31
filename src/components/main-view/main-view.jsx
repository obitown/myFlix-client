import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
                {
                    _id: 1,
                    Title: 'Inception',
                    Director: 'Christopher Nolan',
                    Genre: 'Action',
                    Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
                    ImagePath: 'https://c.tenor.com/VB72MwFAx4wAAAAC/inception-kukkendare.gif'
                },

                {
                    _id: 2,
                    Title: 'The Shawshank Redemption',
                    Director: 'Frank Daradont',
                    Genre: 'Drama',
                    Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
                    ImagePath: 'https://c.tenor.com/X47ebguKe8wAAAAM/happy-to-see-you-andy-dufresne.gif'
                },

                {
                    _id: 3,
                    Title: 'Gladiator',
                    Director: 'Ridley Scott',
                    Genre: 'Action',
                    Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
                    ImagePath: 'https://c.tenor.com/CLdhkaZu4usAAAAd/thumbs-up.gif'
                },
            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                    ))
                }
            </div>
        );
    }
}