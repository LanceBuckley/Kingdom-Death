import { useEffect, useState } from "react";
import { createSession, getSessions, getSettlements } from "../ApiManager";
import { Link } from "react-router-dom";
import DBK from "/home/erchancy/workspace/kingdom-death/src/images/DBK.png"
import "./Home.css";


export const GMHomeScreen = () => {
    const [settlements, setSettlements] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [filteredSettlements, setFilteredSettlements] = useState([]);
    const [filteredSessions, setFilteredSessions] = useState([]);
    const [session, setSession] = useState({
        gameMasterId: 0,
        settlementId: 0
    });

    const localDeathUser = localStorage.getItem("kdm_user");
    const deathUserObject = JSON.parse(localDeathUser);

    useEffect(() => {
        getSettlements().then((settlements) => {
            setSettlements(settlements);
        });
    }, []);

    useEffect(() => {
        getSessions().then((sessions) => {
            setSessions(sessions);
        });
    }, []);

    useEffect(() => {
        const mySettlements = settlements.filter(
            (settlement) => settlement.userId === deathUserObject.id
        );
        setFilteredSettlements(mySettlements);
    }, [settlements]);

    useEffect(() => {
        const mySessions = sessions.filter(
            (session) => session.gameMasterId === deathUserObject.id
        );
        setFilteredSessions(mySessions);
    }, [sessions]);

    useEffect(() => {
        if (session.settlementId !== 0) {
            createSession(session)
                .then(getSettlements)
                .then((settlements) => {
                    setSettlements(settlements);
                })
                .then(getSessions)
                .then((sessions) => {
                    setSessions(sessions);
                });
        }
    }, [session]);

    const editButton = (settlementId) => {
        return (
            <Link to={`/settlement/${settlementId}`}>
                <button className="button is-dark is-small">Edit</button>
            </Link>
        );
    };

    const hostGameButton = (settlementId) => {
        const findSession = filteredSessions.find(
            (filteredSession) => filteredSession.settlementId === settlementId
        );
        if (findSession) {
            return <>Hosting!</>;
        } else {
            return (
                <button
                    className="button is-link is-small"
                    onClick={() => {
                        hostSession(settlementId);
                    }}
                >
                    Host Game?
                </button>
            );
        }
    };

    const hostSession = (settlementId) => {
        const copy = { ...session };
        copy.settlementId = settlementId;
        copy.gameMasterId = deathUserObject.id;
        setSession(copy);
    };

    return (
        <main className="container">
            <section className="hero">
                <div className="hero-body">
                </div>
            </section>
            <section>
                <div className="box container">
                    <ul className="settlement__list columns">
                        <h1 className="title">My Settlements</h1>
                        {filteredSettlements.map((settlement) => (
                            <li
                                className="settlement__item column"
                                key={`settlement-${settlement.id}`}
                            >
                                <h2 className="is-size-4">{settlement.name}</h2>
                                <h3>{editButton(settlement.id)}</h3>
                                <h3>{hostGameButton(settlement.id)}</h3>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section className="hero">
                <div className="hero-body">
                    <img src={DBK}></img>
                </div>
            </section>
        </main>
    );
};
