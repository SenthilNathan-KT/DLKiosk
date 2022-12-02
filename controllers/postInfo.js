const Users = require("../models/Users");
const Appointment = require("../models/Appointment")
module.exports = async (req, res) => {
    console.log("Post Details Called -> " + req.body.firstName)
    console.log(req.body);

    function updateUsers(currAppointmentID) {
        console.log("UpdateUsers Called")
        const obj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            licenceNumber: req.body.licenceNumber,
            age: req.body.age,
            sin: req.body.sin,
            appointmentId: currAppointmentID,
            carInformation: {
                make: req.body.make,
                model: req.body.model,
                year: req.body.year,
                plateNumber: req.body.plateNumber,
            }
        };
        console.log("make -> " + obj)
    
    
        const output = Users.findByIdAndUpdate(req.session.userId, obj, function(error, object) {
            console.log("error -> " + error + " , Obj -> " + obj);
            if(error == null && obj != null) {
                global.isInfoProvided = true;
                console.log("isInfoProvided - " + global.isInfoProvided);
            }
        }).clone();
    }
    
    // appointmentDetails =  Appointment.find({date: new Date("2022-11-26")}, (function(err, result) {
    try {
        let currAppointmentID;
        // console.log("Req time and date - " + req.body.date + " && " + req.body.time)
        Appointment.findOne({date: new Date(req.body.date), time: req.body.time})
        .then((result) => { 
            currAppointmentID = result._id; 
            // console.log("Result - " + result + " $$ id " + result._id + ",,,," + result.date + " $$ " + result.time) 
        

            // console.log("Newwwwwww22  - > " + currAppointmentID);
            Appointment.findByIdAndUpdate(currAppointmentID, {isTimeSlotAvailable: false})
                .then(result => { 
                    // console.log("UpdateResult = " + result) 
                    updateUsers(currAppointmentID);
                })
                .catch(error => {console.log("UpdateError App update Error - " + error);}) ;

                
        });
    } catch (e) {
        console.log("App update Error - " + e);
    }

    res.redirect("/g");
}