import { Link, Route, useLocation, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const GMNav = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const isSettlementPage = location.pathname === "/settlements" || location.pathname.startsWith("/settlement/")

    return (
        <ul className="navbar">
            {
                isSettlementPage
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            navigate("/")
                        }}>Home</Link>
                    </li>
                    : <li className="navbar__item active">
                        <Link className="navbar__link" to="/settlements">New Settlement</Link>
                    </li>
            }
            {
                localStorage.getItem("kdm_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("kdm_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

