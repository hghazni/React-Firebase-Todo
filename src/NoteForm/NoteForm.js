import React, { Component } from 'react';
import '../style/css/main.css';

class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newNoteContent: 'something',
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNote = this.writeNote.bind(this);
    }

    //When the user inputs chnanges, set the value of newNoteContent to the value of the input box
    handleUserInput(e) {
        console.log(this);
        this.setState({
            newNoteContent: e.target.value, //value of the input text
        })
    }

    writeNote() {
        // Call a method tht sets the noteContent for a note to the value of the input
        this.props.addNote(this.state.newNoteContent);
        //Set newNoteContent back to an empty string.
        this.setState({
            newNoteContent: '',
        })
    }

    render(){
        return(
            <div className="formWrapper">
                <input className="noteInput"
                placeholder="Write a new note..."
                value={this.state.newNoteContent}
                onChange={this.handleUserInput} />

                <button className="noteButton waves-effect waves-light btn"
                onClick={this.writeNote}>Add Note</button>
            </div>
        )
    }
}

export default NoteForm;