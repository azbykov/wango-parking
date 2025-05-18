import { Link, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <div className="hero_area">
            {/* Header */}
            <header className="header_section">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg custom_nav-container">
                        <Link className="navbar-brand" to="/">
                            <span>Wango parking</span>
                        </Link>

                        <button className="navbar-toggler" type="button">
                            <span className=""></span>
                        </button>

                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Start</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/stop">Stop</Link>
                                </li>
                                {!token && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register">Register</Link>
                                        </li>
                                    </>
                                )}
                                {token && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/history">History</Link>
                                        </li>
                                        <li className="nav-item">
                                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Main content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="footer_section">
                <div className="container">
                    <p>&copy; 2025 Wango</p>
                </div>
            </footer>
        </div>
    );
}
