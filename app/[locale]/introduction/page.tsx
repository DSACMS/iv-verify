'use client'

import { useTranslation } from "react-i18next"
import { useRouter } from "next/navigation"
import { 
    Button, 
    Grid, 
    GridContainer 
  } from "@trussworks/react-uswds";
import VerifyNav from "@/app/components/VerifyNav";

export default function Page() {
    const { t } = useTranslation()
    const router = useRouter()

    function continueButtonClicked() {
        router.push('/how-this-works');
    }

    return (
        <div>
            <VerifyNav title={t('introduction_title')} />
            <div className="usa-section">
                <GridContainer>
                <Grid row gap>
                    <main className="usa-layout-docs">
                        <h3 data-testid="placeholder_header">{t('placeholder_text')}</h3>
                        <span className="usa-hint">{t('placeholder_text')}</span>
                        <p className="text-center">
                            <Button type="button" 
                                onClick={continueButtonClicked} data-testid="introduction_continue_button" className="margin-bottom-3 margin-top-3">{t('introduction_continue_button')}</Button>
                        </p>
                    </main>
                </Grid>
                </GridContainer>
            </div>
        </div>
    )
}