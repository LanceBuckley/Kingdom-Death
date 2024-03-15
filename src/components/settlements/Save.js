import { useNavigate } from "react-router-dom"
import { useSettlementForm } from "./form/SettlementFormContext"
import { useResources } from "./resources/ResourcesContext"
import { useMilestones } from "./milestones/MilestonesContext"
import { useEvents } from "./events/EventsContext"
import { createSettlementEvents, deleteSettlementEvents, editSettlementEvents } from "../../managers/eventManager"
import { createSettlementInventory, deleteSettlementInventory, editSettlementInventory } from "../../managers/resourceManager"
import { createAchievedMilestone, deleteAchievedMilestones } from "../../managers/milestoneManager"
import { createSettlement, editSettlement } from "../../managers/settlementManager"

export const Save = () => {

    const { isEditPage, settlement, settlementId } = useSettlementForm()
    const { settlementInventory } = useResources()
    const { storedMilestones } = useMilestones()
    const { settlementEvents } = useEvents()

    // This declares navigate as an invocation of useNavigate
    const navigate = useNavigate()

    const saveSEvents = async () => {
        const currentEvents = settlementEvents.filter((sEvent) => sEvent.hasOwnProperty('id') && sEvent.eventId !== 0)
        const newEvents = settlementEvents.filter((sEvent) => !sEvent.hasOwnProperty('id'))
        const removedEvents = settlementEvents.filter((sEvent) => sEvent.eventId === 0)
        for (const currentEvent of currentEvents) {
            await editSettlementEvents(currentEvent);
        }

        for (const newEvent of newEvents) {
            newEvent.settlementId = parseInt(settlementId)
            await createSettlementEvents(newEvent)
        }

        for (const removedEvent of removedEvents) {
            await deleteSettlementEvents(removedEvent)
        }
    }

    const saveSInventory = async () => {
        const existingItems = settlementInventory.filter((settlementItem) => settlementItem.hasOwnProperty('id') && settlementItem.amount !== 0)
        const newItems = settlementInventory.filter((settlementItem) => !settlementItem.hasOwnProperty('id'))
        const removedItems = settlementInventory.filter((settlementItem) => settlementItem.amount === 0)
        for (const existingItem of existingItems) {
            await editSettlementInventory(existingItem)
        }

        for (const newItem of newItems) {
            await createSettlementInventory(newItem)
        }

        for (const removedItem of removedItems) {
            await deleteSettlementInventory(removedItem)
        }
    }

    const saveSMilestones = async () => {
        const removedMilestones = storedMilestones.filter((storedMilestone) => storedMilestone.hasOwnProperty('id') && storedMilestone.reached === false)
        const newMilestones = storedMilestones.filter((storedMilestone) => !storedMilestone.hasOwnProperty('id') && storedMilestone.reached === true)
        for (const removedMilestone of removedMilestones) {
            await deleteAchievedMilestones(removedMilestone)
        }
        for (const newMilestone of newMilestones) {
            newMilestone.settlementId = parseInt(settlementId)
            await createAchievedMilestone(newMilestone)
        }
    }

    const saveInventory = async (newSettlement) => {
        settlementInventory.forEach(async (settlementItem) => {
            settlementItem.settlementId = newSettlement.id
            await createSettlementInventory(settlementItem)
        })
    }

    const saveEvents = async (newSettlement) => {
        settlementEvents.forEach(async (settlementEvent) => {
            settlementEvent.settlementId = newSettlement.id
            await createSettlementEvents(settlementEvent)
        })
    }

    const saveAchievedMilestones = async (newSettlement) => {
        storedMilestones.forEach(async (storedMilestone) => {
            if (storedMilestone.reached === true) {
                storedMilestone.settlementId = newSettlement.id
                await createAchievedMilestone(storedMilestone)
            }
        })
    }

    const handleSaveButtonClick = async (event) => {
        event.preventDefault()

        if (isEditPage) {
            await editSettlement(settlementId, settlement)
            await saveSEvents()
            await saveSInventory()
            await saveSMilestones()
            navigate("/")
        } else {
            // This posts/adds the new settlement to the list of settlements in the database and then reroutes the user to /
            const newSettlement = await createSettlement(settlement)
            await saveInventory(newSettlement)
            await saveEvents(newSettlement)
            await saveAchievedMilestones(newSettlement)
            navigate("/")
        }


    }

    return <button
        className="button is-small is-dark"
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
        Submit Settlement
    </button>
}