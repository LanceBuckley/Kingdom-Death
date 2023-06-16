import { useHitLocations } from "./HitLocationsContext"

export const HitLocations = () => {

    // Here we destructure the values prop from the provider
    const { hitLocations, setHitLocations } = useHitLocations()

    return (
        <>
            <fieldset className="hitLocation__group">
                <div className="hitLocation__field">
                    <label htmlFor="survivorHead">Head:</label>
                    <input
                        type="number"
                        id="survivorHead"
                        className="form-control"
                        placeholder="0"
                        value={hitLocations.headArmor}
                        onChange={(evt) => {
                            const copy = { ...hitLocations }
                            copy.headArmor = parseInt(evt.target.value)
                            setHitLocations(copy)
                        }}
                    />
                </div>
                <div>
                    <div className="hitLocation__field">
                        <label htmlFor="headHeavyWound">
                            HW
                            <input
                                type="checkbox"
                                id="headHeavyWound"
                                onChange={(evt) => {
                                    const copy = { ...hitLocations }
                                    copy.headWound = evt.target.checked
                                    setHitLocations(copy)
                                }}
                            />
                        </label>
                    </div>
                </div>
            </fieldset>
            <fieldset className="hitLocation__group">
                <div className="hitLocation__field">
                    <label htmlFor="survivorArms">Arms:</label>
                    <input
                        type="number"
                        id="survivorArms"
                        className="form-control"
                        placeholder="0"
                        value={hitLocations.armArmor}
                        onChange={(evt) => {
                            const copy = { ...hitLocations }
                            copy.armArmor = parseInt(evt.target.value)
                            setHitLocations(copy)
                        }}
                    />
                </div>
                <div className="hitLocation__field">
                    <div>
                        <label htmlFor="armsLightWound">
                            LW
                            <input
                                type="checkbox"
                                id="armsLightWound"
                                onChange={(evt) => {
                                    const copy = { ...hitLocations }
                                    copy.armLightWound = evt.target.checked
                                    setHitLocations(copy)
                                }}
                            />
                        </label>
                    </div>
                    <div >
                        <label htmlFor="armsHeavyWound">
                            HW
                            <input
                                type="checkbox"
                                id="armsHeavyWound"
                                onChange={(evt) => {
                                    const copy = { ...hitLocations }
                                    copy.armHeavyWound = evt.target.checked
                                    setHitLocations(copy)
                                }}
                            />
                        </label>
                    </div>
                </div>
            </fieldset>
            <fieldset className="hitLocation__group">
                <div className="hitLocation__field">
                    <label htmlFor="survivorBody">Body:</label>
                    <input
                        type="number"
                        id="survivorBody"
                        className="form-control"
                        placeholder="0"
                        value={hitLocations.bodyArmor}
                        onChange={(evt) => {
                            const copy = { ...hitLocations }
                            copy.bodyArmor = parseInt(evt.target.value)
                            setHitLocations(copy)
                        }}
                    />
                </div>
                <div className="hitLocation__field">
                <div>
                        <label htmlFor="bodyLightWound">
                            LW
                            <input
                                type="checkbox"
                                id="bodyLightWound"
                                onChange={(evt) => {
                                    const copy = { ...hitLocations }
                                    copy.bodyLightWound = evt.target.checked
                                    setHitLocations(copy)
                                }}
                            />
                        </label>
                    </div>
                    <div >
                        <label htmlFor="bodyHeavyWound">
                            HW
                            <input
                                type="checkbox"
                                id="bodyHeavyWound"
                                onChange={(evt) => {
                                    const copy = { ...hitLocations }
                                    copy.bodyHeavyWound = evt.target.checked
                                    setHitLocations(copy)
                                }}
                            />
                        </label>
                    </div>
                </div>
            </fieldset>
            <fieldset className="hitLocation__group">
                <div className="hitLocation__field">
                    <label htmlFor="survivorWaist">Waist:</label>
                    <input
                        type="number"
                        id="survivorWaist"
                        className="form-control"
                        placeholder="0"
                        value={hitLocations.waistArmor}
                        onChange={(evt) => {
                            const copy = { ...hitLocations }
                            copy.waistArmor = parseInt(evt.target.value)
                            setHitLocations(copy)
                        }}
                    />
                </div>
                <div className="hitLocation__field">
                <div>
                        <label htmlFor="waistLightWound">
                            LW
                            <input
                                type="checkbox"
                                id="waistLightWound"
                                onChange={(evt) => {
                                    const copy = { ...hitLocations }
                                    copy.waistLightWound = evt.target.checked
                                    setHitLocations(copy)
                                }}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="waistHeavyWound">
                            HW
                            <input
                                type="checkbox"
                                id="waistHeavyWound"
                                onChange={(evt) => {
                                    const copy = { ...hitLocations }
                                    copy.waistHeavyWound = evt.target.checked
                                    setHitLocations(copy)
                                }}
                            />
                        </label>
                    </div>
                </div>
            </fieldset>
            <fieldset className="hitLocation__group">
                <div className="hitLocation__field">
                    <label htmlFor="survivorLegs">Legs:</label>
                    <input
                        type="number"
                        id="survivorLegs"
                        className="form-control"
                        placeholder="0"
                        value={hitLocations.legArmor}
                        onChange={(evt) => {
                            const copy = { ...hitLocations }
                            copy.legArmor = parseInt(evt.target.value)
                            setHitLocations(copy)
                        }}
                    />
                </div>
                <div className="hitLocation__field">
                <div>
                        <label htmlFor="legsLightWound">
                            LW
                            <input
                                type="checkbox"
                                id="legsLightWound"
                                onChange={(evt) => {
                                    const copy = { ...hitLocations }
                                    copy.legLightWound = evt.target.checked
                                    setHitLocations(copy)
                                }}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="legsHeavyWound">
                            HW
                            <input
                                type="checkbox"
                                id="legsHeavyWound"
                                onChange={(evt) => {
                                    const copy = { ...hitLocations }
                                    copy.legHeavyWound = evt.target.checked
                                    setHitLocations(copy)
                                }}
                            />
                        </label>
                    </div>
                </div>
            </fieldset>
        </>
    )
}