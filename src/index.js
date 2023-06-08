import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { KingdomDeath } from "./components/KingdomDeath"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <KingdomDeath />
    </BrowserRouter>
)

