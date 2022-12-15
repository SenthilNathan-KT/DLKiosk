
const bcrypt = require("bcrypt");
const Users = require("../models/Users");

module.exports = async (req, res) => {
    let { username, password } = req.body;
    console.log(req.body);
    req.flash("data", req.body);
    
    const user = await Users.findOne({username:username});

    const data = req.flash("data")[0];
    if(typeof data != "undefined") {
        username = data.username;
        password = data.password;
        console.log("Inside req flash setting code");
    }

    console.log("Log1");
    if (user) {
        console.log("Log2");
        bcrypt.compare(password, user.password, (error, same) => {
            if (same) {
                console.log("Log3");
                global.userRole = user.role;
                req.session.userId = user._id;
                global.isInfoProvided = (user.licenceNumber != null && user.licenceNumber != 'default' )
                console.log("User ID and role - " + req.session.userId + ", " + global.userRole + " , " + global.isInfoProvided);
                req.flash("loginError", null);
                return res.render('index');
            } else {
                console.log("Log4");
                global.isAdmin = false;
                // res.redirect("/login");
                req.flash("loginError", "Kindly enter a valid password");
            }
            console.log("Log5");
            res.render("login", {
            loginError: req.flash("loginError"),
            username: username,
            password: password,
        });
        })
        
    } else {
        console.log("Log6");
        req.flash("loginError", "Kindly enter a valid username");
        res.render("login", {
            loginError: req.flash("loginError"),
            username: username,
            password: password,
        });
    }

    // Connect-flash should be done using a middleware or separate js file.
    

    // res.redirect("/exams"); // Redirected directly to G2 for testing purpose.
}