import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"
import Watcher from "/home/erchancy/workspace/kingdom-death/src/images/Watcher.png"

export const Login = () => {
    const [email, set] = useState("twitwins@gmail.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("kdm_user", JSON.stringify({
                        id: user.id,
                        gameMaster: user.isGameMaster
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container">
            <section className="hero">
                <div className="hero-body">
                    <img src={Watcher}></img>
                </div>
            </section>
            <section>
                <form className="box" onSubmit={handleLogin}>
                    <h1 className="title">Kingdom Death</h1>
                    <h2 className="subtitle">Please sign in</h2>
                    <div className="field">
                        <label htmlFor="inputEmail" className="label">Email address</label>
                        <div className="control">
                            <input
                                type="inputEmail"
                                value={email}
                                onChange={(evt) => handleLogin(evt.target.value)}
                                className="input"
                                placeholder="Email address"
                                required
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button">Sign in</button>
                        </div>
                    </div>
                <Link to="/register">Not a member yet?</Link>
                </form>
            </section>
        </main>
    )
}

