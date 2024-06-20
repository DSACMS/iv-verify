import { ErrorMessage, Label, RequiredMarker, TextInput } from "@trussworks/react-uswds"
import React, { FocusEventHandler } from "react"

type Args = {
    id: string
    name: string
    label: string
    error: string | undefined
    onBlur: FocusEventHandler<HTMLInputElement>
    onChange: FocusEventHandler<HTMLInputElement>
    type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url',
    'data-testid'?: string
    requiredMarker?: boolean
}

const TextFieldWithValidation = React.forwardRef<HTMLInputElement, Args>(
    (args: Args, ref) => {
        const { id, name, label, error, onBlur, onChange, type } = args
        return (
            <>
                {label !== undefined ? <Label htmlFor={name} requiredMarker={args.requiredMarker}>{label}</Label> : ''}
                <TextInput
                    id={id}
                    name={name}
                    type={type !== undefined ? type : "text"}
                    inputRef={ref}
                    onBlur={onBlur}
                    onChange={onChange}
                    {...(error !== undefined ? {validationStatus: 'error'} : {})}
                    data-testid={args['data-testid']}
                />
                <ErrorMessage>{error}</ErrorMessage>
            </>
        )
    }
)

TextFieldWithValidation.displayName = "TextFieldWithValidation"
export default TextFieldWithValidation