'use client'
import { Button,  Grid, GridContainer, Form } from '@trussworks/react-uswds' 
import { useTranslation } from 'react-i18next'
import { useAppSelector } from "@/lib/hooks"
import { selectSignedStatement } from "@/lib/features/statement/statementSlice"
import Link from "next/link"
import Image from "next/image"
import ledgerImage from './ledger.png'
import { selectIncomeItems, selectIncomeTotal } from "@/lib/features/job/income/incomeSlice"
import { selectExpenseItems, selectExpenseTotal } from "@/lib/features/job/expenses/expensesSlice"
import VerifyNav from "@/app/components/VerifyNav"

export default function Page() {
    const { t } = useTranslation()
    const signedStatement = useAppSelector((state) => selectSignedStatement(state))
    const totalIncome = useAppSelector((state) => selectIncomeTotal(state))
    const totalExpense = useAppSelector((state) => selectExpenseTotal(state))
    const incomeItems = useAppSelector((state) => selectIncomeItems(state))
    const expenseItems = useAppSelector((state) => selectExpenseItems(state))
    const statement = useAppSelector((state) => selectSignedStatement(state))

    const incomeData = JSON.stringify(incomeItems)
    const expenseData = JSON.stringify(expenseItems)

    return (
        <div>
            <VerifyNav title={t('statement_confirmation_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <Form method="POST" action="/api/export" onSubmit={() => {}} target="_blank">
                                <h3>{t('statement_confirmation_header')}</h3>
                                <div className="margin-top-2 margin-bottom-5">{t('statement_confirmation_subheader', { 
                                    number: signedStatement?.confirmationNumber ?? 'XXX' 
                                    })}
                                </div>
                                <h4>{t('statement_confirmation_what_next')}</h4>
                                <ul className="margin-top-2 margin-left-4 margin-bottom-5">
                                    <li>{t('statement_confirmation_benefit_worker')}</li>
                                    <li>{t('statement_confirmation_portal')}</li>
                                </ul>
                                
                                <div className="margin-bottom-3 text-center">
                                    <Link href="#" className="usa-link">{t('statement_confirmation_download_copy')}</Link>
                                </div>
                                <div className="text-center margin-bottom-4">
                                    <Image alt={t('statement_confirmation_image_alt')} src={ledgerImage} width={282} height={365} />
                                </div>
                                <div>
                                    <input type="hidden" name="totalIncome" value={totalIncome} />
                                    <input type="hidden" name="totalExpense" value={totalExpense} />
                                    <input type="hidden" name="incomeData" value={incomeData} />
                                    <input type="hidden" name="expenseData" value={expenseData} />
                                    <input type="hidden" name="understood" value={statement.understood ? "true" : "false" } />
                                    <input type="hidden" name="signedName" value={statement.signedName} />
                                    <input type="hidden" name="signedDate" value={statement.signedDate} />
                                    <Button type="submit">{t('statement_confirmation_download_button')}</Button>
                                </div>
                            </Form>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}