'use client'

import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"

import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { Grid, GridContainer, Header, Title, Icon, Button, Accordion, HeadingLevel, NavMenuButton, PrimaryNav, NavDropDownButton, Link } from "@trussworks/react-uswds";
import { useState } from "react";
import VerifyNav from "./components/VerifyNav";

export default function Home() {
  const { t } = useTranslation()
  const router = useRouter()

  function getStartedClicked() {
    router.push('/benefits/')
  }

  const items = [
    {
      title: t('intro_how_do_i_know_header'),
      content: (
        <div>
          <p className="margin-bottom-3">{t('intro_how_do_i_know_body_list_header')}</p>
          <ul>
            <li>{t('intro_how_do_i_know_list_have_expenses')}</li>
            <li>{t('intro_how_do_i_know_list_they_receive')}</li>
            <li>{t('intro_how_do_i_know_list_own')}</li>
            <li>{t('intro_how_do_i_know_list_benefits')}</li>
          </ul>
        </div>
      ),
      expanded: false,
      id: 'intro_how_do_i_know',
      headingLevel: 'h4' as HeadingLevel,
    }
  ]
  
  return (
    <div>
      <VerifyNav title={t('intro_title')} />
      <div className="usa-section">
          <GridContainer>
              <Grid row gap>
                  <main className="usa-layout-docs">
                    <h3 className="margin-bottom-2" data-testid="intro_header">{t('intro_header')}</h3>
                    <span className="usa-hint">{t('intro_subheader')}</span>

                    <div className="margin-top-4">
                      <Icon.Lock className="margin-right-1" /> 
                      {t('intro_secure')}
                    </div>

                    <p className="text-center">
                      <Button type="button" onClick={getStartedClicked} data-testid="get_started_button" className="margin-bottom-3 margin-top-3">{t('intro_get_started_button')}</Button>
                    </p>

                    <Accordion multiselectable={true} items={items} />
                  </main>
              </Grid>
            </GridContainer>
      </div>
    </div>
  );
}
