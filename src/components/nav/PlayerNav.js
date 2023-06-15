import { Link, useLocation, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const PlayerNav = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const isSurvivorPage = location.pathname === "/survivors" || location.pathname.startsWith("/survivor/")

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/survivors">New Survivor</Link>
            </li>
            {
                isSurvivorPage
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            navigate("/")
                        }}>Home</Link>
                    </li>
                    : ""
            }
            {
                localStorage.getItem("kdm_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("kdm_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

