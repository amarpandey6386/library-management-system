import { useState, useEffect } from "react";
import API_URL from "../services/api";
import {
    BookOpen,
    User,
    Tag,
    CalendarDays,
    Clock,
    CheckCircle2,
    History as HistoryIcon,
    Library,
    LucideHistory
} from "lucide-react";
import Navbar from "../components/Navbar";

function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchHistory()
    }, []);

    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/borrow/history`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Unable to fetch history");
                return;
            }

            setHistory(data.history)
        }
        catch (error) {
            setError("Unable to conect to server")

        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />

            <div className="page-container">
                <h1>Borrowing History</h1>
                <p className="page-subtitle">
                    View all your previous and current borrowing records
                </p>

                {error && <p className="error-message">{error}</p>}

                {history.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <LucideHistory size={28}/>

                        </div>

                        <h2>No Borrowing History</h2>

                        <p>
                            You have not borrowed any books yet.
                        </p>
                    </div>
                ) : (
                    <div className="history-grid">
                        {history.map((record) => (
                            <div className="history-card" key={record._id}>
                                <div className="history-card-header">
                                    <div className="history-icon">
                                        <BookOpen size={26} />
                                    </div>

                                    <span
                                        className={`history-status ${record.status === "returned"
                                                ? "returned"
                                                : "borrowed"
                                            }`}
                                    >
                                        {record.status === "returned" ? (
                                            <CheckCircle2 size={14} />
                                        ) : (
                                            <Clock size={14} />
                                        )}
                                        {record.status}
                                    </span>
                                </div>

                                <h2>
                                    {record.book
                                        ? record.book.title
                                        : "Book no longer available"}
                                </h2>

                                {record.book ? (
                                    <div className="history-book-details">
                                        <p>
                                            <User size={15} />
                                            <span>{record.book.author}</span>
                                        </p>

                                        <p>
                                            <Tag size={15} />
                                            <span>{record.book.category}</span>
                                        </p>
                                    </div>
                                ) : (
                                    <p className="deleted-book-message">
                                        This book has been removed from the library.
                                    </p>
                                )}

                                <div className="history-dates">
                                    <div className="history-date-row">
                                        <CalendarDays size={17} />
                                        <span>Borrowed</span>
                                        <strong>
                                            {new Date(record.borrowDate).toLocaleDateString()}
                                        </strong>
                                    </div>

                                    <div className="history-date-row">
                                        <Clock size={17} />
                                        <span>Due date</span>
                                        <strong>
                                            {new Date(record.dueDate).toLocaleDateString()}
                                        </strong>
                                    </div>

                                    <div className="history-date-row">
                                        <CheckCircle2 size={17} />
                                        <span>Returned</span>
                                        <strong>
                                            {record.returnDate
                                                ? new Date(record.returnDate).toLocaleDateString()
                                                : "Not returned yet"}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );

}

export default History