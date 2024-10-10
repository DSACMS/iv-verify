import { useTranslation } from "react-i18next"
import { PaymentItem, removePayment } from "@/lib/features/job/payment/paymentSlice"
import { useAppDispatch } from "@/lib/hooks"
import { Grid, ModalToggleButton, Modal, ModalHeading, ModalFooter, ButtonGroup, Button } from "@trussworks/react-uswds"
import { useRef } from "react"
import { useRouter } from "next/navigation"

interface ItemProps {
  paymentId: string
  jobId: string
  payment: PaymentItem
}
export default function IncomeListItem({ paymentId, jobId, payment }: ItemProps) {
    const ref = useRef(null)
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const router = useRouter()

    function onDeleteClicked() {
        dispatch(removePayment(paymentId))
    }

    function editClicked() {
        router.push(`/job/${jobId}/payment/${paymentId}/edit`)
    }

    

    return (
      <Grid row gap className="border-bottom">
        <Grid col={10}>
          <div>${payment.amount}</div>
          <div>{payment.date}</div>
          <div>{payment.payer}</div>
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
      </Grid>
    )
}