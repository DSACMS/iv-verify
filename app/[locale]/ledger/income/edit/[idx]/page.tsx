'use client'
import VerifyNav from "@/app/components/VerifyNav"
import { IncomeItem, selectIncomeItemAt, setIncomeItem } from "@/lib/features/ledger/income/incomeSlice"
import { useAppSelector } from "@/lib/hooks"
import { Grid, GridContainer } from "@trussworks/react-uswds"
import { useTranslation } from "react-i18next"
import IncomeFormJob, { IncomeFormJobData } from "@/app/[locale]/ledger/income/IncomeFormJob"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"

export default function EditIncome({ params }: { params: { idx: number } }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const router = useRouter()
    const item = useAppSelector(state => selectIncomeItemAt(state, params.idx))

    function editIncomeClicked({name, description, amount}: IncomeFormJobData) {
        dispatch(setIncomeItem({
            item: {
                name,
                description,
                amount,
            } as IncomeItem,
            idx: params.idx,
        }))

        router.push('/ledger/income/list')
    }

    return (
        <div>
            <VerifyNav title={t('edit_income_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t('edit_income_header')}</h3>
                            <IncomeFormJob onSubmit={editIncomeClicked} item={item} />
                         </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}