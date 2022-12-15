const Appointment = require("../models/Appointment");
module.exports = async (req, res) => {

    console.log("evaluate body -> " + req.query.id)
    var appointmentDetails = null;
    // appointmentDetails = await Appointment.find(({isTimeSlotAvailable: false}))
    appointmentDetails = await Appointment.find(({_id: req.query.id, isTimeSlotAvailable: false})).populate("userId");
    
    
    // appointmentDetails.map(element => {
    //     let key = element.date.toISOString().slice(0, 10);
    //     console.log("From update Appointment JS FindOne -> " + key + " $$ " + element.time)

    // });

    

    if(appointmentDetails == null || appointmentDetails.length == 0) {
        console.log("Passing appointmentDetails value is null ->  " + appointmentDetails);
        res.redirect("/exam");
    } else  {
        console.log("Passing appointmentDetails value size is ->  " + appointmentDetails.length);
        console.log("Username  " + appointmentDetails[0].userId.username);
        res.render("evaluate", {appointmentDetails});
    }

}