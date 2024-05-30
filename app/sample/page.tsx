'use client'
import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"
import { Alert } from '@trussworks/react-uswds' 
import { useTranslation } from '../i18n/client'
export default function Page() {
    const { t } = useTranslation('en')
    return (
        <div>
            {t('first')}
            <Alert type="success" heading="Success status!" headingLevel="h4">Hello Joey</Alert>
        </div>
    )
}
