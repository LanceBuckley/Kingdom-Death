import { SurvivorForm } from "./form/SurvivorForm"
import { SurvivorFormProvider } from "./form/SurvivorFormContext"

export const Survivor = () => {
    return (
        <>
        <SurvivorFormProvider>
            <SurvivorForm />
        </SurvivorFormProvider>
        </>
    )
}