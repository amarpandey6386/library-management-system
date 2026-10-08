import { useNavigate } from "react-router-dom";

import {
    Plus,
    Library,
    Eye,
    ArrowRight,
    ShieldCheck,
    Settings
} from "lucide-react";

import Navbar from "../components/Navbar";

function AdminDashboard() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <div className="admin-dashboard-container">

                <div className="admin-header">
                    <div>
                        <h1>Admin Dashboard 👨‍💼</h1>

                        <p>
                            Manage books and monitor the library
                            system from here.
                        </p>
                    </div>

                    <div className="admin-badge">
                        Administrator
                    </div>
                </div>

                <h2 className="section-title">
                    Book Management
                </h2>

                <div className="admin-grid">

                    <div
                        className="admin-card"
                        onClick={() => navigate("/admin/add-book")}
                    >
                        <div className="admin-card-icon">
                            <Plus size={28} />
                        </div>

                        <h3>Add New Book</h3>

                        <p>
                            Add a new book to the library collection.
                        </p>

                        <button>
                            Add Book
                            <ArrowRight size={16} />
                        </button>
                    </div>


                    <div
                        className="admin-card"
                        onClick={() => navigate("/admin/books")}
                    >
                        <div className="admin-card-icon">
                            <Library size={28} />
                        </div>

                        <h3>Manage Books</h3>

                        <p>
                            View, edit and delete books from the library.
                        </p>

                        <button>
                            Manage Books
                            <ArrowRight size={16} />
                        </button>
                    </div>


                    <div
                        className="admin-card"
                        onClick={() => navigate("/books")}
                    >
                        <div className="admin-card-icon">
                            <Eye size={28} />
                        </div>

                        <h3>View Library</h3>

                        <p>
                            Browse the library as a normal user.
                        </p>

                        <button>
                            View Library
                            <ArrowRight size={16} />
                        </button>
                    </div>

                </div>

                <div className="admin-info">

                    <div className="admin-info-icon">
                        <Settings size={22} />
                    </div>

                    <div>
                        <h3>Admin Responsibilities</h3>

                        <p>
                            Keep the book collection updated and make sure
                            the available quantities are accurate.
                        </p>
                    </div>

                </div>

            </div>
        </>
    );
}

export default AdminDashboard;