import { Card, CardBody, CardGroup, CardHeader, GridContainer } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/lib/hooks";
import { ExpenseItem, selectExpenseItems, selectExpenseTotal } from "@/lib/features/ledger/expenses/expensesSlice";
import ExpenseListItem from "./ExpenseListItem";

interface ExpenseListProps {
    header: string
}

export default function ExpenseList({header}: ExpenseListProps) {
    const { t } = useTranslation()
    const items = useAppSelector(state => selectExpenseItems(state))
    const expenseTotal = useAppSelector(state => selectExpenseTotal(state))

    const expenseItemElements = items.map((item: ExpenseItem, idx: number) => {
        return <ExpenseListItem key={idx} item={item} index={idx} />
    })

    function getTotal() {
        if (expenseTotal > 0) {
            return (t('expenses_summary_total', {amount: expenseTotal}))
        }

        return <></>
    }

    return (
        <CardGroup>
            <Card className="grid-col-12 margin-top-4">
                <CardHeader><b>{header}</b></CardHeader>
                <CardBody>
                    <GridContainer>
                        {expenseItemElements}
                    </GridContainer>
                    { getTotal() }
                </CardBody>
            </Card>
        </CardGroup>
    )
}