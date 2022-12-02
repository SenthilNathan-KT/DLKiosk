module.exports = async(req, res) => {
    var date = new Date();
    console.log(date.toISOString().slice(0, 10));
    date.setDate(date.getDate() + 10);
    console.log(date.toISOString().slice(0, 10));
    res.render("login");
};