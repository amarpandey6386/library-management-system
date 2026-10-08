import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Plus,
    BookOpen,
    Eye,
    Pencil,
    Trash2,
    Library,
    CheckCircle2
} from "lucide-react";
import Navbar from "../components/Navbar";
import API_URL from "../services/api";

function ManageBooks() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");

    const fetchBooks = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/books`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to fetch books");
                return;
            }

            setBooks(data.books);
        } catch (error) {
            setError("Unable to connect to server");
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = async (bookId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmed) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/books/${bookId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to delete book");
                return;
            }

            setBooks((prevBooks) =>
                prevBooks.filter((book) => book._id !== bookId)
            );
        } catch (error) {
            setError("Unable to connect to server");
        }
    };

    return (
        <>
            <Navbar />

            <div className="manage-books-container">

                <div className="manage-books-header">
                    <div>
                        <h1>Manage Books</h1>
                        <p>
                            View, edit and manage the library collection.
                        </p>
                    </div>

                    <Link
                        to="/admin/add-book"
                        className="add-book-button"
                    >
                        <Plus size={17} />
                        <span>Add Book</span>
                    </Link>
                </div>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                {books.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <Library size={32} />
                        </div>

                        <h2>No Books Found</h2>

                        <p>
                            There are currently no books in the library.
                        </p>

                        <Link
                            to="/admin/add-book"
                            className="empty-add-button"
                        >
                            <Plus size={16} />
                            Add Your First Book
                        </Link>
                    </div>
                ) : (
                    <div className="manage-books-grid">

                        {books.map((book) => (
                            <div
                                className="manage-book-card"
                                key={book._id}
                            >
                                <div className="manage-book-header">
                                    <div className="manage-book-icon">
                                        <BookOpen size={25} />
                                    </div>

                                    <span className="book-status">
                                        <CheckCircle2 size={13} />
                                        Active
                                    </span>
                                </div>

                                <h2>{book.title}</h2>

                                <div className="manage-book-details">
                                    <p>
                                        <strong>Author:</strong>
                                        <span>{book.author}</span>
                                    </p>

                                    <p>
                                        <strong>Category:</strong>
                                        <span>{book.category}</span>
                                    </p>

                                    <p>
                                        <strong>ISBN:</strong>
                                        <span>{book.isbn}</span>
                                    </p>
                                </div>

                                <div className="quantity-info">
                                    <div>
                                        <span>Total Copies</span>
                                        <strong>{book.quantity}</strong>
                                    </div>

                                    <div>
                                        <span>Available</span>
                                        <strong>{book.availableQuantity}</strong>
                                    </div>
                                </div>

                                <div className="manage-book-actions">

                                    <Link
                                        to={`/books/${book._id}`}
                                        className="view-action"
                                    >
                                        <Eye size={15} />
                                        View
                                    </Link>

                                    <Link
                                        to={`/admin/edit-book/${book._id}`}
                                        className="edit-action"
                                    >
                                        <Pencil size={15} />
                                        Edit
                                    </Link>

                                    <button
                                        className="delete-action"
                                        onClick={() =>
                                            handleDelete(book._id)
                                        }
                                    >
                                        <Trash2 size={15} />
                                        Delete
                                    </button>

                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </>
    );
}

export default ManageBooks;