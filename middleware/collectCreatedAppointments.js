const Appointment = require("../models/Appointment");
module.exports = async(req, res, next) => {
    
    var appointmentDetails = null;
    try {
        console.log("collectCreatedAppointments -> Request URI call for G2  "  + req.url);
        // console.log("CollectAppointmentMW page try logs " + req.session.userId + " and date selected is " + req.session.currDateSelected);
        let isTimeSlotAvailableFindValues = ["true"];
        // console.log("isTimeSlotAvailableFindValues array - " + isTimeSlotAvailableFindValues)
        console.log("collectCreatedAppointments -> isTimeSlotAvailableFindValues - " + isTimeSlotAvailableFindValues)
        // appointmentDetails =  Appointment.find(({isTimeSlotAvailable: {$in: isTimeSlotAvailableFindValues}}), (function(err, result) {
        appointmentDetails = await Appointment.find(({isTimeSlotAvailable: {$in: isTimeSlotAvailableFindValues}}))
        .then(result =>  {
            // if (err) { console.log("CollectAppointmentMW page error  " + error); throw err };
            const map = new Map();
            result.forEach(element => {
                let key = element.date.toISOString().slice(0, 10);
                if(map.get(key) != undefined) {
                    map.set(key, map.get(key) + "," + element.time);
                } else {
                    map.set(key, element.time);
                }

            });
            let dateAvailability = "";
            map.forEach((k,v) => {

                console.log(" CollectAppointmentMW Map value3 for " + k + " is -> " + v);
                dateAvailability += v + "=" + k + "$";
            })
            
            dateAvailability = dateAvailability.substring(0, dateAvailability.length-1);
            global.dateAvailability = dateAvailability;
            console.log("CollectAppointmentMW Final String is " + global.dateAvailability);
            next();
        });
    } catch (error) {
        console.log("CollectAppointmentMW page error2  " + error);
        res.redirect("/");
    }
};