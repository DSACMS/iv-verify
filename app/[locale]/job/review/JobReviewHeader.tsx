import { BenefitsState } from "@/lib/features/benefits/benefitsSlice"
import { useTranslation } from "react-i18next"

interface ReviewHeaderProps {
  benefits: BenefitsState
  snapIncomeTotal: number
  medicaidIncomeTotal: number
}

export default function JobReviewHeader({benefits, snapIncomeTotal, medicaidIncomeTotal}: ReviewHeaderProps) {
  const { t } = useTranslation()

  if (benefits.medicaid && benefits.snap) {
    return (
      <div>
        <h3 className="margin-bottom-3" data-testid="review-header">{t("review_header")}</h3>
        <h4>{t("review_snap_income", {amount:snapIncomeTotal})}</h4>
        <h4>{t("review_medicaid_income", {amount:medicaidIncomeTotal})}</h4>
        <p className="margin-top-3">{t("review_ledger_sent_medicaid_snap")}</p>
      </div>
    )
  } else if (benefits.medicaid) {
    return (
      <div>
        <h3 className="margin-bottom-3" data-testid="medicaid-only-header">{t("review_medicaid_only_income", {amount: medicaidIncomeTotal})}</h3>
        <p>{t("review_ledger_sent_medicaid_only")}</p>
      </div>
    )
  } else if (benefits.snap) {
    return (
      <div>
        <h3 className="margin-bottom-3" data-testid="snap-only-header">{t("review_snap_only_income", {amount: snapIncomeTotal})}</h3>
        <p>{t("review_ledger_sent_snap_only")}</p>
      </div>
    )
  }

  return <></>
}
