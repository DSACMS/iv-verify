import { ErrorMessage, Label, Textarea } from "@trussworks/react-uswds"
import React, { FocusEventHandler } from "react"

type Args = {
    id: string
    name: string
    label: string
    error: string | undefined
    onBlur: FocusEventHandler<HTMLTextAreaElement>
    onChange: FocusEventHandler<HTMLTextAreaElement>
    'data-testid'?: string
    className?: string
}

const TextAreaWithValidation = React.forwardRef<HTMLTextAreaElement, Args>(
    (args: Args, ref) => {
        const { id, name, label, error, onBlur, onChange, className } = args
        return (
            <>
                {label !== undefined ? <Label htmlFor={name}>{label}</Label> : ''}
                <Textarea
                    id={id}
                    name={name}
                    inputRef={ref}
                    onBlur={onBlur}
                    onChange={onChange}
                    {...(error !== undefined ? {validationStatus: 'error'} : {})}
                    data-testid={args['data-testid']}
                    className={className}
                />
                <ErrorMessage>{error}</ErrorMessage>
            </>
        )
    }
)

TextAreaWithValidation.displayName = "TextAreaWithValidation"
export default TextAreaWithValidation