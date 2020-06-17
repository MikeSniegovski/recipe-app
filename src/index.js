import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from 'components/App';
import RecipesAddByFormik from "./components/RecipesAddByFormik";
import * as serviceWorker from './serviceWorker';
import {Router} from "@reach/router"


const initState = {
    isLogedIn: false,
    userID: "",
    userEmail: "",
    selectedRecipe: null,
    recipeList: null,
    isAddingRecipe: false,
}
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


function reducer(state = initState, action) {

    const { type, payload = {} } = action;

    switch (type) {
        case 'ADD_COMMENT':
            return [...state.slice(), payload]
        case 'ADDING_RECIPE':
            return { ...state, isAddingRecipe: !state.isAddingRecipe };
        case 'SAVE_RECIPES_LIST':
            return { ...state, recipeList: action.payload };
        case 'SELECT_RECIPE':
            return { ...state, selectedRecipe: action.payload };
        case 'LOGIN_STATE':
            return { ...state, isLogedIn: payload.isLogedIn, userID: payload.userID, userEmail: payload.userEmail };
        case 'LOGOUT':
            return { ...state, isLogedIn: action.payload, userID: action.payload };
        default:
            return state;
    }
}
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App path="/"/>
            <RecipesAddByFormik path="/add"/>
            {/*<PrivateRoute user={props.user}*/}
            {/*              userFirebaseData={props.userFirebaseData}*/}
            {/*              userProfile={props.userProfile}*/}
            {/*              path="/"*/}
            {/*              component={App}/>*/}
        </Router>
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
