import React, { Component } from 'react';
import '../style/css/main.css';
import PropTypes from 'prop-types';

class Note extends Component {

    constructor(props) {
        super(props);
        this.noteContent = props.noteContent;
        this.noteId = props.noteId;
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
        this.handleUpdateNote = this.handleUpdateNote.bind(this);
    }

    handleRemoveNote(id){
        this.props.removeNote(id);
    }

    handleUpdateNote(id) {
        this.props.updateNote(id);
    }


    render(props) {
        return(
            <div className="note animated bounceInUp">
                <span
                    className="closebtn"
                    onClick={() => this.handleRemoveNote(this.noteId)}>
                    &times;
                </span>
                <button
                    className="updateBtn"
                    onClick={() => this.handleUpdateNote(this.noteId)}>
                    <i class="material-icons">edit</i>
                </button>
                <p
                    contentEditable={true}
                   className="noteContent">{ this.noteContent }</p>
            </div>
        )
    }
}

Note.propTypes = {
    noteContent: PropTypes.string
}

export default Note;