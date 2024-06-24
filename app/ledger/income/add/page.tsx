'use client'
import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Header, Title, Button, Form, FormGroup, Grid, GridContainer, Alert } from '@trussworks/react-uswds' 
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from "@/lib/hooks"
import { addIncome, IncomeItem } from "@/lib/features/ledger/income/incomeSlice"
import { useRouter } from "next/navigation"
import { FieldErrors, SubmitHandler, useForm, Controller } from "react-hook-form"
import TextFieldWithValidation from "@/app/components/TextFieldWithValidation"
import TextAreaWithValidation from "@/app/components/TextAreaWithValidation"
import RequiredFieldDescription from "@/app/components/RequiredFieldDescription"

export default function Page() {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const router = useRouter()

    type FormData = {
        name: string
        description: string
        amount: number
    }

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = (data => {
        addIncomeClicked(data)
    })

    function addIncomeClicked({name, description, amount}: FormData) {

        const incomeItem: IncomeItem = {
            name,
            description,
            amount,
        }
        dispatch(addIncome(incomeItem))
        router.push('/ledger/income/list')
    }

    function errorSummary(errors: FieldErrors<FormData>) {
        if (!errors) {
            return <></>
        }

        const errMessages = Object.keys(errors).filter((key) => {
            return (errors as any)[key]?.message
        }).map((key => {
            return <li key={key}>{(errors as any)[key]?.message}</li>
        }))

        if (errMessages.length == 0) {
            return <></>
        }

        return (
            <Alert type="error" headingLevel="h3">
                {t('add_income_error_header')}
                {errMessages}
            </Alert>
        )
    }

    return (
        <div>
            <Header basic={true}>
                <div className="usa-nav-container">
                    <div className="usa-navbar">
                        <Title>{t('add_income_title')}</Title>
                    </div>
                </div>
            </Header>
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t('add_income_header')}</h3>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <RequiredFieldDescription />
                                {errorSummary(errors)}
                                <FormGroup>
                                    <TextFieldWithValidation
                                        id="name"
                                        {...register("name", {required: {value: true, message: t('add_income_name_field_required')}, maxLength: { value: 100, message: t('add_income_name_field_length')}})}
                                        label={t('add_income_what_name')}
                                        error={errors.name?.message}
                                        requiredMarker={true}
                                        data-testid="name"
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
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit" name="continue_button" data-testid="continue_button">{t('add_income_button')}</Button>
                                </FormGroup>
                            </Form>
                         </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}
