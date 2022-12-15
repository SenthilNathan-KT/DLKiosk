const Appointment = require("../models/Appointment");
module.exports = async (req, res, next) => {

    var appointmentDetails = null;
    // console.log("From Examiner JS -> " + new Date());
    Appointment.find
    // appointmentDetails = await Appointment.find(({isTimeSlotAvailable: false, date: {$gte: new Date()}}))
    appointmentDetails = await Appointment.find(({isTimeSlotAvailable: false, isEvaluated: false})).populate("userId");
    
    appointmentDetails.map(element => {
        let key = element.date.toISOString().slice(0, 10);
        console.log("From Examiner JS -> " + key + " $$ " + element.time)

    });

    if(appointmentDetails == undefined || appointmentDetails == null) {
        console.log("Passing appointmentDetails value is null ->  " + appointmentDetails);
    } else  {
        console.log("Passing appointmentDetails value size is ->  " + appointmentDetails.length);
    }

    res.render("examiner", {appointmentDetails});
}