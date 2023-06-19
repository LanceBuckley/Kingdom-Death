import { Outlet, Route, Routes } from "react-router-dom"
import { SurvivorForm } from "../survivors/SurvivorForm"
import { PlayerHomeScreen } from "../home/PlayerHomeScreen"

export const PlayerViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <PlayerHomeScreen />
                    <Outlet />
                </>
            }>
            </Route>
            <Route path="survivors" element={<SurvivorForm />} />
            <Route path="survivor/:survivorId" element={<SurvivorForm />} />
        </Routes>
    )
}