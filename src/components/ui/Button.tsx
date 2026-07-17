import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'link'

const base =
  'inline-flex items-center gap-1 text-[13px] font-medium leading-none whitespace-nowrap transition duration-100 active:scale-[0.98]'

const variants: Record<ButtonVariant, string> = {
  primary:
    'rounded-full border border-black bg-black px-[18px] py-2.5 text-white hover:opacity-85',
  ghost:
    'rounded-full border border-black bg-transparent px-[18px] py-[9px] text-black hover:bg-black hover:text-white',
  link: 'bg-transparent p-0 font-medium underline hover:opacity-70',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`.trim()} {...rest}>
      {children}
    </button>
  )
}
