import { useFightingArts } from "./FightingArtsContext"

export const FightingArts = () => {
    // Here we destructure the values prop from the provider
    const { allFightingArts, chosenFightingArts, setChosenFightingArts } = useFightingArts()

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
            <fieldset>
                <div className="form-group">
                    <label>Fighting Arts:</label>
                </div>
                <div className="form-group">
                    <select id="fightingArt1" onChange={(evt) => handleChange(evt)}>
                        <option value="0">-- Select --</option>
                        {allFightingArts.map((fightingArt) => (
                            <option key={`fightingArt--${fightingArt.id}`} value={fightingArt.id}>
                                {fightingArt.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <select id="fightingArt2" onChange={(evt) => handleChange(evt)}>
                        <option value="0">-- Select --</option>
                        {allFightingArts.map((fightingArt) => (
                            <option key={`fightingArt--${fightingArt.id}`} value={fightingArt.id}>
                                {fightingArt.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <select id="fightingArt3" onChange={(evt) => handleChange(evt)}>
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