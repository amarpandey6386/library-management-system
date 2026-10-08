const express = require("express");

const { addBook, 
    getAllBooks, 
    getBookById, 
    updateBook, 
    deleteBook } = require("../controllers/bookController");

const protect = require("../middlewares/authMiddleware");
const adminOnly = require("../middlewares/adminMiddlware");

const router = express.Router();

router.post("/", protect, adminOnly, addBook);
router.get("/", protect, getAllBooks);
router.get("/:id", protect, getBookById)
router.put("/:id", protect, adminOnly, updateBook)
router.delete("/:id", protect, adminOnly, deleteBook)

module.exports = router;