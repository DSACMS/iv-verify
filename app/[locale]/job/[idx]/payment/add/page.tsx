'use client'

import { Grid, GridContainer } from '@trussworks/react-uswds'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { selectJobItemAt } from "@/lib/features/job/jobSlice"
import { addPayment, SetPaymentPayload } from '@/lib/features/job/payment/paymentSlice'
import { useRouter } from "next/navigation"
import VerifyNav from "@/app/components/VerifyNav"
import IncomeFormPayment, { IncomeFormPaymentData } from '@/app/[locale]/job/IncomeFormPayment'
import { createUuid } from '@/lib/store'

export default function Page({ params }: { params: { jobId: string } }) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const job = useAppSelector(state => selectJobItemAt(state, params.jobId))
  const jobDescription = job ? job.description : 'your job'

  function addPaymentClicked({job=params.jobId, amount, date, payer}: FormPaymentData) {
    const id = createUuid()

    const paymentItem: SetPaymentPayload = {
      id, 
      item: {
        job,
        amount,
        date,
        payer
      }
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
              <FormPayment onSubmit={addPaymentClicked} />
             </main>
          </Grid>
        </GridContainer>
      </div>
    </div>
  )
}
