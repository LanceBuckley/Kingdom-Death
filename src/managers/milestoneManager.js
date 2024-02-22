export const getMilestones = async () => {
    const response = await fetch("http://localhost:8000/milestone_types", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const milestones = await response.json();
    return milestones;
};

export const getAchievedMilestones = async (settlementId) => {
    const response = await fetch(`http://localhost:8000/milestones?achieved=True&settlement=${settlementId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const achievedMilestones = await response.json();
    return achievedMilestones;
};

export const createAchievedMilestone = async (achievedMilestone) => {
    const response = await fetch("http://localhost:8000/milestones?achieved=True", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(achievedMilestone)
    });
    const createdAchievedMilestone = await response.json();
    return createdAchievedMilestone;
};

export const deleteAchievedMilestones = async (achievedMilestone) => {
    const response = await fetch(`http://localhost:8000/milestones/${achievedMilestone.id}`, {
        method: "DELETE"
    });
    return await response.json();
};