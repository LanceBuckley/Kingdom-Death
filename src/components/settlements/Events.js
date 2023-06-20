import { useEvents } from "./EventsContext"
import "./SettlementForm.css"

export const Events = () => {

    const { createTimeline } = useEvents()

    return (
        <>
            <label className="label" htmlFor="">Timeline:</label>
            <div className="field timeline">
                {createTimeline()}
            </div>
        </>
    )
}

