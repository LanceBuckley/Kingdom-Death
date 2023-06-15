import { Outlet, Route, Routes } from "react-router-dom"
import { SettlementForm } from "../settlements/SettlementForm"
import { GMHomeScreen } from "../home/GMHomeScreen"
import { SettlementEdit } from "../settlements/SettlementEdit"

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
            <Route path="settlement/:settlementId" element={<SettlementEdit />} />
        </Routes>
    )
}