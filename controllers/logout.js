module.exports = async(req, res) => {
    global.isInfoProvided = false;
    global.userRole = null;
    req.session.userId = null;
    console.log("Logout caled - " + global.isInfoProvided  + " , " + global.userRole + " , " + req.session.userId);
    res.render("login");
};