import { Button, ButtonGroup, Card, CardBody, CardGroup, CardHeader, GridContainer } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { ExpenseItem, selectExpenseItems, selectExpenseTotal } from "@/lib/features/job/expenses/expensesSlice";
import ExpenseListItem from "./ExpenseListItem";

interface ExpenseListProps {
    header: string
}

export default function ExpenseList({header}: ExpenseListProps) {
    const { t } = useTranslation()
    const router = useRouter()
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

    function addItemClicked() {
        router.push("/job/expense/add")
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
                    <ButtonGroup>
                        <Button type="button" className="margin-top-2" onClick={addItemClicked} data-testid="add_another_button">{t('expenses_summary_add_button')}</Button>
                    </ButtonGroup>
                </CardBody>
            </Card>
        </CardGroup>
    )
}