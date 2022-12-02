module.exports = async(req, res) => {
    if(global.userRole == "admin") {
        res.render("appointment");

    } else {
        res.redirect("/");
    }
};