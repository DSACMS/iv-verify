'use client';

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { 
  Accordion, 
  Button, 
  Grid, 
  GridContainer, 
  HeadingLevel, 
  ProcessList,
  ProcessListItem 
} from "@trussworks/react-uswds";
import VerifyNav from "@/app/components/VerifyNav";

export default function Page() {
  const { t } = useTranslation()
  const router = useRouter()

  function mainButtonClicked() {
    router.push('/introduction/benefits/');
  }

  const whatIsSelfEmployment = [{
    title: t('how_this_works_accordion_what_is_self_employment_title'),
    content: (
      <p>{t('placeholder_text')}</p>
    ),
    expanded: false,
    id: 'what_is_self_employment',
    headingLevel: 'h6' as HeadingLevel
  }];

  const whatExpensesCount = [{
    title: t('how_this_works_accordion_what_expenses_count_title'),
    content: (
      <p>{t('placeholder_text')}</p>
    ),
    expanded: false,
    id: 'what_expenses_count',
    headingLevel: 'h6' as HeadingLevel
  }];

  return (
    <div>
      <VerifyNav title={t('intro_title')} />
      <div className="usa-section">
        <GridContainer>
          <Grid row gap>
            <main className="usa-layout-docs">
              <h3 className="margin-bottom-2" data-testid="how_this_works_header">{t('how_this_works_header')}</h3>

              <ProcessList>
                <ProcessListItem>
                  <p>{t('how_this_works_process_list_1')}</p>
                  <Accordion multiselectable={true} items={whatIsSelfEmployment} />
                  <Accordion multiselectable={true} items={whatExpensesCount} />
                </ProcessListItem>
                <ProcessListItem>
                  <p>{t('how_this_works_process_list_2')}</p>
                </ProcessListItem>
                <ProcessListItem>
                  <p>{t('how_this_works_process_list_2')}</p>
                </ProcessListItem>
              </ProcessList>

              <p className="text-center">
                <Button type="button" onClick={mainButtonClicked} data-testid="get_started_button" className="margin-bottom-3 margin-top-3">{t('intro_get_started_button')}</Button>
              </p>
            </main>
          </Grid>
        </GridContainer>
      </div>
    </div>
  );
}