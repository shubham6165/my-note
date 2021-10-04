const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note')

// Routes 1: Get all thee Notes using: /api/notes/fetchallnotes Login Required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: err.message, error: "Internal Server Error" })
    }
})

// Routes 2: Add a new Note using: POST /api/notes/addnote LOGIN Required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be 5 characters.').isLength({ min: 5 })
],
    async (req, res) => {

        //If some error found, return Bad request and error array
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title, description, tag } = req.body;
            //If there are errors, return Bad request and errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();

            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: err.message, error: "internal error occured" })
        };
    })

// Routes 3: Update an existing Note using: PUT /api/notes/updatenote LOGIN Required
router.put('/updatenote/:id', fetchUser,
    async (req, res) => {
        try{
        const {title, description, tag} = req.body;
        //create a newNote object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
         
        // Find the note to be updated
        var note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};

        if(note.user.toString() !== req.user.id){
            returnres.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new: true})
        res.json(note);
     } catch(error){
            console.error(error.message);
            res.status(500).json({ message: err.message, error: "internal error occured" })
        };
    }

);

// Routes 4: delete an existing Note using: DELELTE /api/notes/deletenote LOGIN Required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    //find the note to be deleted
    try {
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(401).send("Not Found")}
    
    // Delete only if user owns this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Found");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success": " Note has been deleted", title: note.title});
    } catch(error){
        console.error(error.message);
        res.status(500).json({ message: err.message, error: "internal error occured" })
    };
})

module.exports = router;