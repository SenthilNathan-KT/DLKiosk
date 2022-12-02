const Users = require('../models/Users');
module.exports = async (req, res) => {

    var userDetail = null;
    try {
        console.log("ID from session = " + req.session.userId)
        userDetail = await Users.findOne({
            _id: req.session.userId,
        }).populate("appointmentId").lean();
        if(userDetail != null){
            // if(userDetail.firstName != null) {
            //     // userDetail.dateOfBirth = userDetail.dateOfBirth.getDate() + "-" + parseInt(userDetail.dateOfBirth.getMonth())+1 + "-" + userDetail.dateOfBirth.getFullYear();
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
    res.render("g2", {userDetail})
};