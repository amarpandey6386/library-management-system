const Book = require("../models/Book");
const Borrow = require("../models/Borrow");

const borrowBook = async(req, res)=>{
    try{
        const { bookId } =  req.params;
        const book = await Book.findById(bookId);

        if(!book){
            return res.status(404).json({
                message: "Book not found"
            })
        }
        if(book.availableQuantity <= 0){
            return res.status(400).json({
                message: "Book is currently not availabe"
            })
        }
        const existingBorrow = await Borrow.findOne({
            user: req.user.userId ,
            book : bookId,
            status: "borrowed"
        });

        if(existingBorrow){
            return res.status(400).json({
                message: "You have already borrowed this book"
            })
        }

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);

        const borrow = await Borrow.create({
            user: req.user.userId,
            book: bookId,
            dueDate
        });

        book.availableQuantity -= 1;
        await book.save();

        res.status(200).json({
            message: "Book borrowed successfully",
            borrow
        });
    }
    catch(error){
        res.status(500).json({
            message: "Internal Server error",
            error: error.message
        });
    }
}

const returnBook = async (req, res) => {
    try{
        const { bookId } = req.params;

        const borrow = await Borrow.findOne({
            user: req.user.userId,
            book: bookId,
            status: "borrowed"

        });

        if(!borrow){
            return res.status(400).json({
                message:"Not active borrowing record found"
            })
        }

        const book = await Book.findById(bookId);

        if(!book){
            return res.status(404).json({
                message: "Book not found"

            });
        }

        borrow.returnDate = new Date();
        borrow.status = "returned";
        await borrow.save();

        book.availableQuantity += 1;

        await book.save();

        res.status(200).json({
            message:"Book returned successfully",
            borrow
        })

    }

    catch(error){
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

const myBorrowedBooks = async(req, res) => {
    try{
        const borrowedBooks = await Borrow.find({
            user: req.user.userId,
            status: "borrowed",

        }).populate("book", "title author category isbn");

        res.status(200).json({
            message: "Borrowed book fetched successfully",
            count: borrowedBooks.length,
            borrowedBooks
        })
    }
    catch(error){
         res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

const getBorrowHistory = async (req, res) => {
    try {
        const history = await Borrow.find({
            user: req.user.userId
        })
            .populate("book", "title author category isbn")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Borrow history fetched successfully",
            count: history.length,
            history
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    borrowBook,
    returnBook,
    myBorrowedBooks,
    getBorrowHistory
}

