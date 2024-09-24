'use client'
import { Grid, GridContainer } from '@trussworks/react-uswds'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addPayment, PaymentItem, selectIncomeItemAt } from "@/lib/features/job/jobSlice"
import { useRouter } from "next/navigation"
import VerifyNav from "@/app/components/VerifyNav"
import IncomeFormPayment, { IncomeFormPaymentData } from '@/app/[locale]/job/IncomeFormPayment'

export default function Page({ params }: { params: { idx: number } }) {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const item = useAppSelector(state => selectIncomeItemAt(state, params.idx))
    const jobDescription = item ? item.description: 'yourJob"'

    function addPaymentClicked({amount, date, payer}: IncomeFormPaymentData) {
        const idx =  params.idx

        const paymentItem: PaymentItem = {
            idx,
            amount,
            date,
            payer,
        }
        dispatch(addPayment(paymentItem))
        router.push('/job/list')
    }

    return (
        <div>
            <VerifyNav title={t('add_income_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t('add_income_payment_header', {description: jobDescription })}</h3>
                            <IncomeFormPayment onSubmit={addPaymentClicked} />
                         </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}
