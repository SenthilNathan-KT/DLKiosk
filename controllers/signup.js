module.exports = (req,res) => {
  res.render("signup", {
    signUpError: null,
    username: null,
    password: null,
});
};