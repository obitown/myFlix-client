import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

//bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        axios.get('https://obi-flix.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });

        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    /** When a movie is clicked, this function is invoked and updates the state of the 'selectedMovie' *property to that movie */
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    /** When a user successfully logs in, this function updates the 'user' property in state to that *particular user */
    onLoggedIn(user) {
        this.setState({
            user
        });
    }


    render() {
        const { movies, selectedMovie, user } = this.state;

        /** If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView */
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        // Before the movies have been loaded
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {/* if the state of 'selectedMovie' is not null, that selected movie will be returned otherwise, all *movies will be returned */}
                <Row className="main-view justify-content-md-center">
                    {selectedMovie
                        ? (
                            <Col md={8}>
                                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        )
                        : movies.map(movie => (
                            <Col md={4}>
                                <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                            </Col>
                        ))
                    }
                </Row>
            </div>
        );
    }
}

