'use client'
import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Header, Title, Button, FormGroup, Grid, GridContainer, Label, TextInput } from '@trussworks/react-uswds' 
import { useTranslation } from '../../../i18n/client'
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { addIncome, IncomeItem, selectIcomeItems } from "@/lib/features/ledger/income/incomeSlice"

export default function Page() {
    const { t } = useTranslation('en')
    const items = useAppSelector(state => selectIcomeItems(state))
    const dispatch = useAppDispatch()

    function addIncomeClicked() {
        const name = (document.querySelector('#add_income_what') as HTMLInputElement).value
        const description = (document.querySelector('#add_income_describe') as HTMLInputElement).value
        const amount = parseFloat((document.querySelector('#add_income_total_amount') as HTMLInputElement).value)

        const incomeItem: IncomeItem = {
            name,
            description,
            amount,
        }
        dispatch(addIncome(incomeItem))
    }

    const incomeItemElements = items.map((item: IncomeItem) => {
        return (
            <div>{item.name} - {item.description} - {item.amount}</div>
        )
    })

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
                                <TextInput id="add_income_total_amount" name="add_income_total_amount" type="number" />
                            </FormGroup>
                            <FormGroup>
                                <Button type="button" onClick={addIncomeClicked}>Continue</Button>
                            </FormGroup>
                            {incomeItemElements}
                        </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}
