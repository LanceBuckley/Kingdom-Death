// WeaponProf
export const getWeaponProficiencies = async () => {
    const response = await fetch("http://localhost:8000/weaponProficencies", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const weaponProficiencies = await response.json();
    return weaponProficiencies;
};

export const getWeaponProficiencyForEdit = async (weaponProfId) => {
    const response = await fetch(`http://localhost:8000/weaponProficencies?id=${weaponProfId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const weaponProficiencies = await response.json()
    const proficiency = weaponProficiencies[0]
    return proficiency
};