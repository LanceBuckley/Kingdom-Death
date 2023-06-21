import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const GMNav = () => {
    const navigate = useNavigate()

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    Home
                </Link>
            </div>

            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-link" to="/settlements">
                        New Settlement
                    </Link>
                </div>

                <div className="navbar-end">
                    {localStorage.getItem("kdm_user") ? (
                        <li className="navbar-item">
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
                        </li>
                    ) : null}
                </div>
            </div>
        </nav>
    );
};
