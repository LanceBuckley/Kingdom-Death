export const createSettlement = (newSettlement) => {
    return fetch(`http://localhost:8088/settlements`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSettlement)
    })
        .then(response => response.json())
}

export const createSession = (session) => {
    return fetch("http://localhost:8088/sessions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(session)
    })
        .then(response => response.json())
}

export const getSettlements = async () => {
    const response = await fetch("http://localhost:8088/settlements")
    const settlements = await response.json()
    return settlements
}

export const getSettlementToEdit = async (settlementId) => {
    const response = await fetch(`http://localhost:8088/settlements?id=${settlementId}`)
    const settlements = await response.json()
    const settlementToEdit = await settlements[0]
    return settlementToEdit
}

export const getSessions = async () => {
    const response = await fetch("http://localhost:8088/sessions")
    const sessions = await response.json()
    return sessions
}

export const editSettlement = (settlementId, settlement ) => {
    return fetch(`http://localhost:8088/settlements/${settlementId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(settlement)
    })
        .then(response => response.json())
}

export const getMilestones = async () => {
    const response = await fetch("http://localhost:8088/milestones")
    const milestones = await response.json()
    return milestones
}

export const createAchievedMilestone = (achievedMilestone) => {
    return fetch("http://localhost:8088/achievedMilestones", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(achievedMilestone)
    })
        .then(response => response.json())
}