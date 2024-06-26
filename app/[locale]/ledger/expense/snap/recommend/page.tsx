'use client'

import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Button, Grid, GridContainer, Radio, Form } from '@trussworks/react-uswds' 
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { BenefitsState, selectBenefits, setBenefits } from "@/lib/features/benefits/benefitsSlice"
import { selectExpenseTotal } from "@/lib/features/ledger/expenses/expensesSlice"
import { useEffect } from "react"
import { selectRecommendStandardDeduction } from "@/lib/store"
import VerifyNav from "@/app/components/VerifyNav"

export default function Page() {
    const { t } = useTranslation()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const benefits = useAppSelector(state => selectBenefits(state))
    const expenseTotal = useAppSelector(state => selectExpenseTotal(state))
    const reccommendStandardDeduction = useAppSelector(state => selectRecommendStandardDeduction(state))

    interface FormData {
        take_deduction: string
        do_not_take_deduction: string
    }
    const {
        handleSubmit,
        control
    } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = (data => {
        if (data.take_deduction == "on" || data.do_not_take_deduction == "on") {
            let newBenefits = {...benefits} as BenefitsState
            if (data.take_deduction == "on") {
                newBenefits.standardDeduction = true
            } else if (data.do_not_take_deduction == "on") {
                newBenefits.standardDeduction = false
            }

            dispatch(setBenefits(newBenefits))
            router.push("/ledger/review")
        }
    })

    useEffect(() => {
        if (!benefits.snap || !reccommendStandardDeduction) {
            // User should not have been pushed to this screen
            return router.push('/ledger/review')
        }
    }, [benefits.snap, reccommendStandardDeduction, router])

    return (
        <div>
            <VerifyNav title={t('snap_recommend_deduction_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <h3 className="margin-bottom-2" data-testid="snap_recommend_deduction_header">{t('snap_recommend_deduction_header', {amount: expenseTotal})}</h3>
                                <span className="usa-hint">{t('snap_recommend_deduction_subheader')}</span>
                                <Controller
                                    name="take_deduction"
                                    control={control}
                                    render={({ field }) => 
                                        <Radio id="take_deduction_radio" {...field} label={t('snap_recommend_deduction_take_header')} labelDescription={t('snap_recommend_deduction_take_body')} tile className="margin-top-5" data-testid="take_deduction_radio" value="on" />
                                    }
                                />
                                <Controller
                                    name="do_not_take_deduction"
                                    control={control}
                                    render={({ field }) => 
                                        <Radio disabled id="do_not_take_deduction_radio" {...field} label={t('snap_recommend_deduction_do_not_take_header')} tile data-testid="do_not_take_deduction_radio" value="on" />
                                    }
                                />

                                <p className="text-center margin-top-5">
                                    <Button type="submit" data-testid="continue-button">{t('snap_recommend_deduction_continue_button')}</Button>
                                </p>
                            </Form>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}