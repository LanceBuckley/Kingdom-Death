import { useEffect, useState } from "react"
import { getSessions, getSurvivors, editSession } from "../ApiManager"
import { Link } from "react-router-dom"

export const PlayerHomeScreen = () => {

    const localDeathUser = localStorage.getItem("kdm_user")
    const deathUserObject = JSON.parse(localDeathUser)

    const [survivors, setSurvivors] = useState([])
    const [sessions, setSessions] = useState([])
    const [sessionClick, setSessionClick] = useState(false)

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

    useEffect(
        () => {
            if (sessionClick === true) {
                findSessionToEdit()
            }

        },
        [sessionClick]
    )

    const findSessionToEdit = () => {
        sessions.forEach((session) => {
            if (session.player1Id === deathUserObject.id) {
                editSession(session)
                    .then(getSessions)
                    .then((sessions) => {
                        setSessions(sessions)
                    })
            } else if (session.player2Id === deathUserObject.id) {
                editSession(session)
                    .then(getSessions)
                    .then((sessions) => {
                        setSessions(sessions)
                    })
            } else if (session.player3Id === deathUserObject.id) {
                editSession(session)
                    .then(getSessions)
                    .then((sessions) => {
                        setSessions(sessions)
                    })
            } else if (session.player4Id === deathUserObject.id) {
                editSession(session)
                    .then(getSessions)
                    .then((sessions) => {
                        setSessions(sessions)
                    })
            }
        })
        setSessionClick(false)
    }

    const editButton = (survivorId) => {
        return <Link to={`/survivor/${survivorId}`}><button>Edit</button></Link>
    }

    const joinGameButton = (session) => {

        if (session.player1Id === deathUserObject.id || session.player2Id === deathUserObject.id || session.player3Id === deathUserObject.id || session.player4Id === deathUserObject.id) {
            return <> Joined!</>
        } else if (session.player1Id && session.player2Id && session.player3Id && session.player4Id) {
            return <>Full!</>
        } else {
            return <button onClick={() => { joinSession(session) }}>Join Game?</button>
        }
    }

    const joinSession = (clickedSession) => {
        const copySessions = [...sessions]
        const findSession = sessions.find((session) => { return session.id === clickedSession.id })
        if (!findSession.player1Id) {
            findSession.player1Id = deathUserObject.id
        } else if (!findSession.player2Id) {
            findSession.player2Id = deathUserObject.id
        } else if (!findSession.player3Id) {
            findSession.player3Id = deathUserObject.id
        } else if (!findSession.player4Id) {
            findSession.player4Id = deathUserObject.id
        }
        setSessions(copySessions)
        setSessionClick(true)
    }

    const findPlayers = (session) => {
        const players = []
        const { player1Id, player2Id, player3Id, player4Id } = session
        if (session.player1Id) {
            players.push(player1Id)
        }
        if (session.player2Id) {
            players.push(player2Id)
        }
        if (session.player3Id) {
            players.push(player3Id)
        }
        if (session.player4Id) {
            players.push(player4Id)
        }
        return players
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
        <ul>Open Sessions
            {
                sessions.map((session) => (
                    <li key={`session-${session.id}`}>
                        {session.settlement.name}
                        {`${findPlayers(session).length}/4`}
                        {joinGameButton(session)}
                    </li>
                ))
            }
        </ul>
    </>
}
