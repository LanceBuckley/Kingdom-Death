import { Outlet, Route, Routes } from "react-router-dom"
import { GMHomeScreen } from "../home/GMHomeScreen"
import { Settlement } from "../settlements/Settlement"

export const GameMasterViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <GMHomeScreen />
                    <Outlet />
                </>
            }>
            </Route>
            <Route path="settlements" element={<Settlement />} />
            <Route path="settlement/:settlementId" element={<Settlement />} />
        </Routes>
    )
}