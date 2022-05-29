// ______________________________________ IMPORTS START ________________________
const mongoose = require('mongoose');

// ______________________________________ IMPORTS END  ________________________

// ______________________________________ SCHEMA START  _______________________

const NotesSchema = new mongoose.Schema({

    user_id:{
        type: String,
        required: true,
        unique:false
    },

    title:{
        type:String,
        maxLength:120,
    },

    description:{
        type:String,
        maxLength:256,
    },

    created_at:{
        type:Date,
        required:true,
        default:Date.now(),
    },

});

// ______________________________________ SCHEMA END  ____________________________
//  _____________________________________ MODEL METHODS START _____________________

NotesSchema.methods = {
    

};

//  _____________________________________ MODEL METHODS END ______________________
//  _________________________________________ EXPORTS _____________________________

const Notes = module.exports = mongoose.model('Note', NotesSchema);