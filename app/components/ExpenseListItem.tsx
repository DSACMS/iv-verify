import { useTranslation } from "react-i18next"
import { ExpenseItem, removeExpense, selectExpensesByJob } from "@/lib/features/job/expenses/expensesSlice"
import { JobItem } from "@/lib/features/job/jobSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { 
    Button, 
    ButtonGroup,
    Grid, 
    Modal, 
    ModalFooter, 
    ModalHeading, 
    ModalToggleButton
} from "@trussworks/react-uswds"
import { useRef } from "react"

interface ItemProps {
    item: JobItem
    index: string
}
export default function ExpenseListItem({ item, index }: ItemProps) {
    const ref = useRef(null)
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const expenses = useAppSelector(state => selectExpensesByJob(state, index)).map((expense: ExpenseItem) => {
        return (<li key="expense.idx}">{expense.date} ${expense.amount} {expense.name} ({expense.expenseType})</li>)
    })

    function onDeleteClicked() {
        dispatch(removeExpense(index))
    }

    function editClicked() {
        router.push(`/job/expense/edit/${index}`)
    }

    return (
        <Grid row gap className="margin-bottom-5">
            <Grid col={10}>
                <div>{item.description}</div>
                <div>{item.business}</div>
                <div>
                    <ul>
                        {expenses}
                    </ul>
                </div>
            </Grid>
            <Grid col={5} tablet={{col: 2}}>
                <ModalToggleButton unstyled modalRef={ref} opener>{t('expenses_summary_list_delete')}</ModalToggleButton>
                <Modal ref={ref} id="delete-modal">
                    <ModalHeading>{t('expenses_summary_delete_are_you_sure')}</ModalHeading>
                    <ModalFooter>
                        <ButtonGroup>
                            <ModalToggleButton modalRef={ref} closer>{t('expenses_summary_no_delete_item')}</ModalToggleButton>
                            <ModalToggleButton modalRef={ref} closer onClick={onDeleteClicked}>{t('expenses_summary_yes_delete_item')}</ModalToggleButton>
                        </ButtonGroup>
                    </ModalFooter>
                </Modal>
                <Button type="button" unstyled onClick={editClicked}>{t('edit')}</Button>
            </Grid>
            <Grid col={12}><hr className="margin-top-2" /></Grid>
        </Grid>
    )
}