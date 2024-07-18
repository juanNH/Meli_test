const express = require("express");
const validateAuthorInfo = require("./middlewares/author.middleware");
const router = express.Router();

router.use("/items", validateAuthorInfo, require("./items/routes/Items"));
/**
 * @swagger
 * /api/v1/ping:
 *   get:
 *     summary: Ping the server
 *     description: Checks if the server is alive and responding.
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: The response message
 *                   example: pong
 */
router.get("/ping", (req, res) => {
  res.json({ response: "pong" });
});

/**
 * @swagger
 * /api/v1/author:
 *   post:
 *     summary: string author
 *     description: Return string author to use in app
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *                 description: author name
 *               lastname:
 *                 type: string
 *                 required: true
 *                 description: author lastname
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: author string
 *                   example: {"name":"Juan","lastname":"Herrera"}
 */
router.post("/author", (req, res) => {
  console.log(req.body);
  res.json({
    response: {name:req.body.name,lastname: req.body.lastname},
  });
});

module.exports = router;
