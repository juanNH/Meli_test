const express = require('express')
const router = express.Router()
const {getItems, getItemById } = require('./../controllers/items.controller');


router.get("/", getItems);
router.get("/:id", getItemById);

module.exports = router;