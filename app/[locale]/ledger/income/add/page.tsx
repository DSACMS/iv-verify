'use client'
import { Grid, GridContainer } from '@trussworks/react-uswds'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from "@/lib/hooks"
import { addIncome, IncomeItem } from "@/lib/features/ledger/income/incomeSlice"
import { useRouter } from "next/navigation"
import VerifyNav from "@/app/components/VerifyNav"
import IncomeItemForm, { IncomeItemFormData } from '@/app/[locale]/ledger/income/IncomeItemForm'

export default function Page() {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const router = useRouter()

    function addIncomeClicked({name, description, amount}: IncomeItemFormData) {

        const incomeItem: IncomeItem = {
            name,
            description,
            amount,
        }
        dispatch(addIncome(incomeItem))
        router.push('/ledger/income/list')
    }

    return (
        <div>
            <VerifyNav title={t('add_income_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t('add_income_header')}</h3>
                            <IncomeItemForm onSubmit={addIncomeClicked} />
                         </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}
