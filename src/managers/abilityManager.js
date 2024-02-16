// Abilities
export const getAbilities = async () => {
    const response = await fetch("http://localhost:8000/abilities", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const abilities = await response.json();
    return abilities;
};

export const getAbilityForEdit = async (abilityId) => {
    const response = await fetch(`http://localhost:8000/abilities?id=${abilityId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const abilities = await response.json()
    const ability = abilities[0]
    return ability
};