'use client'

import { Accordion, Button, Form, FormGroup, Grid, GridContainer, HeadingLevel, Radio } from '@trussworks/react-uswds' 
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { SubmitHandler, useForm } from "react-hook-form"
import { selectBenefits, setBenefits } from "@/lib/features/benefits/benefitsSlice"
import VerifyNav from "@/app/components/VerifyNav"

export default function Page() {
    const { t } = useTranslation()
    const router = useRouter()
    const benefits = useAppSelector(state => selectBenefits(state))
    const dispatch = useAppDispatch()

    // todo: set this from state
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
        let updatedBenefits = {...benefits}
        updatedBenefits.standardDeduction = snapRadio

        dispatch(setBenefits(updatedBenefits))

        if (snapRadio == true) {
            router.push("/ledger/review")
        } else if (snapRadio == false) {
            router.push("/ledger/expense")
        }
    })

    const items = [
        {
          title: t('expenses_snap_accordion_header'),
          content: (
            <div>
              <pre>{t('expenses_snap_accordion_body')}</pre>
            </div>
          ),
          expanded: false,
          id: 'expenses_snap',
          headingLevel: 'h4' as HeadingLevel,
        }
      ]

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

                                <Accordion multiselectable={true} className="margin-top-2" items={items} />

                                <FormGroup>
                                    <Radio 
                                        id="take_deduction_radio"
                                        name="snap-radio" 
                                        label={t('expenses_snap_take_header')} 
                                        labelDescription={t('expenses_snap_take_body')} 
                                        tile 
                                        className="margin-top-5" 
                                        data-testid="take_deduction_radio" 
                                        value="on" 
                                        onChange={() => setValue("snapRadio", true)}
                                    />
                                    <Radio 
                                        id="do_not_take_deduction_radio"
                                        name="snap-radio"
                                        label={t('expenses_snap_do_not_take_header')} 
                                        tile 
                                        data-testid="do_not_take_deduction_radio" 
                                        value="on" 
                                        onChange={() => setValue("snapRadio", false)}
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