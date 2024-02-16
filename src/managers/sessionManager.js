export const getSessions = async () => {
    const response = await fetch("http://localhost:8000/sessions?_expand=settlement", {

        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const sessions = await response.json()
    return sessions
}

export const createSession = async (session) => {
    const response = await fetch("http://localhost:8000/sessions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(session)
    })
    const createdSession = await response.json()
    return createdSession
}

export const editSession = async (session) => {
    const editedSession = {
        gameMasterId: session.gameMasterId,
        settlementId: session.settlementId,
        id: session.id,
        player1Id: session.player1Id,
        player2Id: session.player2Id,
        player3Id: session.player3Id,
        player4Id: session.player4Id
    }
    const response = await fetch(`http://localhost:8000/sessions/${session.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedSession)
    })
    const updatedSession = await response.json()
    return updatedSession
}