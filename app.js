require("dotenv").config();
require("./config/mongodb");
const mongoose = require("mongoose");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const hbs = require("hbs");

var indexRouter = require("./routes/index");
var custRouter = require("./routes/customers");
var adminRouter = require("./routes/admin");
var authRouter = require("./routes/auth");
var shopRouter = require("./routes/myShop");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
hbs.registerPartials(path.join(__dirname, "views/partials"));




function checkloginStatus(req, res, next) {
  res.locals.user = req.session.currentUser ? req.session.currentUser : null;
  // access this value @ {{user}} or {{user.prop}} in .hbs
  res.locals.isLoggedIn = Boolean(req.session.currentUser);
  // access this value @ {{isLoggedIn}} in .hbs
  next(); // continue to the requested route
  }


app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "woot",
    resave: false,
    saveUninitialized: false
  })
);


// middlewares

app.use(function exposeFlashMessage(req, res, next) {  
  res.locals.success_msg = req.flash("success");
  res.locals.error_msg = req.flash("error");
  next();
});

app.use(function exposeLoginStatus(req, res, next) {
  if (!req.session.currentUser) {
    res.locals.currentUser = undefined;
    res.locals.isLoggedIn = false;
    // res.locals.isAdmin = false;
  } else {
    res.locals.currentUser = req.session.currentUser;
    res.locals.isLoggedIn = true;
    // res.locals.isAdmin = req.session.currentUser.role === "admin";
  }
  next();
});

app.use(checkloginStatus);


app.use("/", indexRouter);
app.use("/shopping", custRouter);
app.use("/admin", adminRouter);
app.use("/", authRouter);
app.use("/myshop", shopRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log("ici")
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


// app.use(exposeFlashMessage)

module.exports = app;
