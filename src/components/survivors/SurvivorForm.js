import { useState } from "react";
import { WeaponProficenciesProvider } from "./weaponProficency/WeaponProficenciesContext";
import { WeaponProficencies } from "./weaponProficency/WeaponProficencies";
import { DisordersProvider } from "./disorders/DisordersContext";
import { Disorders } from "./disorders/Disorders";
import { FightingArtsProvider } from "./fightingArts/FightingArtsContext";
import { FightingArts } from "./fightingArts/FightingArts";
import { SaveSurvivor } from "./SaveSurvivor";
import { AbilitiesProvider } from "./abilities/AbilitiesContext";
import { Abilities } from "./abilities/Abilities";
import "./SurvivorForm.css"

export const SurvivorForm = () => {
    const localDeathUser = localStorage.getItem("kdm_user")
    const deathUserObject = JSON.parse(localDeathUser)

    const [survivor, update] = useState({
        userId: deathUserObject.id,
        name: "",
        survival: 0,
        insanity: 0,
        huntXp: 0,
        gender: null,
    })

    return (
        <>
            <form className="survivorForm">
                <div className="survivorForm__title-container">
                <h2 className="survivorForm__title">New survivor</h2>
                </div>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="survivorName">Name:</label>
                        <input
                            type="text"
                            id="survivorName"
                            className="form-control"
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
                            <label htmlFor="maleGender">
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
                            <label htmlFor="femaleGender">
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
                        <label htmlFor="survivorSurvival">Survival:</label>
                        <input
                            type="number"
                            id="survivorSurvival"
                            className="form-control"
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
                        <label htmlFor="survivorInsanity">Insanity:</label>
                        <input
                            type="number"
                            id="survivorInsanity"
                            className="form-control"
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
                        <label htmlFor="survivorHuntXp">HuntXp:</label>
                        <input
                            type="number"
                            id="survivorHuntXp"
                            className="form-control"
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
                <div className="dropDowns">
                    <WeaponProficenciesProvider>
                        <DisordersProvider>
                            <FightingArtsProvider>
                                <AbilitiesProvider>
                                    <WeaponProficencies />
                                    <FightingArts />
                                    <Disorders />
                                    <Abilities />
                                    <div className="saveButton">
                                    <SaveSurvivor survivor={survivor} />
                                    </div>
                                </AbilitiesProvider>
                            </FightingArtsProvider>
                        </DisordersProvider>
                    </WeaponProficenciesProvider>
                </div>
            </form>
        </>
    )
}
