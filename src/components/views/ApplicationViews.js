import { GameMasterViews } from "./GameMasterViews"
import { PlayerViews } from "./PlayerViews"

export const ApplicationViews = () => {

	const localDeathUser = localStorage.getItem("kdm_user")
    const deathUserObject = JSON.parse(localDeathUser)

    if (deathUserObject.gameMaster) {
        // Return game master views
        return <GameMasterViews />
    }
    else {
        // Return player views
        return <PlayerViews />
    }
}

