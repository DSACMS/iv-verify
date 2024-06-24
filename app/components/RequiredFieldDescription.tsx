import { useTranslation } from 'react-i18next'
import { RequiredMarker } from "@trussworks/react-uswds"
import { Trans } from 'react-i18next'

export default function RequiredFieldDescription() {
    const { t } = useTranslation('en')
    return (
        <div className="margin-top-1">
            <Trans i18nKey="required_field_description" t={t} components={[<RequiredMarker key='asterisk' />]} />
        </div>
    )
}