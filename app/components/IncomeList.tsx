'use client'

import { JobItem, selectIncomeItems, selectIncomeTotal } from "@/lib/features/job/income/incomeSlice"
import { useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import IncomeListItem from "./IncomeListItem"
import { Button, ButtonGroup, Card, CardBody, CardGroup, CardHeader, GridContainer } from "@trussworks/react-uswds"
import { useTranslation } from "react-i18next"

interface Props {
    dayCount: number
    header: string
}

export default function IncomeList({dayCount, header}: Props) {
    const { t } = useTranslation()
    const router = useRouter()
    const items = useAppSelector(state => selectIncomeItems(state))
    const incomeTotal = useAppSelector(state => selectIncomeTotal(state))
    const incomeItemElements = items.map((item: JobItem, idx: number) => {
        return <IncomeListItem key={idx} item={item} index={idx} />
    })

    function getTotal() {
        if (incomeTotal > 0) {
            return (t('list_income_total', {day_count: dayCount, amount: incomeTotal}))
        }

        return <></>
    }

    function addItemClicked() {
        router.push("/job/income/add")
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
                    <ButtonGroup>
                        <Button type="button" className="margin-top-2" onClick={addItemClicked} data-testid="add_another_button">{t('list_income_add_job_button')}</Button>
                    </ButtonGroup>
                </CardBody>
            </Card>
        </CardGroup>
    )
}