import { Link, useNavigate } from "react-router-dom";
import {
    LibraryBig,
    LayoutDashboard,
    BookOpen,
    BookMarked,
    History,
    ShieldCheck,
    LogOut
} from "lucide-react";
import { getUserFromToken } from "../utils/auth";

function Navbar() {
    const navigate = useNavigate();
    const user = getUserFromToken();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <Link to="/dashboard" className="navbar-logo">
                <LibraryBig size={28} strokeWidth={2.2} />
                <span>Library Management</span>
            </Link>

            <div className="navbar-links">

                <Link to="/dashboard" className="navbar-link">
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                </Link>

                <Link to="/books" className="navbar-link">
                    <BookOpen size={18} />
                    <span>Books</span>
                </Link>

                <Link to="/my-books" className="navbar-link">
                    <BookMarked size={18} />
                    <span>My Books</span>
                </Link>

                <Link to="/history" className="navbar-link">
                    <History size={18} />
                    <span>History</span>
                </Link>

                {user?.role === "admin" && (
                    <Link to="/admin" className="navbar-link admin-link">
                        <ShieldCheck size={18} />
                        <span>Admin</span>
                    </Link>
                )}

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    <LogOut size={17} />
                    <span>Logout</span>
                </button>

            </div>
        </nav>
    );
}

export default Navbar;