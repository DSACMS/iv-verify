import { Alert, ValidationChecklist, ValidationItem } from "@trussworks/react-uswds"
import { FieldErrors } from "react-hook-form"

type Props = {
    errors: FieldErrors
    headingText: string
}

export default function ErrorSummary({errors, headingText}: Props) {
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
        <Alert type="error" validation heading={headingText} headingLevel="h3" className="margin-top-3">
            <ValidationChecklist id="validation-code">
                {validationItems}
            </ValidationChecklist>
        </Alert>
    )
}