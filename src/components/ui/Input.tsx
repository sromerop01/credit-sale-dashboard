import type { InputHTMLAttributes } from 'react'
import { useId } from 'react'
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Input({ label, id, className = '', ...rest }: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <fieldset className={`${styles.field} ${className}`.trim()}>
      <legend className={styles.legend}>
        <label htmlFor={inputId}>{label}</label>
      </legend>
      <input id={inputId} className={styles.input} {...rest} />
    </fieldset>
  )
}
