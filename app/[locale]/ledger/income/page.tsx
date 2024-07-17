'use client'

import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import VerifyNav from "@/app/components/VerifyNav"
import { Accordion, Button, Grid, GridContainer, HeadingLevel } from "@trussworks/react-uswds"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"

export default function Page() {
    const { t } = useTranslation()
    const router = useRouter()

    const items = [
        {
          title: t('income_landing_what_counts_header'),
          content: (
            <div>
              <p className="margin-top-3">{t('income_landing_what_counts_list_header')}</p>
              <ul className="margin-left-4">
                <li>{t('income_landing_what_counts_list_have_business')}</li>
                <li>{t('income_landing_what_counts_list_receive_form')}</li>
                <li>{t('income_landing_what_counts_list_own_businss')}</li>
                <li>{t('income_landing_what_counts_list_employment_benefits')}</li>
              </ul>
            </div>
          ),
          expanded: false,
          id: 'income_landing_what_counts',
          headingLevel: 'h4' as HeadingLevel,
        }
    ]

    function addClicked() {
        router.push('/ledger/income/add')
    }

    return (
        <div>
            <VerifyNav title={t('income_landing_title')} />
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3 className="margin-bottom-2" data-testid="income_landing_what_counts_heading">{t('income_landing_header')}</h3>
                            <p>{t('income_landing_ask_header')}</p>
                            <ul className="margin-left-3 margin-top-1">
                                <li>{t('income_landing_ask_who_paid')}</li>
                                <li>{t('income_landing_ask_what_type')}</li>
                                <li>{t('income_landing_ask_how_much')}</li>
                            </ul>
                            <Accordion multiselectable={true} items={items} className="margin-top-3 margin-bottom-3" />
                            <Button type="button" onClick={addClicked} data-testid="add_income_button">{t('income_landing_add')}</Button>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}