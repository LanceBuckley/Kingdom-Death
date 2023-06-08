import { useEffect, useState } from "react"
import { editSettlement, getSettlementToEdit } from "../ApiManager"
import { useNavigate, useParams } from "react-router-dom"

export const SettlementEdit = () => {

    const localDeathUser = localStorage.getItem("kdm_user")
    const deathUserObject = JSON.parse(localDeathUser)

    const { settlementId } = useParams()

    const [settlement, update] = useState({
        name: "",
        survivalLimit: 0,
        population: 0,
        userId: deathUserObject.id
    })

    // This declares navigate as an invocation of useNavigate
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // This posts/adds the new settlement to the list of settlements in the database and then reroutes the user to /
        // Change this to PUT!!!
        editSettlement(settlementId, settlement)
        .then(navigate("/"))
    }

    useEffect(
        () => {
            getSettlementToEdit(settlementId)
            .then((settlementToEdit) => {
                update(settlementToEdit)
            })
        },
        []
    )

    return (
        <form className="settlementForm">
            <h2 className="settlementForm__title">New Settlement</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="survival">Survival Limit:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="population">Population:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
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
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Settlement
            </button>
        </form>
    )
}