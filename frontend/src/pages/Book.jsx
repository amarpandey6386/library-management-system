import Navbar from "../components/Navbar";

import { useEffect } from "react";
import { useState } from "react";
import API_URL from "../services/api";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";

function Book() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/books`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "failed to fetch books");
                return;
            }

            setBooks(data.books);

        }
        catch (error) {

            setError("Unable to connect to server");

        } finally {

            setLoading(false);

        }
    };

    return (
        <div>
            <Navbar />

            <main>
                <h1>Library Books</h1>
                {loading && <p>loading books...</p>};
                {error && <p>{error}</p>}

                {!loading && !error && books.length === 0 && (<p>No Books Available</p>)}

                <div className="books-grid">
                    {books.map((book) => (
                        <BookCard
                            key={book._id}
                            book={book}
                        />
                    ))}

                </div>
            </main>
        </div>
    )
}

export default Book