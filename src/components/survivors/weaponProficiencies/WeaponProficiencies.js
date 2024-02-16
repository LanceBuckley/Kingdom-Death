import { useEffect } from "react"
import { useWeaponProficiencies } from "./WeaponProficienciesContext"
import { useSurvivor } from "../form/SurvivorFormContext"
import { getWeaponProficiencyForEdit } from "../../../managers/weaponProfManager"

export const WeaponProficiencies = () => {
    // Here we destructure the values prop from the provider
    const { allProficiencies, chosenProficiency, setChosenProficiency } = useWeaponProficiencies()
    const { survivor, isEditPage } = useSurvivor()


    useEffect(
        () => {
            if (isEditPage) {
                editProficiency()
            }
        },
        [survivor]
    )

    const editProficiency = async () => {
        const copy = { ...chosenProficiency }

        await getWeaponProficiencyForEdit(survivor.weaponProfId)
            .then((proficiency) => {
                if (proficiency) {
                    copy.id = proficiency.id
                    copy.name = proficiency.name
                }
            })
        setChosenProficiency(copy)
    }

    const handleChange = (evt) => {
        const copyProf = { ...chosenProficiency }
        copyProf.id = parseInt(evt.target.value)
        copyProf.name = evt.target[copyProf.id].label
        setChosenProficiency(copyProf)
    }

    return (
        <>
            <fieldset className="dropDown__field">
                <div className="form-group">
                    <label className="label" htmlFor="weaponProficiency">Weapon Proficiency:</label>
                </div>
                <div className="form-group">
                    <select id="weaponProficiency" value={chosenProficiency?.id || "0"} onChange={(evt) => handleChange(evt)}>
                        <option value="0">-- Select --</option>
                        {allProficiencies.map((proficiency) => (
                            <option key={`proficiency--${proficiency.id}`} value={proficiency.id}>
                                {proficiency.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
        </>
    )
}