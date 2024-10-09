'use client'

import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { Grid, GridContainer } from "@trussworks/react-uswds"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "@/lib/hooks"

import { SetExpensePayload, selectExpenseItemAt, setExpenseItem } from "@/lib/features/job/expenses/expensesSlice"
import { selectJobItemAt } from "@/lib/features/job/jobSlice"

import FormExpense, { FormExpenseData } from '@/app/[locale]/job/[jobId]/expense/FormExpense'
import VerifyNav from "@/app/components/VerifyNav"


export default function EditExpense({ params }: { params: { expenseId: string, jobId: string } }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const expense = useAppSelector(state => selectExpenseItemAt(state, params.expenseId))

  const job = useAppSelector(state => selectJobItemAt(state, params.jobId))
  const jobDescription = job ? job.description : 'your job'

  function editExpenseClicked({job=params.jobId, name, expenseType, amount, isMileage=false, date}: FormExpenseData) {
    const id = params.expenseId
    const expense: SetExpensePayload = {
      id,
      item: {
        job,
        name,
        expenseType,
        amount,
        isMileage,
        date,
      }
    }

    dispatch(setExpenseItem(expense))

    router.push(`/job/list`)
  }

  return (
    <div>
      <VerifyNav title={t('edit_income_title')} />
      <div className="usa-section">
        <GridContainer>
          <Grid row gap>
            <main className="usa-layout-docs">
              <h3>{t('add_income_payment_header', {description: jobDescription })}</h3>
              <FormExpense onSubmit={editExpenseClicked} item={expense} />
             </main>
          </Grid>
        </GridContainer>
      </div>
    </div>
  )
}