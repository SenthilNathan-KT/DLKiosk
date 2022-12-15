const Appointment = require("../models/Appointment");

module.exports = async (req, res) => {
    console.log("App controller called");
    try {
        await Appointment.create(req.body);
    } catch (error) {
        console.log("App controller - Error - " + error);
    }
    res.redirect("/appointment");
}