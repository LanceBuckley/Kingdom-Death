import { GMNav } from "./GMNav"
import "./NavBar.css"
import { PlayerNav } from "./PlayerNav"

export const NavBar = () => {

    const localDeathUser = localStorage.getItem("kdm_user")
    const deathUserObject = JSON.parse(localDeathUser)

    if (deathUserObject.gameMaster) {
        // Return game master navbar
        return <GMNav />
    }
    else {
        // Return player navbar
        return <PlayerNav />
    }
}

