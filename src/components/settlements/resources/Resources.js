import { useResources } from "./ResourcesContext"
import "../form/SettlementForm.css"

export const Resources = () => {

    const { handleChange, findItem, removeResource, addResource, resources, settlementItem, settlementInventory } = useResources()

    return (
        <>
            <div className="field resource">
                <fieldset className="field">
                    <label className="label" htmlFor="resourceTypeId">Resources:</label>
                    <div className="select">
                        <select name="resourceName" onChange={(evt) => handleChange(evt)}>
                            <option value="0">-- Select --</option>
                            {resources.map((resource) => (
                                <option key={`resource--${resource.id}`} value={resource.id}>
                                    {resource.name}
                                </option>
                            ))}
                        </select>
                        {
                            settlementItem.resourceId ? <button className="button is-small is-dark" onClick={addResource}>Add Resource</button> : ""
                        }
                    </div>
                </fieldset>
                <div className="inventory">
                    <div className="inventory__title label">
                        <div>
                            Settlement Inventory:
                        </div>
                    </div>
                    <ul className="inventory__list">
                        {
                            settlementInventory.map((item) => {
                                const resource = findItem(item)
                                if (item.amount !== 0) {
                                    return <>
                                        <div className="inventory__item">
                                            <li key={`chosenResource--${resource.id}-${item.amount}`}>{resource.name}: {resource.type} {item.amount}</li>
                                            <button className="button is-small is-dark" onClick={(evt) => removeResource(evt, resource.id)}>Remove</button>
                                        </div>
                                    </>
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}