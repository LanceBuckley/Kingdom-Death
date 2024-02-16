import { Events } from "../events/Events"
import { Resources } from "../resources/Resources"
import "./SettlementForm.css"
import { EventsProvider } from "../events/EventsContext"
import { useSettlementForm } from "./SettlementFormContext"
import { ResourcesProvider } from "../resources/ResourcesContext"
import { MilestonesProvider } from "../milestones/MilestonesContext"
import { MileStones } from "../milestones/Milestones"
import { Save } from "../Save"
import Godhand from "../../../src/images/Godhand.png"

export const SettlementForm = () => {

    const { settlement, update, settlementId, isEditPage, navigate, deleteButton } = useSettlementForm()

    return (
        <>
            <main className="container">
                <section className="hero">
                    <div className="hero-body">
                    </div>
                </section>
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
                <section className="hero">
                    <div className="hero-body">
                        <img src={Godhand}></img>
                    </div>
                </section>
            </main>
        </>
    )
}