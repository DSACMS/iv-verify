'use client'

import ErrorSummary from "@/app/components/ErrorSummary"
import RequiredFieldDescription from "@/app/components/RequiredFieldDescription"
import TextFieldWithValidation from "@/app/components/TextFieldWithValidation"
import { ExpenseItem } from "@/lib/features/job/expenses/expensesSlice"
import { Button, Form, FormGroup, Checkbox, DatePicker, ComboBox, Label, RequiredMarker } from '@trussworks/react-uswds'
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

interface ExpenseFormPaymentProps {
  onSubmit: SubmitHandler<ExpenseFormPaymentData>
  item?: ExpenseItem
}

export type ExpenseFormPaymentData = {
  job: string
  name: string
  expenseType: string
  amount: number
  date: string
  isMileage: boolean
}

export default function FormExpense(params: ExpenseFormPaymentProps) {
  const { t } = useTranslation()

  const expenseTypeOptions = [
    t('add_expense_materials'),
    t('add_expense_travel'),
    t('add_expense_equipment'),
    t('add_expense_advertising'),
    t('add_expense_cost'),
    t('add_expense_other')
  ].map((str) => {
    return { value: str, label: str }
  })

  const {
    register,
    control,
    formState: { errors },
    handleSubmit
  } = useForm<ExpenseFormPaymentData>()

  return (<Form onSubmit={handleSubmit(params.onSubmit)}>
    <RequiredFieldDescription />
    <ErrorSummary errors={errors} headingText={t('add_income_error_header')} />

    <FormGroup>
        <TextFieldWithValidation
            id="name"
            {...register("name", {required:{value: true, message: t('add_expense_name_required')}})}
            label={t('add_expense_name_field')}
            error={errors.name?.message}
            data-testid="name"
            requiredMarker
        />
    </FormGroup>

    <FormGroup>
        <Controller
            name="isMileage"
            control={control}
            render={({ field }) => 
                <Checkbox
                    id="isMileage"
                    {...field}
                    label={t('add_expense_mileage_field')}
                    value="true"
                    data-testid="isMileage"
                />
            }
        />

    </FormGroup>

    <FormGroup>
        <Controller
            name="date"
            control={control}
            rules={{ required: {value:true, message: t('add_expense_date_required')} }}
            render={({ field }) => (
                <>
                    <Label htmlFor="date">{t('add_expense_date_field')}<RequiredMarker /></Label>
                    <p className="usa-hint font-body-2xs">{t('add_expense_date_hint')}</p>
                    <DatePicker
                        id="date"
                        data-testid="date"
                        {...field}
                        {...(errors.date?.message !== undefined ? {validationStatus: 'error'} : {})}
                    />
                </>
                )
            }
            />
    </FormGroup>

    <FormGroup>
        <TextFieldWithValidation
            id="amount"
            {...register("amount", { valueAsNumber:true, validate: (value) => value > 0, required:{value: true, message: t('add_expense_amount_required')}})}
            label={t('add_expense_amount_field')}
            error={errors.amount?.message}
            data-testid="amount"
            requiredMarker
        />
    </FormGroup>
    
    <FormGroup>
        <Controller
            name="expenseType"
            control={control}
            // Question if this field is optional or required https://confluenceent.cms.gov/pages/viewpage.action?spaceKey=SFIV&title=IRT+Epics+and+Stories
            // rules={{ required: {value: true, message: t('add_expense_type_required')}}}
            render={({ field }) => (
                <>
                    <Label htmlFor="expenseType">{t('add_expense_type_field')}</Label>
                    <p className="usa-hint font-body-2xs">{t('add_expense_type_hint')}</p>
                    <ComboBox
                        id="expenseType"
                        options={expenseTypeOptions}
                        {...field}
                        data-testid="expenseType"
                    />
                </>
                )
            }
        />
    </FormGroup>

    <Button type="submit" data-testid="continue_button">{t('add_expense_continue_button')}</Button>
</Form>)
}