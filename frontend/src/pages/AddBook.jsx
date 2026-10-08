import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API_URL from "../services/api";

function AddBook() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn: "",
        category: "",
        quantity: "",
        description: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/books`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    quantity: Number(formData.quantity)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to add book");
                return;
            }

            setMessage("Book added successfully!");

            setFormData({
                title: "",
                author: "",
                isbn: "",
                category: "",
                quantity: "",
                description: ""
            });

        } catch (error) {
            setError("Unable to connect to server");
        }
    };

    return (
        <>
            <Navbar />

            <div className="form-page-container">

                <div className="form-page-header">
                    <div>
                        <h1>Add New Book 📚</h1>

                        <p>
                            Add a new book to the library collection.
                        </p>
                    </div>
                </div>

                <div className="form-card">

                    <form onSubmit={handleSubmit}>

                        <div className="form-row">

                            <div className="form-group">
                                <label>Book Title</label>

                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter book title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Author</label>

                                <input
                                    type="text"
                                    name="author"
                                    placeholder="Enter author name"
                                    value={formData.author}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        <div className="form-row">

                            <div className="form-group">
                                <label>ISBN</label>

                                <input
                                    type="text"
                                    name="isbn"
                                    placeholder="Enter ISBN"
                                    value={formData.isbn}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Category</label>

                                <input
                                    type="text"
                                    name="category"
                                    placeholder="e.g. Programming"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        <div className="form-group quantity-group">
                            <label>Quantity</label>

                            <input
                                type="number"
                                name="quantity"
                                placeholder="Enter quantity"
                                min="1"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>

                            <textarea
                                name="description"
                                placeholder="Enter book description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="5"
                            />
                        </div>

                        {error && (
                            <p className="auth-error">
                                {error}
                            </p>
                        )}

                        {message && (
                            <p className="auth-success">
                                {message}
                            </p>
                        )}

                        <div className="form-actions">

                            <button
                                type="submit"
                                className="primary-button"
                            >
                                ➕ Add Book
                            </button>

                            <button
                                type="button"
                                className="secondary-button"
                                onClick={() => navigate("/admin")}
                            >
                                ← Back
                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </>
    );
}

export default AddBook;