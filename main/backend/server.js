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
const Game = require('./game');
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
                    res.send(doc);
                })
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
    Room.findOne({ id: req.body.id }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("Room Already Exists");
        if (!doc) {
            const newRoom = new Room({
                id: req.body.id,
                name: req.body.name,
                status: true,
                open: true,
                player_1: req.body.player_1,
                player_2: "",
                winner: "",
                date: req.body.date,
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
    res.send(req.user);
});

app.get("/playerInfo", (req, res) => {
    if (req.user) {
        User.findOne({ id: req.body.id }, async (err, doc) => {
            res.send(doc)
        })
    }
})

app.get("/userInfo", (req, res) => {
    if (req.user) {
        User.findOne({ username: req.user.username }, async (err, doc) => {
            res.send(doc)
        })
    }
})

app.post("/saveGame", (req, res) => {
    console.log(req.body)
    const game = new Game({
        player_id: req.body.id,
        game_state: req.body.game
    })
    console.log(game)
    game.save()
})

app.get('/gameList', function (req, res) {
    Game.find({player_id: req.body.id}, function (err, games) {
        var gameList = [];
        games.forEach(function (game) {
            gameList.push(game)
        });
        res.send(gameList);
    });
});


//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(4000, () => {
    console.log("Server Has Started");
});





//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const http = require('http');
const { Server } = require('socket.io');

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on('connection', (socket) => {

    socket.on("join-room", (data) => {
        socket.join(data)
        console.log('User: ', socket.id, 'Room: ', data)
        socket.emit("room-size", io.sockets.adapter.rooms.get(data).size)
    })



    socket.on("game_update", (data, id) => {
        console.log()
    })
})

server.listen(3001, () => {
    console.log("Listening on port 3001")
})