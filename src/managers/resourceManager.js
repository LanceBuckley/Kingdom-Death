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

export const getAResource = async (id) => {
    const response = await fetch(`http://localhost:8000/resources/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const resource = await response.json();
    return resource;
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
    return response.status
};

export const deleteSettlementInventory = async (removedItem) => {
    const response = await fetch(`http://localhost:8000/settlement_inventories/${removedItem.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    });
    return response.status
};