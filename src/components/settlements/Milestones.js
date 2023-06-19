import { useEffect, useState } from "react"
import { getMilestones } from "../ApiManager"
import { Save } from "./SaveSettlement"

export const MileStones = ({ settlement, settlementInventory, settlementEvents }) => {

    const [milestones, setMilestones] = useState([])
    const [storedMilestones, setStoredMilestones] = useState([])
    const [milestoneObject, setMilestoneObject] = useState({
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
                    return (
                        <div className="form-group" key={milestone.id}>
                            <label htmlFor="milestoneType">{milestone.type}</label>
                            <input
                                type="checkbox"
                                name={milestone.type}
                                value={milestone.id}
                                onChange={(evt) => handleChange(evt)}
                            />
                        </div>
                    )
                })}
            </fieldset>
            <Save settlement={settlement} settlementInventory={settlementInventory} achievedMilestones={storedMilestones} settlementEvents={settlementEvents} />
        </>
    )
}