import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import "./Login.css"
import Watcher from "/home/erchancy/workspace/kingdom-death/src/images/Watcher.png"
import { useLogin } from "../../context/LoginContext";

export const Login = () => {

    const { handleLogin, username, password } = useLogin()

  /*--------------------------------------------------------------------*/
  // Autofill Username/Password by default streamline devolopment process 
  useEffect(
    () => {
      username.current.value = "Twiknight"
      password.current.value = "tanay"
    },
    []
  )
  /*--------------------------------------------------------------------*/

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
                        <label className="label" htmlFor="username">Username</label>
                        <div className="control">
                            <input className="input" type="text" ref={username} id="username" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="password">Password</label>
                        <div className="control">
                            <input className="input" type="password" ref={password} id="password" />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-dark">Sign in</button>
                        </div>
                    </div>
                    <Link to="/register">Not a member yet?</Link>
                </form>
            </section>
        </main >
    )
}



