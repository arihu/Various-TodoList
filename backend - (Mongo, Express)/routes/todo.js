const express = require("express");
const router = express.Router();
const { getItems, postItem, putItem, deleteItem, } = require("../controllers/todo");


router.get("/", getItems);
router.post("/", postItem);
router.put("/:id", putItem);
router.delete("/:id", deleteItem);

module.exports = router;