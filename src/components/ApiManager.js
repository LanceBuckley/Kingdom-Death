export const createSettlement = async (newSettlement) => {
    const response = await fetch(`http://localhost:8088/settlements`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSettlement)
    })
    const createdSettlement = await response.json()
    return createdSettlement
}

export const createSession = async (session) => {
    const response = await fetch("http://localhost:8088/sessions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(session)
    })
    const createdSession = await response.json()
    return createdSession
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

export const getSettlementInventory = async (settlementId) => {
    const response = await fetch(`http://localhost:8088/settlementInventory?settlementId=${settlementId}`)
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

export const editSettlement = async (settlementId, settlement) => {
    const response = await fetch(`http://localhost:8088/settlements/${settlementId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(settlement)
    })
    const editedSettlement = await response.json()
    return editedSettlement
}

export const deleteAchievedMilestones = async (achievedMilestone) => {
    const response = await fetch(`http://localhost:8088/achievedMilestones/${achievedMilestone.id}`, {
        method: "DELETE"
    })
    return await response.json()
}

export const deleteSettlement = async (settlementId) => {
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

export const createAchievedMilestone = async (achievedMilestone) => {
    const response = await fetch("http://localhost:8088/achievedMilestones", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(achievedMilestone)
    })
    const createdAchievedMilestone = await response.json()
    return createdAchievedMilestone
}

export const createSettlementInventory = async (settlementItem) => {
    const response = await fetch("http://localhost:8088/settlementInventory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(settlementItem)
    })
    const createdSettlementInventory = await response.json()
    return createdSettlementInventory
}

export const editSettlementInventory = async (existingItem) => {
    const response = await fetch(`http://localhost:8088/settlementInventory/${existingItem.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(existingItem)
    })
    const editedInventory = await response.json()
    return editedInventory
}

export const deleteSettlementInventory = async (removedItem) => {
    const response = await fetch(`http://localhost:8088/settlementInventory/${removedItem.id}`, {
        method: "DELETE"
    })
    return await response.json()
}

export const getEvents = async () => {
    const response = await fetch("http://localhost:8088/events")
    const events = await response.json()
    return events
}

export const createSettlementEvents = async (settlementEvent) => {
    const response = await fetch("http://localhost:8088/settlementEvents", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(settlementEvent)
    })
    const createdSEvent = await response.json()
    return createdSEvent
}

export const editSettlementEvents = async (currentEvent) => {
    if (currentEvent.eventId !== 0) {
        const response = await fetch(`http://localhost:8088/settlementEvents/${currentEvent.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(currentEvent)
        })
        const editedSEvent = response.json()
        return editedSEvent
    }
}

export const deleteSettlementEvents = async (removedEvent) => {
    const response = await fetch(`http://localhost:8088/settlementEvents/${removedEvent.id}`, {
        method: "DELETE"
    })
    return await response.json()
}

export const getSettlementEvents = async (settlementId) => {
    const response = await fetch(`http://localhost:8088/settlementEvents?settlementId=${settlementId}`)
    const settlementEvents = await response.json()
    return settlementEvents
}

export const getWeaponProficencies = async () => {
    const response = await fetch("http://localhost:8088/weaponProficencies")
    const weaponProficencies = await response.json()
    return weaponProficencies
}

export const getDisorders = async () => {
    const response = await fetch("http://localhost:8088/disorders")
    const disorders = await response.json()
    return disorders
}

export const getFightingArts = async () => {
    const response = await fetch("http://localhost:8088/fightingArts")
    const fightingArts = await response.json()
    return fightingArts
}