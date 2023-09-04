const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();
require('dotenv').config();

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(cors());
app.use(express.json());
// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to the learning space.");
});

db.sequelize.sync({ alter: true }).then(() => {
    let port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log(`⚡ Sever running on http://localhost:${port}`);
    });
});

// Routes
const userRoute = require('./routes/user');
app.use("/user", userRoute);

const recordRoute = require('./routes/record');
app.use("/record", recordRoute);