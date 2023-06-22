import { Outlet, Route, Routes } from "react-router-dom"
import { PlayerHomeScreen } from "../home/PlayerHomeScreen"
import { Survivor } from "../survivors/Survivor"

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
            <Route path="survivors" element={<Survivor />} />
            <Route path="survivor/:survivorId" element={<Survivor />} />
        </Routes>
    )
}