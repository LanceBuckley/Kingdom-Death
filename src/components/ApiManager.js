// Settlements
export const createSettlement = async (newSettlement) => {
    const response = await fetch(`http://localhost:8088/settlements`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSettlement)
    });
    const createdSettlement = await response.json();
    return createdSettlement;
};

export const getSettlements = async () => {
    const response = await fetch("http://localhost:8088/settlements");
    const settlements = await response.json();
    return settlements;
};

export const getSettlementToEdit = async (settlementId) => {
    const response = await fetch(`http://localhost:8088/settlements?id=${settlementId}`);
    const settlements = await response.json();
    const settlementToEdit = await settlements[0];
    return settlementToEdit;
};

export const editSettlement = async (settlementId, settlement) => {
    const response = await fetch(`http://localhost:8088/settlements/${settlementId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(settlement)
    });
    const editedSettlement = await response.json();
    return editedSettlement;
};

export const deleteSettlement = async (settlementId) => {
    return fetch(`http://localhost:8088/settlements/${settlementId}`, {
        method: "DELETE"
    });
};



// Events
export const getEvents = async () => {
    const response = await fetch("http://localhost:8088/events")
    const events = await response.json()
    return events
}

export const getSettlementEvents = async (settlementId) => {
    const response = await fetch(`http://localhost:8088/settlementEvents?settlementId=${settlementId}`);
    const settlementEvents = await response.json();
    return settlementEvents;
};

export const createSettlementEvents = async (settlementEvent) => {
    const response = await fetch("http://localhost:8088/settlementEvents", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(settlementEvent)
    });
    const createdSEvent = await response.json();
    return createdSEvent;
};

export const editSettlementEvents = async (currentEvent) => {
    if (currentEvent.eventId !== 0) {
        const response = await fetch(`http://localhost:8088/settlementEvents/${currentEvent.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(currentEvent)
        });
        const editedSEvent = response.json();
        return editedSEvent;
    }
};

export const deleteSettlementEvents = async (removedEvent) => {
    const response = await fetch(`http://localhost:8088/settlementEvents/${removedEvent.id}`, {
        method: "DELETE"
    });
    return await response.json();
};



// Resources
export const getResources = async () => {
    const response = await fetch("http://localhost:8088/resources");
    const resources = await response.json();
    return resources;
};

export const getSettlementInventory = async (settlementId) => {
    const response = await fetch(`http://localhost:8088/settlementInventory?settlementId=${settlementId}`);
    const inventory = await response.json();
    return inventory;
};

export const createSettlementInventory = async (settlementItem) => {
    const response = await fetch("http://localhost:8088/settlementInventory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(settlementItem)
    });
    const createdSettlementInventory = await response.json();
    return createdSettlementInventory;
};

export const editSettlementInventory = async (existingItem) => {
    const response = await fetch(`http://localhost:8088/settlementInventory/${existingItem.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(existingItem)
    });
    const editedInventory = await response.json();
    return editedInventory;
};

export const deleteSettlementInventory = async (removedItem) => {
    const response = await fetch(`http://localhost:8088/settlementInventory/${removedItem.id}`, {
        method: "DELETE"
    });
    return await response.json();
};



// Milestones
export const getMilestones = async () => {
    const response = await fetch("http://localhost:8088/milestones");
    const milestones = await response.json();
    return milestones;
};

export const getAchievedMilestones = async (settlementId) => {
    const response = await fetch(`http://localhost:8088/achievedMilestones?settlementId=${settlementId}`);
    const achievedMilestones = await response.json();
    return achievedMilestones;
};

export const createAchievedMilestone = async (achievedMilestone) => {
    const response = await fetch("http://localhost:8088/achievedMilestones", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(achievedMilestone)
    });
    const createdAchievedMilestone = await response.json();
    return createdAchievedMilestone;
};

export const deleteAchievedMilestones = async (achievedMilestone) => {
    const response = await fetch(`http://localhost:8088/achievedMilestones/${achievedMilestone.id}`, {
        method: "DELETE"
    });
    return await response.json();
};



// Survivor
export const createSurvivor = async (survivor) => {
    const response = await fetch("http://localhost:8088/survivors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(survivor)
    });
    const createdSurvivor = await response.json();
    return createdSurvivor;
};

export const getSurvivors = async (userId) => {
    const response = await fetch(`http://localhost:8088/survivors?userId=${userId}`)
    const survivors = await response.json()
    return survivors
};

