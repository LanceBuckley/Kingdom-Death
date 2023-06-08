import { Outlet, Route, Routes } from "react-router-dom"
import { SettlementForm } from "../settlements/SettlementForm"
import { GMHomeScreen } from "../home/GMHomeScreen"

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
            <Route path="settlements" element={<SettlementForm />} />
        </Routes>
    )
}