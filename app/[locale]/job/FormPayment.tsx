'use client'

import { Button, DatePicker, Form, FormGroup, Label, RequiredMarker } from "@trussworks/react-uswds"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { PaymentItem } from "@/lib/features/job/payment/paymentSlice"

import ErrorSummary from "@/app/components/ErrorSummary"
import RequiredFieldDescription from "@/app/components/RequiredFieldDescription"
import TextFieldWithValidation from "@/app/components/TextFieldWithValidation"

export interface FormPaymentProps {
  onSubmit: SubmitHandler<FormPaymentData>
  item?: PaymentItem
}

export type FormPaymentData = {
  job: string
  amount: number
  date: string
  payer: string
}

export default function FormPayment(params: FormPaymentProps) {
  const { t } = useTranslation()

  let formatDate = () => {
    let formattedDate: string = '';
    if (params.item?.date) {
      const paymentDate = new Date(params.item?.date)

      const addLeadingZero = (d: number) => d.toString().length === 1 ? 
      `0${d}` : d

      formattedDate = `${paymentDate.getFullYear()}-${addLeadingZero(paymentDate.getMonth())}-${addLeadingZero(paymentDate.getDate())}`
    }

    return formattedDate
  }
  const formattedDate = formatDate()

  const {
    register,
    getValues,
    control,
    formState: { errors },
    handleSubmit
  } = useForm<FormPaymentData>({
    defaultValues: { 
      amount: params.item?.amount,
      date: formattedDate,
      payer: params.item?.payer
    }
  })

  return (
    <Form onSubmit={handleSubmit(params.onSubmit)}>
      <RequiredFieldDescription />
      <ErrorSummary errors={errors} headingText={t('add_income_error_header')} />

      <FormGroup>
        <TextFieldWithValidation
          id="amount"
          {...register("amount", { valueAsNumber:true, validate: (value) => value > 0, required: { value: true, message: t('add_income_payment_amount_field_required')}})}
          label={t('add_income_payment_amount')}
          error={errors.amount?.message}
          requiredMarker={true}
          data-testid="amount"
          value={params.item?.amount?.toString()}
        />
      </FormGroup>

      <FormGroup>
        <Controller
          name="date"
          control={control}
          rules={{ required: {value:true, message: t('add_income_required_field')} }}
          render={({ 
            field: { onChange, name },
          }) => (
            <>
              <Label htmlFor="date" className="text-bold">{t('add_income_payment_date')}<RequiredMarker /></Label>
              <DatePicker
                id="date"
                name={name}
                defaultValue={formattedDate}
                onChange={onChange}
                {...(errors.date?.message !== undefined ? {validationStatus: 'error'} : {})}
              />
            </>
            )
          }
          />
      </FormGroup>

      <FormGroup>
        <TextFieldWithValidation
          id="payer"
          {...register("payer", {required: {value: true, message: t('add_income_payment_payer_required')}, maxLength: { value: 100, message: t('add_income_payment_payer_length')}})}
          label={t('add_income_payment_payer')}
          error={errors.payer?.message}
          requiredMarker={true}
          data-testid="payer"
          value={params.item?.payer}
        />
      </FormGroup>
      <FormGroup>
        <Button type="submit" name="continue_button" data-testid="continue_button" onClick={() => {
        console.log(getValues())
    }}>{t('add_income_button_done')}</Button>
      </FormGroup>

      {/* <DevTool control={control} />  */}
    </Form>
  )
}