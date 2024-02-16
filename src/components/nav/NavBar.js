import { GMNav } from "./GMNav"
import "./NavBar.css"
import { PlayerNav } from "./PlayerNav"

export const NavBar = () => {

    const gm = localStorage.getItem("is_game_master")
    const gmObject = JSON.parse(gm)

    if (gmObject.gameMaster) {
        // Return game master navbar
        return <GMNav />
    }
    else {
        // Return player navbar
        return <PlayerNav />
    }
}

