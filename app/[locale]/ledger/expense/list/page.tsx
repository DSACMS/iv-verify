'use client'

import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Button, ButtonGroup, Grid, GridContainer } from '@trussworks/react-uswds' 
import { useTranslation } from 'react-i18next'
import { useRouter } from "next/navigation"
import ExpenseList from "@/app/components/ExpenseList"
import { useAppSelector } from "@/lib/hooks"
import { selectRecommendStandardDeduction } from "@/lib/store"
import VerifyNav from "@/app/components/VerifyNav"

export default function Page() {
    const { t } = useTranslation()
    const router = useRouter()
    const reccommendStandardDeduction = useAppSelector(state => selectRecommendStandardDeduction(state))

    function addItemClicked() {
        router.push("/ledger/expense/add")
    }

    function doneClicked() {
        if (reccommendStandardDeduction) {
            router.push("/ledger/expense/snap/recommend")
        } else {
            router.push("/ledger/review")
        }
    }

    return (
        <div>
            <VerifyNav title={t('expenses_summary_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t('expenses_summary_header')}</h3>
                            <span className="usa-hint">{t('expenses_summary_subheader')}</span>
                            <ExpenseList header={t('expenses_summary_list_header')} />
                            <ButtonGroup type="default">
                                <Button type="button" onClick={addItemClicked} data-testid="add_another_button">{t('expenses_summary_add_button')}</Button>
                                <Button type="button" onClick={doneClicked} data-testid="continue_button">{t('expenses_summary_review_button')}</Button>
                            </ButtonGroup>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}