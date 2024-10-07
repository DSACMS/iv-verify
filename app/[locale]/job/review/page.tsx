'use client'
import { Button,  Grid, GridContainer } from '@trussworks/react-uswds' 
import { useTranslation } from 'react-i18next'
import { useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { selectBenefits } from "@/lib/features/benefits/benefitsSlice"
import { selectTotalPaymentsByAllJobs } from "@/lib/features/job/jobSlice"
import Link from "next/link"
import IncomeList from "@/app/components/IncomeList"
import ExpenseList from "@/app/components/ExpenseList"
import JobReviewHeader from "./JobReviewHeader"
import SnapExpenses from "./SnapExpenses"
import VerifyNav from "@/app/components/VerifyNav"

const DAY_COUNT = 30

export default function Page() {
  const { t } = useTranslation()
  const router = useRouter()
  const benefits = useAppSelector(state => selectBenefits(state))
  const incomeTotal = useAppSelector(state => selectTotalPaymentsByAllJobs(state))

  function continueButtonClicked() {
    router.push("/statement/sign")
  }

  return (
    <div>
      <VerifyNav title={t('review_title')} />
      <div className="usa-section">
        <GridContainer>
          <Grid row gap>
            <main className="usa-layout-docs">
              <div className="margin-bottom-5" data-testid="review-header">
                <JobReviewHeader benefits={benefits} snapIncomeTotal={incomeTotal} medicaidIncomeTotal={incomeTotal} />
                <div className="text-center margin-top-3">
                  <Link href="#" className="usa-link">{t("review_download_copy")}</Link>
                </div>
                <div className="text-center margin-top-3">
                  {t("review_legally_sign")}
                </div>
                <IncomeList dayCount={DAY_COUNT} header={t('review_income_header', {days: DAY_COUNT})} />
                <ExpenseList header={t('review_expenses_header', {days: DAY_COUNT})} />
                <SnapExpenses benefits={benefits} snapIncomeTotal={incomeTotal} />

                <Button type="button" data-testid="continue-button" onClick={continueButtonClicked}>{t('review_continue_button')}</Button>
              </div>
            </main>
          </Grid>
        </GridContainer>
      </div>
    </div>
  )
}
