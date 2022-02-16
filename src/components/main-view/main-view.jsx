import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

//bootstrap components
import { Row, Col, Button } from 'react-bootstrap';

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
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
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
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    getMovies(token) {
        axios.get('https://obi-flix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            })
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
                            <Col md={4} key={movie._id}>
                                <MovieCard movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                            </Col>
                        ))
                    }
                </Row>

                <Button onClick={() => { this.onLoggedOut() }}>Log Out</Button>

            </div>

        );
    }
}