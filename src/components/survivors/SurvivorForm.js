import { useEffect, useState } from "react";
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
import { Stats } from "./stats/Stats";
import { StatsProvider } from "./stats/StatsContext";
import { HitLocationsProvider } from "./hitLocations/HitLocationsContext";
import { HitLocations } from "./hitLocations/HitLocations";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteSurvivor, getSurvivorToEdit } from "../ApiManager";
import WhiteLion from "/home/erchancy/workspace/kingdom-death/src/images/WhiteLion.png"


export const SurvivorForm = () => {
    const localDeathUser = localStorage.getItem("kdm_user")
    const deathUserObject = JSON.parse(localDeathUser)

    const location = useLocation()
    const { survivorId } = useParams()
    const navigate = useNavigate()

    const isEditPage = location.pathname === `/survivor/${survivorId}`

    const [survivor, update] = useState({
        userId: deathUserObject.id,
        name: "",
        survival: 0,
        insanity: 0,
        huntXp: 0,
        gender: null,
    })

    useEffect(
        () => {
            if (isEditPage) {
                getSurvivorToEdit(survivorId)
                    .then((survivorToEdit) => {
                        update(survivorToEdit)
                    })
            }
        },
        []
    )

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
                    <WeaponProficenciesProvider>
                        <DisordersProvider>
                            <FightingArtsProvider>
                                <AbilitiesProvider>
                                    <StatsProvider>
                                        <HitLocationsProvider>
                                            <div className="stats">
                                                <Stats isEditPage={isEditPage} survivor={survivor} />
                                            </div>
                                            <div className="hitLocations">
                                                <HitLocations isEditPage={isEditPage} survivor={survivor} />
                                            </div>
                                            <div className="dropDowns">
                                                <WeaponProficencies isEditPage={isEditPage} survivor={survivor} />
                                                <FightingArts isEditPage={isEditPage} survivor={survivor} />
                                                <Disorders isEditPage={isEditPage} survivor={survivor} />
                                                <Abilities isEditPage={isEditPage} survivor={survivor} />
                                            </div>
                                            <div className="saveButton">
                                                <SaveSurvivor isEditPage={isEditPage} survivor={survivor} />
                                            </div>
                                        </HitLocationsProvider>
                                    </StatsProvider>
                                </AbilitiesProvider>
                            </FightingArtsProvider>
                        </DisordersProvider>
                    </WeaponProficenciesProvider>
                    {isEditPage ? deleteButton() : ""}
                </form>
                <section className="hero">
                    <div className="hero-body">
                        <img src={WhiteLion}></img>
                    </div>
                </section>
            </main>
        </>
    )
}
