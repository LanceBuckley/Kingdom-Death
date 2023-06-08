import { useEffect, useState } from "react"
import { createSession, getSessions, getSettlements } from "../ApiManager"

export const GMHomeScreen = () => {
    const [settlements, setSettlements] = useState([])
    const [sessions, setSessions] = useState([])
    const [filteredSettlements, setFilteredSettlements] = useState([])
    const [filteredSessions, setFilteredSessions] = useState([])
    const [session, setSession] = useState({
        gameMasterId: 0,
        settlementId: 0
    })

    const localDeathUser = localStorage.getItem("kdm_user")
    const deathUserObject = JSON.parse(localDeathUser)


    useEffect(
        () => {
            getSettlements()
                .then((settlements) => {
                    setSettlements(settlements)
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

    useEffect(
        () => {
            const mySettlements = settlements.filter(settlement => settlement.userId === deathUserObject.id)
            setFilteredSettlements(mySettlements)
        },
        [settlements]
    )

    useEffect(
        () => {
            const mySessions = sessions.filter(session => session.gameMasterId === deathUserObject.id)
            setFilteredSessions(mySessions)
        },
        [sessions]
    )

    useEffect(
        () => {
            if (session.settlementId !== 0) {
                createSession(session)
                .then(getSettlements)
                .then((settlements) => {
                    setSettlements(settlements)
                })
                .then(getSessions)
                .then((sessions) => {
                    setSessions(sessions)
                })
            }
        },
        [session]
    )

    const editButton = () => {
        return <button>Edit</button>
    }

    const hostGameButton = (settlementId) => {
        const findSession = filteredSessions.find(filteredSession => { return filteredSession.settlementId === settlementId })
        if (findSession) {
            return <>Hosting!</>
        } else {
            return <button onClick={() => { hostSession(settlementId) }}>Host Game?</button>
        }
    }

    const hostSession = (settlementId) => {
        const copy = { ...session }
        copy.settlementId = settlementId
        copy.gameMasterId = deathUserObject.id
        setSession(copy)
    }

    return <>
        <ul className="settlement__list">My Settlements
            {
                filteredSettlements.map((settlement) => (
                    <li className="settlement__item" key={`settlement-${settlement.id}`}>
                        {settlement.name}
                        {editButton()}
                        {hostGameButton(settlement.id)}
                    </li>
                ))

            }
        </ul>
    </>
}