// Events
export const getEvents = async () => {
    const response = await fetch("http://localhost:8000/events", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const events = await response.json()
    return events
}

export const getSettlementEvents = async (settlementId) => {
    const response = await fetch(`http://localhost:8000/settlement_events?settlement=${settlementId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const settlementEvents = await response.json();
    return settlementEvents;
};

export const createSettlementEvents = async (settlementEvent) => {
    const response = await fetch("http://localhost:8000/settlement_events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(settlementEvent)
    });
    const createdSEvent = await response.json();
    return createdSEvent;
};

export const editSettlementEvents = async (currentEvent) => {
    if (currentEvent.eventId !== 0) {
        const response = await fetch(`http://localhost:8000/settlement_events/${currentEvent.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
            },
            body: JSON.stringify(currentEvent)
        });
        const editedSEvent = response.json();
        return editedSEvent;
    }
};

export const deleteSettlementEvents = async (removedEvent) => {
    const response = await fetch(`http://localhost:8000/settlement_events/${removedEvent.id}`, {
        method: "DELETE"
    });
    return await response.json();
};