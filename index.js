require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongo");
const expressSession = require("express-session");
const flash = require('connect-flash');


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
const candidatesController = require("./controllers/candidates");
const postAppointmentController = require("./controllers/postAppointment");
const examController = require("./controllers/exam");
const evaluateController = require("./controllers/evaluate");
const updateResultController = require("./controllers/updateResult");


const authCheckMiddleware = require("./middleware/authCheck");
const infoCheckMiddleware = require("./middleware/infoCheck");
const redirectIfAuthMiddleware = require("./middleware/redirectIfAuth");
const collectAppointmentMiddleware = require("./middleware/collectAppointments");
const collectCreatedAppointmentsMiddleware = require("./middleware/collectCreatedAppointments");
const examinerCheckMiddleware = require("./middleware/examinerCheck");
const adminCheckMiddleware = require("./middleware/adminCheck");

const app = new express();

global.isInfoProvided = false;
global.errorMessage = null;
global.dateAvailability = null;

app.use(expressSession({secret: "kathi537nayak113", resave: false, saveUninitialized: true,
             store: mongoStore.create({ mongoUrl: process.env.MONGO_SESSION_URL }) }) );

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(flash());


mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true });

const port = 3001;
  
app.get("/", homeController);

app.get("/g", authCheckMiddleware, infoCheckMiddleware, collectCreatedAppointmentsMiddleware, gController);

app.get("/g2", authCheckMiddleware, collectCreatedAppointmentsMiddleware, g2Controller);

app.post("/g2/postDetails", authCheckMiddleware, postInfoController)

app.post("/g/updateDetails", authCheckMiddleware, infoCheckMiddleware, updateInfoController)

app.get("/login", redirectIfAuthMiddleware, loginController);

app.get("/logout", logoutController);

app.get("/signup", redirectIfAuthMiddleware, signupController);

app.post("/register", redirectIfAuthMiddleware, storeUserController);

app.post("/login", redirectIfAuthMiddleware, loginUserController);

app.get("/appointment", adminCheckMiddleware, collectAppointmentMiddleware, appointmentController);

app.post("/appointment/postDetails", adminCheckMiddleware, postAppointmentController);

app.get("/exams", examinerCheckMiddleware, examController);

app.post("/exams", examinerCheckMiddleware, examController);

app.post("/correction/:id", examinerCheckMiddleware, evaluateController);

app.get("/correction", examinerCheckMiddleware, evaluateController);

app.post("/updateResult", examinerCheckMiddleware, updateResultController);

app.get("/candidates", adminCheckMiddleware, candidatesController);


app.listen(port, () => {
    console.log("App listening on port " + port)
})

