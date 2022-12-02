const { models } = require("mongoose");
const User = require("../models/Users");

module.exports=(req,res, next) => {
    console.log("redirectIfAuthMiddleWare Called, login - " + req.session.userId + " and role = " + global.userRole);
    if(global.userRole == undefined)  {
        console.log("Setting undefined")
        req.session.userId = null;
    }
    if(req.session.userId) 
        return res.redirect("/");

    next();
}