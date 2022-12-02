
const bcrypt = require("bcrypt");
const Users = require("../models/Users");

module.exports = (req, res) => {
    const { username, password } = req.body;



    console.log(req.body);
    
    Users.findOne({username:username}, (error, user) => {
        console.log(user+ " , " + error);
        if (user) {
            
             bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    global.userRole = user.role;
                    req.session.userId = user._id;
                    global.isInfoProvided = (user.licenceNumber != null && user.licenceNumber != 'default' )
                    console.log("User ID and role - " + req.session.userId + ", " + global.userRole + " , " + global.isInfoProvided);
                    res.redirect("/"); 
                    // res.redirect("/g2"); // Redirected directly to G2 for testing purpose.
                } else {
                    global.isAdmin = false;
                    res.redirect("/login");
                }
            })
        } else {
            res.redirect("/signup");
        }
    })
}