import { BenefitsState } from "@/lib/features/benefits/benefitsSlice"
import { Card, CardBody, CardGroup, CardHeader } from "@trussworks/react-uswds"
import { useTranslation } from "react-i18next"

interface SnapExpensesProps {
    benefits: BenefitsState
    snapIncomeTotal: number
}

export default function SnapExpenses({benefits, snapIncomeTotal}: SnapExpensesProps) {
    const { t } = useTranslation('en')

    if (!benefits.snap || !benefits.deductionAmount) {
        return <></>
    }

    const deductionAmount = benefits.deductionAmount!
    const amount = (deductionAmount/100) * snapIncomeTotal

    return (
        <div>
            <CardGroup>
                <Card>
                    <CardHeader>{t('review_span_expenses_header')}</CardHeader>
                    <CardBody>
                        {t('review_snap_expenses_body', {deduction: deductionAmount, amount})}
                    </CardBody>
                </Card>
            </CardGroup>
        </div>
    )
}