import { useTranslation } from "react-i18next"
import { JobItem, PaymentItem, removeIncome } from "@/lib/features/job/jobSlice"
import { useAppDispatch } from "@/lib/hooks"
import { Grid, ModalToggleButton, Modal, ModalHeading, ModalFooter, ButtonGroup, Button } from "@trussworks/react-uswds"
import { useRef } from "react"
import { useRouter } from "next/navigation"
interface ItemProps {
    item: JobItem
    index: number
}
export default function IncomeListItem({ item, index }: ItemProps) {
    const ref = useRef(null)
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const payments = item.payments.map((payment: PaymentItem) => {
        return (<li key="{payment.idx}">{payment.date} ${payment.amount} {t('list_income_by')} {payment.payer}</li>)
    })

    function onDeleteClicked() {
        dispatch(removeIncome(index))
    }

    function editClicked() {
        router.push(`/job/edit/${index}`)
    }

    function addItemClicked() {
        router.push(`/job/${index}/payment/add`)
    }

    return (
        <Grid row gap className="margin-bottom-5">
            <Grid col={10}>
                <div>{item.description}</div>
                <div>{item.business}</div>
                <div>
                    <ul>
                        {payments}
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
                    <Button type="button" className="margin-top-2" onClick={addItemClicked} data-testid="add_another_button">{t('list_income_add_payment_button')}</Button>
                </ButtonGroup>

                <hr className="margin-top-2" />
            </Grid>
        </Grid>
    )
}