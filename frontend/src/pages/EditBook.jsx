
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Pencil,
    BookOpen,
    User,
    Hash,
    Tag,
    Library,
    FileText,
    Save,
    ArrowLeft
} from "lucide-react";
import Navbar from "../components/Navbar";
import API_URL from "../services/api";

function EditBook() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn: "",
        category: "",
        quantity: "",
        description: ""
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    `${API_URL}/books/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(
                        data.message || "Failed to fetch book"
                    );
                    return;
                }

                setFormData({
                    title: data.book.title,
                    author: data.book.author,
                    isbn: data.book.isbn,
                    category: data.book.category,
                    quantity: data.book.quantity,
                    description: data.book.description || ""
                });

            } catch (error) {
                setError("Unable to connect to server");
            }
        };

        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/books/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        ...formData,
                        quantity: Number(formData.quantity)
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message || "Failed to update book"
                );
                return;
            }

            setMessage("Book updated successfully!");

        } catch (error) {
            setError("Unable to connect to server");
        }
    };

    return (
        <>
            <Navbar />

            <div className="form-page-container">

                <div className="form-page-header">
                    <div className="edit-page-title">
                        <div className="edit-page-icon">
                            <Pencil size={25} />
                        </div>

                        <div>
                            <h1>Edit Book</h1>

                            <p>
                                Update the information of this book.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="form-card">

                    <form onSubmit={handleSubmit}>

                        <div className="form-row">

                            <div className="form-group">
                                <label>
                                    <BookOpen size={14} />
                                    Book Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <User size={14} />
                                    Author
                                </label>

                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        <div className="form-row">

                            <div className="form-group">
                                <label>
                                    <Hash size={14} />
                                    ISBN
                                </label>

                                <input
                                    type="text"
                                    name="isbn"
                                    value={formData.isbn}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <Tag size={14} />
                                    Category
                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        <div className="form-group quantity-group">
                            <label>
                                <Library size={14} />
                                Quantity
                            </label>

                            <input
                                type="number"
                                name="quantity"
                                min="1"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <FileText size={14} />
                                Description
                            </label>

                            <textarea
                                name="description"
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
                                <Save size={16} />
                                Update Book
                            </button>

                            <button
                                type="button"
                                className="secondary-button"
                                onClick={() =>
                                    navigate("/admin/books")
                                }
                            >
                                <ArrowLeft size={16} />
                                Back
                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </>
    );
}

export default EditBook;
