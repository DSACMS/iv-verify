'use client'
import VerifyNav from "@/app/components/VerifyNav"
import { JobItem, selectJobItemAt, setJobItem } from "@/lib/features/job/jobSlice"
import { useAppSelector } from "@/lib/hooks"
import { Grid, GridContainer } from "@trussworks/react-uswds"
import { useTranslation } from "react-i18next"
import IncomeFormJob, { IncomeFormJobData } from "@/app/[locale]/job/IncomeFormJob"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"

export default function EditIncome({ params }: { params: { idx: number } }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const router = useRouter()
    const item = useAppSelector(state => selectJobItemAt(state, params.idx))

    function editIncomeClicked({description, business, taxesFiled}: IncomeFormJobData) {
        dispatch(setJobItem({
            item: {
                description,
                business,
                taxesFiled
            } as JobItem,
            idx: params.idx,
        }))

        router.push(`/job/list`)
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