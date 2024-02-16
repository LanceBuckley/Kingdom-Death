export const createSettlement = async (newSettlement) => {
    const response = await fetch(`http://localhost:8000/settlements`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(newSettlement)
    });
    const createdSettlement = await response.json();
    return createdSettlement
};

export const getSettlements = async () => {
    const res = await fetch(`http://localhost:8000/settlements`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    return await res.json()
}

export const getSettlementToEdit = async (settlementId) => {
    const response = await fetch(`http://localhost:8000/settlements?id=${settlementId}`);
    const settlements = await response.json();
    const settlementToEdit = await settlements[0];
    return settlementToEdit;
};

export const editSettlement = async (settlementId, settlement) => {
    const response = await fetch(`http://localhost:8000/settlements/${settlementId}`, {
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
    return fetch(`http://localhost:8000/settlements/${settlementId}`, {
        method: "DELETE"
    });
};