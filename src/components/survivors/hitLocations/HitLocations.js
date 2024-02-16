import { useEffect } from "react"
import { useHitLocations } from "./HitLocationsContext"
import { useSurvivor } from "../form/SurvivorFormContext"
import { getHitLocationsForEdit } from "../../../managers/survivorManager"

export const HitLocations = () => {

    // Here we destructure the values prop from the provider
    const { hitLocations, setHitLocations } = useHitLocations()
    const { survivor, isEditPage } = useSurvivor()


    useEffect(
        () => {
            if (isEditPage) {
                editHitLocations()
            }
        },
        [survivor]
    )

    const editHitLocations = async () => {
        const copy = { ...hitLocations }

        if (!hitLocations.id) {
            await getHitLocationsForEdit(survivor.hitLocationId)
                .then((hitLocations) => {
                    if (hitLocations) {
                        copy.id = hitLocations.id
                        copy.headArmor = hitLocations.headArmor
                        copy.headWound = hitLocations.headWound
                        copy.armArmor = hitLocations.armArmor
                        copy.armLightWound = hitLocations.armLightWound
                        copy.armHeavyWound = hitLocations.armHeavyWound
                        copy.bodyArmor = hitLocations.bodyArmor
                        copy.bodyLightWound = hitLocations.bodyLightWound
                        copy.bodyHeavyWound = hitLocations.bodyHeavyWound
                        copy.waistArmor = hitLocations.waistArmor
                        copy.waistLightWound = hitLocations.waistLightWound
                        copy.waistHeavyWound = hitLocations.waistHeavyWound
                        copy.legArmor = hitLocations.legArmor
                        copy.legLightWound = hitLocations.legLightWound
                        copy.legHeavyWound = hitLocations.legHeavyWound
                    }
                })
            setHitLocations(copy)
        }
    }

    return (
        <>
            <fieldset className="hitLocation__group">
                <div className="hitLocation__field">
                    <label className="label" htmlFor="survivorHead">Head:</label>
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
                        <label className="label" htmlFor="headWound">
                            HW
                            <input
                                type="checkbox"
                                id="headWound"
                                checked={hitLocations.headWound}
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
                    <label className="label" htmlFor="survivorArms">Arms:</label>
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
                    <div className="hitLocation__field">
                        <label htmlFor="armsLightWound">
                            LW
                            <input
                                type="checkbox"
                                id="armsLightWound"
                                checked={hitLocations.armLightWound}
                                onChange={(evt) => {
                                    const copy = { ...hitLocations }
                                    copy.armLightWound = evt.target.checked
                                    setHitLocations(copy)
                                }}
                            />
                        </label>
                    </div>
                    <div className="hitLocation__field">
                        <label className="label" htmlFor="armsHeavyWound">
                            HW
                            <input
                                type="checkbox"
                                id="armsHeavyWound"
                                checked={hitLocations.armHeavyWound}
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
                    <label className="label" htmlFor="survivorBody">Body:</label>
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
                    <div className="hitLocation__field">
                        <label htmlFor="bodyLightWound">
                            LW
                            <input
                                type="checkbox"
                                id="bodyLightWound"
                                checked={hitLocations.bodyLightWound}
                                onChange={(evt) => {
                                    const copy = { ...hitLocations }
                                    copy.bodyLightWound = evt.target.checked
                                    setHitLocations(copy)
                                }}
                            />
                        </label>
                    </div>
                    <div className="hitLocation__field">
                        <label className="label" htmlFor="bodyHeavyWound">
                            HW
                            <input
                                type="checkbox"
                                id="bodyHeavyWound"
                                checked={hitLocations.bodyHeavyWound}
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
                    <label className="label" htmlFor="survivorWaist">Waist:</label>
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
                    <div className="hitLocation__field">
                        <label htmlFor="waistLightWound">
                            LW
                            <input
                                type="checkbox"
                                id="waistLightWound"
                                checked={hitLocations.waistLightWound}
                                onChange={(evt) => {
                                    const copy = { ...hitLocations }
                                    copy.waistLightWound = evt.target.checked
                                    setHitLocations(copy)
                                }}
                            />
                        </label>
                    </div>
                    <div className="hitLocation__field">
                        <label className="label" htmlFor="waistHeavyWound">
                            HW
                            <input
                                type="checkbox"
                                id="waistHeavyWound"
                                checked={hitLocations.waistHeavyWound}
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
                    <label className="label" htmlFor="survivorLegs">Legs:</label>
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
                    <div className="hitLocation__field">
                        <label htmlFor="legsLightWound">
                            LW
                            <input
                                type="checkbox"
                                id="legsLightWound"
                                checked={hitLocations.legLightWound}
                                onChange={(evt) => {
                                    const copy = { ...hitLocations }
                                    copy.legLightWound = evt.target.checked
                                    setHitLocations(copy)
                                }}
                            />
                        </label>
                    </div>
                    <div className="hitLocation__field">
                        <label className="label" htmlFor="legsHeavyWound">
                            HW
                            <input
                                type="checkbox"
                                id="legsHeavyWound"
                                checked={hitLocations.legHeavyWound}
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