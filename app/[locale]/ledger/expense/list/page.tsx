'use client'

import { Button, Grid, GridContainer } from '@trussworks/react-uswds' 
import { useTranslation } from 'react-i18next'
import { useRouter } from "next/navigation"
import ExpenseList from "@/app/components/ExpenseList"
import { selectBenefits } from '@/lib/features/benefits/benefitsSlice'
import { useAppSelector } from "@/lib/hooks"
import VerifyNav from "@/app/components/VerifyNav"
import { isStandardDeductionBetter } from '@/lib/store'

export default function Page() {
    const { t } = useTranslation()
    const router = useRouter()

    const benefits = useAppSelector(state => selectBenefits(state))
    const standardDeductionIsBetter = useAppSelector(state => isStandardDeductionBetter(state))

    function doneClicked() {
        // For Medicaid Only or SNAP+Medicaid Flows
        if (!benefits.standardDeduction && benefits.snap && standardDeductionIsBetter) {
            router.push('/ledger/expense/snap/recommend')
        } else { 
            router.push('/ledger/review')
        }
    }

    return (
        <div>
            <VerifyNav title={t('expenses_summary_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t('expenses_summary_header')}</h3>
                            <span className="usa-hint">{t('expenses_summary_subheader')}</span>
                            <ExpenseList header={t('expenses_summary_list_header')} />
                            <Button type="button" onClick={doneClicked} data-testid="continue_button">{t('expenses_summary_review_button')}</Button>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}