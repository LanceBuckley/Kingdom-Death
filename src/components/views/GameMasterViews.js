import { Outlet, Route, Routes } from "react-router-dom"
import { SettlementForm } from "../settlements/SettlementForm"

export const GameMasterViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>
                <Route path="settlements" element={<SettlementForm />} />
            </Route>
        </Routes>
    )
}