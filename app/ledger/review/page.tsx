'use client'
import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Header, Title, Button,  Grid, GridContainer } from '@trussworks/react-uswds' 
import { useTranslation } from '@/app/i18n/client'
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { BenefitsState, selectBenefits, setBenefits } from "@/lib/features/benefits/benefitsSlice"
import { IncomeItem, addIncome, selectIncomeTotal } from "@/lib/features/ledger/income/incomeSlice"
import Link from "next/link"
import IncomeList from "@/app/components/IncomeList"
import ExpenseList from "@/app/components/ExpenseList"
import LedgerReviewHeader from "./LedgerReviewHeader"
import SnapExpenses from "./SnapExpenses"
import { useEffect } from "react"
import { ExpenseItem, addExpense } from "@/lib/features/ledger/expenses/expensesSlice"

const DAY_COUNT = 30

export default function Page() {
    const { t } = useTranslation('en')
    const router = useRouter()
    const benefits = useAppSelector(state => selectBenefits(state))
    const incomeTotal = useAppSelector(state => selectIncomeTotal(state))
    const dispatch = useAppDispatch()

    function continueButtonClicked() {
        router.push("/statement/sign")
    }

    useEffect(() => {
        const benefitsState: BenefitsState = {
            standardDeduction: true,
            deductionAmount: 50,
            medicaid: true,
            snap: false,
        }
        dispatch(setBenefits(benefitsState))

        const income: IncomeItem[] = [
            {
                amount: 300,
                name: "Yardwork",
                description: ""
            }, {
                amount: 200,
                name: "House Cleaning",
                description: ""
            }
        ]

        dispatch(addIncome(income[0]))
        dispatch(addIncome(income[1]))

        const expense: ExpenseItem[] = [
            {
                amount: 35,
                date: new Date(),
                name: "Gas",
                expenseType: "Gas",
                isMileage: false,
            }, {
                amount: 105,
                date: new Date(),
                name: "Clothing",
                expenseType: "Clothing",
                isMileage: false,
            }
        ]

        dispatch(addExpense(expense[0]))
        dispatch(addExpense(expense[1]))
    }, [])

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
                            <div className="margin-bottom-5">
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

                                <Button type="button" data-testid="continue_button" onClick={continueButtonClicked}>{t('review_continue_button')}</Button>
                            </div>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}
