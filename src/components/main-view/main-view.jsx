import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

//#0
import { setMovies } from '../../actions/actions';

// we havent written this one yet
// import MoviesList from '../movies-list/movies-list';

import { MovieCard } from '../movie-card/movie-card';
import { NavbarView } from '../navbar-view/navbar-view';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';

//bootstrap components
import { Row, Col, Button, Container, Link } from 'react-bootstrap';

// #2 export keyword removed from here
class MainView extends React.Component {
    constructor() {
        super();

        // #3 movies state removed from here
        this.state = {
            user: null
        };
    }

    getMovies(token) {
        axios.get('https://obi-flix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // assign the result to the state
                // #4
                this.props.setMovies(response.data);
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
        // #5 movies is extracted from this.props rather than from the this.state
        let { movies } = this.props;
        let { user } = this.state;

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

                        // #6
                        return <MovieList movies={movies} />

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

                    <Route path="/movies/:movieId" render={({ match, history }) => {
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
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                            </Col>
                        )
                    }} />

                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (!user) return (
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        );
                        if (movies.length === 0) return <div className='main-view' />;
                        return (
                            <Col md={8}>
                                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                            </Col>
                        )
                    }} />
                    <Route path="/genres/:name" render={({ match, history }) => {
                        if (!user) return (
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        );
                        if (movies.length === 0) return <div className='main-view' />;
                        return (
                            <Col md={8}>
                                <GenreView Genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                            </Col>
                        )
                    }} />


                    <Route path="/profile" render={({ history }) => {
                        if (!user) {
                            return (
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            );
                        }

                        return (
                            <Col md={8}>
                                <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                            </Col>
                        );
                    }} />
                </Row>
            </Router>
        );
    }
}

//#7
let mapStateToProps = state => {
    return { movies: state.movies }
}

//#8
export default connect(mapStateToProps, { setMovies })(MainView);