import { ErrorMessage, Label, TextInput } from "@trussworks/react-uswds"
import React, { FocusEventHandler } from "react"

type Args = {
  id: string
  name: string
  label?: string
  hint?: string
  error: string | undefined
  onBlur: FocusEventHandler<HTMLInputElement>
  onChange: FocusEventHandler<HTMLInputElement>
  type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url',
  'data-testid'?: string
  requiredMarker?: boolean
  value?: string
}

const TextFieldWithValidation = React.forwardRef<HTMLInputElement, Args>(
  (args: Args, ref) => {
    const { id, name, label, hint, error, onBlur, onChange, type, value } = args
    return (
      <>
        {label !== undefined ? 
          <Label htmlFor={name} className="text-bold" requiredMarker={args.requiredMarker}>{label}</Label> : 
          ''
        }
        {hint !== undefined ? 
          <span className="usa-hint">
            {hint}
          </span> :
          ''
        }
        <TextInput
          id={id}
          name={name}
          type={type !== undefined ? type : "text"}
          inputRef={ref}
          onBlur={onBlur}
          onChange={onChange}
          {...(error !== undefined ? {validationStatus: 'error'} : {})}
          data-testid={args['data-testid']}
          defaultValue={value}
        />
        <ErrorMessage>{error}</ErrorMessage>
      </>
    )
  }
)

TextFieldWithValidation.displayName = "TextFieldWithValidation"
export default TextFieldWithValidation