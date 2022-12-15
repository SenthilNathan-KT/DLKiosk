const Users = require("../models/Users");


module.exports = async (req, res) => {
    // try {
        console.log("storeUserAccount.js is running");
        console.log(req.body.password + " -- " + req.body.reenterpassword);
        if(req.body.password != req.body.reenterpassword) {
            global.errorMessage = "Entered password and confirm password does not match";
            // console.log( "SET 1 - " + global.errorMessage + " and is not null = " + global.errorMessage != null);
            req.flash("signUpError", "Passwords does not match");
            req.flash("data", req.body);
        } else {
            try {
                await Users.create(req.body);
                global.errorMessage = null;
            } catch (error ) {
                const  validationErrors = Object.keys(error.errors).map(
                    key => error.errors[key].message
                );

                console.log("StoreUserError -> " + validationErrors);

                req.flash("signUpError", validationErrors);
                req.flash("data", req.body);

            }
        }
    // } catch(error) {
    //     console.log( "error " + error);
    //     if(error.message.includes("E11000 duplicate key error")){
    //         global.errorMessage = "Username is already taken. Kindly try with a different name";
    //         // console.log( "SET 2 - " + global.errorMessage + " and is not null = " + global.errorMessage != null);
    //     } else {
    //         global.errorMessage = null;
    //     }
    // }

    const {username, password} = req.flash("data")[0];
    res.render("signup", {
        signUpError: req.flash("signUpError"),
        username: username,
        password: password,
    });
};