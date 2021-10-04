import React, {useContext, useEffect, useRef, useState} from 'react'
import { useHistory } from 'react-router';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

const Notes = (props) => {
    const context = useContext(noteContext);
    let history = useHistory();
    const {notes, getNotes, editNote} = context;
    const {showAlert} = props;
    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes();
      }else {
        history.push("/login");
      }
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({eid: "", etitle: "", edescription: "", etag: ""});
    const updateNote = (currentnote)=>{
        ref.current.click();
        setNote({eid: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag})
        
      }
    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value}); 
    }

    const handleUpdate = (e)=>{
      //e.preventdefault();
      editNote(note.eid, note.etitle, note.edescription, note.etag);
      props.showAlert("Updated Successfully", "success");
      refClose.current.click();        
    }

    return (
        <>
        <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display:"none"}}>
          Update Note
        </button>
        
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <div className="input-group mb-3 my-4">
                <span className="input-group-text" id="title-label">Title</span>
                <input type="text" className="form-control" id="title" name = "etitle" value={note.etitle} placeholder="write Title for ur Note" onChange={onChange} minLength={5}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="tag">Tag</span>
                <input type="text" className="form-control" id="basic-url" name="etag" value={note.etag} onChange={onChange}/>
            </div>

                <div className="input-group mb-2">
                <span className="input-group-text">Description</span>
                <textarea className="form-control" id = "description" name="edescription" value={note.edescription} aria-label="With textarea" onChange={onChange}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={note.etitle.length<5} type="button" className="btn btn-primary" onClick={handleUpdate}>Update Note</button>
              </div>
            </div>
          </div>
        </div>
      <h2> Your Notes</h2>
        <div className="row my-3">
          <h3> {notes.length===0 && 'No note to display'}</h3>
             { notes.map((note) => {
                        return <NoteItem key={note._id} note = {note} updateNote={updateNote} showAlert={showAlert}/>
                    })
                }
        </div>
        </>
    )
}
export default Notes;