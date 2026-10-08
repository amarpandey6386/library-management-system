const Book = require("../models/Book");

const addBook = async (req, res) => {
    try {
        const {
            title,
            author,
            isbn,
            category,
            quantity,
            description
        } = req.body;

        if (!title || !author || !isbn || !category || quantity === undefined) {
            return res.status(400).json({
                message: "Please provide title, author, isbn, category and quantity"
            });
        }

        if (quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }
    
        const existingBook = await Book.findOne({ isbn });

        if (existingBook) {
            return res.status(400).json({
                message: "Book with this ISBN already exists"
            });
        }

        // Create book
        const book = await Book.create({
            title,
            author,
            isbn,
            category,
            quantity,
            availableQuantity: quantity,
            description
        });

        res.status(201).json({
            message: "Book added successfully",
            book
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();

        res.status(200).json({
            message: "Books fetched successfully",
            count: books.length,
            books
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book fetched successfully",
            book
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid book ID"
            });
        }

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        const {
            title,
            author,
            isbn,
            category,
            quantity,
            description
        } = req.body;

        book.title = title ?? book.title;
        book.author = author ?? book.author;
        book.isbn = isbn ?? book.isbn;
        book.category = category ?? book.category;
        book.description = description ?? book.description;

        if (quantity !== undefined) {
            const borrowedCopies =
                book.quantity - book.availableQuantity;

            if (quantity < borrowedCopies) {
                return res.status(400).json({
                    message: "Quantity cannot be less than borrowed copies"
                });
            }

            book.quantity = quantity;
            book.availableQuantity = quantity - borrowedCopies;
        }

        await book.save();

        res.status(200).json({
            message: "Book updated successfully",
            book
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const deleteBook = async(req, res) => {
    try{
        const book = await Book.findById(req.params.id);

        if(!book){
            return res.status(400).json({
                message: "Book Not Found"
            })
        }

        if(book.availableQuantity !== book.quantity){
            return res.status(400).json({
                message: "Book cannot be deleted while copiies are borrowed"
            });

        }

        await Book.findByIdAndDelete(req.params.id);

        res.status(400).json({
            message: "Book deleteed successfully"
        })
    }
    catch(error){
         res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};