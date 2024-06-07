import { useTranslation } from "@/app/i18n/client"
import { ExpenseItem, removeExpense } from "@/lib/features/ledger/expenses/expensesSlice"
import { useAppDispatch } from "@/lib/hooks"
import { Grid, ModalToggleButton, Modal, ModalHeading, ModalFooter, ButtonGroup } from "@trussworks/react-uswds"
import { useRef } from "react"
type NewType = ExpenseItem

interface ItemProps {
    item: NewType
    index: number
}
export default function Item({ item, index }: ItemProps) {
    const ref = useRef(null)
    const { t } = useTranslation('en')
    const dispatch = useAppDispatch()

    function onDeleteClicked() {
        dispatch(removeExpense(index))
    }

    const dateStr = item.date.toDateString()

    return (
        <Grid row gap className="margin-bottom-5">
            <Grid col={1}>*</Grid>
            <Grid col={6} tablet={{col: 9}}>
                <div>{item.name}</div>
                <div>{dateStr}</div>
                <div>{`$${item.amount}`}</div>
            </Grid>
            <Grid col={5} tablet={{col: 2}}>
                <ModalToggleButton modalRef={ref} opener>{t('expenses_summary_list_delete')}</ModalToggleButton>
                <Modal ref={ref} id="delete-modal">
                    <ModalHeading>{t('expenses_summary_delete_are_you_sure')}</ModalHeading>
                    <ModalFooter>
                        <ButtonGroup>
                            <ModalToggleButton modalRef={ref} closer>{t('expenses_summary_no_delete_item')}</ModalToggleButton>
                            <ModalToggleButton modalRef={ref} closer onClick={onDeleteClicked}>{t('expenses_summary_yes_delete_item')}</ModalToggleButton>
                        </ButtonGroup>
                    </ModalFooter>
                </Modal>
            </Grid>
            <Grid col={12}><hr /></Grid>
        </Grid>
    )
}