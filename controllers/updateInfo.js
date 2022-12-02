const Users = require("../models/Users");
module.exports = async (req, res) => {
    console.log("updateDetails Called -> " + req.body.id)
    console.log("body -> " + req.body)
    
    const obj = {
        carInformation: {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            plateNumber: req.body.plateNumber,
        },
    };
    console.log("make -> " + obj)


    const output = await Users.findByIdAndUpdate(req.body.id, obj, function(error, object) {
        console.log("error -> " + error + " , Obj -> " + obj);
    }).clone();

    console.log('Update success' + output)
    res.redirect('/g');
}