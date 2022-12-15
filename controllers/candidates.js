const User = require("../models/Users");

module.exports = async(req, res) => {
    console.log("Candidates js -> " + global.userRole);
    if(global.userRole == "admin") {

        let testResult = ["true", "false"];
        // console.log("isTimeSlotAvailableFindValues array - " + isTimeSlotAvailableFindValues)
        // console.log("collectCreatedAppointments -> isTimeSlotAvailableFindValues - " )
        // appointmentDetails =  Appointment.find(({isTimeSlotAvailable: {$in: isTimeSlotAvailableFindValues}}), (function(err, result) {
        const sort = { isG2Passed: -1};
        let userDetails = await User.find(({isG2Passed: {$in: testResult}})).sort(sort);
        res.render("candidates", {userDetails});

    } else {
        res.redirect("/");
    }
};