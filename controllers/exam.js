const Appointment = require("../models/Appointment");
module.exports = async (req, res, next) => {

    var appointmentDetails = null;
    console.log("From Examiner JS -> " + req.body.filter);
    
    var appointmentTypes = [];
    
    if(req.body.filter == "g") {
        appointmentTypes.push("G");
    } else if(req.body.filter == "g2") {
        appointmentTypes.push("G2");
    } else {
        appointmentTypes.push("G");
        appointmentTypes.push("G2");
    }
    
    console.log("From Examiner JS -> app types -> " + appointmentTypes);
    Appointment.find
    // appointmentDetails = await Appointment.find(({isTimeSlotAvailable: false, date: {$gte: new Date()}}))
    appointmentDetails = await Appointment.find(({isTimeSlotAvailable: false, isEvaluated: false, appointmentType: {$in: appointmentTypes}})).populate("userId");
    
    appointmentDetails.map(element => {
        let key = element.date.toISOString().slice(0, 10);
        console.log("From Examiner JS -> " + key + " $$ " + element.time)

    });

    if(appointmentDetails == undefined || appointmentDetails == null) {
        console.log("Passing appointmentDetails value is null ->  " + appointmentDetails);
    } else  {
        console.log("Passing appointmentDetails value size is ->  " + appointmentDetails.length);
    }

    res.render("examiner", {appointmentDetails, filterType: req.body.filter});
}