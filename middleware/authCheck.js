const { models } = require("mongoose");
const User = require("../models/Users");

module.exports=(req,res, next) => {
    console.log("AuthMiddleWare Called, login - " + req.session.userId);
    if(!req.session.userId) 
    return res.redirect("/login");
    
    User.findById(req.session.userId, (error, user) => {
        if(error || !user) 
        return res.redirect("/signup");
    })
    
    if(global.userRole != 'driver') {
        console.log("AuthMiddleWare Called, User is not a driver, = " + global.userRole);
        return res.redirect("/");
    }

    next();
}