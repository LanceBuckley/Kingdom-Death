export const getCurrentPlayer = async () => {
    const res = await fetch(`http://localhost:8000/players?current`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    return await res.json()
}