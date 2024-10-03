'use client'
import { useTranslation } from 'react-i18next'
import { Grid, GridContainer } from '@trussworks/react-uswds' 
import { useAppDispatch } from "@/lib/hooks"
import { SetExpensePayload, addExpense } from "@/lib/features/job/expenses/expensesSlice"
import { useRouter } from "next/navigation"
import VerifyNav from "@/app/components/VerifyNav"
import FormExpense, { ExpenseFormPaymentData } from '../FormExpense'
import { createUuid } from '@/lib/store'


export default function Page({ params }: { params: { idx: string }}) {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const router = useRouter()

    function addExpenseClicked ({ job=params.idx, name, expenseType, amount, isMileage=false, date }: ExpenseFormPaymentData) {
        const id = createUuid()

        const expenseItem: SetExpensePayload = {
            id, 
            item: {
                job,
                name,
                expenseType,
                amount,
                isMileage,
                date,
            }
        }

        dispatch(addExpense(expenseItem))
        router.push('/job/list')
    }

    return (
        <div>
            <VerifyNav title={t('add_expense_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t('add_expense_header')}</h3>
                            <h4 className="margin-top-2">{t('add_expense_subheader', {month_count: '3'})}</h4>
                            <FormExpense onSubmit={addExpenseClicked} />
                         </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}