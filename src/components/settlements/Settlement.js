import { SettlementForm } from "./SettlementForm"
import { SettlementFormProvider } from "./SettlementFormContext"

export const Settlement = () => {
    return (
        <>
        <SettlementFormProvider>
            <SettlementForm />
        </SettlementFormProvider>
        </>
    )
}