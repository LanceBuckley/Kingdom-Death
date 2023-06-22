import { useEffect } from "react"
import { useAbilities } from "./AbilitiesContext"
import { getAbilityForEdit } from "../../ApiManager"
import { useSurvivor } from "../form/SurvivorFormContext"

export const Abilities = () => {
    // Here we destructure the values prop from the provider
    const { allAbilities, chosenAbilities, setChosenAbilities } = useAbilities()
    const { survivor, isEditPage } = useSurvivor()


    useEffect(
        () => {
            if (isEditPage) {
                editAbilities()
            }
        },
        [survivor]
    )

    const editAbilities = async () => {
        const copy = [...chosenAbilities]

        if (chosenAbilities.length === 0) {
            await getAbilityForEdit(survivor.ability1Id)
                .then((ability) => {
                    if (ability) {
                        ability.type = 1
                        copy.push(ability)
                    }
                })

            await getAbilityForEdit(survivor.ability2Id)
                .then((ability) => {
                    if (ability) {
                        ability.type = 2
                        copy.push(ability)
                    }
                })

            await getAbilityForEdit(survivor.ability3Id)
                .then((ability) => {
                    if (ability) {
                        ability.type = 3
                        copy.push(ability)
                    }
                })

            setChosenAbilities(copy)
        }

    }

    const handleChange = (evt) => {
        const copyAbilities = [...chosenAbilities]
        switch (evt.target.id) {
            case "ability1":
                const chosenAbility1 = {
                    id: parseInt(evt.target.value),
                    name: `${evt.target[parseInt(evt.target.value)].label}`,
                    type: 1
                }
                const previousAbility1 = copyAbilities.find((ability) => ability.type === 1)
                if (previousAbility1) {
                    previousAbility1.id = chosenAbility1.id
                    previousAbility1.name = chosenAbility1.name
                } else {
                    copyAbilities.push(chosenAbility1)
                }
                setChosenAbilities(copyAbilities)
                break;
            case "ability2":
                const chosenAbility2 = {
                    id: parseInt(evt.target.value),
                    name: `${evt.target[parseInt(evt.target.value)].label}`,
                    type: 2
                }
                const previousAbility2 = copyAbilities.find((ability) => ability.type === 2)
                if (previousAbility2) {
                    previousAbility2.id = chosenAbility2.id
                    previousAbility2.name = chosenAbility2.name
                } else {
                    copyAbilities.push(chosenAbility2)
                }
                setChosenAbilities(copyAbilities)
                break;
            case "ability3":
                const chosenAbility3 = {
                    id: parseInt(evt.target.value),
                    name: `${evt.target[parseInt(evt.target.value)].label}`,
                    type: 3
                }
                const previousAbility3 = copyAbilities.find((ability) => ability.type === 3)
                if (previousAbility3) {
                    previousAbility3.id = chosenAbility3.id
                    previousAbility3.name = chosenAbility3.name
                } else {
                    copyAbilities.push(chosenAbility3)
                }
                setChosenAbilities(copyAbilities)
                break;
        }
    }

    return (
        <>
            <fieldset className="dropDown__field">
                <div className="form-group">
                    <label className="label">Abilities:</label>
                </div>
                <div className="form-group">
                    <select id="ability1" value={chosenAbilities[0]?.id || "0"} onChange={(evt) => handleChange(evt)}>
                        <option value="0">-- Select --</option>
                        {allAbilities.map((abilities) => (
                            <option key={`abilities--${abilities.id}`} value={abilities.id}>
                                {abilities.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <select id="ability2" value={chosenAbilities[1]?.id || "0"} onChange={(evt) => handleChange(evt)}>
                        <option value="0">-- Select --</option>
                        {allAbilities.map((abilities) => (
                            <option key={`abilities--${abilities.id}`} value={abilities.id}>
                                {abilities.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <select id="ability3" value={chosenAbilities[2]?.id || "0"} onChange={(evt) => handleChange(evt)}>
                        <option value="0">-- Select --</option>
                        {allAbilities.map((abilities) => (
                            <option key={`abilities--${abilities.id}`} value={abilities.id}>
                                {abilities.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
        </>
    )
}