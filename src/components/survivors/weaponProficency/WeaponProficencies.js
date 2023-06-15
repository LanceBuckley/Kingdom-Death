import { useWeaponProficencies } from "./WeaponProficenciesContext"

export const WeaponProficencies = () => {
    // Here we destructure the values prop from the provider
    const { allProficencies, chosenProficency, setChosenProficency } = useWeaponProficencies()

    const handleChange = (evt) => {
        const copyProf = { ...chosenProficency }
        copyProf.id = parseInt(evt.target.value)
        copyProf.name = evt.target[copyProf.id].label
        setChosenProficency(copyProf)
    }

    return (
        <>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="weaponProficency">Weapon Proficency:</label>
                </div>
                <div className="form-group">
                    <select id="weaponProficency" onChange={(evt) => handleChange(evt)}>
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