'use client'
import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Header, Title, Button, Form, FormGroup, Grid, GridContainer, DatePicker, Label } from '@trussworks/react-uswds' 
import { useTranslation } from '@/app/i18n/client'
import { useAppDispatch } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm, Controller } from "react-hook-form"
import TextFieldWithValidation from "@/app/components/TextFieldWithValidation"
import ErrorSummary from "@/app/components/ErrorSummary"
import { SignedStatementState, setSignedStatement } from "@/lib/features/statement/statementSlice"

export default function Page() {
    const { t } = useTranslation('en')
    const dispatch = useAppDispatch()
    const router = useRouter()

    type FormData = {
        name: string
        lastDayOfWork: string
        amount: number
        lastPayment: string
    }

    const {
        register,
        control,
        formState: { errors },
        handleSubmit
    } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = (data => {
        const signedStatement: SignedStatementState = {
            name: data.name,
            lastDayOfWork: data.lastDayOfWork,
            amount: data.amount,
            lastPayment: data.lastPayment,
        }

        dispatch(setSignedStatement(signedStatement))
        router.push("/statement/sign")
    })

    return (
        <div>
            <Header basic={true}>
                <div className="usa-nav-container">
                    <div className="usa-navbar">
                        <Title>{t('statement_set_title')}</Title>
                    </div>
                </div>
            </Header>
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t('statement_set_header', {day_count: 30})}</h3>
                            <h4 className="margin-top-2">{t('statement_set_subheader')}</h4>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <ErrorSummary errors={errors} headingText="" />
                                <FormGroup>
                                    <TextFieldWithValidation
                                        id="name"
                                        {...register("name", {required:{value: true, message: t('statement_set_name_field_required')}})}
                                        label={t('statement_set_name_field')}
                                        error={errors.name?.message}
                                        data-testid="name"
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Controller
                                        name="lastDayOfWork"
                                        control={control}
                                        rules={{ required: {value:true, message: t('statement_set_last_day_required')} }}
                                        render={({ field }) => (
                                            <>
                                                <Label htmlFor="lastDayOfWork">{t('statement_set_last_day_field')}</Label>
                                                <p className="usa-hint font-body-2xs">{t('statement_set_last_day_hint')}</p>
                                                <DatePicker
                                                    id="lastDayOfWork"
                                                    data-testid="lastDayOfWork"
                                                    {...field}
                                                    {...(errors.lastDayOfWork?.message !== undefined ? {validationStatus: 'error'} : {})}
                                                />
                                            </>
                                            )}
                                        />
                                </FormGroup>

                                <FormGroup>
                                    <TextFieldWithValidation
                                        id="amount"
                                        {...register("amount", { valueAsNumber:true, validate: (value) => value > 0, required:{value: true, message: t('statement_set_amount_required')}})}
                                        label={t('statement_set_amount_field')}
                                        error={errors.amount?.message}
                                        data-testid="amount"
                                    />
                                </FormGroup>


                                <FormGroup>
                                    <Controller
                                        name="lastPayment"
                                        control={control}
                                        rules={{ required: {value:true, message: t('statement_set_last_paycheck_required')} }}
                                        render={({ field }) => (
                                            <>
                                                <Label htmlFor="lastPayment">{t('statement_set_last_paycheck_field')}</Label>
                                                <p className="usa-hint font-body-2xs">{t('statement_set_last_paycheck_hint')}</p>
                                                <DatePicker
                                                    id="lastPayment"
                                                    data-testid="lastPayment"
                                                    {...field}
                                                    {...(errors.lastPayment?.message !== undefined ? {validationStatus: 'error'} : {})}
                                                />
                                            </>
                                            )}
                                        />
                                </FormGroup>

                                <div className="margin-top-5">
                                    <Button type="submit" data-testid="continue_button">{t('add_expense_continue_button')}</Button>
                                </div>
                            </Form>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}
