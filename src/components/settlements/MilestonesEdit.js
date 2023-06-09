import { useEffect, useState } from "react"
import { createAchievedMilestone, deleteAchievedMilestones, editSettlement, getAchievedMilestones, getMilestones } from "../ApiManager"
import { useNavigate } from "react-router-dom"

export const MileStonesEdit = ({ settlement, settlementId }) => {

    const [milestones, setMilestones] = useState([])
    const [storedMilestones, setStoredMilestones] = useState([])
    const [achievedMilestones, setAchievedMilestones] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            getMilestones()
                .then((milestones) => {
                    setMilestones(milestones)
                })
        },
        []
    )

    useEffect(
        () => {
            getAchievedMilestones(settlementId)
                .then((storedMilestones) => {
                    setStoredMilestones(storedMilestones)
                })
        },
        []
    )

    useEffect(() => {
        const mappedMilestones = milestones.map((milestone) => ({
            settlementId: parseInt(settlementId),
            milestoneId: milestone.id,
            reached: findAchievedMilestone(milestone.id),
            id: findAchievedMilestone(milestone.id)
        }))
        setAchievedMilestones(mappedMilestones)
    }, [storedMilestones])


    const handleChange = (evt, milestoneId) => {
        const milestone = { ...findMilestone(milestoneId) }
        milestone.reached = evt.target.checked
        const copy = Object.values(achievedMilestones)
        const updatedMilestone = copy.map((oldMilestone) => {
            if (oldMilestone.milestoneId === milestoneId) {
                return milestone
            }
            return oldMilestone
        })
        setAchievedMilestones(updatedMilestone)
    }

    const findMilestone = (milestoneId) => {
        const currentMilestone = achievedMilestones.find(achievedMilestone => { return achievedMilestone.milestoneId === milestoneId })
        return currentMilestone
    }

    const findAchievedMilestone = (milestoneId) => {
        const currentMilestone = storedMilestones.find(storedMilestone => { return storedMilestone.milestoneId === milestoneId })
        return currentMilestone
            ? currentMilestone.reached && currentMilestone.id
            : false && 0
    }

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        debugger
        editSettlement(settlementId, settlement)
        achievedMilestones.map((achievedMilestone) => {
            if (findAchievedMilestone(achievedMilestone.milestoneId) && achievedMilestone.reached) {
            } else if (findAchievedMilestone(achievedMilestone.milestoneId)) {
                deleteAchievedMilestones(achievedMilestone)
            } else if (achievedMilestone.reached) {
                createAchievedMilestone(achievedMilestone)
            } else {
            }
        })
        navigate("/")
    }

    return (
        <>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="milestoneTypeId">Milestones:</label>
                </div>
                {milestones.map((milestone) => {
                    const achievedMilestone = achievedMilestones.find((achievedMilestone) => achievedMilestone.milestoneId === milestone.id);
                    const reached = achievedMilestone ? achievedMilestone.reached : false;
                    return (
                        <div className="form-group" key={milestone.id}>
                            <label htmlFor="milestoneType">{milestone.type}</label>
                            <input
                                required
                                type="checkbox"
                                name={milestone.type}
                                checked={reached}
                                value={milestone.id}
                                onChange={(evt) => handleChange(evt, milestone.id)}
                            />
                        </div>
                    )
                })}
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Settlement
            </button>
        </>
    )
}