// Survivor
export const createSurvivor = async (survivor) => {
    const response = await fetch("http://localhost:8000/survivors", {
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
    const response = await fetch(`http://localhost:8000/survivors?userId=${userId}`)
    const survivors = await response.json()
    return survivors
};

export const getSurvivorToEdit = async (survivorId) => {
    const response = await fetch(`http://localhost:8000/survivors?id=${survivorId}`);
    const survivors = await response.json();
    const survivorToEdit = await survivors[0];
    return survivorToEdit;
};

export const editSurvivor = async (survivor) => {
    const response = await fetch(`http://localhost:8000/survivors/${survivor.id}`, {
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
    const response = await fetch(`http://localhost:8000/survivors/${survivor.id}`, {
        method: "DELETE"
    });
    return await response.json();
};





// Stats
export const createStats = async (stats) => {
    const response = await fetch("http://localhost:8000/stats", {
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
    const response = await fetch(`http://localhost:8000/stats/${stats.id}`, {
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
    const response = await fetch(`http://localhost:8000/stats?id=${statId}`)
    const statsArray = await response.json()
    const stats = statsArray[0]
    return stats
};

export const deleteStats = async (statsId) => {
    const response = await fetch(`http://localhost:8000/stats/${statsId}`, {
        method: "DELETE"
    });
    return await response.json();
};



// Hit Locations
export const createHitLocations = async (hitLocations) => {
    const response = await fetch("http://localhost:8000/hitLocations", {
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
    const response = await fetch(`http://localhost:8000/hitLocations/${hitLocations.id}`, {
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
    const response = await fetch(`http://localhost:8000/hitLocations?id=${hitLocationId}`)
    const hLArray = await response.json()
    const hL = hLArray[0]
    return hL
};

export const deleteHitLocations = async (hitLocationsId) => {
    const response = await fetch(`http://localhost:8000/hitLocations/${hitLocationsId}`, {
        method: "DELETE"
    });
    return await response.json();
};