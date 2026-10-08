import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";


function BookCard({ book }) {
    return (
        <div className="book-card">

            <div className="book-icon">
                <BookOpen size={28}/>
            </div>

            <h2>{book.title}</h2>

            <p>
                <strong>Author:</strong> {book.author}
            </p>

            <p>
                <strong>Category:</strong> {book.category}
            </p>

            <p>
                <strong>ISBN:</strong> {book.isbn}
            </p>

            <p className="availability">
                Available: {book.availableQuantity} / {book.quantity}
            </p>

            <Link
                className="view-book-button"
                to={`/books/${book._id}`}
            >
                View Details
                <ArrowRight size={16}/>
            </Link>

        </div>
    );
}

export default BookCard;