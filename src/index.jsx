import React from 'react';
import ReactDOM from 'react-dom';

import { Container } from 'react-bootstrap';

//redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import movieApp from './reducers/reducers';

import { devToolsEnhancer } from 'redux-devtools-extension';

import { MainView } from './components/main-view/main-view';

// import statement to indicate that you need bundle './index.scss'
import './index.scss';

const store = createStore(movieApp, devToolsEnhancer());

// main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container>
                    <MainView />
                </Container>
            </Provider>

        );
    }
}


// finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// tells react to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);