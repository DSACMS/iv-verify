'use client'

import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Header, Title, Button, HeadingLevel, Grid, GridContainer, Accordion, Radio, Form } from '@trussworks/react-uswds' 
import { useRouter } from "next/navigation"
import Link from 'next/link'
import { useTranslation } from "@/app/i18n/client"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

export default function Page() {
    const { t } = useTranslation('en')
    const router = useRouter()

    const MONTHLY_AMOUNT = "XXX.XX"

    type FormData = {
        snapRadio: string
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
        control
    } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = (data => {
        const { snapRadio } = data

        // TODO: Navigate to the approprate screen
        if (snapRadio == "yes") {
            console.log("yes")
        } else if (snapRadio == "no") {
            console.log("no")
        }
    })

    return (
        <div>
            <Header basic={true}>
                <div className="usa-nav-container">
                    <div className="usa-navbar">
                        <Title>{t('expenses_snap_standard_title')}</Title>
                    </div>
                </div>
            </Header>
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <h3 className="margin-bottom-2" data-testid="expenses_landing_what_counts_heading">{t('expenses_snap_standard_header', {amount: MONTHLY_AMOUNT})}</h3>
                                <span className="usa-hint">{t('expenses_snap_standard_subheader')}</span>
                                <Controller
                                    name="snapRadio"
                                    control={control}
                                    render={({ field: {onChange, ...props} }) => 
                                        <Radio id="no_radio" {...props} onChange={onChange} label={t('expenses_snap_standard_no_header', {amount: MONTHLY_AMOUNT})} labelDescription={t('expenses_snap_standard_no_subheader')} tile className="margin-top-5" value="no" />
                                    }
                                />
                                <Controller
                                    name="snapRadio"
                                    control={control}
                                    render={({ field: {onChange, ...props} }) => 
                                        <Radio id="yes_radio" {...props} onChange={onChange} label={t('expenses_snap_standard_yes_header', {amount: MONTHLY_AMOUNT})} labelDescription={t('expenses_snap_standard_yes_subheader')} tile value="yes" />
                                    }
                                />

                                <p className="text-center margin-top-5">
                                    <Button type="submit">{t('expenses_snap_standard_continue')}</Button>
                                </p>
                            </Form>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}