require('dotenv').config();
const { Record, Sequelize } = require('../models');
const express = require('express');
const router = express.Router();
const yup = require("yup");

router.post("/", async (req, res) => {
    let data = req.body;

    // Validate request body
    let validationSchema = yup.object({
        Name: yup.string().trim().min(3).max(100).required(),
        Symptoms: yup.string().trim().min(3).max(500).required(),
        Contact: yup.string().trim().min(3).max(500).required(),
        Temperature: yup.number().min(-100).max(100).required(),
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

    let result = await Record.create(data);
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
    let list = await Record.findAll({
        where: condition,
        order: [['createdAt', 'DESC']],
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let Record = await Record.findByPk(id);
    res.json(Record);
});

// router.put("/:id", async (req, res) => {
//     let id = req.params.id;

//     // Check id not found
//     let record = await Record.findByPk(id);
//     if (!record) {
//         res.sendStatus(404);
//         return;
//     }

//     // Check request Record id
//     let RecordId = req.Record.id;
//     if (record.RecordId != RecordId) {
//         res.sendStatus(403);
//         return;
//     }

//     // Validate request body
//     let validationSchema = yup.object({
//         Name: yup.string().trim().min(3).max(100).required(),
//         Symptoms: yup.string().trim().min(3).max(500).required(),
//         Contact: yup.string().trim().min(3).max(500).required(),
//         Temperature: yup.number().min(-100).max(100).required(),
//     });
//     try {
//         await validationSchema.validate(data,
//             { abortEarly: false });
//     }
//     catch (err) {
//         console.error(err);
//         res.status(400).json({ errors: err.errors });
//         return;
//     }

//     let data = req.body;
//     let num = await Record.update(data, {
//         where: { id: id }
//     });
//     if (num == 1) {
//         res.json({
//             message: "Record was updated successfully."
//         });
//     }
//     else {
//         res.status(400).json({
//             message: `Cannot update Record with id ${id}.`
//         });
//     }
// });

module.exports = router;    