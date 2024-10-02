'use client'

import { selectJobItems, selectJobTotal } from "@/lib/features/job/jobSlice"
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
    const jobs = useAppSelector(state => selectJobItems(state))
    const incomeTotal = useAppSelector(state => selectJobTotal(state))
    const incomeItemElements = []
    
    for (const job in jobs) {
        incomeItemElements.push(<IncomeListItem key={job} item={jobs[job]} index={job} />)
    }

    function getTotal() {
        if (incomeTotal > 0) {
            return (t('list_income_total', {day_count: dayCount, amount: incomeTotal}))
        }

        return <></>
    }

    function addItemClicked() {
        router.push("/job/add")
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