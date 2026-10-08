import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Book from "./pages/Book";
import BookDetails from "./pages/BookDetails";
import MyBooks from "./pages/MyBooks";
import History from "./pages/History";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AddBook from "./pages/AddBook";
import ManageBooks from "./pages/ManageBooks";
import EditBook from "./pages/EditBook";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/admin" element={
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                }
                />
                <Route path="/admin/add-book" element={
                    <AdminRoute>
                        <AddBook />
                    </AdminRoute>
                }
                />
                <Route
                    path="/admin/books"
                    element={
                        <AdminRoute>
                            <ManageBooks />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/edit-book/:id"
                    element = {
                        <AdminRoute>
                            <EditBook/>
                        </AdminRoute>
                    }
                />



                <Route path="/" element={<Login/>} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/books"
                    element={
                        <ProtectedRoute>
                            <Book />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/books/:id"
                    element={
                        <ProtectedRoute>
                            <BookDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-books"
                    element={
                        <ProtectedRoute>
                            <MyBooks />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <History />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;