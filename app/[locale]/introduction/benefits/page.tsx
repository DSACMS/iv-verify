'use client'
import { Button, Form, FormGroup, Grid, GridContainer, Checkbox, Alert } from '@trussworks/react-uswds' 
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm, Controller } from "react-hook-form"
import { selectBenefits, setBenefits } from "@/lib/features/benefits/benefitsSlice"
import { useState } from "react"
import VerifyNav from "@/app/components/VerifyNav"

export default function Page() {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const benefits = useAppSelector(state => selectBenefits(state))
    const [errState, setErrState] = useState(false)

    type FormData = {
        medicaid: boolean
        snap: boolean
        standardDeduction: boolean
        deductionAmount: number
    }

    const {
        control,
        handleSubmit,
    } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = (data => {
        if (!data.medicaid && !data.snap) {
            setErrState(true)
            return
        }

        setErrState(false)
        
        let newBenefits = {...benefits}
        newBenefits.medicaid = data.medicaid
        newBenefits.snap = data.snap

        dispatch(setBenefits(newBenefits))
        router.push('/ledger/income')
    })

    return (
        <div style={{height: '100vh'}}>
            <VerifyNav title={t('benefits_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t('benefits_header')}</h3>
                            <Form onSubmit={handleSubmit(onSubmit)} className="margin-top-5">
                            {errState && (
                                <Alert type="error" headingLevel="h5" className="margin-top-3">
                                    {t('benefits_error_message')} 
                                </Alert>
                            )}
                                <FormGroup>
                                    <Controller
                                        name="medicaid"
                                        control={control}
                                        render={({ field }) => 
                                            <Checkbox
                                                id="medicaid"
                                                {...field}
                                                label={t('benefits_medicaid')}
                                                value="true"
                                                data-testid="medicaid"
                                            />
                                        }
                                    />

                                </FormGroup>

                                <FormGroup>
                                    <Controller
                                        name="snap"
                                        control={control}
                                        render={({ field }) => 
                                            <Checkbox
                                                id="snap"
                                                {...field}
                                                label={t('benefits_snap')}
                                                value="true"
                                                data-testid="snap"
                                            />
                                        }
                                    />

                                </FormGroup>

                                <div className="usa-hint margin-top-2">{t('benefits_snap_hint')}</div>

                                <div className="text-center margin-top-5">
                                    <Button type="submit" data-testid="continue_button">{t('benefits_continue_button')}</Button>
                                </div>
                            </Form>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}