const { models } = require("mongoose");
const User = require("../models/Users");

module.exports=(req,res, next) => {
    console.log("InfoMiddleWare Called - gIP" + global.isInfoProvided);
    if(!global.isInfoProvided) 
        return res.redirect("/g2");
    next();
}