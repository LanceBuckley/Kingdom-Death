import { useDisorders } from "./DisordersContext"

export const Disorders = () => {
    const { allDisorders, chosenDisorders, setChosenDisorders } = useDisorders()

    const handleChange = (evt) => {
        const copyDisorders = [...chosenDisorders]
        switch (evt.target.id) {
            case "disorders1":
                const chosenDisorder1 = {
                    id: parseInt(evt.target.value),
                    name: `${evt.target[parseInt(evt.target.value)].label}`,
                    type: 1
                }
                const previousDisorder1 = copyDisorders.find((disorder) => disorder.type === 1)
                if (previousDisorder1) {
                    previousDisorder1.id = chosenDisorder1.id
                    previousDisorder1.name = chosenDisorder1.name
                } else {
                    copyDisorders.push(chosenDisorder1)
                }
                setChosenDisorders(copyDisorders)
                break;
            case "disorders2":
                const chosenDisorder2 = {
                    id: parseInt(evt.target.value),
                    name: `${evt.target[parseInt(evt.target.value)].label}`,
                    type: 2
                }
                const previousDisorder2 = copyDisorders.find((disorder) => disorder.type === 2)
                if (previousDisorder2) {
                    previousDisorder2.id = chosenDisorder2.id
                    previousDisorder2.name = chosenDisorder2.name
                } else {
                    copyDisorders.push(chosenDisorder2)
                }
                setChosenDisorders(copyDisorders)
                break;
            case "disorders3":
                const chosenDisorder3 = {
                    id: parseInt(evt.target.value),
                    name: `${evt.target[parseInt(evt.target.value)].label}`,
                    type: 3
                }
                const previousDisorder3 = copyDisorders.find((disorder) => disorder.type === 3)
                if (previousDisorder3) {
                    previousDisorder3.id = chosenDisorder3.id
                    previousDisorder3.name = chosenDisorder3.name
                } else {
                    copyDisorders.push(chosenDisorder3)
                }
                setChosenDisorders(copyDisorders)
                break;
        }
    }

    return (
        <>
            <fieldset>
                <div className="form-group">
                    <label>Disorders</label>
                </div>
                <div className="form-group">
                    <select id="disorders1" onChange={(evt) => handleChange(evt)}>
                        <option value="0">-- Select --</option>
                        {allDisorders.map((disorder) => (
                            <option key={`disorder--${disorder.id}`} value={disorder.id}>
                                {disorder.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <select id="disorders2" onChange={(evt) => handleChange(evt)}>
                        <option value="0">-- Select --</option>
                        {allDisorders.map((disorder) => (
                            <option key={`disorder--${disorder.id}`} value={disorder.id}>
                                {disorder.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <select id="disorders3" onChange={(evt) => handleChange(evt)}>
                        <option value="0">-- Select --</option>
                        {allDisorders.map((disorder) => (
                            <option key={`disorder--${disorder.id}`} value={disorder.id}>
                                {disorder.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
        </>
    )
}