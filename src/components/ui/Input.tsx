import type { InputHTMLAttributes } from 'react'
import { forwardRef, useId } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, id, className = '', ...rest }: InputProps, ref) => {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <fieldset
      className={`m-0 min-w-0 rounded-none border-3 border-black bg-transparent px-3.5 pt-1.5 pb-2.5 focus-within:bg-cream-soft ${className}`.trim()}
    >
      <legend className="ml-1 px-1 text-[11px] font-medium text-black">
        <label htmlFor={inputId} className="cursor-pointer font-bold text-base">
          {label}
        </label>
      </legend>
      <input
        ref={ref}
        id={inputId}
        className="w-full border-none bg-transparent py-1 text-sm text-black outline-none placeholder:text-black/40"
        {...rest}
      />
    </fieldset>
  )
})
