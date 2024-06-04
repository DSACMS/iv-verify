import { ErrorMessage, Label, TextInput } from "@trussworks/react-uswds"
import React from "react"

type Args = {
    id: string
    name: string
    label: string
    error: string | undefined
    onBlur: Function
    onChange: Function
    type?: string
}

export default React.forwardRef<HTMLInputElement, Args>(
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
                />
                <ErrorMessage>{error}</ErrorMessage>
            </>
        )
    }
)