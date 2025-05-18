// client/src/components/Layout.tsx
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export default function Layout({ children }: { children: ReactNode }) {
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
                                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/stop">Stop</Link></li>
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
    )
}
