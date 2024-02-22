// Resources
export const getResources = async () => {
    const response = await fetch("http://localhost:8000/resources", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const resources = await response.json();
    return resources;
};

export const getSettlementInventory = async (settlementId) => {
    const response = await fetch(`http://localhost:8000/settlement_inventories?settlement=${settlementId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const inventory = await response.json();
    return inventory;
};

export const createSettlementInventory = async (settlementItem) => {
    const response = await fetch("http://localhost:8000/settlement_inventories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(settlementItem)
    });
    const createdSettlementInventory = await response.json();
    return createdSettlementInventory;
};

export const editSettlementInventory = async (existingItem) => {
    const response = await fetch(`http://localhost:8000/settlement_inventories/${existingItem.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(existingItem)
    });
    const editedInventory = await response.json();
    return editedInventory;
};

export const deleteSettlementInventory = async (removedItem) => {
    const response = await fetch(`http://localhost:8000/settlementInventory/${removedItem.id}`, {
        method: "DELETE"
    });
    return await response.json();
};