const express = require("express");
const router = express.Router();
const { getItems, getItemById } = require("./../controllers/items.controller");

/**
 * @swagger
 * /api/v1/items:
 *   get:
 *     summary: Get all items
 *     tags:
 *      - items
 *     description: Retrieves a list of items from the system.
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         type: string
 *         description: Name of item to search
 *       - in: header
 *         name: Author-Info
 *         required: true
 *         description: The author of the request (serialized JSON object containing details)
 *         type: string  // Specify type as string here
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ItemsResponse'
 */
router.get("/", getItems);

/**
 * @swagger
 * /api/v1/items/{id}:
 *   get:
 *     summary: Get item detail by ID
 *     tags:
 *      - items
 *     description: Retrieves a specific item and his detail from the system based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: The ID of the item to retrieve
 *       - in: header
 *         name: Author-Info
 *         required: true
 *         description: The author of the request (serialized JSON object containing details)
 *         type: string  // Specify type as string here
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemsByIdResponse'
 *       404:
 *         description: Not found id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", getItemById);

module.exports = router;
