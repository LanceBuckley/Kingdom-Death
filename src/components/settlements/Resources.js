import { useEffect, useState } from "react"
import { getResources } from "../ApiManager"
import { MileStones } from "./Milestones"
import "./SettlementForm.css"

export const Resources = ({ settlement, settlementId, settlementEvents }) => {
    const [resources, setResources] = useState([])
    const [settlementItem, setSettlementItem] = useState({
        settlementId: 0,
        resourceId: 0,
        amount: 1
    })
    const [settlementInventory, setSettlementInventory] = useState([])

    useEffect(
        () => {
            getResources()
                .then((resources) => {
                    setResources(resources)
                })
        },
        []
    )

    const handleChange = (evt) => {
        evt.preventDefault()
        const copyItem = { ...settlementItem }
        copyItem.resourceId = parseInt(evt.target.value)
        setSettlementItem(copyItem)
    }

    const addResource = (evt) => {
        evt.preventDefault()
        const copyInventory = [...settlementInventory]
        const copyItem = { ...settlementItem }
        const existingItem = copyInventory.find((item) => { return item.resourceId === copyItem.resourceId })
        if (existingItem) {
            existingItem.amount++
        } else if (copyItem.resourceId === 0) {
        } else {
            copyInventory.push(copyItem)
        }
        setSettlementInventory(copyInventory)
    }

    const removeResource = (evt, resourceId) => {
        evt.preventDefault()
        const copyInventory = [...settlementInventory]
        const chosenItem = copyInventory.find((item) => { return item.resourceId === resourceId })
        chosenItem.amount--
        if (chosenItem.amount === 0) {
            const index = copyInventory.findIndex((item) => item.resourceId === chosenItem.resourceId)
            if (index !== -1) {
                copyInventory.splice(index, 1)
            }
        }
        setSettlementInventory(copyInventory)
    }

    const findItem = (item) => {
        const currentItem = resources.find(resource => { return resource.id === item.resourceId })
        return currentItem
    }

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
                            settlementItem.resourceId ? <button onClick={addResource}>Add Resource</button> : ""
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
                                return <>
                                    <div className="inventory__item">
                                        <li key={`chosenResource--${resource.id}-${item.amount}`}>{resource.name}: {resource.type} {item.amount}</li>
                                        <button onClick={(evt) => removeResource(evt, resource.id)}>Remove</button>
                                    </div>
                                </>
                            })
                        }
                    </ul>
                </div>
            </div>
            <MileStones settlement={settlement} settlementInventory={settlementInventory} settlementId={settlementId} settlementEvents={settlementEvents} />
        </>
    )
}