export const getSurvivorToEdit = async (survivorId) => {
    const response = await fetch(`http://localhost:8088/survivors?id=${survivorId}`);
    const survivors = await response.json();
    const survivorToEdit = await survivors[0];
    return survivorToEdit;
};

export const editSurvivor = async (survivor) => {
    const response = await fetch(`http://localhost:8088/survivors/${survivor.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(survivor)
    });
    const editedSurvivor = await response.json();
    return editedSurvivor;
};

export const deleteSurvivor = async (survivor) => {
    await deleteHitLocations(survivor.hitLocationId)
    await deleteStats(survivor.statsId)
    const response = await fetch(`http://localhost:8088/survivors/${survivor.id}`, {
        method: "DELETE"
    });
    return await response.json();
};



// WeaponProf
export const getWeaponProficencies = async () => {
    const response = await fetch("http://localhost:8088/weaponProficencies");
    const weaponProficencies = await response.json();
    return weaponProficencies;
};

export const getWeaponProficencyForEdit = async (weaponProfId) => {
    const response = await fetch(`http://localhost:8088/weaponProficencies?id=${weaponProfId}`)
    const weaponProficencies = await response.json()
    const proficency = weaponProficencies[0]
    return proficency
};



// Disorders
export const getDisorders = async () => {
    const response = await fetch("http://localhost:8088/disorders");
    const disorders = await response.json();
    return disorders;
};

export const getDisorderForEdit = async (disorderId) => {
    const response = await fetch(`http://localhost:8088/disorders?id=${disorderId}`)
    const disorders = await response.json()
    const disorder = disorders[0]
    return disorder
};



// Fighting Arts
export const getFightingArts = async () => {
    const response = await fetch("http://localhost:8088/fightingArts");
    const fightingArts = await response.json();
    return fightingArts;
};

export const getFightingArtsForEdit = async (fightingArtId) => {
    const response = await fetch(`http://localhost:8088/fightingArts?id=${fightingArtId}`)
    const fightingArts = await response.json()
    const fightingArt = fightingArts[0]
    return fightingArt
};



// Abilities
export const getAbilities = async () => {
    const response = await fetch("http://localhost:8088/abilities");
    const abilities = await response.json();
    return abilities;
};

export const getAbilityForEdit = async (abilityId) => {
    const response = await fetch(`http://localhost:8088/abilities?id=${abilityId}`)
    const abilities = await response.json()
    const ability = abilities[0]
    return ability
};



// Stats
export const createStats = async (stats) => {
    const response = await fetch("http://localhost:8088/stats", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(stats)
    })
    const createdStats = await response.json()
    return createdStats
}

export const editStats = async (stats) => {
    const response = await fetch(`http://localhost:8088/stats/${stats.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(stats)
    });
    const editedStats = await response.json();
    return editedStats;
};

export const getStatsForEdit = async (statId) => {
    const response = await fetch(`http://localhost:8088/stats?id=${statId}`)
    const statsArray = await response.json()
    const stats = statsArray[0]
    return stats
};

export const deleteStats = async (statsId) => {
    const response = await fetch(`http://localhost:8088/stats/${statsId}`, {
        method: "DELETE"
    });
    return await response.json();
};



// Hit Locations
export const createHitLocations = async (hitLocations) => {
    const response = await fetch("http://localhost:8088/hitLocations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(hitLocations)
    })
    const createdHitLocations = await response.json()
    return createdHitLocations
}

export const editHitLocations = async (hitLocations) => {
    const response = await fetch(`http://localhost:8088/hitLocations/${hitLocations.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(hitLocations)
    });
    const editedHitLocations = await response.json();
    return editedHitLocations;
};

export const getHitLocationsForEdit = async (hitLocationId) => {
    const response = await fetch(`http://localhost:8088/hitLocations?id=${hitLocationId}`)
    const hLArray = await response.json()
    const hL = hLArray[0]
    return hL
};

export const deleteHitLocations = async (hitLocationsId) => {
    const response = await fetch(`http://localhost:8088/hitLocations/${hitLocationsId}`, {
        method: "DELETE"
    });
    return await response.json();
};



// Sessions
export const getSessions = async () => {
    const response = await fetch("http://localhost:8088/sessions?_expand=settlement")
    const sessions = await response.json()
    return sessions
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
    const response = await fetch(`http://localhost:8088/sessions/${session.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedSession)
    })
    const updatedSession = await response.json()
    return updatedSession
}
