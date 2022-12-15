const req = require("express/lib/request");
const Users = require("../models/Users");
const Appointment = require("../models/Appointment");

module.exports = async (req, res) => {
    console.log("updateDetails Called -> " + req.body.id)
    console.log("body -> " + req.body)
    
    try {
        let currAppointmentID;
        console.log("Req time and date - " + req.body.date + " && " + req.body.time)
        Appointment.findOne({date: new Date(req.body.date), time: req.body.time})
        .then((result) => { 
            console.log("Appointment found -> " + result._id);
            currAppointmentID = result._id; 
            Appointment.findByIdAndUpdate(currAppointmentID, {isTimeSlotAvailable: false, userId: req.body.userId, appointmentType: "G"})
                .then(result => { 
                    // console.log("UpdateResult = " + result) 
                    updateUsers(currAppointmentID);
                })
                .catch(error => {console.log("UpdateError App update Error - " + error);}) ;                
        });
    } catch (e) {
        console.log("App update Error - " + e);
    }

    function updateUsers(currAppointmentID) {
        console.log("UpdateUsers Called")

        const obj = {
            appointmentId: currAppointmentID,
            carInformation: {
                make: req.body.make,
                model: req.body.model,
                year: req.body.year,
                plateNumber: req.body.plateNumber,
            },
        };
        console.log("make -> " + obj)    
        const output = Users.findByIdAndUpdate(req.session.userId, obj, function(error, obj) {
            console.log("error -> " + error + " , Obj -> " + obj);
            if(error == null && obj != null) {
                global.isInfoProvided = true;
                console.log(" G Page -> no error and update success");
            }
        }).clone();
    }


    


    // const output = await Users.findByIdAndUpdate(req.body.id, obj, function(error, object) {
    //     console.log("error -> " + error + " , Obj -> " + obj);
    // }).clone();

    console.log('Update success')
    res.redirect('/g');
}