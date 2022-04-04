const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type: String,
    },
    password:{
        type:String,
    },
    fullname:{
        type:String,
    }
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('Users',UserSchema);