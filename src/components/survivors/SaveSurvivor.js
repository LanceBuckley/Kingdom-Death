import { createHitLocations, createStats, createSurvivor, editHitLocations, editStats, editSurvivor } from "../ApiManager"
import { useAbilities } from "./abilities/AbilitiesContext"
import { useDisorders } from "./disorders/DisordersContext"
import { useFightingArts } from "./fightingArts/FightingArtsContext"
import { useHitLocations } from "./hitLocations/HitLocationsContext"
import { useStats } from "./stats/StatsContext"
import { useWeaponProficencies } from "./weaponProficency/WeaponProficenciesContext"

export const SaveSurvivor = ({ isEditPage, survivor }) => {
    const { chosenProficency } = useWeaponProficencies()
    const { chosenFightingArts } = useFightingArts()
    const { chosenDisorders } = useDisorders()
    const { chosenAbilities } = useAbilities()
    const { stats } = useStats()
    const { hitLocations } = useHitLocations()

    const handleSaveButtonClick = async () => {
        debugger
        if (isEditPage) {
            editStats(stats)
            editHitLocations(hitLocations)
            
            survivor.weaponProfId = chosenProficency.id;
            
            survivor.fightingArt1Id = chosenFightingArts.length >= 1 ? chosenFightingArts[0].id : null;
            survivor.fightingArt2Id = chosenFightingArts.length >= 2 ? chosenFightingArts[1].id : null;
            survivor.fightingArt3Id = chosenFightingArts.length >= 3 ? chosenFightingArts[2].id : null;
            
            survivor.disorder1Id = chosenDisorders.length >= 1 ? chosenDisorders[0].id : null;
            survivor.disorder2Id = chosenDisorders.length >= 2 ? chosenDisorders[1].id : null;
            survivor.disorder3Id = chosenDisorders.length >= 3 ? chosenDisorders[2].id : null;
            
            survivor.ability1Id = chosenAbilities.length >= 1 ? chosenAbilities[0].id : null;
            survivor.ability2Id = chosenAbilities.length >= 2 ? chosenAbilities[1].id : null;
            survivor.ability3Id = chosenAbilities.length >= 3 ? chosenAbilities[2].id : null;
            
            editSurvivor(survivor)
        } else {
            const createdStats = await createStats(stats);
            survivor.statsId = createdStats.id;

            const createdHitLocations = await createHitLocations(hitLocations)
            survivor.hitLocationId = createdHitLocations.id

            survivor.weaponProfId = chosenProficency.id;

            survivor.fightingArt1Id = chosenFightingArts.length >= 1 ? chosenFightingArts[0].id : null;
            survivor.fightingArt2Id = chosenFightingArts.length >= 2 ? chosenFightingArts[1].id : null;
            survivor.fightingArt3Id = chosenFightingArts.length >= 3 ? chosenFightingArts[2].id : null;

            survivor.disorder1Id = chosenDisorders.length >= 1 ? chosenDisorders[0].id : null;
            survivor.disorder2Id = chosenDisorders.length >= 2 ? chosenDisorders[1].id : null;
            survivor.disorder3Id = chosenDisorders.length >= 3 ? chosenDisorders[2].id : null;

            survivor.ability1Id = chosenAbilities.length >= 1 ? chosenAbilities[0].id : null;
            survivor.ability2Id = chosenAbilities.length >= 2 ? chosenAbilities[1].id : null;
            survivor.ability3Id = chosenAbilities.length >= 3 ? chosenAbilities[2].id : null;

            createSurvivor(survivor);
        }
    }


    return <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary">
        Submit Survivor
    </button>
}
