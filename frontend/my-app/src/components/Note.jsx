import React from "react";
import "./Note.css"; // Make sure the CSS exists

function Note({ note, onDelete }) {
    return (
        <div className="note">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => onDelete(note.id)}>Delete</button>
        </div>
    );
}

export default Note;
