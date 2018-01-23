import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style/css/main.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCfEbe54VD2-XStnWFRfFaxjiG8PRsbSAI",
    authDomain: "todolist-5901b.firebaseapp.com",
    databaseURL: "https://todolist-5901b.firebaseio.com",
    projectId: "todolist-5901b",
    storageBucket: "",
    messagingSenderId: "1058458041951"
};


firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
