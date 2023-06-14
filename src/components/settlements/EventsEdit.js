import { useEffect, useState } from "react"
import { getEvents, getSettlementEvents } from "../ApiManager"
import { ResourcesEdit } from "./ResourcesEdit"

export const EventsEdit = ({settlement, settlementId}) => {

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
            getSettlementEvents(settlementId)
                .then((events) => {
                    setSettlementEvents(events)
                })
        },
        []
    )

    useEffect(
        () => {
            if (newEvent.year !== 0) {
                const copyEvent = {...newEvent}
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
        const previouslyChosenEvent = copySEvents.find((sEvent) => {return sEvent.year === copyEvent.year})
        return previouslyChosenEvent
    }

    const handleChange = (evt) => {
        const copyEvent = {...newEvent}
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
                <fieldset key={`event-${year}`}>
                    <div className="form-group">
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

    return (
        <>
            <div className="form-group">
                <label htmlFor="">Timeline:</label>
            </div>
            {createTimeline()}
            <ResourcesEdit settlement={settlement} settlementId={settlementId} settlementEvents={settlementEvents}/>
        </>
    )
}
