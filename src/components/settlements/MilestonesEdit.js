import { useEffect, useState } from "react"
import { getAchievedMilestones, getMilestones } from "../ApiManager"
import { SaveEdit } from "./SaveEdit"

export const MileStonesEdit = ({ settlement, settlementInventory, settlementId, settlementEvents }) => {

    const [milestones, setMilestones] = useState([])
    const [storedMilestones, setStoredMilestones] = useState([])
    const [milestoneObject, setMilestoneObject] = useState({
        settlementId: settlementId,
        milestoneId: 0,
        reached: false
    })

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

    const handleChange = (evt) => {
        const milestone = { ...milestoneObject}
        milestone.milestoneId = parseInt(evt.target.value)
        milestone.reached = evt.target.checked
        const copy = [...storedMilestones]
        const updatedMilestone = copy.find((oldMilestone) => oldMilestone.milestoneId === parseInt(evt.target.value))
        if (updatedMilestone) {
            updatedMilestone.milestoneId = milestone.milestoneId
            updatedMilestone.reached = milestone.reached
        } else {
            copy.push(milestone)
        }
        setStoredMilestones(copy)
    }

    return (
        <>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="milestoneTypeId">Milestones:</label>
                </div>
                {milestones.map((milestone) => {
                    const storedMilestone = storedMilestones.find((storedMilestone) => storedMilestone.milestoneId === milestone.id);
                    const reached = storedMilestone ? storedMilestone.reached : false;
                    return (
                        <div className="form-group" key={milestone.id}>
                            <label htmlFor="milestoneType">{milestone.type}</label>
                            <input
                                type="checkbox"
                                name={milestone.type}
                                checked={reached}
                                value={milestone.id}
                                onChange={(evt) => handleChange(evt)}
                            />
                        </div>
                    )
                })}
            </fieldset>
            <SaveEdit
            settlement={settlement}
            settlementId={settlementId}
            settlementInventory={settlementInventory}
            settlementEvents={settlementEvents}
            achievedMilestones={storedMilestones} />
        </>
    )
}