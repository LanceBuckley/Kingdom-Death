import { useStats } from "./StatsContext"

export const Stats = () => {
    // Here we destructure the values prop from the provider
    const { stats, update } = useStats()

    return (
        <>
            <fieldset>
                <div className="stat__group">
                    <label htmlFor="survivorMovement">Movement:</label>
                    <input
                        type="number"
                        id="survivorMovement"
                        className="form-control"
                        placeholder="0"
                        value={stats.movement}
                        onChange={(evt) => {
                            const copy = { ...stats }
                            copy.movement = parseInt(evt.target.value)
                            update(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="stat__group">
                    <label htmlFor="survivorAccuracy">Accuracy:</label>
                    <input
                        type="number"
                        id="survivorAccuracy"
                        className="form-control"
                        placeholder="0"
                        value={stats.accuracy}
                        onChange={(evt) => {
                            const copy = { ...stats }
                            copy.accuracy = parseInt(evt.target.value)
                            update(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="stat__group">
                    <label htmlFor="survivorStrength">Strength:</label>
                    <input
                        type="number"
                        id="survivorStrength"
                        className="form-control"
                        placeholder="0"
                        value={stats.strength}
                        onChange={(evt) => {
                            const copy = { ...stats }
                            copy.strength = parseInt(evt.target.value)
                            update(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="stat__group">
                    <label htmlFor="survivorEvasion">Evasion:</label>
                    <input
                        type="number"
                        id="survivorEvasion"
                        className="form-control"
                        placeholder="0"
                        value={stats.evasion}
                        onChange={(evt) => {
                            const copy = { ...stats }
                            copy.evasion = parseInt(evt.target.value)
                            update(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="stat__group">
                    <label htmlFor="survivorSpeed">Speed:</label>
                    <input
                        type="number"
                        id="survivorSpeed"
                        className="form-control"
                        placeholder="0"
                        value={stats.speed}
                        onChange={(evt) => {
                            const copy = { ...stats }
                            copy.speed = parseInt(evt.target.value)
                            update(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="stat__group">
                    <label htmlFor="survivorLuck">Luck:</label>
                    <input
                        type="number"
                        id="survivorLuck"
                        className="form-control"
                        placeholder="0"
                        value={stats.luck}
                        onChange={(evt) => {
                            const copy = { ...stats }
                            copy.luck = parseInt(evt.target.value)
                            update(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="stat__group">
                    <label htmlFor="survivorUnderstanding">Understanding:</label>
                    <input
                        type="number"
                        id="survivorUnderstanding"
                        className="form-control"
                        placeholder="0"
                        value={stats.understanding}
                        onChange={(evt) => {
                            const copy = { ...stats }
                            copy.understanding = parseInt(evt.target.value)
                            update(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="stat__group">
                    <label htmlFor="survivorCourage">Courage:</label>
                    <input
                        type="number"
                        id="survivorCourage"
                        className="form-control"
                        placeholder="0"
                        value={stats.courage}
                        onChange={(evt) => {
                            const copy = { ...stats }
                            copy.courage = parseInt(evt.target.value)
                            update(copy)
                        }}
                    />
                </div>
            </fieldset>
        </>
    )
}