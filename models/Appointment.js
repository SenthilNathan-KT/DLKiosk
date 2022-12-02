const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    date: {type: "Date", default: new Date()},
    time: String,
    isTimeSlotAvailable: {type: "Boolean", default: true},
    
}, { timestamps: true});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;