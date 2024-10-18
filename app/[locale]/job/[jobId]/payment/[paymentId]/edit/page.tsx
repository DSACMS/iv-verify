'use client'

import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { Grid, GridContainer } from "@trussworks/react-uswds"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "@/lib/hooks"

import { SetPaymentPayload, selectPaymentItemAt, setPaymentItem } from "@/lib/features/job/payment/paymentSlice"
import { selectJobItemAt } from "@/lib/features/job/jobSlice"

import FormPayment, { FormPaymentData } from '@/app/[locale]/job/FormPayment'
import VerifyNav from "@/app/components/VerifyNav"


export default function EditPayment({ params }: { params: { paymentId: string, jobId: string } }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const payment = useAppSelector(state => selectPaymentItemAt(state, params.paymentId))

  const job = useAppSelector(state => selectJobItemAt(state, params.jobId))
  const jobDescription = job ? job.description : 'your job'

  function editPaymentClicked({job=params.jobId, amount, date, payer}: FormPaymentData) {
    const id = params.paymentId
    const payment: SetPaymentPayload = {
      id,
      item: {
        job,
        amount,
        date,
        payer
      }
    }

    dispatch(setPaymentItem(payment))

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
              <FormPayment onSubmit={editPaymentClicked} item={payment} />
             </main>
          </Grid>
        </GridContainer>
      </div>
    </div>
  )
}