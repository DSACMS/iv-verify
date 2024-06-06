import { ErrorMessage, Label, TextInput } from "@trussworks/react-uswds"
import React, { FocusEventHandler } from "react"

type Args = {
    id: string
    name: string
    label: string
    error: string | undefined
    onBlur: FocusEventHandler<HTMLInputElement>
    onChange: FocusEventHandler<HTMLInputElement>
    type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url'
}

const TextFieldWithValidation = React.forwardRef<HTMLInputElement, Args>(
    ({ id, name, label, error, onBlur, onChange, type }: Args, ref) => {
        return (
            <>
                {label !== undefined ? <Label htmlFor={name}>{label}</Label> : ''}
                <TextInput
                    id={id}
                    name={name}
                    type={type !== undefined ? type : "text"}
                    inputRef={ref}
                    onBlur={onBlur}
                    onChange={onChange}
                    {...(error !== undefined ? {validationStatus: 'error'} : {})}
                />
                <ErrorMessage>{error}</ErrorMessage>
            </>
        )
    }
)

TextFieldWithValidation.displayName = "TextFieldWithValidation"
export default TextFieldWithValidation