import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../services/api";
import { Library, LibraryIcon, LogIn, LucideLogIn } from "lucide-react";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Registration failed");
                return;
            }

            setSuccess("Registration successful! Redirecting to login...");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

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

                <h1>Create Account</h1>

                <p className="auth-subtitle">
                    Join the Library Management System
                </p>

                <form onSubmit={handleRegister}>

                    <div className="form-group">
                        <label>Name</label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />
                    </div>

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
                            placeholder="Create a password"
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

                    {success && (
                        <p className="auth-success">
                            {success}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="auth-button"
                    >
                        Create Account
                    </button>

                </form>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <Link to="/login">
                        Login here
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;