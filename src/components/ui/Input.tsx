import type { InputHTMLAttributes } from 'react'
import { useId } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Input({ label, id, className = '', ...rest }: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <fieldset
      className={`m-0 min-w-0 rounded-none border border-black bg-transparent px-3.5 pt-1.5 pb-2.5 focus-within:bg-cream-soft ${className}`.trim()}
    >
      <legend className="ml-1 px-1 text-[11px] font-medium text-black">
        <label htmlFor={inputId} className="cursor-pointer">
          {label}
        </label>
      </legend>
      <input
        id={inputId}
        className="w-full border-none bg-transparent py-1 text-sm text-black outline-none placeholder:text-black/40"
        {...rest}
      />
    </fieldset>
  )
}
