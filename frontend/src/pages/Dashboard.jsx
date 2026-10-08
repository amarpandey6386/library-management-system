import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
    BookOpen,
    BookMarked,
    History,
    Lightbulb,
    ArrowRight,
   
} from "lucide-react";
import { getUserFromToken } from "../utils/auth";

function Dashboard() {
    const navigate = useNavigate();
    const user = getUserFromToken();

    return (
        <>
            <Navbar />

            <div className="dashboard-container">

                <div className="dashboard-header">
                    <div>
                        <h1>
                            Welcome, {user.role == "student" ? "Student" : "Admin"} 
                            
                            
                        </h1>

                        <p>
                            Manage your books and borrowing activity
                            from one place.
                        </p>
                    </div>

                    <div className="dashboard-role">
                        {user?.role || "student"}
                    </div>
                </div>

                <h2 className="section-title">
                    Quick Actions
                </h2>

                <div className="dashboard-grid">

                    <div
                        className="dashboard-card"
                        onClick={() => navigate("/books")}
                    >
                        <div className="dashboard-icon">
                            <BookOpen size={28}/>
                        </div>

                        <h3>Browse Books</h3>

                        <p>
                            Explore all books available in the library.
                        </p>

                        <button>
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    <div
                        className="dashboard-card"
                        onClick={() => navigate("/my-books")}
                    >
                        <div className="dashboard-icon">
                            <BookMarked size={28}/>
                        </div>

                        <h3>My Books</h3>

                        <p>
                            View books that you currently have borrowed.
                        </p>

                        <button>
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    <div
                        className="dashboard-card"
                        onClick={() => navigate("/history")}
                    >
                        <div className="dashboard-icon">
                            <History size={28} />
                        </div>

                        <h3>Borrowing History</h3>

                        <p>
                            Check your previous borrowing records.
                        </p>

                        <button>
                            <ArrowRight size={16}/>
                        </button>
                    </div>

                </div>

                <div className="dashboard-info">

                    <div className="dashboard-info-icon">
                        <Lightbulb size={28}/>
                    </div>

                    <div>
                        <h3>Library Tip</h3>

                        <p>
                            Return your borrowed books on time so
                            other students can access them.
                        </p>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Dashboard;