import { useEffect, useState } from "react"
import { getResources, getSettlementInventory } from "../ApiManager"
import { MileStonesEdit } from "./MilestonesEdit"

export const ResourcesEdit = ({ settlement, settlementId }) => {
    const [resources, setResources] = useState([])
    const [settlementItem, setSettlementItem] = useState({
        settlementId: 0,
        resourceId: 0,
        amount: 1
    })
    const [settlementInventory, setSettlementInventory] = useState([])
    const [filteredInventory, setFilteredInventory] = useState([])

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
            getSettlementInventory()
                .then((inventory) => {
                    setSettlementInventory(inventory)
                })
        },
        []
    )

    useEffect(
        () => {
            const inventoryToEdit = settlementInventory.filter((item) => { return item.settlementId === parseInt(settlementId) })
            setFilteredInventory(inventoryToEdit)
        },
        [settlementInventory]
    )

    const handleChange = (evt) => {
        evt.preventDefault()
        const copyItem = { ...settlementItem }
        copyItem.resourceId = parseInt(evt.target.value)
        setSettlementItem(copyItem)
    }

    const addResource = (evt) => {
        evt.preventDefault()
        const copyInventory = [...filteredInventory]
        const copyItem = { ...settlementItem }
        const existingItem = copyInventory.find((item) => { return item.resourceId === copyItem.resourceId })
        if (existingItem) {
            existingItem.amount++
        } else if (copyItem.resourceId === 0) {
        } else {
            copyInventory.push(copyItem)
        }
        setFilteredInventory(copyInventory)
    }

    const removeResource = (evt, resourceId) => {
        evt.preventDefault()
        const copyInventory = [...filteredInventory]
        const chosenItem = copyInventory.find((item) => { return item.resourceId === resourceId })
        chosenItem.amount--
        if (chosenItem.amount === 0) {
            spliceItem(copyInventory, chosenItem)
        }
        setFilteredInventory(copyInventory)
    }

    const spliceItem = (copyInventory, chosenItem) => {
        const index = copyInventory.findIndex((item) => item.resourceId === chosenItem.resourceId)
        if (index !== -1) {
            copyInventory.splice(index, 1)
        }
        return copyInventory
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
                    <label htmlFor="resourceName">Select a resource:</label>
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
                filteredInventory.map((item) => {
                    const resource = findItem(item)
                    return <>
                        <li key={`resource--${resource.id}`}>{resource.name}: {resource.type} {item.amount}</li>
                        <button onClick={(evt) => removeResource(evt, resource.id)}>Remove</button>
                    </>
                })
            }
            <MileStonesEdit settlement={settlement} filteredInventory={filteredInventory} settlementInventory={settlementInventory} settlementId={settlementId} />
        </>
    );

}