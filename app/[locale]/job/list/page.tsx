'use client'

import { Button, Grid, GridContainer } from '@trussworks/react-uswds' 
import { useTranslation } from 'react-i18next'
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/lib/hooks"
import IncomeList from "@/app/components/IncomeList"
import VerifyNav from "@/app/components/VerifyNav"
import { recommendStandardDeduction } from "@/lib/store"

const DAY_COUNT = 30

export default function Page() {
  const { t } = useTranslation()
  const router = useRouter()
  
  const routeToStandardDeductionElection = useAppSelector(state => recommendStandardDeduction(state))

  function doneClicked() {
    if (routeToStandardDeductionElection) {
      router.push("/job/expense/snap") // TODO move snap out
    } else {
      router.push(`/job/review`)
    }
  }

  return (
    <div>
      <VerifyNav title={t('list_income_title')} />
      <div className="usa-section">
        <GridContainer>
          <Grid row gap>
            <main className="usa-layout-docs">
              <h3>{t('list_income_header', {day_count: DAY_COUNT})}</h3>
              <span className="usa-hint">{t('list_income_subheader')}</span>
              <IncomeList dayCount={DAY_COUNT} header={t('list_income_list_header')} />
              <Button type="button" onClick={doneClicked} data-testid="done_button">{t('list_income_done_button')}</Button>
            </main>
          </Grid>
        </GridContainer>
      </div>
    </div>
  )
}
