import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const PlayerNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isSurvivorPage = location.pathname === "/survivors" || location.pathname.startsWith("/survivor/");

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item">
                        <Link className="navbar-link" to="/" onClick={() => navigate("/")}>
                            Home
                        </Link>
                    </div>
                    <div className={`navbar-item ${isSurvivorPage ? "is-hidden" : ""}`}>
                        <Link className="navbar-link" to="/survivors">
                            New Survivor
                        </Link>
                    </div>
                </div>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    {localStorage.getItem("kdm_user") ? (
                        <Link
                            className="navbar-link"
                            to="/"
                            onClick={() => {
                                localStorage.removeItem("kdm_user");
                                navigate("/", { replace: true });
                            }}
                        >
                            Logout
                        </Link>
                    ) : null}
                </div>
            </div>
        </nav>
    );
};
