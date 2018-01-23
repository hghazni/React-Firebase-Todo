import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './style/css/main.css';
import * as fire from 'firebase';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { todoItems: [] }; // <- sets up react state
    }
    /* Create reference to messages in Firebase Database */
    componentWillMount(){
        let todoRef = fire.database().ref('todoItems').orderByKey().limitToLast(100);
        todoRef.on('child_added', snapshot => {
            /* Update React state when message is added at Firebase Database */
            let item = { text: snapshot.val(), id: snapshot.key };
            this.setState({ todoItems: [item].concat(this.state.todoItems) });
        })
    }
    /* Adds Todo List Item */
    addItem(e){
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref('todoItems').push( this.inputEl.value );
        this.inputEl.value = ''; // <- clears the input
    }

    /* Removes Todo List Item */
    removeItem(e){
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref('todoItems').remove( this.inputEl.value );
        this.inputEl.value = ''; // <- clears the input
    }

    /*Renders to the DOM*/
    render() {
        return (
            <form onSubmit={this.addItem.bind(this)}>
                <h1>Todo List</h1>
                <input type="text" ref={ el => this.inputEl = el }/>
                <input class='waves-effect waves-light btn' type="submit"/>
                <ul>
                    { /* Render the list of messages */
                        this.state.todoItems.map( item => <li key={item.id}>{item.text}</li> )
                    }
                </ul>
            </form>
        );
    }
}

export default App;
