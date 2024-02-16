import { useEffect } from "react"
import { useFightingArts } from "./FightingArtsContext"
import { useSurvivor } from "../form/SurvivorFormContext"
import { getFightingArtsForEdit } from "../../../managers/fightingArtManager"

export const FightingArts = () => {
    // Here we destructure the values prop from the provider
    const { allFightingArts, chosenFightingArts, setChosenFightingArts } = useFightingArts()
    const { survivor, isEditPage } = useSurvivor()


    useEffect(
        () => {
            if (isEditPage) {
                editFightingArts()
            }
        },
        [survivor]
    )

    const editFightingArts = async () => {
        const copy = [...chosenFightingArts]

        if (chosenFightingArts.length === 0) {
            await getFightingArtsForEdit(survivor.fightingArt1Id)
                .then((fightingArts) => {
                    if (fightingArts) {
                        fightingArts.type = 1
                        copy.push(fightingArts)
                    }
                })

            await getFightingArtsForEdit(survivor.fightingArt2Id)
                .then((fightingArts) => {
                    if (fightingArts) {
                        fightingArts.type = 2
                        copy.push(fightingArts)
                    }
                })

            await getFightingArtsForEdit(survivor.fightingArt3Id)
                .then((fightingArts) => {
                    if (fightingArts) {
                        fightingArts.type = 3
                        copy.push(fightingArts)
                    }
                })

            setChosenFightingArts(copy)
        }

    }

    const handleChange = (evt) => {
        const copyFightingArts = [...chosenFightingArts]
        switch (evt.target.id) {
            case "fightingArt1":
                const chosenFightingArt1 = {
                    id: parseInt(evt.target.value),
                    name: `${evt.target[parseInt(evt.target.value)].label}`,
                    type: 1
                }
                const previousFightingArt1 = copyFightingArts.find((fightingArt) => fightingArt.type === 1)
                if (previousFightingArt1) {
                    previousFightingArt1.id = chosenFightingArt1.id
                    previousFightingArt1.name = chosenFightingArt1.name
                } else {
                    copyFightingArts.push(chosenFightingArt1)
                }
                setChosenFightingArts(copyFightingArts)
                break;
            case "fightingArt2":
                const chosenFightingArt2 = {
                    id: parseInt(evt.target.value),
                    name: `${evt.target[parseInt(evt.target.value)].label}`,
                    type: 2
                }
                const previousFightingArt2 = copyFightingArts.find((fightingArt) => fightingArt.type === 2)
                if (previousFightingArt2) {
                    previousFightingArt2.id = chosenFightingArt2.id
                    previousFightingArt2.name = chosenFightingArt2.name
                } else {
                    copyFightingArts.push(chosenFightingArt2)
                }
                setChosenFightingArts(copyFightingArts)
                break;
            case "fightingArt3":
                const chosenFightingArt3 = {
                    id: parseInt(evt.target.value),
                    name: `${evt.target[parseInt(evt.target.value)].label}`,
                    type: 3
                }
                const previousFightingArt3 = copyFightingArts.find((fightingArt) => fightingArt.type === 3)
                if (previousFightingArt3) {
                    previousFightingArt3.id = chosenFightingArt3.id
                    previousFightingArt3.name = chosenFightingArt3.name
                } else {
                    copyFightingArts.push(chosenFightingArt3)
                }
                setChosenFightingArts(copyFightingArts)
                break;
        }
    }

    return (
        <>
            <fieldset className="dropDown__field">
                <div className="form-group">
                    <label className="label">Fighting Arts:</label>
                </div>
                <div className="form-group">
                    <select id="fightingArt1" value={chosenFightingArts[0]?.id || "0"} onChange={(evt) => handleChange(evt)}>
                        <option value="0">-- Select --</option>
                        {allFightingArts.map((fightingArt) => (
                            <option key={`fightingArt--${fightingArt.id}`} value={fightingArt.id}>
                                {fightingArt.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <select id="fightingArt2" value={chosenFightingArts[1]?.id || "0"} onChange={(evt) => handleChange(evt)}>
                        <option value="0">-- Select --</option>
                        {allFightingArts.map((fightingArt) => (
                            <option key={`fightingArt--${fightingArt.id}`} value={fightingArt.id}>
                                {fightingArt.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <select id="fightingArt3" value={chosenFightingArts[2]?.id || "0"} onChange={(evt) => handleChange(evt)}>
                        <option value="0">-- Select --</option>
                        {allFightingArts.map((fightingArt) => (
                            <option key={`fightingArt--${fightingArt.id}`} value={fightingArt.id}>
                                {fightingArt.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
        </>
    )
}