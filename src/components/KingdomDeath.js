import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./KingdomDeath.css"
import { LoginProvider } from "../context/LoginContext"
import { RegisterProvider } from "../context/RegisterContext"
import { KingdomDeathProvider } from "../context/KingdomDeathContext"


export const KingdomDeath = () => {
	return (
		<KingdomDeathProvider>
			<LoginProvider>
				<RegisterProvider>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />

						<Route path="*" element={
							<Authorized>
								<>
									<NavBar />
									<ApplicationViews />
								</>
							</Authorized>

						} />
					</Routes>
				</RegisterProvider>
			</LoginProvider>
		</KingdomDeathProvider>)
}

