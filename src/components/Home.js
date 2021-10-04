import React, {useContext} from 'react';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Notes from './Notes'
export const Home = (props) => {
    const {showAlert} = props;
    const context = useContext(noteContext);
    const {addNote} = context;
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }

    return (
        <div className="container">
                <AddNote addNote={addNote} showAlert={showAlert}/>
                <Notes showAlert={showAlert}/>
                <button className="btn btn-success" onClick={topFunction} style={{position: 'fixed', bottom: '4rem', right: '1.7rem', width: '3.5rem'}}>top</button>
            </div>
            )
}
