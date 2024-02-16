import React from "react"
import { Navigate } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "../nav/NavBar"
import { useKingdomDeath } from "../../context/KingdomDeathContext"

export const Authorized = () => {

    const { token } = useKingdomDeath()

    if (token) {
        return <>
            <NavBar />
            <ApplicationViews />
        </>
    }
    return <Navigate to='/login' replace />
}
