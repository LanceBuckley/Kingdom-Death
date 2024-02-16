import { createContext, useContext, useEffect, useState } from "react"
import { getDisorders } from "../../../managers/disorderManager"

const DisordersContext = createContext()

export const DisordersProvider = ({ children }) => {
    const [allDisorders, setDisorders] = useState([])
    const [chosenDisorders, setChosenDisorders] = useState([])

    useEffect(
        () => {
            getDisorders()
            .then((disorders) => {
                setDisorders(disorders)
            })
        },
        []
    )

    return (
        <DisordersContext.Provider
            value={{ allDisorders, chosenDisorders, setChosenDisorders }}
        >
            {children}
        </DisordersContext.Provider>
    )
}

export const useDisorders = () => useContext(DisordersContext)
