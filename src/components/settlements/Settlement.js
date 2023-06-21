import { SettlementForm } from "./form/SettlementForm"
import { SettlementFormProvider } from "./form/SettlementFormContext"

export const Settlement = () => {
    return (
        <>
        <SettlementFormProvider>
            <SettlementForm />
        </SettlementFormProvider>
        </>
    )
}