'use client'

import { IncomeItem, selectIncomeItems, selectIncomeTotal } from "@/lib/features/ledger/income/incomeSlice"
import { useAppSelector } from "@/lib/hooks"
import IncomeListItem from "./IncomeListItem"
import { Card, CardBody, CardGroup, CardHeader, GridContainer } from "@trussworks/react-uswds"
import { useTranslation } from "react-i18next"

interface Props {
    dayCount: number
    header: string
}

export default function IncomeList({dayCount, header}: Props) {
    const { t } = useTranslation()
    const items = useAppSelector(state => selectIncomeItems(state))
    const incomeTotal = useAppSelector(state => selectIncomeTotal(state))
    const incomeItemElements = items.map((item: IncomeItem, idx: number) => {
        return <IncomeListItem key={idx} item={item} index={idx} />
    })

    function getTotal() {
        if (incomeTotal > 0) {
            return (t('list_income_total', {day_count: dayCount, amount: incomeTotal}))
        }

        return <></>
    }

    return (
        <CardGroup>
            <Card className="grid-col-12 margin-top-4">
                <CardHeader><b>{header}</b></CardHeader>
                <CardBody>
                    <GridContainer>
                        {incomeItemElements}
                    </GridContainer>
                    {getTotal()}
                </CardBody>
            </Card>
        </CardGroup>
    )
}