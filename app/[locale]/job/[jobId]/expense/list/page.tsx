'use client'

import { useTranslation } from 'react-i18next'
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/hooks"

import { selectBenefits } from '@/lib/features/benefits/benefitsSlice'
import { selectJobItems } from '@/lib/features/job/jobSlice'
import { isStandardDeductionBetter } from '@/lib/store'

import { Button, Grid, GridContainer } from '@trussworks/react-uswds' 
import ExpenseList from "@/app/components/ExpenseList"
import VerifyNav from "@/app/components/VerifyNav"

export default function Page() {
  const { t } = useTranslation()
  const router = useRouter()
  const jobs = useAppSelector(state => selectJobItems(state))
  const expenseList = []

  for (const job in jobs) {
    expenseList.push(<ExpenseList header={t('expenses_summary_list_header')} jobId={job} />)
  }

  const benefits = useAppSelector(state => selectBenefits(state))
  const standardDeductionIsBetter = useAppSelector(state => isStandardDeductionBetter(state))

  function doneClicked() {
    // For Medicaid Only or SNAP+Medicaid Flows
    if (!benefits.standardDeduction && benefits.snap && standardDeductionIsBetter) {
      router.push('/job/expense/snap/recommend')
    } else { 
      router.push('/job/review')
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
              {expenseList}
              <Button type="button" onClick={doneClicked} data-testid="continue_button">{t('expenses_summary_review_button')}</Button>
            </main>
          </Grid>
        </GridContainer>
      </div>
    </div>
  )
}