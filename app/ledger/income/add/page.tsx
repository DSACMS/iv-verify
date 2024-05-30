'use client'
import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Header, Title, Button, FormGroup, Grid, GridContainer, Label, TextInput } from '@trussworks/react-uswds' 
import { useTranslation } from '../../../i18n/client'
export default function Page() {
    const { t } = useTranslation('en')
    return (
        <div>
            <Header basic={true}>
                <div className="usa-nav-container">
                    <div className="usa-navbar">
                        <Title>Add Income</Title>
                    </div>
                </div>
            </Header>
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h2>{t('add_income_header')}</h2>
                            <FormGroup>
                                <Label htmlFor="add_income_what">{t('add_income_what_name')}</Label>
                                <TextInput id="add_income_what" name="add_income_what" type="text" />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="add_income_describe">{t('add_income_describe')}</Label>
                                <TextInput id="add_income_describe" name="add_income_describe" type="text" />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="add_income_total_amount">{t('add_income_total_amount')}</Label>
                                <span className="usa-hint">{t('add_income_total_total')}</span>
                                <TextInput id="add_income_total_amount" name="add_income_total_amount" type="text" />
                            </FormGroup>
                            <FormGroup>
                                <Button type="button">Continue</Button>
                            </FormGroup>
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}
