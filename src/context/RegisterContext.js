import React, { createContext, useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../managers/authManager"
import { useKingdomDeath } from "./KingdomDeathContext"

// Create the context variable using createContext
const RegisterContext = createContext()

// Code as normal, all things data related, useState, useEffect, etc. Make sure to pass children as a parameter
export const RegisterProvider = ({ children }) => {


    const { setToken, setIsGameMaster } = useKingdomDeath()

    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const gameMaster = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const [showPasswordDialog, setShowDialog] = useState(false)
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                username: username.current.value,
                first_name: firstName.current.value,
                last_name: lastName.current.value,
                is_game_master: gameMaster.current.checked,
                email: email.current.value,
                password: password.current.value,
            }

            registerUser(newUser)
                .then(res => {
                    if ("valid" in res && res.valid) {
                        setToken(res.token)
                        setIsGameMaster(res.gameMaster)
                        navigate("/")
                    }
                })
        } else {
            setShowDialog(true)
        }
    }

    // Return this context provider wrapping that passes down a value prop to its children
    return (
        <RegisterContext.Provider
            value={{ username, firstName, lastName, gameMaster, email, password, showPasswordDialog, handleRegister, verifyPassword }}
        >
            {children}
        </RegisterContext.Provider>
    )
}

// Export a custom hook so the child can access this component
export const useRegister = () => useContext(RegisterContext)

