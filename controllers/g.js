const Users = require('../models/Users');
module.exports = async (req, res) => {

    var userDetail = null;
    try {
        console.log("G Page - ID from session = " + req.session.userId)
        userDetail = await Users.findOne({
            _id: req.session.userId,
        }).lean();
        if(userDetail != null){
            // if(userDetail.firstName != null) {
            //     userDetail.dateOfBirth = userDetail.dateOfBirth.getMonth()+1 + "-" + userDetail.dateOfBirth.getDate() + "-" + userDetail.dateOfBirth.getFullYear();
            //     console.log("DOB -> " + userDetail.dateOfBirth);
            // }
        } else {
            console.log("userDetail not found from g2.js");
            res.render("/login")
        }
    } catch (error) {
        console.log(error);
    }
    console.log("UserDetailAttached - " + userDetail);
    res.render("g", {userDetail})
};