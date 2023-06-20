import { useState } from "react"
import { Events } from "./Events"
import { Resources } from "./Resources"
import "./SettlementForm.css"
import { EventsProvider } from "./EventsContext"

export const SettlementForm = () => {

    const localDeathUser = localStorage.getItem("kdm_user")
    const deathUserObject = JSON.parse(localDeathUser)

    // This defines the settlement state object and allows it to be updated using update
    const [settlement, update] = useState({
        name: "",
        survivalLimit: 0,
        population: 0,
        userId: deathUserObject.id
    })

    return (
        <>
            <form className="box">
                <h2 className="is-size-3">New Settlement</h2>
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
                    <Events settlement={settlement} />
                    <Resources />
                </EventsProvider>
            </form>
        </>
    )
}