const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    date: {type: "Date", default: new Date()},
    time: String,
    isTimeSlotAvailable: {type: "Boolean", default: true},
    isEvaluated: {type: "Boolean", default: false},
    appointmentType: {type: String, default: "G2", Enumerator: ["G", "G2"]},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        default: null,
    },
    
}, { timestamps: true});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;