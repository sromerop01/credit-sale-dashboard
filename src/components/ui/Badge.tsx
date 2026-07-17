import type { ReactNode } from 'react'

type BadgeTone = 'green' | 'rust' | 'cyan' | 'royal' | 'mint' | 'navy' | 'neutral'

const base =
  'inline-block whitespace-nowrap rounded-full border border-black px-2.5 py-[3px] text-center text-[11px] font-medium leading-[1.4]'

const tones: Record<BadgeTone, string> = {
  green: 'bg-green text-black',
  rust: 'border-rust bg-rust text-white',
  cyan: 'bg-cyan text-black',
  royal: 'border-royal bg-royal text-white',
  mint: 'bg-mint text-black',
  navy: 'border-navy bg-navy text-cream',
  neutral: 'bg-transparent text-black',
}

interface BadgeProps {
  tone?: BadgeTone
  children: ReactNode
}

export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={`${base} ${tones[tone]}`}>{children}</span>
}
