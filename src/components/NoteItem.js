import React, {useContext} from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
    const {note, updateNote, showAlert} = props;
    return (
      <div className="col-md-4 my-3">
        <div className="card mx-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
          <p className="card-text">{note.description}</p>
          <i className="fa fa-trash mx-3" style={{fontSize:"24px", cursor:"pointer"}} onClick={()=>{deleteNote(note._id); showAlert("Deleted Successfully", "success")}}></i>
          <i className="fa fa-edit" style={{fontSize:"24px", cursor:"pointer"}} onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
      </div>
    )
}

export default NoteItem;