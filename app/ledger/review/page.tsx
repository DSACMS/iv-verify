'use client'
import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Header, Title, Button,  Grid, GridContainer } from '@trussworks/react-uswds' 
import { useTranslation } from '@/app/i18n/client'
import { useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { selectBenefits } from "@/lib/features/benefits/benefitsSlice"
import { selectIncomeTotal } from "@/lib/features/ledger/income/incomeSlice"
import Link from "next/link"
import IncomeList from "@/app/components/IncomeList"
import ExpenseList from "@/app/components/ExpenseList"
import LedgerReviewHeader from "./LedgerReviewHeader"
import SnapExpenses from "./SnapExpenses"

const DAY_COUNT = 30

export default function Page() {
    const { t } = useTranslation('en')
    const router = useRouter()
    const benefits = useAppSelector(state => selectBenefits(state))
    const incomeTotal = useAppSelector(state => selectIncomeTotal(state))

    function continueButtonClicked() {
        router.push("/statement/sign")
    }

    return (
        <div>
            <Header basic={true}>
                <div className="usa-nav-container">
                    <div className="usa-navbar">
                        <Title>{t('review_title')}</Title>
                    </div>
                </div>
            </Header>
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <div className="margin-bottom-5" data-testid="review-header">
                                <LedgerReviewHeader benefits={benefits} snapIncomeTotal={incomeTotal} medicaidIncomeTotal={incomeTotal} />
                                <div className="text-center margin-top-3">
                                    <Link href="#" className="usa-link">{t("review_download_copy")}</Link>
                                </div>
                                <div className="text-center margin-top-3">
                                    {t("review_legally_sign")}
                                </div>
                                <IncomeList dayCount={DAY_COUNT} header={t('review_income_header', {days: DAY_COUNT})} />
                                <ExpenseList header={t('review_expenses_header', {days: DAY_COUNT})} />
                                <SnapExpenses benefits={benefits} snapIncomeTotal={incomeTotal} />

                                <Button type="button" data-testid="continue-button" onClick={continueButtonClicked}>{t('review_continue_button')}</Button>
                            </div>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}
