import { useEffect, useState } from "react"
import { createAchievedMilestone, createSettlement, getMilestones } from "../ApiManager"
import { useNavigate } from "react-router-dom"

export const MileStones = ({settlement}) => {
    const [milestones, setMilestones] = useState([])
    const [achievedMilestones, setAchievedMilestones] = useState({})

        // This declares navigate as an invocation of useNavigate
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

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // This posts/adds the new settlement to the list of settlements in the database and then reroutes the user to /
        createSettlement(settlement)
            .then((newSettlement) => {
                achievedMilestones.map((achievedMilestone) => {
                    if (achievedMilestone.reached === true) {
                        achievedMilestone.settlementId = newSettlement.id
                        createAchievedMilestone(achievedMilestone)
                    }
                })
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
                    return (
                        <div className="form-group" key={milestone.id}>
                            <label htmlFor="milestoneType">{milestone.type}</label>
                            <input
                                required
                                type="checkbox"
                                name={milestone.type}
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