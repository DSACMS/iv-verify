'use client'

import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { Grid, GridContainer } from "@trussworks/react-uswds"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "@/lib/hooks"

import { selectPaymentItemAt, setPaymentItem } from "@/lib/features/job/payment/paymentSlice"
import FormPayment, { FormPaymentData } from '@/app/[locale]/job/FormPayment'


export default function EditPayment({ params }: { params: { paymentId: string } }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const item = useAppSelector(state => selectPaymentItemAt(state, params.jobId))

  function editPaymentClicked({job=params.jobId, amount, date, payer}: FormPaymentData}) {
    dispatchEvent(setPaymentItem({

    }))
  }

  return (
    <div>
      <VerifyNav title={t('edit_income_title')} />
    </div>
  )