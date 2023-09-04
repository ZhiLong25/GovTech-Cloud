const { sign } = require('jsonwebtoken');
require('dotenv').config();
const { User, Record, Sequelize } = require('../models');
const express = require('express');
const router = express.Router();
const yup = require("yup");

const bcrypt = require('bcrypt');

const { validateToken } = require('../middlewares/auth');

router.post("/", async (req, res) => {
    let data = req.body;

    // Validate request body
    let validationSchema = yup.object({
        Email: yup.string().trim().min(3).max(100).required(),
        Name: yup.string().trim().min(3).max(500).required(),
        Password: yup.string().trim().min(3).max(500).required(),
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.Email = data.Email.trim();
    data.Name = data.Name.trim();
    data.Password = data.Password.trim();

    let result = await User.create(data);
    res.json(result);
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { title: { [Sequelize.Op.like]: `%${search}%` } },
            { description: { [Sequelize.Op.like]: `%${search}%` } }
        ];
    }
    let list = await User.findAll({
        where: condition,
        order: [['createdAt', 'DESC']],
        include: { model: User, as: "User", attributes: ['name'] }
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let User = await User.findByPk(id);
    res.json(User);
});

// router.put("/:id", async (req, res) => {
//     let id = req.params.id;

//     // Check id not found
//     let user = await User.findByPk(id);
//     if (!user) {
//         res.sendStatus(404);
//         return;
//     }

//     // Check request user id
//     let userId = req.user.id;
//     if (user.id != userId) {
//         res.sendStatus(403);
//         return;
//     }


//     let data = req.body;
//     let num = await User.update(data, {
//         where: { id: id }
//     });
//     if (num == 1) {
//         res.json({
//             message: "User was updated successfully."
//         });
//     }
//     else {
//         res.status(400).json({
//             message: `Cannot update User with id ${id}.`
//         });
//     }
// });

router.post("/register", async (req, res) => {
    let data = req.body;
    
    // Check email
    let user = await User.findOne({
        where: { Email: data.Email }
    });
    if (user) {
        res.status(400).json({ message: "Email already exists." });
        return;
    }
    // Hash password
    data.Password = await bcrypt.hash(data.Password, 10);
    // Create user
    let result = await User.create(data);
    res.json(result);
});


router.post("/login", async (req, res) => {
    let data = req.body;
    // Trim string values
    data.Email = data.Email.trim().toLowerCase();
    data.Password = data.Password.trim();
    // Check email and password
    let errorMsg = "Email or password is not correct.";
    let user = await User.findOne({
        where: { Email: data.Email }
    });
    if (!user) {
        res.status(400).json({ message: errorMsg });
        return;
    }
    let match = await bcrypt.compare(data.Password, user.Password);
    if (!match) {
        res.status(400).json({ message: errorMsg });
        return;
    }
    // Return user info
    let userInfo = {
        id: user.id,
        email: user.Email,
        name: user.Name
    };
    let accessToken = sign(userInfo, process.env.APP_SECRET);
    res.json({
        accessToken: accessToken,
        user: userInfo
    });
});

router.get("/auth", validateToken, (req, res) => {
    let userInfo = {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name
    };
    res.json({
        user: userInfo
    });
});

module.exports = router;    