'use client'

import ErrorSummary from "@/app/components/ErrorSummary"
import RequiredFieldDescription from "@/app/components/RequiredFieldDescription"
import TextFieldWithValidation from "@/app/components/TextFieldWithValidation"
import { JobItem } from "@/lib/features/job/jobSlice"
import { 
  Button, 
  Form, 
  FormGroup, 
  Radio 
} from "@trussworks/react-uswds"
import { SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

export interface FormJobProps {
  onSubmit: SubmitHandler<FormJobData>
  item?: JobItem
}

export type FormJobData = {
  description: string
  business: string
  taxesFiled: boolean
  payments: []
}

export default function FormJob(params: FormJobProps) {
  const { t } = useTranslation()

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm<FormJobData>()

  return (
    <Form onSubmit={handleSubmit(params.onSubmit)}>
      <RequiredFieldDescription />
      <ErrorSummary errors={errors} headingText={t('add_income_error_header')} />

      <FormGroup>
        <TextFieldWithValidation
          id="description"
          {...register("description", {
            required: { 
              value: true, 
              message: t('add_income_description_field_required')}, 
              maxLength: {
                value: 100, 
                message: t('add_income_description_field_length')
              }
            }
          )}
          label={t('add_income_description')}
          hint={t('add_income_description_hint')}
          error={errors.description?.message}
          requiredMarker={true}
          data-testid="description"
          value={params.item?.description}
        />
      </FormGroup>

      <FormGroup>
        <TextFieldWithValidation
          id="business"
          {...register("business")}
          label={t('add_income_business')}
          hint={t('add_income_business_hint')}
          error={errors.business?.message}
          requiredMarker={false}
          data-testid="business"
          value={params.item?.business}
        />
      </FormGroup>

      <FormGroup>
        <legend className="usa-legend text-bold">{t('add_income_taxes')}</legend>
        <Radio
          id="taxesFiledNo"
          name="taxes-filed"
          label={t('add_income_taxes_no')}
          tile
          onChange={() => setValue("taxesFiled", false)}
          {...(params.item?.taxesFiled === false ? {defaultChecked: true} : {})}
        />
        <Radio
          id="taxesFiledYes"
          name="taxes-filed"
          label={t('add_income_taxes_yes')}
          tile
          onChange={() => setValue("taxesFiled", true)}
          {...(params.item?.taxesFiled === true ? {defaultChecked: true} : {})}
        />
      </FormGroup>

      <FormGroup>
          <Button type="submit" name="continue_button" data-testid="continue_button">{t('add_income_button')}</Button>
      </FormGroup>
    </Form>
  )
}