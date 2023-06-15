import { createSurvivor } from "../ApiManager"
import { useAbilities } from "./abilities/AbilitiesContext"
import { useDisorders } from "./disorders/DisordersContext"
import { useFightingArts } from "./fightingArts/FightingArtsContext"
import { useWeaponProficencies } from "./weaponProficency/WeaponProficenciesContext"

export const SaveSurvivor = ({survivor}) => {
    const { chosenProficency } = useWeaponProficencies()
    const { chosenFightingArts} = useFightingArts()
    const { chosenDisorders } = useDisorders()
    const { chosenAbilities } = useAbilities()

    const handleSaveButtonClick = () => {
        debugger
        survivor.weaponProfId = chosenProficency.id
        survivor.fightingArt1Id = chosenFightingArts[0].id
        survivor.fightingArt2Id = chosenFightingArts[1].id
        survivor.fightingArt3Id = chosenFightingArts[2].id
        survivor.disorder1Id = chosenDisorders[0].id
        survivor.disorder2Id = chosenDisorders[1].id
        survivor.disorder3Id = chosenDisorders[2].id
        survivor.ability1Id = chosenAbilities[0].id
        survivor.ability2Id = chosenAbilities[1].id
        survivor.ability3Id = chosenAbilities[2].id
        createSurvivor(survivor)
    }
    
    return <button
    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
    className="btn btn-primary">
    Submit Survivor
    </button>
    }
    