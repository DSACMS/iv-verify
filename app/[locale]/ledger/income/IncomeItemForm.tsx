'use client'

import ErrorSummary from "@/app/components/ErrorSummary"
import RequiredFieldDescription from "@/app/components/RequiredFieldDescription"
import TextAreaWithValidation from "@/app/components/TextAreaWithValidation"
import TextFieldWithValidation from "@/app/components/TextFieldWithValidation"
import { IncomeItem } from "@/lib/features/ledger/income/incomeSlice"
import { Button, Form, FormGroup } from "@trussworks/react-uswds"
import { SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

export interface IncomeItemFormProps {
    onSubmit: SubmitHandler<IncomeItemFormData>
    item?: IncomeItem
}

export type IncomeItemFormData = {
    name: string
    description: string
    amount: number
}

export default function IncomeItemForm(params: IncomeItemFormProps) {
    const { t } = useTranslation()

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<IncomeItemFormData>()

    return (
        <Form onSubmit={handleSubmit(params.onSubmit)}>
            <RequiredFieldDescription />
            <ErrorSummary errors={errors} headingText={t('add_income_error_header')} />
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
                <TextAreaWithValidation
                    id="description" 
                    {...register("description", {required: {value: true, message: t('add_income_description_field_required')}, maxLength: {value: 500, message: t('add_income_description_field_length')} })} 
                    label={t('add_income_describe')} 
                    error={errors.description?.message} 
                    className="height-10"
                    data-testid="description"
                    value={params.item?.description}
                />
            </FormGroup>

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
            <FormGroup>
                <Button type="submit" name="continue_button" data-testid="continue_button">{t('add_income_button')}</Button>
            </FormGroup>
        </Form>
    )
}