'use client'

import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Button, Grid, GridContainer, Radio, Form } from '@trussworks/react-uswds' 
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import VerifyNav from "@/app/components/VerifyNav"

export default function Page() {
    const { t } = useTranslation()
    const router = useRouter()

    const MONTHLY_AMOUNT = "XXX.XX"

    type FormData = {
        snapRadio: string
    }

    const {
        handleSubmit,
        control
    } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = (data => {
        const { snapRadio } = data

        if (snapRadio == "yes") {
            router.push("/ledger/expense")
        } else if (snapRadio == "no") {
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
                                <Controller
                                    name="snapRadio"
                                    control={control}
                                    render={({ field: {onChange, ...props} }) => 
                                        <Radio id="no_radio" {...props} onChange={onChange} label={t('expenses_snap_standard_no_header', {amount: MONTHLY_AMOUNT})} labelDescription={t('expenses_snap_standard_no_subheader')} tile className="margin-top-5" value="no" data-testid="no_radio" />
                                    }
                                />
                                <Controller
                                    name="snapRadio"
                                    control={control}
                                    render={({ field: {onChange, ...props} }) => 
                                        <Radio id="yes_radio" {...props} onChange={onChange} label={t('expenses_snap_standard_yes_header', {amount: MONTHLY_AMOUNT})} labelDescription={t('expenses_snap_standard_yes_subheader')} tile value="yes" data-testid="yes_radio" />
                                    }
                                />

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