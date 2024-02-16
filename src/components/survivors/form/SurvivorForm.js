import { WeaponProficienciesProvider } from "../weaponProficiencies/WeaponProficienciesContext";
import { WeaponProficiencies } from "../weaponProficiencies/WeaponProficiencies";
import { DisordersProvider } from "../disorders/DisordersContext";
import { Disorders } from "../disorders/Disorders";
import { FightingArtsProvider } from "../fightingArts/FightingArtsContext";
import { FightingArts } from "../fightingArts/FightingArts";
import { SaveSurvivor } from "../SaveSurvivor";
import { AbilitiesProvider } from "../abilities/AbilitiesContext";
import { Abilities } from "../abilities/Abilities";
import "./SurvivorForm.css"
import { Stats } from "../stats/Stats";
import { StatsProvider } from "../stats/StatsContext";
import { HitLocationsProvider } from "../hitLocations/HitLocationsContext";
import { HitLocations } from "../hitLocations/HitLocations";
import WhiteLion from "../../../images/WhiteLion.png"
import { useSurvivor } from "./SurvivorFormContext";
import { deleteSurvivor } from "../../../managers/survivorManager";


export const SurvivorForm = () => {

    const { survivor, update, navigate, isEditPage } = useSurvivor()

    const deleteButton = () => {
        return <button className="button is-small is-danger" onClick={() =>
            deleteSurvivor(survivor)
                .then(navigate("/"))
        }>Delete</button>
    }

    return (
        <>
            <main>
                <form className="survivorForm box">
                    <div className="survivorForm__title-container">
                        {isEditPage
                            ? <h2 className="survivorForm__title is-size-3">Edit Survivor</h2>
                            : <h2 className="survivorForm__title is-size-3">New Survivor</h2>
                        }
                    </div>
                    <fieldset className="field">
                        <div className="form-group">
                            <label className="label" htmlFor="survivorName">Name:</label>
                            <input
                                type="text"
                                id="survivorName"
                                className="input"
                                placeholder="The name of the survivor"
                                value={survivor.name}
                                onChange={(evt) => {
                                    const copy = { ...survivor }
                                    copy.name = evt.target.value
                                    update(copy)
                                }}
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <div>
                                <label className="label" htmlFor="maleGender">
                                    Male
                                    <input
                                        type="checkbox"
                                        id="maleGender"
                                        value="male"
                                        checked={survivor.gender === "male"}
                                        onChange={(evt) => {
                                            const copy = { ...survivor }
                                            copy.gender = evt.target.checked ? "male" : null
                                            update(copy)
                                        }}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="label" htmlFor="femaleGender">
                                    Female
                                    <input
                                        type="checkbox"
                                        id="femaleGender"
                                        value="female"
                                        checked={survivor.gender === "female"}
                                        onChange={(evt) => {
                                            const copy = { ...survivor }
                                            copy.gender = evt.target.checked ? "female" : null
                                            update(copy)
                                        }}
                                    />
                                </label>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label className="label" htmlFor="survivorSurvival">Survival:</label>
                            <input
                                type="number"
                                id="survivorSurvival"
                                className="input"
                                placeholder="0"
                                value={survivor.survival}
                                onChange={(evt) => {
                                    const copy = { ...survivor }
                                    copy.survival = evt.target.value
                                    update(copy)
                                }}
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label className="label" htmlFor="survivorInsanity">Insanity:</label>
                            <input
                                type="number"
                                id="survivorInsanity"
                                className="input"
                                placeholder="0"
                                value={survivor.insanity}
                                onChange={(evt) => {
                                    const copy = { ...survivor }
                                    copy.insanity = evt.target.value
                                    update(copy)
                                }}
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label className="label" htmlFor="survivorHuntXp">HuntXp:</label>
                            <input
                                type="number"
                                id="survivorHuntXp"
                                className="input"
                                placeholder="0"
                                value={survivor.huntXp}
                                onChange={(evt) => {
                                    const copy = { ...survivor }
                                    copy.huntXp = evt.target.value
                                    update(copy)
                                }}
                            />
                        </div>
                    </fieldset>
                    <WeaponProficienciesProvider>
                        <DisordersProvider>
                            <FightingArtsProvider>
                                <AbilitiesProvider>
                                    <StatsProvider>
                                        <HitLocationsProvider>
                                            <div className="stats">
                                                <Stats />
                                            </div>
                                            <div className="hitLocations">
                                                <HitLocations />
                                            </div>
                                            <div className="dropDowns">
                                                <WeaponProficiencies />
                                                <FightingArts />
                                                <Disorders />
                                                <Abilities />
                                            </div>
                                            <div className="saveButton">
                                                <SaveSurvivor />
                                            </div>
                                        </HitLocationsProvider>
                                    </StatsProvider>
                                </AbilitiesProvider>
                            </FightingArtsProvider>
                        </DisordersProvider>
                    </WeaponProficienciesProvider>
                    {isEditPage ? deleteButton() : ""}
                </form>
                <section className="hero">
                    <div className="hero-body">
                        <img src={WhiteLion} alt=""></img>
                    </div>
                </section>
            </main>
        </>
    )
}
