'use client'

import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Header, Title, Button, HeadingLevel, Grid, GridContainer, Accordion } from '@trussworks/react-uswds' 
import { useTranslation } from '../../i18n/client'
import { useRouter } from "next/navigation"
import Link from 'next/link'

export default function Page() {
    const { t } = useTranslation('en')
    const router = useRouter()

    const testItems = [
        {
          title: t('expenses_landing_what_counts_heading'),
          content: (
            <div>
              {t('expenses_landing_what_counts_body')}
              <p className="margin-top-3">{t('expenses_landing_what_counts_list_header')}</p>
              <ul className="margin-left-4">
                <li>{t('expenses_landing_what_counts_list_one')}</li>
                <li>{t('expenses_landing_what_counts_list_two')}</li>
                <li>{t('expenses_landing_what_counts_list_three')}</li>
                <li>{t('expenses_landing_what_counts_list_four')}</li>
                <li>{t('expenses_landing_what_counts_list_five')}</li>
                <li>{t('expenses_landing_what_counts_list_six')}</li>
              </ul>
            </div>
          ),
          expanded: true,
          id: 'expenses_landing_what_counts',
          headingLevel: 'h4' as HeadingLevel,
        }, {
            title: t('expenses_landing_need_heading'),
            content: (
                <p>
                    {t('expenses_landing_need_body')}
                </p>
            ),
            expanded: true,
            id: 'expenses_landing_need',
            headingLevel: 'h4' as HeadingLevel,
        }
    ]

    function addItemClicked() {
        router.push("/ledger/expense/add")
    }

    return (
        <div>
            <Header basic={true}>
                <div className="usa-nav-container">
                    <div className="usa-navbar">
                        <Title>{t('expenses_landing_title')}</Title>
                    </div>
                </div>
            </Header>
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3 className="margin-bottom-2" data-testid="expenses_landing_what_counts_heading">{t('expenses_landing_heading')}</h3>
                            <span className="usa-hint">{t('expenses_landing_subheading')}</span>
                            <Accordion multiselectable={true} items={testItems} className="margin-top-3 margin-bottom-3" />
                            <p className="text-center">
                                <Button type="button" onClick={addItemClicked} data-testid="add_expenses_button" className="margin-bottom-3">{t('expenses_landing_add_button')}</Button>
                                <br />
                                <Link href="/ledger/expenses/summary" data-testid="no_expenses_link" className="usa-link">{t('expenses_landing_do_not_have_link')}</Link>
                            </p>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}