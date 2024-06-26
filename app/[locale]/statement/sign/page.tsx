'use client'
import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { useTranslation } from 'react-i18next'
import { Button, Form, FormGroup, Grid, GridContainer, CardHeader, Card, CardBody, CardGroup, Checkbox, RequiredMarker } from '@trussworks/react-uswds' 
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm, Controller } from "react-hook-form"
import TextFieldWithValidation from "@/app/components/TextFieldWithValidation"
import ErrorSummary from "@/app/components/ErrorSummary"
import { selectSignedStatement, setSignedStatement } from "@/lib/features/statement/statementSlice"
import RequiredFieldDescription from "@/app/components/RequiredFieldDescription"
import VerifyNav from "@/app/components/VerifyNav"

export default function Page() {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const signedStatement = useAppSelector((state) => selectSignedStatement(state))

    type FormData = {
        understood: boolean
        signedName: string
    }

    const {
        register,
        control,
        formState: { errors },
        handleSubmit
    } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = (data => {
        const newStatement = {...signedStatement}
        newStatement.signedName = data.signedName
        newStatement.understood = true
        newStatement.signedDate = new Date().toDateString()

        dispatch(setSignedStatement(newStatement))
        router.push("/statement/confirmation")
    })

    return (
        <div>
            <VerifyNav title={t('statement_sign_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t('statement_sign_header', {day_count: 30})}</h3>
                            <div className="margin-top-2">{t('statement_sign_subheader')}</div>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <RequiredFieldDescription />
                                <ErrorSummary errors={errors} headingText="" />
                                <CardGroup className="margin-top-5">
                                    <Card>
                                        <CardHeader><b>{t('statement_sign_card_header')}</b></CardHeader>
                                        <CardBody className="text-pre-line">
                                            {t('statement_sign_card_body')}
                                        </CardBody>
                                    </Card>
                                </CardGroup>

                                <FormGroup>
                                    <Controller
                                        name="understood"
                                        control={control}
                                        render={({ field }) => 
                                            <Checkbox
                                                id="understood"
                                                {...field}
                                                label=<>{t('statement_sign_checkbox')}<RequiredMarker /></>
                                                value="true"
                                                data-testid="understood"
                                            />
                                        }
                                        rules={{required: {value: true, message: t('statement_sign_checkbox_required')}}}
                                    />

                                </FormGroup>

                                <FormGroup>
                                    <TextFieldWithValidation
                                        id="signedName"
                                        {...register("signedName", {required:{value: true, message: t('statement_sign_name_required')}})}
                                        label={t('statement_sign_name_label')}
                                        error={errors.signedName?.message}
                                        data-testid="signedName"
                                        requiredMarker
                                    />
                                </FormGroup>

                                <div className="margin-top-5">
                                    <Button type="submit" data-testid="continue_button">{t('statement_sign_button')}</Button>
                                </div>
                            </Form>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}