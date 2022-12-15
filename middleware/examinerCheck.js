const { models } = require("mongoose");
const User = require("../models/Users");

module.exports=(req,res, next) => {
    console.log("examinerMW Called, login user ID - " + req.session.userId);
    if(!req.session.userId) 
    return res.redirect("/login");
    
    User.findById(req.session.userId, (error, user) => {
        if(error || !user) 
            return res.redirect("/signup");
    })
    
    if(global.userRole != 'examiner') {
        console.log("examinerMiddleWare Called, User is not a examiner, = " + global.userRole);
        return res.redirect("/");
    }

    next();
}