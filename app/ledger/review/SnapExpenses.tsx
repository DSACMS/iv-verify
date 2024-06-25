import { BenefitsState } from "@/lib/features/benefits/benefitsSlice"
import { useTranslation } from "react-i18next"
import { Card, CardBody, CardGroup, CardHeader } from "@trussworks/react-uswds"

interface SnapExpensesProps {
    benefits: BenefitsState
    snapIncomeTotal: number
}

export default function SnapExpenses({benefits, snapIncomeTotal}: SnapExpensesProps) {
    const { t } = useTranslation()

    if (!benefits.snap || !benefits.deductionAmount) {
        return <></>
    }

    const deductionAmount = benefits.deductionAmount!
    const amount = (deductionAmount/100) * snapIncomeTotal

    return (
        <div>
            <CardGroup>
                <Card>
                    <CardHeader>{t('review_snap_expenses_header')}</CardHeader>
                    <CardBody>
                        <span data-testid="snap-body">{t('review_snap_expenses_body', {deduction: deductionAmount, amount})}</span>
                    </CardBody>
                </Card>
            </CardGroup>
        </div>
    )
}