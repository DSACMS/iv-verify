'use client'

import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { Button, ButtonGroup, Card, CardBody, CardGroup, CardHeader, Grid, GridContainer } from "@trussworks/react-uswds";

import { selectTotalExpensesByAllJobs } from "@/lib/features/job/jobSlice"
import { selectExpensesByJob } from "@/lib/features/job/expenses/expensesSlice";

import ExpenseListItem from "./ExpenseListItem";

interface ExpenseListProps {
  header: string
  jobId: string
}

export default function ExpenseList({header, jobId}: ExpenseListProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const expenses = useAppSelector(state => selectExpensesByJob(state, jobId))
  const expenseTotal = useAppSelector(state => selectTotalExpensesByAllJobs(state))
  const expenseItemElements = []

  for (const expense in expenses.byId) {
    expenseItemElements.push(<ExpenseListItem expenseId={expense} jobId={jobId} expense={expenses.byId[expense]} />)
  }
  

  function addItemClicked() {
    router.push("/job/add")
    }
  
    function addPaymentClicked() {
      router.push(`/job/${jobId}/payment/add`)
    }

  function addExpenseClicked() {
    router.push(`/job/{jobId}/expense/add`)
  }

  function getTotal() {
    return expenseTotal > 0 ?
      (t('expenses_summary_total', { amount: expenseTotal })) :
      (<></>)
  }

  return (
    <Grid col={12}>
      <CardGroup>
        <Card className="grid-col-12 margin-top-4">
          <CardHeader><b>{header}</b></CardHeader>
          <CardBody>
            <GridContainer>
              {expenseItemElements}
            </GridContainer>
            { getTotal() }
            <ButtonGroup>
              <Button type="button" className="margin-top-2" onClick={addPaymentClicked} data-testid="add_another_button">{t('list_income_add_payment_button')}</Button>
              <Button type="button" className="margin-top-2" onClick={addExpenseClicked} data-testid="add_another_button">{t('list_income_add_expense_button')}</Button>
            </ButtonGroup>
          </CardBody>
          <ButtonGroup>
            <Button type="button" className="margin-top-2" onClick={addItemClicked} data-testid="add_another_button">{t('list_income_add_job_button')}</Button>
          </ButtonGroup>

          <hr className="margin-top-2" />
        </Card>
      </CardGroup>
    </Grid>
  )
}