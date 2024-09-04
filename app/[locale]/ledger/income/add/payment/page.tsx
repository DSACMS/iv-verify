'use client'
import { Grid, GridContainer } from '@trussworks/react-uswds'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from "@/lib/hooks"
import { addJob, IncomeItem } from "@/lib/features/ledger/income/incomeSlice"
import { useRouter } from "next/navigation"
import VerifyNav from "@/app/components/VerifyNav"
import IncomeFormPayment, { IncomeFormPaymentData } from '@/app/[locale]/ledger/income/IncomeFormPayment'

export default function Page() {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const router = useRouter()

    function addPaymentClicked({name, description, amount}: IncomeFormPaymentData) {

        const incomeItem: IncomeItem = {
            amount,
            date,
            payer,
        }
        dispatch(addPayment(incomeItem))
        router.push('/ledger/income/list')
    }

    return (
        <div>
            <VerifyNav title={t('add_income_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t('add_income_payment_header')}</h3>
                            <IncomeFormPayment onSubmit={addPaymentClicked} />
                         </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}
