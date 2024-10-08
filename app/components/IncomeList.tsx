'use client'

import { useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { Button, ButtonGroup, Card, CardBody, CardGroup, CardHeader, Grid, GridContainer } from "@trussworks/react-uswds"
import { useTranslation } from "react-i18next"

import { JobItem, selectTotalPaymentsByAllJobs } from "@/lib/features/job/jobSlice"

import IncomeListItem from "./IncomeListItem"
import { selectPaymentsByJob } from "@/lib/features/job/payment/paymentSlice"

interface Props {
    dayCount: number
    job: JobItem
    jobId: string
}

export default function IncomeList({dayCount, job, jobId}: Props) {
    const { t } = useTranslation()
    const router = useRouter()
    const payments = useAppSelector(state => selectPaymentsByJob(state, jobId))
    const incomeTotal = useAppSelector(state => selectTotalPaymentsByAllJobs(state))
    const incomeItemElements = []
    
    for (const payment in payments) {
        incomeItemElements.push(<IncomeListItem index={payment} payment={payments[payment]} jobId={jobId} />)
    }

    return <></>
  }

  function addItemClicked() {
    router.push("/job/add")
  }

    function addPaymentClicked() {
        router.push(`/job/${jobId}/payment/add`)
    }

    function addExpenseClicked() {
        router.push(`/job/${jobId}/expense/add`)
    }

    return (
        <Grid col={12}>
            <CardGroup>
                <Card className="grid-col-12 margin-top-4">
                    <CardHeader>{job.description}</CardHeader>
                    <CardBody>
                        <GridContainer>
                            {incomeItemElements}
                        </GridContainer>
                        {getTotal()}
                        <ButtonGroup>
                            <Button type="button" className="margin-top-2" onClick={addPaymentClicked} data-testid="add_another_button">{t('list_income_add_payment_button')}</Button>
                            <Button type="button" className="margin-top-2" onClick={addExpenseClicked} data-testid="add_another_button">{t('list_income_add_expense_button')}</Button>
                        </ButtonGroup>
                    </CardBody>
                </Card>
            </CardGroup>
            <ButtonGroup>
                <Button type="button" className="margin-top-2" onClick={addItemClicked} data-testid="add_another_button">{t('list_income_add_job_button')}</Button>
            </ButtonGroup>

            <hr className="margin-top-2" />
        </Grid>
    )
}