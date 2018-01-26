import React, { Component } from 'react';
import './App.css';
import './style/css/main.css';
import './style/css/animate.css';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import { DB_CONFIG } from './FireConfig/config';
import firebase from 'firebase/app';
import 'firebase/database';
import 'manifest.json';

class App extends Component {

    constructor(props){
        super(props);
        this.addNote = this.addNote.bind(this);
        this.removeNote = this.removeNote.bind(this);
        this.updateNote = this.updateNote.bind(this);

        // Initialising Firebase with my config
        this.app = firebase.initializeApp(DB_CONFIG);
        this.database = this.app.database().ref().child('notes');

        //Setting up React State for the Component
        this.state = {
            notes: [],
        }
    }

    componentWillMount(){
        const previousNotes = this.state.notes;

        //When a child is added to the database it will push the value to the notes array
        this.database.on('child_added', snap => { //Data Snapshot Object
            previousNotes.push({
                id: snap.key, //take the key from the snapshot
                noteContent: snap.val().noteContent, //take the note content from snapshot too
            })

            this.setState({
                notes: previousNotes //applies the snapshot data taken above to the previousNotes to update this state with the new array
            })
        })

        this.database.on('child_removed', snap => {
            for (var i = 0; i < previousNotes.length; i++) { //loop through array
                if (previousNotes[i].id === snap.key) { //tries to match id to snapshot
                    previousNotes.splice(i, 1); //number of items to delete at index (1)

                }
            }
            this.setState({
                notes: previousNotes
            })

        })

        //Checks for changes/updates to a Note then updates the DB
        this.database.on('child_changed', snap => {
            previousNotes.push({
                id: snap.key, //take the key from the snapshot
                noteContent: snap.val().noteContent, //take the note content from snapshot too
            })
            this.setState({
                notes: previousNotes
            })

        })
    }

    //Add Note
    addNote(note) {
        this.database.push().set({ noteContent: note });
    }

    //Remove Note
    removeNote(noteId) {
        this.database.child(noteId).remove();
    }

    //Update Note
    updateNote(noteId) {
        //this.database.child(noteId).update(this.state);
    }



    render() {
        return (
            <div className="notesWrapper">
                <div className="notesHeader">
                    <div className="heading">To-Do List</div>
                    <p>By Haroon Ghazni</p>
                </div>

                <div className="notesBody">
                    {
                        this.state.notes.map((note) => {
                            return (
                                <Note
                                    noteContent = {note.noteContent}
                                    noteId = {note.id}
                                    key = {note.id}
                                    removeNote = {this.removeNote}
                                    updateNote = {this.updateNote}/>
                                )
                        })
                    }
                </div>

                <div className="notesFooter">
                    <NoteForm addNote={this.addNote}/>
                </div>
            </div>
        );
    }
}

export default App;
