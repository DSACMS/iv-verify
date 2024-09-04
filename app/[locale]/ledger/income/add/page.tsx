'use client'
import { Grid, GridContainer } from '@trussworks/react-uswds'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from "@/lib/hooks"
import { addJob, JobItem } from "@/lib/features/ledger/income/incomeSlice"
import { useRouter } from "next/navigation"
import VerifyNav from "@/app/components/VerifyNav"
import IncomeFormJob, { IncomeFormJobData } from '@/app/[locale]/ledger/income/IncomeFormJob'

export default function Page() {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const router = useRouter()

    function addIncomeClicked({description, business, amount, taxesFiled}: IncomeFormJobData) {

        const jobItem: JobItem = {
            description,
            business,
            amount,
            taxesFiled,
        }
        dispatch(addJob(jobItem))
        router.push('/ledger/income/add/payment')
    }

    return (
        <div>
            <VerifyNav title={t('add_income_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t('add_income_header')}</h3>
                            <IncomeFormJob onSubmit={addIncomeClicked} />
                         </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}
