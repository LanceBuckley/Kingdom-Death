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