import { useEffect, useState } from "react"
import { getAchievedMilestones, getMilestones } from "../ApiManager"
import { SaveEdit } from "./SaveEdit"

export const MileStonesEdit = ({ settlement, filteredInventory, settlementInventory, settlementId, filteredEvents, settlementEvents }) => {

    const [milestones, setMilestones] = useState([])
    const [storedMilestones, setStoredMilestones] = useState([])
    const [achievedMilestones, setAchievedMilestones] = useState([])

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
        const copy = [...achievedMilestones]
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
            <SaveEdit
            settlement={settlement}
            settlementId={settlementId}
            filteredInventory={filteredInventory}
            settlementInventory={settlementInventory}
            filteredEvents={filteredEvents}
            settlementEvents={settlementEvents}
            achievedMilestones={achievedMilestones}
            findAchievedMilestone={findAchievedMilestone}/>
        </>
    )
}