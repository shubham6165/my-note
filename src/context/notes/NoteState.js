import React, { useState } from 'react'
import noteContext from "./noteContext";
require('dotenv').config(); // to include .env file

const NoteState = (props)=>{
  const host= process.env.HOST;
  // GET all notes
    const getNotes = async ()=> {
      const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
        method: "GET",
        headers: {
         // 'Content-Types': 'application/json',
          // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MjJhMWZjYzg5NmFmZWViZDE2ZjZiIn0sImlhdCI6MTYzMTc4MjgwMn0.DdHCyrHqUsE2VVUalbT2LMw6tID6uGkoTwz_vMuzNNw" 
          'auth-token': localStorage.getItem('token')
        },
      }); 
      const json = await response.json();
      setNotes(json);
    }
      const [notes, setNotes] = useState([]);

      // Add a Note
      const addNote = async (title, description, tag)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/addnote/`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MjJhMWZjYzg5NmFmZWViZDE2ZjZiIn0sImlhdCI6MTYzMTc4MjgwMn0.DdHCyrHqUsE2VVUalbT2LMw6tID6uGkoTwz_vMuzNNw' 
            'auth-token': localStorage.getItem('token')
          },
           body: JSON.stringify({title, description, tag})
        }) 
         const json =  await response.json();
        setNotes(notes.concat(json));
      }
      // Delete a Note
      const deleteNote = async (id)=>{
        //API call
        await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')           },
        }); 
       // const json = await response.json();
        const newNotes = notes.filter((note)=>{return note._id !== id});
        setNotes(newNotes);
      } 

      // Edit a Note
      const editNote = async (id, title, description, tag)=>{
            //API Call
        await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')           },
           body: JSON.stringify({title, description, tag})
        }) 
        // const json =  await response.json();
        let newNote = JSON.parse(JSON.stringify(notes));
        //Logic to update note
        for (let index = 0; index < newNote.length; index++) {
          const element = newNote[index];
          if(element._id === id){
            newNote[index].title = title;
            newNote[index].description = description;
            newNote[index].tag = tag;
            break;
          }
          
        }
        setNotes(newNote);
      }

// get User details
const getUser = async (setUser)=> {
  const response = await fetch(`${host}/api/auth/getuser/`, {
    method: "GET",
    headers: {
      'auth-token': localStorage.getItem('token')
    },
  }); 
  const json = await response.json();
   let newuser = await JSON.parse(JSON.stringify(json));
   setUser({name: newuser.name, email: newuser.email});
  // setNotes(json);
}

// Delete Account
const deleteAccount = async ()=> {
  const response = await fetch(`${host}/api/auth/deleteaccount/`, {
    method: "GET",
    headers: {
      'auth-token': localStorage.getItem('token')
    },
  }); 
  const json = await response.json();
  console.log(json.email);
  // setNotes(json);
}

    return(
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes, getUser, deleteAccount}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;