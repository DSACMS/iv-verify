'use client'
import { Grid, GridContainer } from '@trussworks/react-uswds'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addJob, SetJobPayload, selectJobCount } from "@/lib/features/job/jobSlice"
import { useRouter } from "next/navigation"
import VerifyNav from "@/app/components/VerifyNav"
import IncomeFormJob, { IncomeFormJobData } from '@/app/[locale]/job/IncomeFormJob'
import { createUuid } from '@/lib/store'

export default function Page() {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const jobCount = useAppSelector(state => selectJobCount(state))

    function addIncomeClicked({description, business, taxesFiled}: IncomeFormJobData) {
        const id = createUuid()
        const jobPayload: SetJobPayload = {
            id, 
            item: {
                description,
                business,
                taxesFiled 
            }
        }


        dispatch(addJob(jobPayload))
        router.push(`/job/${id}/payment/add`)
    }

    return (
        <div>
            <VerifyNav title={t('add_income_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t(
                                'add_income_header', 
                                {'nth': jobCount === 0 ? 'first': 'next'}
                            )}</h3>
                            <IncomeFormJob onSubmit={addIncomeClicked} />
                         </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}