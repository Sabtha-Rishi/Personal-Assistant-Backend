const User = require('../model/accounts.model');
const Notes = require('../model/notes.model');
const jwt = require('jsonwebtoken');




// User data from TOKEN
const getNotes = (req, res) => {

    const user_id = (jwt.verify(req.cookies.token, process.env.JWT_SECRET))

    const notes = Notes.find({user_id:user_id.id}, function(err, notes){
        return res.send(notes)
    })

}

const getNote = (req, res) => {

    const userID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id

    Notes.findOne({_id: req.params.noteID}, function(err, note){
        if (err) {
            return res.send(err)
        }

        if (note.user_id === userID){
            return res.send(note)
        } else{
            return res.send('Login with the account you used while creating this note to access it.')
        }
    })

}




//  Create New Note
const createNote = (req, res) => {
    let newNote = new Notes()

    const userID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET))

    newNote.user_id = userID.id
    newNote.title = req.body.title
    newNote.description = req.body.description

    newNote.save((err, Note) => { 
        if (err) { 
            return res.status(400).send({
                "error" : err.message
            });
        } 
        else { 
            return res.send("Note Added"); 
        } 
    }); 
    
}; 


// Delete Note
const deleteNote = (req, res) => {

    const userID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id

    Notes.findOneAndDelete({_id: req.params.noteID , user_id : userID }, function(err, note){
        if (!note){
            res.send('Note does not exist')
        }
        if (err){
            return res.send(err)
        } else{
            return res.send('Note Deleted')
        }
    })

}




const NotesController = {
    getNotes,
    createNote,
    deleteNote,
    getNote
};


module.exports = NotesController;