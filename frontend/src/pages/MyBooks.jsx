
import { useState, useEffect } from "react";
import {
    BookOpen,
    User,
    Tag,
    CalendarDays,
    Clock,
    RotateCcw,
    Book
} from "lucide-react";
import { useParams } from "react-router-dom";
import API_URL from "../services/api";
import Navbar from "../components/Navbar";


function MyBooks() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchMyBooks();

    }, []);

    const fetchMyBooks = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/borrow/my-books`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.json();


            if (!res.ok) {
                setError(data.error);
                return;
            }


            setBooks(data.borrowedBooks);


        }
        catch (error) {
            setError("Unable to connect to server");
        }
        finally {
            setLoading(false);
        }

    }

    const handleReturn = async (bookId) => {

        setError("");
        setMessage("");

        try {

            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/borrow/return/${bookId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Unable to return");
            }

            setMessage(data.message);
            fetchMyBooks();
        }

        catch (error) {
            setError("Unable to connect to server")
        }
    };

    return (
        <>
            <Navbar />

            <div className="page-container">

                <h1>My Borrowed Books</h1>

                <p className="page-subtitle">
                    Books currently borrowed from the library
                </p>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                {books.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon"><Book size={28}/> </div>

                        <h2>No Borrowed Books</h2>

                        <p>
                            You currently have no borrowed books.
                        </p>
                    </div>
                ) : (
                    <div className="borrowed-books-grid">

                        {books.map((borrow) => (
                            <div className="borrowed-book-card" key={borrow._id}>

                                <div className="borrowed-book-icon">
                                    <BookOpen size={28} />
                                </div>

                                <div className="borrowed-book-content">

                                    <h2>{borrow.book.title}</h2>

                                    <div className="borrowed-book-detail">
                                        <User size={16} />
                                        <span>{borrow.book.author}</span>
                                    </div>

                                    <div className="borrowed-book-detail">
                                        <Tag size={16} />
                                        <span>{borrow.book.category}</span>
                                    </div>

                                    <div className="borrowed-book-dates">

                                        <div>
                                            <CalendarDays size={16} />
                                            <span>
                                                Borrowed:{" "}
                                                {new Date(
                                                    borrow.borrowDate
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div>
                                            <Clock size={16} />
                                            <span>
                                                Due:{" "}
                                                {new Date(
                                                    borrow.dueDate
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>

                                    </div>

                                    <span className="status-badge">
                                        {borrow.status}
                                    </span>

                                    <button
                                        className="return-button"
                                        onClick={() => handleReturn(borrow.book._id)}
                                    >
                                        <RotateCcw size={16} />
                                        Return Book
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

export default MyBooks;