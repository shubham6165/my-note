import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const  context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description: "", tag:""})
    const handleAddNote = (e)=>{
        e.preventDefault();
            addNote(note.title, note.description, note.tag);
            props.showAlert("Note Added Successfullt", "success");
            setNote({title:"", description: "", tag:""});
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    const handleClear = ()=>{
        setNote({title:"", description: "", tag:""})
    }
    return (
        <div className="card container my-4" style={{width: "50vw"}} id="addnoteID">
             <h2 className="center my-4">Add Note</h2>
            <div className="input-group mb-3 my-4">
                <span className="input-group-text" id="title-label">Title</span>
                <input type="text" className="form-control" id="title" name = "title" value={note.title} placeholder="write Title for ur Note" onChange={onChange} minLength={5} required/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="tag">Tag</span>
                <input type="text" className="form-control" id="basic-url" name="tag" value={note.tag} placeholder="Add Tag" onChange={onChange}/>
            </div>

                <div className="input-group mb-2">
                <span className="input-group-text">Description</span>
                <textarea className="form-control" id = "description" name="description" value={note.description} aria-label="With textarea" onChange={onChange}></textarea>
                </div>
                <div className= "my-4">
                <button type="button" disabled={note.title.length<5} className="btn btn-primary mx-2" style={{width: "8rem"}} onClick={handleAddNote}>Add Note</button>
                <button type="button" className="btn btn-secondary" style={{width: "8rem"}} onClick={handleClear}>Clear text</button>
                </div>  
            </div>
    )
}

export default AddNote
