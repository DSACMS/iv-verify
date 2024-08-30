'use client'

import ErrorSummary from "@/app/components/ErrorSummary"
import RequiredFieldDescription from "@/app/components/RequiredFieldDescription"
import TextAreaWithValidation from "@/app/components/TextAreaWithValidation"
import TextFieldWithValidation from "@/app/components/TextFieldWithValidation"
import { IncomeItem } from "@/lib/features/ledger/income/incomeSlice"
import { Button, Form, FormGroup } from "@trussworks/react-uswds"
import { SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

export interface IncomeFormPaymentProps {
    onSubmit: SubmitHandler<IncomeFormPaymentData>
    item?: IncomeItem
}

export type IncomeFormPaymentData = {
    amount: number
    date: string
    name: string
}

export default function IncomeFormPayment(params: IncomeFormPaymentProps) {
    const { t } = useTranslation()

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<IncomeFormPaymentData>()

    return (
        <Form onSubmit={handleSubmit(params.onSubmit)}>
            <FormGroup>
                <TextFieldWithValidation
                    id="amount"
                    {...register("amount", { valueAsNumber:true, validate: (value) => value > 0, required: { value: true, message: t('add_income_amount_field_required')}})}
                    label={t('add_income_total_amount')}
                    error={errors.amount?.message}
                    requiredMarker={true}
                    data-testid="amount"
                    value={params.item?.amount?.toString()}
                />
            </FormGroup>

            {/* Date */}

            <FormGroup>
                <TextFieldWithValidation
                    id="name"
                    {...register("name", {required: {value: true, message: t('add_income_name_field_required')}, maxLength: { value: 100, message: t('add_income_name_field_length')}})}
                    label={t('add_income_what_name')}
                    error={errors.name?.message}
                    requiredMarker={true}
                    data-testid="name"
                    value={params.item?.name}
                />
            </FormGroup>
            <FormGroup>
                <Button type="button" name="more_button" data-testid="more_button">{t('add_income_button_more')}</Button>
                <Button type="submit" name="continue_button" data-testid="continue_button">{t('add_income_button_done')}</Button>
            </FormGroup>
        </Form>
    )
}