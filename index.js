require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongo");
const expressSession = require("express-session");

const homeController = require("./controllers/home");
const gController = require("./controllers/g");
const g2Controller = require("./controllers/g2");
const signupController = require("./controllers/signup");
const storeUserController = require("./controllers/storeUserAccount");
const loginUserController = require("./controllers/loginUserAccount");
const loginController = require("./controllers/login");
const logoutController = require("./controllers/logout");
const postInfoController = require("./controllers/postInfo");
const updateInfoController = require("./controllers/updateInfo");
const appointmentController = require("./controllers/appointment");
const postAppointmentController = require("./controllers/postAppointment");


const authCheckMiddleware = require("./middleware/authCheck");
const infoCheckMiddleware = require("./middleware/infoCheck");
const redirectIfAuthMiddleware = require("./middleware/redirectIfAuth");
const collectAppointmentMiddleware = require("./middleware/collectAppointments");

const app = new express();

global.isInfoProvided = false;
global.errorMessage = null;
global.dateAvailability = null;

app.use(expressSession({secret: "kathi537", resave: false, saveUninitialized: true,
             store: mongoStore.create({ mongoUrl: process.env.MONGO_SESSION_URL }) }) );

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true });

const port = 3001;
  
app.get("/", homeController);

app.get("/g", authCheckMiddleware, infoCheckMiddleware, gController);

app.get("/g2", authCheckMiddleware, collectAppointmentMiddleware, g2Controller);

app.post("/g2/postDetails", authCheckMiddleware, postInfoController)

app.post("/g/updateDetails", authCheckMiddleware, infoCheckMiddleware, updateInfoController)

app.get("/login", redirectIfAuthMiddleware, loginController);

app.get("/logout", logoutController);

app.get("/signup", redirectIfAuthMiddleware, signupController);

app.post("/users/register", redirectIfAuthMiddleware, storeUserController);

app.post("/users/login", redirectIfAuthMiddleware, loginUserController);

app.get("/appointment", collectAppointmentMiddleware, appointmentController);

app.post("/appointment/postDetails", postAppointmentController)

app.listen(port, () => {
    console.log("App listening on port " + port)
})

