const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserAccountSchema = new Schema({
    username: String,
    password: {type: String},
    role: String
});

UserAccountSchema.pre("save", function(next){
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    })
})

const UserAccount = mongoose.model("UserAccount", UserAccountSchema);
module.exports = UserAccount;