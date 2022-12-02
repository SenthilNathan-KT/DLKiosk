const Users = require("../models/Users");

module.exports = async (req, res) => {
    try {
        // console.log(req.body);
        console.log(req.body.password + " -- " + req.body.reenterpassword);
        if(req.body.password != req.body.reenterpassword) {
            global.errorMessage = "Entered password and confirm password does not match";
            // console.log( "SET 1 - " + global.errorMessage + " and is not null = " + global.errorMessage != null);
        } else {
            await Users.create(req.body);
            global.errorMessage = null;
        }
    } catch(error) {
        console.log( "error " + error);
        if(error.message.includes("E11000 duplicate key error")){
            global.errorMessage = "Username is already taken. Kindly try with a different name";
            // console.log( "SET 2 - " + global.errorMessage + " and is not null = " + global.errorMessage != null);
        } else {
            global.errorMessage = null;
        }
    }

    res.redirect(global.errorMessage != null ? "/signup" : "/");
};