const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { borrowBook, returnBook, myBorrowedBooks, getBorrowHistory } = require("../controllers/borrowController");

const router = express.Router();

router.post("/:bookId",protect, borrowBook)
router.post("/return/:bookId", protect, returnBook);
router.get("/my-books", protect, myBorrowedBooks);
router.get("/history", protect, getBorrowHistory)

module.exports = router