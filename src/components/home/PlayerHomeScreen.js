import { useEffect, useState } from "react"
import { getSessions, getSurvivors, editSession } from "../ApiManager"
import { Link } from "react-router-dom"
import BoneEaters from "/home/erchancy/workspace/kingdom-death/src/images/BoneEaters.png"
import "./Home.css"

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
        return <Link to={`/survivor/${survivorId}`}><button className="button is-dark is-small">Edit</button></Link>
    }

    const joinGameButton = (session) => {

        if (session.player1Id === deathUserObject.id || session.player2Id === deathUserObject.id || session.player3Id === deathUserObject.id || session.player4Id === deathUserObject.id) {
            return <> Joined!</>
        } else if (session.player1Id && session.player2Id && session.player3Id && session.player4Id) {
            return <>Full!</>
        } else {
            return <button className="button is-link is-small" onClick={() => { joinSession(session) }}>Join Game?</button>
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
        <main className="container">
            <section className="hero">
                <div className="hero-body">
                </div>
            </section>
            <div className="box container">
                <ul className="survivor__list columns">
                    <h1 className="title">My Survivors</h1>
                    {
                        survivors.map((survivor) => (
                            <li className="survivor__item column" key={`survivor-${survivor.id}`}>
                                <h2 className="is-size-4">{survivor.name}</h2>
                                <h3>{editButton(survivor.id)}</h3>
                            </li>
                        ))

                    }
                </ul>
                <ul className="session__list columns">
                    <h1 className="title">Open Sessions</h1>
                    {
                        sessions.map((session) => (
                            <li className="column" key={`session-${session.id}`}>
                                <h2 className="is-size-4">{session.settlement.name}</h2>
                                <h3>{`Players: ${findPlayers(session).length}/4`}</h3>
                                <h3>{joinGameButton(session)}</h3>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <section className="hero">
                <div className="hero-body">
                    <img src={BoneEaters}></img>
                </div>
            </section>
        </main>
    </>
}
