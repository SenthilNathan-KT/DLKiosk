const Appointment = require("../models/Appointment");
const User = require("../models/Users");
module.exports = async (req, res) => {

    console.log("correctionbody aID -> " + req.body.appointmentId + " && uID -> " + req.body.userId)
    console.log("body -> " + req.body)
    console.log("correction body values -> " + req.body.comments + " && " + req.body.result)

    const obj = {
        isEvaluated: true,
    };

    Appointment.findByIdAndUpdate(req.body.appointmentId, obj, function(error, appointment) {
        console.log("error -> " + error + " , Obj -> " + appointment);
        if(error == null && appointment != null) {
            console.log("updateResult.js No error and appointment obj saved ");
        }
    });

    var userObj;
    if(req.body.appointmentType == "G2") {
        userObj = {
            isG2Passed: (req.body.result == 'pass') ? true : false,
            comments: req.body.comments,
        }
    } else {
        userObj = {
            isGPassed: (req.body.result == 'pass') ? true : false,
            comments: req.body.comments,
        }
    }

    console.log("User obj before update => " + userObj);
    User.findByIdAndUpdate(req.body.userId, userObj, function(error, userObj) {
        console.log("error -> " + error + " , Obj -> " + userObj);
        if(error == null && userObj != null) {
            console.log("updateResult.js No error and user obj saved ");
        }
    });

    res.redirect("/exams");
}