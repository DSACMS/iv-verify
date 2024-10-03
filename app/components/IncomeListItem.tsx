import { useTranslation } from "react-i18next"
import { useAppSelector } from "@/lib/hooks"
import { JobItem, removeJob } from "@/lib/features/job/jobSlice"
import { PaymentItem, selectPaymentsByJob } from "@/lib/features/job/payment/paymentSlice"
import { selectExpensesByJob } from "@/lib/features/job/expenses/expensesSlice"
import { useAppDispatch } from "@/lib/hooks"
import { Grid, ModalToggleButton, Modal, ModalHeading, ModalFooter, ButtonGroup, Button } from "@trussworks/react-uswds"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { ExpenseItem } from "@/lib/features/job/expenses/expensesSlice"

interface ItemProps {
    item: JobItem
    index: string
}
export default function IncomeListItem({ item, index }: ItemProps) {
    const ref = useRef(null)
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const payments = useAppSelector(state => selectPaymentsByJob(state, index)).map((payment: PaymentItem) => {
        return (<li key="{payment.idx}">{payment.date} ${payment.amount} {t('list_income_by')} {payment.payer}</li>)
    })
    const expenses = useAppSelector(state => selectExpensesByJob(state, index)).map((expense: ExpenseItem) => {
        return (<li key="expense.idx}">{expense.date} ${expense.amount} {expense.name} ({expense.expenseType})</li>)
    })

    function onDeleteClicked() {
        dispatch(removeJob(index))
    }

    function editClicked() {
        router.push(`/job/edit/${index}`)
    }

    function addPaymentClicked() {
        router.push(`/job/${index}/payment/add`)
    }

    function addExpenseClicked() {
        router.push(`/job/${index}/expense/add`)
    }

    return (
        <Grid row gap className="margin-bottom-5">
            <Grid col={10}>
                <div>{item.description}</div>
                <div>{item.business}</div>
                <h4>Payments</h4>
                <div>
                    <ul>
                        {payments}
                    </ul>
                </div>
                <h4>Expenses</h4>
                <div>
                    <ul>
                        {expenses}
                    </ul>
                </div>
            </Grid>
            <Grid col={2}>
                <ModalToggleButton modalRef={ref} opener unstyled className="margin-bottom-2 desktop:grid-col-12">{t('list_income_delete_button')}</ModalToggleButton>
                <Modal ref={ref} id="delete-modal">
                    <ModalHeading>{t('list_income_delete_are_you_sure')}</ModalHeading>
                    <ModalFooter>
                        <ButtonGroup>
                            <ModalToggleButton modalRef={ref} closer>{t('list_income_no_delete_item')}</ModalToggleButton>
                            <ModalToggleButton modalRef={ref} closer onClick={onDeleteClicked}>{t('list_income_yes_delete_item')}</ModalToggleButton>
                        </ButtonGroup>
                    </ModalFooter>
                </Modal>
                <Button type="button" className="desktop:grid-col-12 usa-button--unstyled" onClick={editClicked}>{t('edit')}</Button>
            </Grid>
            <Grid col={12}>
                <ButtonGroup>
                    <Button type="button" className="margin-top-2" onClick={addPaymentClicked} data-testid="add_another_button">{t('list_income_add_payment_button')}</Button>
                    <Button type="button" className="margin-top-2" onClick={addExpenseClicked} data-testid="add_another_button">{t('list_income_add_expense_button')}</Button>
                </ButtonGroup>

                <hr className="margin-top-2" />
            </Grid>
        </Grid>
    )
}