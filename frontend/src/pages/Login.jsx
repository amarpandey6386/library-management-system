import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../services/api";
import { Library, LibraryIcon } from "lucide-react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed");
                return;
            }

            localStorage.setItem("token", data.token);

            if (data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            }

            navigate("/dashboard");

        } catch (error) {
            setError("Unable to connect to server");
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-icon">
                    <LibraryIcon size={28}/>
                </div>

                <h1>Library Management</h1>

                <p className="auth-subtitle">
                    Login to access your library account
                </p>

                <form onSubmit={handleLogin}>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />
                    </div>

                    {error && (
                        <p className="auth-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="auth-button"
                    >
                        Login
                    </button>

                </form>

                <p className="auth-footer">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register here
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;