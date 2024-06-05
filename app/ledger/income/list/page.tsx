'use client'

import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Header, Title, Button, ButtonGroup, CardGroup, ModalToggleButton, Modal, ModalHeading, ModalFooter, Card, CardBody, CardHeader, Grid, GridContainer, Label, TextInput, ModalRef } from '@trussworks/react-uswds' 
import { useTranslation } from '../../../i18n/client'
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { removeIncome, IncomeItem, selectIcomeItems } from "@/lib/features/ledger/income/incomeSlice"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import Item from './item'

const DAY_COUNT = 30

export default function Page() {
    const { t } = useTranslation('en')
    const router = useRouter()
    const items = useAppSelector(state => selectIcomeItems(state))
    const dispatch = useAppDispatch()
    const deleteRef = useRef<ModalRef[]>([])

    const incomeItemElements = items.map((item: IncomeItem, idx: number) => {
        return <Item key={idx} item={item} index={idx} />
    })

    function addItemClicked() {
        router.push("/ledger/income/add")
    }

    function getTotal() {
        let total = items.reduce((t, item) => t + item.amount, 0)

        if (total > 0) {
            return (t('list_income_total', {day_count: DAY_COUNT, amount: total}))
        }

        return <></>
    }

    return (
        <div>
            <Header basic={true}>
                <div className="usa-nav-container">
                    <div className="usa-navbar">
                        <Title>{t('list_income_title')}</Title>
                    </div>
                </div>
            </Header>
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t('list_income_header', {day_count: DAY_COUNT})}</h3>
                            <span className="usa-hint">{t('list_income_subheader')}</span>
                            <CardGroup>
                                <Card className="grid-col-12 margin-top-4">
                                    <CardHeader><b>{t('list_income_list_header')}</b></CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            {incomeItemElements}
                                        </GridContainer>
                                        {getTotal()}
                                    </CardBody>
                                </Card>
                            </CardGroup>
                            <ButtonGroup type="default">
                                <Button type="button" onClick={addItemClicked}>{t('list_income_add_button')}</Button>
                                <Button type="button">{t('list_income_done_button')}</Button>
                            </ButtonGroup>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}
