import { useEffect, useState } from "react"
import { getResources, getSettlementInventory } from "../ApiManager"
import { MileStonesEdit } from "./MilestonesEdit"

export const ResourcesEdit = ({ settlement, settlementId, filteredEvents, settlementEvents }) => {
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

    useEffect(
        () => {
            if (resources.length !== 0) {
                getSettlementInventory(settlementId)
                    .then((inventory) => {
                        setSettlementInventory(inventory)
                    })
            }
        },
        [resources]
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
        setSettlementInventory(copyInventory)
    }

    const findItem = (item) => {
        const currentItem = resources.find(resource => { return resource.id === item.resourceId })
        return currentItem
    }

    return (
        <>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="resourceTypeId">Resources:</label>
                </div>
                <div className="form-group">
                    <select name="resourceName" onChange={(evt) => handleChange(evt)}>
                        <option value="0">-- Select --</option>
                        {resources.map((resource) => (
                            <option key={`resource--${resource.id}`} value={resource.id}>
                                {resource.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            {
                settlementItem.resourceId ? <button onClick={addResource}>Add Resource</button> : ""
            }
            <ul>Settlement Inventory:</ul>
            {
                settlementInventory.map((item) => {
                    const resource = findItem(item)
                    if (item.amount !== 0) {
                        return <>
                            <li key={`resource--${resource.id}`}>{resource.name}: {resource.type} {item.amount}</li>
                            <button onClick={(evt) => removeResource(evt, resource.id)}>Remove</button>
                        </>
                    }
                })
            }
            <MileStonesEdit
                settlement={settlement}
                settlementInventory={settlementInventory}
                filteredEvents={filteredEvents}
                settlementEvents={settlementEvents}
                settlementId={settlementId} />
        </>
    )
}