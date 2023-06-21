import { useMilestones } from "./MilestonesContext"
import "../form/SettlementForm.css"

export const MileStones = () => {

    const { handleChange, milestones, storedMilestones } = useMilestones()

    return (
        <>
            <fieldset className="field">
                <label className="label" htmlFor="milestoneTypeId">Milestones:</label>
                {milestones.map((milestone) => {
                    const storedMilestone = storedMilestones.find((storedMilestone) => storedMilestone.milestoneId === milestone.id);
                    const reached = storedMilestone ? storedMilestone.reached : false;
                    return (
                        <div className="control" key={milestone.id}>
                            <label className="checkbox" htmlFor="milestoneType">{milestone.type}</label>
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
        </>
    )
}