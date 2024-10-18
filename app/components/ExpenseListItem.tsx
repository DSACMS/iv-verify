import { useTranslation } from "react-i18next"
import { useAppDispatch } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { useRef } from "react"

import { ExpenseItem, removeExpense } from "@/lib/features/job/expenses/expensesSlice"

import { 
  Button, 
  ButtonGroup,
  Grid, 
  Modal, 
  ModalFooter, 
  ModalHeading, 
  ModalToggleButton
} from "@trussworks/react-uswds"

interface ItemProps {
  expenseId: string
  jobId: string
  expense: ExpenseItem
}

export default function ExpenseListItem({ expenseId, jobId, expense }: ItemProps) {
  const ref = useRef(null)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const router = useRouter()

  function onDeleteClicked() {
    dispatch(removeExpense(expenseId))
  }

  function editClicked() {
    router.push(`/job/${jobId}/expense/edit/${expenseId}`)
  }

  return (
    <Grid row gap className="margin-bottom-5">
      <Grid col={10}>
        <div>${expense.amount}</div>
        <div>{expense.date}</div>
        <div>{expense.name}</div>
      </Grid>
      <Grid col={2}>
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