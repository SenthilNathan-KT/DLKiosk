const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UsersSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String},
    role: {type: String, default: 'driver'},
    firstName: {type: String, default: 'default'},
    lastName: {type: String, default: 'default'},
    age: {type: Number, default: 0},
    sin: {type: String, default: 'default'},
    licenceNumber: {type: String, default: 'default'},
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Appointment",
    },
    // dateOfBirth: {type: Date, default: new Date()},
    carInformation: {
        make: {type: String, default: 'default'},
        model: {type: String, default: 'default'},
        year: {type: String, default: 'default'},
        plateNumber: {type: String, default: 'default'},
    }
    
});

UsersSchema.pre("save", function(next){
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    })
})

UsersSchema.pre("save", function(next){
    const user = this;
    bcrypt.hash(user.sin, 10, (error, hash) => {
        user.sin = hash;
        next();
    })
})

const Users = mongoose.model("Users", UsersSchema);
module.exports = Users;