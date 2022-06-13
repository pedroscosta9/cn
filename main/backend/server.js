const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require('./user');
const Room = require('./room');
//----------------------------------------- END OF IMPORTS---------------------------------------------------
mongoose.connect(
    "mongodb+srv://simaopedro:Simaopedro123.@cluster0.y5zx4b0.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("Mongoose Is Connected");
    }
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000", // <-- location of the react app were connecting to
        credentials: true,
    })
);
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                User.findOne({ username: user.username }, async (err, doc) => {
                    if (err) throw err;
                    doc.isOnline = true;
                    await doc.save();
                })
                res.send("Successfully Authenticated");
            });
        }
    })(req, res, next);
});

app.post("/register", (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
                isOnline: true,
            });
            await newUser.save()
            res.send("User Created");
        }
    });
});

app.post("/createRoom", (req, res) => {
    Room.findOne({id: req.body.id}, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
            const newRoom = new Room({
                id: req.body.id,
                name: req.body.name,
                status: true,
                player_1: req.body.player_1,
                player_2: "",
                winner: "",
                date : req.body.date,
            });
            await newRoom.save()
            res.send("Room Created");
        }
    })
})

app.get('/roomsList', function (req, res) {
    Room.find({}, function (err, rooms) {
        var roomList = [];
        rooms.forEach(function (room) {
            roomList.push(room)
        });
        res.send(roomList);
    });
});

app.get('/usersList', function (req, res) {
    User.find({}, function (err, users) {
        var userList = [];
        users.forEach(function (user) {
            userList.push(user)
        });
        res.send(userList);
    });
});

app.post('/logout', function (req, res, next) {
    User.findOne({ username: req.user.username }, async (err, doc) => {
        if (err) throw err;
        doc.isOnline = false;
        await doc.save();
    })
    req.logout(function (err) {
        if (err) { return next(err); }

    });
});

app.get("/user", (req, res) => {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});


//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(4000, () => {
    console.log("Server Has Started");
});