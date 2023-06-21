import { createContext, useContext, useEffect, useState } from "react"
import { getResources, getSettlementInventory } from "../../ApiManager"
import { useSettlementForm } from "../form/SettlementFormContext"

// Create the context variable using createContext
const ResourcesContext = createContext()

export const ResourcesProvider = ({ children }) => {

    const { settlementId } = useSettlementForm()

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

    // Return this context provider wrapping that passes down a value prop to its children
    return (
        <ResourcesContext.Provider
            value={{ handleChange, findItem, removeResource, addResource, resources, settlementItem, settlementInventory }}
        >
            {children}
        </ResourcesContext.Provider>
    )
}

// Export a custom hook so the child can access this component
export const useResources = () => useContext(ResourcesContext)

