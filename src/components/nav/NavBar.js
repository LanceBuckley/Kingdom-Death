import { GMNav } from "./GMNav"
import "./NavBar.css"
import { PlayerNav } from "./PlayerNav"

export const NavBar = () => {

    const gm = localStorage.getItem("is_game_master")

    if (gm) {
        // Return game master navbar
        return <GMNav />
    }
    else {
        // Return player navbar
        return <PlayerNav />
    }
}

