// Importing modules 
const express = require('express'); 
const NotesController = require('../controller/notes.controller')



const NotesRouter = express.Router();



// Auth Routes
NotesRouter.get('/', NotesController.getNotes); 
NotesRouter.post('/new', NotesController.createNote); 

NotesRouter.get('/:noteID', NotesController.getNote); 
NotesRouter.delete('/delete/:noteID', NotesController.deleteNote); 












module.exports = NotesRouter;

