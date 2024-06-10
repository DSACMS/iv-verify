'use client'

import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Header, Title, Button, ButtonGroup, CardGroup, ModalToggleButton, Modal, ModalHeading, ModalFooter, Card, CardBody, CardHeader, Grid, GridContainer, Label, TextInput, ModalRef } from '@trussworks/react-uswds' 
import { useTranslation } from '../../../i18n/client'
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { ExpenseItem, selectExpenseItems } from "@/lib/features/ledger/expenses/expensesSlice"
import Item from "./item"

export default function Page() {
    const { t } = useTranslation('en')
    const router = useRouter()
    const items = useAppSelector(state => selectExpenseItems(state))

    const expenseItemElements = items.map((item: ExpenseItem, idx: number) => {
        return <Item key={idx} item={item} index={idx} />
    })

    console.log('items' ,items)

    function addItemClicked() {
        router.push("/ledger/expense/add")
    }

    function getTotal() {
        let total = items.reduce((t, item) => t + item.amount, 0)

        if (total > 0) {
            return (t('expenses_summary_total', {amount: total}))
        }

        return <></>
    }

    return (
        <div>
            <Header basic={true}>
                <div className="usa-nav-container">
                    <div className="usa-navbar">
                        <Title data-testid="list_expense_title">{t('expenses_summary_title')}</Title>
                    </div>
                </div>
            </Header>
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t('expenses_summary_header')}</h3>
                            <span className="usa-hint">{t('expenses_summary_subheader')}</span>
                            <CardGroup>
                                <Card className="grid-col-12 margin-top-4">
                                    <CardHeader><b>{t('expenses_summary_list_header')}</b></CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            {expenseItemElements}
                                        </GridContainer>
                                        { getTotal() }
                                    </CardBody>
                                </Card>
                            </CardGroup>
                            <ButtonGroup type="default">
                                <Button type="button" onClick={addItemClicked} data-testid="add_another_button">{t('expenses_summary_add_button')}</Button>
                                <Button type="button" data-testid="continue_button">{t('expenses_summary_review_button')}</Button>
                            </ButtonGroup>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}