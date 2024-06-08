'use client'
import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Header, Title, Button, Form, FormGroup, Grid, GridContainer, Alert, Checkbox, DatePicker, ErrorMessage, ComboBox, Label, ValidationChecklist, ValidationItem } from '@trussworks/react-uswds' 
import { useTranslation } from '@/app/i18n/client'
import { useAppDispatch } from "@/lib/hooks"
import { ExpenseItem, addExpense, selectExpenseItems } from "@/lib/features/ledger/expenses/expensesSlice"
import { useRouter } from "next/navigation"
import { FieldErrors, SubmitHandler, useForm, Controller } from "react-hook-form"
import TextFieldWithValidation from "@/app/components/TextFieldWithValidation"
import { useRef, useImperativeHandle } from "react"
import exp from "constants"

export default function Page() {
    const { t } = useTranslation('en')
    const dispatch = useAppDispatch()
    const router = useRouter()

    type FormData = {
        name: string
        expenseType: string
        amount: number
        isMileage: boolean
        date: string
    }

    const {
        register,
        control,
        formState: { errors },
        handleSubmit
    } = useForm<FormData>({ defaultValues: { isMileage: false }})

    const expenseTypeOptions = [
        t('add_expense_materials'),
        t('add_expense_travel'),
        t('add_expense_equipment'),
        t('add_expense_advertising'),
        t('add_expense_cost'),
        t('add_expense_other')
    ].map((str) => {
        return { value: str, label: str }
    })

    const onSubmit: SubmitHandler<FormData> = (data => {
        const expenseItem: ExpenseItem = {
            name: data.name,
            expenseType: data.expenseType,
            amount: data.amount,
            isMileage: data.isMileage,
            date: new Date(data.date)
        }

        dispatch(addExpense(expenseItem))
        router.push('/ledger/expense/list')
    })

    function errorSummary() {
        if (!errors) {
            return <></>
        }

        const validationItems = Object.keys(errors).filter((key) => {
            return (errors as any)[key]?.message
        }).map((key => {
            return <ValidationItem id={key} key={key} isValid={false}>{(errors as any)[key]?.message}</ValidationItem>
        }))

        if (validationItems.length == 0) {
            return <></>
        }

        return (
            <Alert type="error" validation heading="Expense Requirements" headingLevel="h3" className="margin-top-3">
                <ValidationChecklist id="validation-code">
                    {validationItems}
                </ValidationChecklist>
            </Alert>
        )
    }

    return (
        <div>
            <Header basic={true}>
                <div className="usa-nav-container">
                    <div className="usa-navbar">
                        <Title>{t('add_expense_title')}</Title>
                    </div>
                </div>
            </Header>
            <div className="usa-section">
                <GridContainer>
                    <Grid row gap>
                        <main className="usa-layout-docs">
                            <h3>{t('add_expense_header')}</h3>
                            <h4 className="margin-top-2">{t('add_expense_subheader', {month_count: '3'})}</h4>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                {errorSummary()}
                                <FormGroup>
                                    <TextFieldWithValidation
                                        id="name"
                                        {...register("name", {required:{value: true, message: t('add_expense_name_required')}})}
                                        label={t('add_expense_name_field')}
                                        error={errors.name?.message}
                                        data-testid="name"
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Controller
                                        name="isMileage"
                                        control={control}
                                        render={({ field }) => 
                                            <Checkbox
                                                id="isMileage"
                                                {...field}
                                                label={t('add_expense_mileage_field')}
                                                value="true"
                                                data-testid="isMileage"
                                            />
                                        }
                                    />

                                </FormGroup>

                                <FormGroup>
                                    <Controller
                                        name="date"
                                        control={control}
                                        rules={{ required: {value:true, message: t('add_expense_date_required')} }}
                                        render={({ field }) => (
                                            <>
                                                <Label htmlFor="date">{t('add_expense_date_field')}</Label>
                                                <p className="usa-hint font-body-2xs">{t('add_expense_date_hint')}</p>
                                                <DatePicker
                                                    id="date"
                                                    data-testid="date"
                                                    {...field}
                                                    {...(errors.date?.message !== undefined ? {validationStatus: 'error'} : {})}
                                                />
                                            </>
                                            )
                                        }
                                        />
                                </FormGroup>

                                <FormGroup>
                                    <TextFieldWithValidation
                                        id="amount"
                                        {...register("amount", { valueAsNumber:true, validate: (value) => value > 0, required:{value: true, message: t('add_expense_amount_required')}})}
                                        label={t('add_expense_amount_field')}
                                        error={errors.amount?.message}
                                        data-testid="amount"
                                    />
                                </FormGroup>
                                
                                <FormGroup>
                                    <Controller
                                        name="expenseType"
                                        control={control}
                                        // Question if this field is optional or required https://confluenceent.cms.gov/pages/viewpage.action?spaceKey=SFIV&title=IRT+Epics+and+Stories
                                        // rules={{ required: {value: true, message: t('add_expense_type_required')}}}
                                        render={({ field }) => (
                                            <>
                                                <Label htmlFor="expenseType">{t('add_expense_type_field')}</Label>
                                                <p className="usa-hint font-body-2xs">{t('add_expense_type_hint')}</p>
                                                <ComboBox
                                                    id="expenseType"
                                                    options={expenseTypeOptions}
                                                    {...field}
                                                    data-testid="expenseType"
                                                />
                                            </>
                                            )
                                        }
                                    />
                                </FormGroup>

                                <Button type="submit" data-testid="continue_button">{t('add_expense_continue_button')}</Button>
                            </Form>
                         </main>
                    </Grid>
                </GridContainer>
            </div>
        </div>
    )
}