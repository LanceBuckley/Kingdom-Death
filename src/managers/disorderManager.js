// Disorders
export const getDisorders = async () => {
    const response = await fetch("http://localhost:8000/disorders", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const disorders = await response.json();
    return disorders;
};

export const getDisorderForEdit = async (disorderId) => {
    const response = await fetch(`http://localhost:8000/disorders?id=${disorderId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const disorders = await response.json()
    const disorder = disorders[0]
    return disorder
};