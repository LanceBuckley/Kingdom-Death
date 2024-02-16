import { useKingdomDeath } from "../../context/KingdomDeathContext"
import { GameMasterViews } from "./GameMasterViews"
import { PlayerViews } from "./PlayerViews"

export const ApplicationViews = () => {

    const { isGameMaster } = useKingdomDeath()

    if (isGameMaster) {
        // Return game master views
        return <GameMasterViews />
    }
    else {
        // Return player views
        return <PlayerViews />
    }
}

