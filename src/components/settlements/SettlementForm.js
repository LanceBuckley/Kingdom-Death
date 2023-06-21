import { Events } from "./Events"
import { Resources } from "./Resources"
import "./SettlementForm.css"
import { EventsProvider } from "./EventsContext"
import { useSettlementForm } from "./SettlementFormContext"
import { ResourcesProvider } from "./ResourcesContext"
import { MilestonesProvider } from "./MilestonesContext"
import { MileStones } from "./Milestones"
import { Save } from "./Save"

export const SettlementForm = () => {

    const { settlement, update, settlementId, isEditPage, navigate, deleteButton } = useSettlementForm()

    return (
        <>
            <form className="box">
                {isEditPage
                    ? <h2 className="is-size-3">Edit Settlement</h2>
                    : <h2 className="is-size-3">New Settlement</h2>
                }
                <div className="settlementForm">
                    <fieldset className="field">
                        <div className="form-group">
                            <label className="label" htmlFor="name">Name:</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="The name of the settlement"
                                value={settlement.name}
                                onChange={
                                    (evt) => {
                                        // This creates a copy variable of the settlement using the spread operator and then marks the appropriate property value to the input value and invokes update
                                        const copy = { ...settlement }
                                        copy.name = evt.target.value
                                        update(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset className="field">
                        <div className="form-group">
                            <label className="label" htmlFor="survival">Survival Limit:</label>
                            <input
                                type="number"
                                className="input"
                                placeholder="Set the survival limit"
                                value={settlement.survivalLimit}
                                onChange={
                                    (evt) => {
                                        const copy = { ...settlement }
                                        copy.survivalLimit = evt.target.value
                                        update(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset className="field">
                        <div className="form-group">
                            <label className="label" htmlFor="population">Population:</label>
                            <input
                                type="number"
                                className="input"
                                placeholder="Set the settlement population"
                                value={settlement.population}
                                onChange={
                                    (evt) => {
                                        const copy = { ...settlement }
                                        copy.population = evt.target.value
                                        update(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                </div>
                <EventsProvider>
                    <ResourcesProvider>
                        <MilestonesProvider>
                            <Events />
                            <Resources />
                            <MileStones />
                            <Save />
                        </MilestonesProvider>
                    </ResourcesProvider>
                </EventsProvider>
                {isEditPage && deleteButton()}
            </form>
        </>
    )
}