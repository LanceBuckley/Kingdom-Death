import { useEffect } from "react"
import { getWeaponProficencyForEdit } from "../../ApiManager"
import { useWeaponProficencies } from "./WeaponProficenciesContext"

export const WeaponProficencies = ({ isEditPage, survivor }) => {
    // Here we destructure the values prop from the provider
    const { allProficencies, chosenProficency, setChosenProficency } = useWeaponProficencies()

    useEffect(
        () => {
            if (isEditPage) {
                editProficency()
            }
        },
        [survivor]
    )

    const editProficency = async () => {
        const copy = {...chosenProficency}

        await getWeaponProficencyForEdit(survivor.weaponProfId)
            .then((proficency) => {
                if (proficency) {
                    copy.id = proficency.id
                    copy.name = proficency.name
                }
            })
            setChosenProficency(copy)
    }

    const handleChange = (evt) => {
        const copyProf = { ...chosenProficency }
        copyProf.id = parseInt(evt.target.value)
        copyProf.name = evt.target[copyProf.id].label
        setChosenProficency(copyProf)
    }

    return (
        <>
            <fieldset className="dropDown__field">
                <div className="form-group">
                    <label htmlFor="weaponProficency">Weapon Proficency:</label>
                </div>
                <div className="form-group">
                    <select id="weaponProficency" value={chosenProficency?.id || "0"} onChange={(evt) => handleChange(evt)}>
                        <option value="0">-- Select --</option>
                        {allProficencies.map((proficency) => (
                            <option key={`proficency--${proficency.id}`} value={proficency.id}>
                                {proficency.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
        </>
    )
}