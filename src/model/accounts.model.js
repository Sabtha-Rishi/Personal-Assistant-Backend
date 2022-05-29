// ______________________________________ IMPORTS START ________________________

const mongoose = require('mongoose');
const crypto = require('crypto');
const { kStringMaxLength } = require('buffer');


// ______________________________________ IMPORTS END  ________________________
// ______________________________________ SCHEMA START  _______________________

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name : {
        type: String,
        maxlength : 30,
    },
    phone_number : {
        type: Number,
        min:9,
        max:10,
    },
    is_phone_verified : {
        type: Boolean,
        required: true,
        default:false
    },
    is_email_verified : {
        type: Boolean,
        required: true,
        default:false
    },
    gender :{
        type: String,
        maxlength:7,
        default:"unknown"
    },
    joined_at :{
        type:Date,
        required: true,
        default:Date.now()
    },
    last_active :{
        type: Date,
        required: true,
        default:Date.now()
    },
    is_admin : {
        type:Boolean,
        default:false
    },
    is_staff : {
        type:Boolean,
        default:false
    },
    is_user : {
        type:Boolean,
        default:true
    },
    hash : String,
    salt : String
});

// ______________________________________ SCHEMA END  ____________________________
//  _____________________________________ MODEL METHODS START _____________________

UserSchema.methods = {

    // Hashing Password
    setPassword : function(password) { 
    this.salt = crypto.randomBytes(16).toString('hex'); 
    this.hash = crypto.pbkdf2Sync(password, this.salt,  
        100, 64, `sha512`).toString(`hex`); 
    },

    // Decrypting password
    validPassword : function(password) { 
        var hash = crypto.pbkdf2Sync(password,  
        this.salt, 100, 64, `sha512`).toString(`hex`); 
        return this.hash === hash; 
    },


};

//  _____________________________________ MODEL METHODS END ______________________
//  _________________________________________ EXPORTS _____________________________

const User = module.exports = mongoose.model('User', UserSchema);