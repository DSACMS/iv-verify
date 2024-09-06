'use client'

import { Button, Form, FormGroup, Grid, GridContainer, Radio } from '@trussworks/react-uswds' 
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { SubmitHandler, useForm } from "react-hook-form"
import VerifyNav from "@/app/components/VerifyNav"

export default function Page() {
    const { t } = useTranslation()
    const router = useRouter()

    const MONTHLY_AMOUNT = "XXX.XX"

    type FormData = {
        snapRadio: boolean
    }

    const {
        handleSubmit,
        setValue
    } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = (data => {
        const { snapRadio } = data

        if (snapRadio == true) {
            router.push("/ledger/expense")
        } else if (snapRadio == false) {
            router.push("/ledger/review")
        }
    })

    return (
        <div>
            <VerifyNav title={t('expenses_snap_standard_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <h3 className="margin-bottom-2" data-testid="expense-snap-header">{t('expenses_snap_standard_header', {amount: MONTHLY_AMOUNT})}</h3>
                                <span className="usa-hint">{t('expenses_snap_standard_subheader')}</span>

                                <FormGroup>
                                    <Radio 
                                        id="take_deduction_radio"
                                        name="snap-radio" 
                                        label={t('snap_deduction_take_header')} 
                                        labelDescription={t('snap_deduction_take_body')} 
                                        tile 
                                        className="margin-top-5" 
                                        data-testid="take_deduction_radio" 
                                        value="on" 
                                        onChange={(e) => setValue("snapRadio", true)}
                                    />
                                    <Radio 
                                        id="do_not_take_deduction_radio"
                                        name="snap-radio"
                                        label={t('snap_deduction_do_not_take_header')} 
                                        tile 
                                        data-testid="do_not_take_deduction_radio" 
                                        value="on" 
                                        onChange={(e) => setValue("snapRadio", false)}
                                    />
                                </FormGroup>

                                <p className="text-center margin-top-5">
                                    <Button type="submit" data-testid="continue-button">{t('expenses_snap_standard_continue')}</Button>
                                </p>
                            </Form>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}