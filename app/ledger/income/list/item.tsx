import { useTranslation } from "@/app/i18n/client"
import { IncomeItem, removeIncome } from "@/lib/features/ledger/income/incomeSlice"
import { useAppDispatch } from "@/lib/hooks"
import { Grid, ModalToggleButton, Modal, ModalHeading, ModalFooter, ButtonGroup } from "@trussworks/react-uswds"
import { useRef } from "react"
interface ItemProps {
    item: IncomeItem
    index: number
}
export default function({ item, index }: ItemProps) {
    const ref = useRef(null)
    const { t } = useTranslation('en')
    const dispatch = useAppDispatch()

    function onDeleteClicked() {
        dispatch(removeIncome(index))
    }

    return (
        <Grid row gap className="margin-bottom-5">
            <Grid col={1}>*</Grid>
            <Grid col={6} tablet={{col: 9}}>
                <div>{item.name}</div>
                <div>${item.amount}</div>
                <div>{item.description}</div>
            </Grid>
            <Grid col={5} tablet={{col: 2}}>
                <ModalToggleButton modalRef={ref} opener>{t('list_income_delete_button')}</ModalToggleButton>
                <Modal ref={ref} id="delete-modal">
                    <ModalHeading>{t('list_income_delete_are_you_sure')}</ModalHeading>
                    <ModalFooter>
                        <ButtonGroup>
                            <ModalToggleButton modalRef={ref} closer>{t('list_income_no_delete_item')}</ModalToggleButton>
                            <ModalToggleButton modalRef={ref} closer onClick={onDeleteClicked}>{t('list_income_yes_delete_item')}</ModalToggleButton>
                        </ButtonGroup>
                    </ModalFooter>
                </Modal>
            </Grid>
            <Grid col={12}><hr /></Grid>
        </Grid>
    )
}