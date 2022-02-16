import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { NavbarView } from '../navbar-view/navbar-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

//bootstrap components
import { Row, Col, Button, Container } from 'react-bootstrap';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            user: null
        };
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

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
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

    render() {
        const { movies, user } = this.state;

        return (
            <Router>
                <NavbarView />
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView 
                        if (!user) return (
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        );
                        // Before the movies have been loaded
                        if (movies.length === 0) return <div className="main-view" />;
                        return movies.map(m => (
                            <Col md={4} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>

                        ))

                    }} />
                    <Route path="/movies/:movieId" render={({ match }) => {
                        // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView 
                        if (!user) return (
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        );
                        // Before the movies have been loaded
                        if (movies.length === 0) return <div className="main-view" />;
                        return (
                            <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                            </Col>
                        )
                    }} />
                    <Route path="/register" render={() => {
                        if (user) {
                            return <Redirect to="/" />;
                        }
                        return (
                            <Col>
                                <RegistrationView />
                            </Col>
                        )
                    }} />
                </Row>

            </Router>
        );
    }
}



{/* <Route path="/directors/:name" render={({ match }) => {
                        if (movies.length === 0) return <div className='main-view' />;
                        return (
                            <Col md={8}>
                                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                            </Col>
                        )
                    }} /> */}

