const express = require('express')
const validateAuthorInfo = require('./middlewares/author.middleware');
const router = express.Router()
router.use(validateAuthorInfo);
router.use("/items",require('./items/routes/Items'));
module.exports = router;