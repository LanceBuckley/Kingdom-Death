import { useEffect, useState } from "react"
import { getSessions, getSurvivors } from "../ApiManager"
import { SettlementForm } from "../settlements/SettlementForm"
import { Link } from "react-router-dom"

export const PlayerHomeScreen = () => {

    const localDeathUser = localStorage.getItem("kdm_user")
    const deathUserObject = JSON.parse(localDeathUser)

    const [survivors, setSurvivors] = useState([])
    const [sessions, setSessions] = useState([])

    useEffect(
        () => {
            getSurvivors(deathUserObject.id)
                .then((survivors) => {
                    setSurvivors(survivors)
                })
        },
        []
    )

    useEffect(
        () => {
            getSessions()
                .then((sessions) => {
                    setSessions(sessions)
                })
        },
        []
    )

    const editButton = (survivorId) => {
        return <Link to={`/survivor/${survivorId}`}><button>Edit</button></Link>
    }

    return <>
        <ul className="survivor__list">My Survivors
            {
                survivors.map((survivor) => (
                    <li className="survivor__item" key={`survivor-${survivor.id}`}>
                        {survivor.name}
                        {editButton(survivor.id)}
                    </li>
                ))

            }
        </ul>
    </>
}
