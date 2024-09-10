'use client'
import { Grid, GridContainer } from '@trussworks/react-uswds'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addJob, JobItem, selectIncomeItems } from "@/lib/features/ledger/income/incomeSlice"
import { useRouter } from "next/navigation"
import VerifyNav from "@/app/components/VerifyNav"
import IncomeFormJob, { IncomeFormJobData } from '@/app/[locale]/ledger/income/IncomeFormJob'

export default function Page() {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const items = useAppSelector(state => selectIncomeItems(state))
    const jobCount = items.length

    function addIncomeClicked({description, business, taxesFiled, payments=[]}: IncomeFormJobData) {

        const jobItem: JobItem = {
            description,
            business,
            taxesFiled,
            payments
        }
        // can i add a response?
        dispatch(addJob(jobItem))
        router.push(`/ledger/income/${jobCount}/payment/add`)
    }

    return (
        <div>
            <VerifyNav title={t('add_income_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t(
                                'add_income_header', 
                                {'nth': jobCount === 0 ? 'first': 'next'}
                            )}</h3>
                            <IncomeFormJob onSubmit={addIncomeClicked} />
                         </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}
