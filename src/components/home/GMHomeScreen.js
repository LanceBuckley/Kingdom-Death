import { useEffect, useState } from "react"
import { getSettlements } from "../ApiManager"

export const GMHomeScreen = () => {
    const [settlements, setSettlements] = useState([])

    useEffect(
        () => {
            getSettlements()
                .then((settlements) => {
                    setSettlements(settlements)
                })
        },
        []
    )

    return <>
        <ul className="settlement__list">My Settlements
            {
                settlements.map((settlement) => (
                    <li className="settlement__item" key={`settlement-${settlement.id}`}>
                        {settlement.name}
                    </li>
                ))

            }
        </ul>
    </>
}