'use client'

import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Header, Title, Button, ButtonGroup, Grid, GridContainer } from '@trussworks/react-uswds' 
import { useTranslation } from 'react-i18next'
import { useRouter } from "next/navigation"
import { selectBenefits } from "@/lib/features/benefits/benefitsSlice"
import { useAppSelector } from "@/lib/hooks"
import IncomeList from "@/app/components/IncomeList"

const DAY_COUNT = 30

export default function Page() {
    const { t } = useTranslation()
    const router = useRouter()
    const benefits = useAppSelector(state => selectBenefits(state))

    function addItemClicked() {
        router.push("/ledger/income/add")
    }

    function doneClicked() {
        if (benefits.snap && !benefits.medicaid) {
            // For SNAP Only Flow
            router.push('/ledger/expense/snap')
        } else {
            // For Medicaid Only or SNAP+Medicaid Flows
            router.push('/ledger/expense')
        }
    }

    return (
        <div>
            <Header basic={true}>
                <div className="usa-nav-container">
                    <div className="usa-navbar">
                        <Title data-testid="list_income_title">{t('list_income_title')}</Title>
                    </div>
                </div>
            </Header>
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t('list_income_header', {day_count: DAY_COUNT})}</h3>
                            <span className="usa-hint">{t('list_income_subheader')}</span>
                            <IncomeList dayCount={DAY_COUNT} header={t('list_income_list_header')} />
                            <ButtonGroup type="default">
                                <Button type="button" onClick={addItemClicked} data-testid="add_another_button">{t('list_income_add_button')}</Button>
                                <Button type="button" onClick={doneClicked} data-testid="done_button">{t('list_income_done_button')}</Button>
                            </ButtonGroup>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}
