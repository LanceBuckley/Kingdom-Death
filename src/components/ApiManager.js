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

export const getResources = async () => {
    const response = await fetch("http://localhost:8088/resources")
    const resources = await response.json()
    return resources
}

export const getSettlementInventory = async () => {
    const response = await fetch("http://localhost:8088/settlementInventory")
    const inventory = await response.json()
    return inventory
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

export const deleteAchievedMilestones = ( achievedMilestone ) => {
    return fetch(`http://localhost:8088/achievedMilestones/${achievedMilestone.id}`, {
        method: "DELETE"
})
}

const deleteAllMilestones = ( settlementId ) => {
    return fetch(`http://localhost:8088/achievedMilestones?settlementId=${settlementId}`, {
        method: "DELETE"
})
}

const deleteAllSessions = ( settlementId ) => {
    return fetch(`http://localhost:8088/sessions?settlementId=${settlementId}`, {
        method: "DELETE"
})
}

export const deleteSettlement = ( settlementId ) => {
    deleteAllMilestones(settlementId)
    deleteAllSessions(settlementId)
    return fetch(`http://localhost:8088/settlements/${settlementId}`, {
        method: "DELETE"
})
}

export const getMilestones = async () => {
    const response = await fetch("http://localhost:8088/milestones")
    const milestones = await response.json()
    return milestones
}

export const getAchievedMilestones = async (settlementId) => {
    const response = await fetch(`http://localhost:8088/achievedMilestones?settlementId=${settlementId}`)
    const achievedMilestones = await response.json()
    return achievedMilestones
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

export const createSettlementInventory = (settlementItem) => {
    return fetch("http://localhost:8088/settlementInventory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(settlementItem)
    })
        .then(response => response.json())
}

export const editSettlementInventory = (existingItem) => {
    return fetch(`http://localhost:8088/settlementInventory/${existingItem.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(existingItem)
    })
        .then(response => response.json())
}

export const deleteSettlementInventory = (removedItem) => {
    return fetch(`http://localhost:8088/settlementInventory/${removedItem.id}`, {
        method: "DELETE"
})
}