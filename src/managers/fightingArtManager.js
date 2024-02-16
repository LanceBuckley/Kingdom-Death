// Fighting Arts
export const getFightingArts = async () => {
    const response = await fetch("http://localhost:8000/fightingArts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const fightingArts = await response.json();
    return fightingArts;
};

export const getFightingArtsForEdit = async (fightingArtId) => {
    const response = await fetch(`http://localhost:8000/fightingArts?id=${fightingArtId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const fightingArts = await response.json()
    const fightingArt = fightingArts[0]
    return fightingArt
};