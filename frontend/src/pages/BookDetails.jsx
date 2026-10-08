import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../services/api";
import Navbar from "../components/Navbar";
import {
    BookOpen,
    User,
    Tag,
    Hash,
    Library,
    ArrowLeft,
    BookMarked
} from "lucide-react";

function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate()

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBook();
    }, [id])

    const fetchBook = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/books/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Book Not Found")
            }

            setBook(data.book)
        }
        catch (error) {

            setError("Unable to connect to server");

        } finally {

            setLoading(false);

        }
    };

    const handleBorrow = async () => {

        setMessage("");
        setError("");

        try {

            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/borrow/${id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Unable to Borrow book");
            }

            setMessage(data.message);

            fetchBook();

        }
        catch (error) {

            setError("Unable to connect to server");

        }
    };

    if (loading) {
        return (
            <div>
                <Navbar />
                <p>Loading book...</p>
            </div>
        );
    }

    if (error && !book) {
        return (
            <div>
                <Navbar />
                <p>{error}</p>
            </div>
        );
    }
    return (
        <>
            <Navbar />

           <div className="book-details-container">

    <div className="book-details-card">

        <div className="book-details-icon">
            <BookOpen size={80} strokeWidth={1.5} />
        </div>

        <div className="book-details-content">

            <div className="book-details-category">
                <Tag size={15} />
                <span>{book.category}</span>
            </div>

            <h1>{book.title}</h1>

            <p className="book-author">
                <User size={18} />
                {book.author}
            </p>

            <div className="book-info">

                <div className="book-info-item">
                    <div className="book-info-label">
                        <Hash size={17} />
                        <span>ISBN</span>
                    </div>

                    <strong>{book.isbn}</strong>
                </div>

                <div className="book-info-item">
                    <div className="book-info-label">
                        <Library size={17} />
                        <span>Total Copies</span>
                    </div>

                    <strong>{book.quantity}</strong>
                </div>

                <div className="book-info-item">
                    <div className="book-info-label">
                        <BookMarked size={17} />
                        <span>Available</span>
                    </div>

                    <strong>{book.availableQuantity}</strong>
                </div>

            </div>

            {book.description && (
                <div className="book-description">
                    <h3>Description</h3>
                    <p>{book.description}</p>
                </div>
            )}

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {message && (
                <p className="success-message">
                    {message}
                </p>
            )}

            <div className="book-details-actions">

                <button
                    className={`borrow-button ${
                        book.availableQuantity === 0
                            ? "disabled"
                            : ""
                    }`}
                    onClick={handleBorrow}
                    disabled={book.availableQuantity === 0}
                >
                    <BookMarked size={17} />

                    {book.availableQuantity === 0
                        ? "Currently Unavailable"
                        : "Borrow Book"}
                </button>

                <button
                    className="back-button"
                    onClick={() => navigate("/books")}
                >
                    <ArrowLeft size={17} />
                    Back to Books
                </button>

            </div>

        </div>

    </div>

</div>
        </>
    );

}

export default BookDetails;