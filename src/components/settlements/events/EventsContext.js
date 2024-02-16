import { createContext, useContext, useEffect, useState } from "react"
import { useSettlementForm } from "../form/SettlementFormContext"
import { getEvents, getSettlementEvents } from "../../../managers/eventManager"

// Create the context variable using createContext
const EventsContext = createContext()

export const EventsProvider = ({ children }) => {

    const { isEditPage, settlementId } = useSettlementForm()

    const [allEvents, setEvents] = useState([])
    const [settlementEvents, setSettlementEvents] = useState([])
    const [newEvent, setNewEvent] = useState({
        settlementId: 0,
        eventId: 0,
        year: 0
    })

    useEffect(
        () => {
            getEvents()
                .then((events) => {
                    setEvents(events)
                })
        },
        []
    )

    useEffect(
        () => {
            if (isEditPage) {
                getSettlementEvents(settlementId)
                    .then((events) => {
                        setSettlementEvents(events)
                    })
            }
        },
        []
    )

    useEffect(
        () => {
            if (newEvent.year !== 0) {
                const copyEvent = { ...newEvent }
                const copySEvents = [...settlementEvents]
                let previouslyChosenEvent = findUsedEvent(copySEvents, copyEvent)
                if (previouslyChosenEvent) {
                    previouslyChosenEvent.eventId = copyEvent.eventId
                } else {
                    copySEvents.push(copyEvent)
                }
                setSettlementEvents(copySEvents)
            }
        },
        [newEvent]
    )

    const findUsedEvent = (copySEvents, copyEvent) => {
        const previouslyChosenEvent = copySEvents.find((sEvent) => { return sEvent.year === copyEvent.year })
        return previouslyChosenEvent
    }

    const handleChange = (evt) => {
        const copyEvent = { ...newEvent }
        if (evt.target.value !== 0) {
            copyEvent.eventId = parseInt(evt.target.value)
            copyEvent.year = parseInt(evt.target.name)
            setNewEvent(copyEvent)
        }
    }

    const createTimeline = () => {
        const timeline = []
        for (let i = 0; i <= 9; i++) {
            const year = i + 1
            const selectedEvent = settlementEvents.find((event) => event.year === year)
            timeline.push(
                <fieldset className="field event" key={`event-${year}`}>
                    <div className="select">
                        <select name={year} onChange={(evt) => handleChange(evt)}>
                            <option value="0">-- Set The Event Of Year {year} --</option>
                            {allEvents.map((event) => (
                                <option
                                    key={`event--${event.id}`}
                                    value={event.id}
                                    selected={selectedEvent && selectedEvent.eventId === event.id}>
                                    {event.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
            )
        }
        return timeline
    }


    // Return this context provider wrapping that passes down a value prop to its children
    return (
        <EventsContext.Provider
            value={{ createTimeline, settlementEvents }}
        >
            {children}
        </EventsContext.Provider>
    )
}

// Export a custom hook so the child can access this component
export const useEvents = () => useContext(EventsContext)

