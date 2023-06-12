import { useEffect, useState } from "react"
import { createAchievedMilestone, createSettlement, createSettlementInventory, getMilestones } from "../ApiManager"
import { Save } from "./Save"

export const MileStones = ({settlement, settlementInventory, settlementEvents}) => {
    const [milestones, setMilestones] = useState([])
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

    useEffect(() => {
        const mappedMilestones = milestones.map((milestone) => ({
            settlementId: 0,
            milestoneId: milestone.id,
            reached: false
        }))
        setAchievedMilestones(mappedMilestones)
    }, [milestones])

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

    return (
        <>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="milestoneTypeId">Milestones:</label>
                </div>
                {milestones.map((milestone) => {
                    return (
                        <div className="form-group" key={milestone.id}>
                            <label htmlFor="milestoneType">{milestone.type}</label>
                            <input
                                type="checkbox"
                                name={milestone.type}
                                value={milestone.id}
                                onChange={(evt) => handleChange(evt, milestone.id)}
                            />
                        </div>
                    )
                })}
            </fieldset>
            <Save settlement={settlement} settlementInventory={settlementInventory} achievedMilestones={achievedMilestones} settlementEvents={settlementEvents}/>
        </>
    )
}