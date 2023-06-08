import { Outlet, Route, Routes } from "react-router-dom"

export const PlayerViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>
                <Route path="locations" element={<></>} />
            </Route>
        </Routes>
    )
}