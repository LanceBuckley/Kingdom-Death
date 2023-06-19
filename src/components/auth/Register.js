import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import Butcher from "/home/erchancy/workspace/kingdom-death/src/images/Butcher.png"


export const Register = (props) => {
    const [customer, setCustomer] = useState({
        email: "",
        fullName: "",
        isGameMaster: false
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("kdm_user", JSON.stringify({
                        id: createdUser.id,
                        gameMaster: createdUser.isGameMaster
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = { ...customer }
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <main className="container">
            <section className="hero">
                <div className="hero-body">
                    <img src={Butcher}></img>
                </div>
            </section>
            <form className="box form--login" onSubmit={handleRegister}>
                <h1 className="title is-3 mb-3">Please Register for Kingdom Death</h1>
                <div className="field">
                    <label className="label" htmlFor="fullName">
                        Full Name
                    </label>
                    <div className="control">
                        <input
                            onChange={updateCustomer}
                            type="text"
                            id="fullName"
                            className="input"
                            placeholder="Enter your name"
                            required
                            autoFocus
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label" htmlFor="email">
                        Email address
                    </label>
                    <div className="control">
                        <input
                            onChange={updateCustomer}
                            type="email"
                            id="email"
                            className="input"
                            placeholder="Email address"
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="checkbox">
                            <input
                                onChange={(evt) => {
                                    const copy = { ...customer }
                                    copy.isGameMaster = evt.target.checked
                                    setCustomer(copy)
                                }}
                                type="checkbox"
                                id="isGameMaster"
                            />
                            {"\tI am a Game Master"}
                        </label>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button type="submit" className="button">
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </main>
    )
}

