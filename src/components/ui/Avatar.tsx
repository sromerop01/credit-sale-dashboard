import type { AcumenColor } from '@/types'

type AvatarSize = 'sm' | 'md' | 'lg'

const base =
  'inline-flex shrink-0 select-none items-center justify-center rounded-full font-bold'

const sizes: Record<AvatarSize, string> = {
  sm: 'size-7 text-[10px]',
  md: 'size-9 text-xs',
  lg: 'size-14 text-lg',
}

const colors: Record<AcumenColor, string> = {
  cyan: 'bg-cyan text-black',
  royal: 'bg-royal text-white',
  green: 'bg-green text-black',
  rust: 'bg-rust text-white',
  mint: 'bg-mint text-black',
  navy: 'bg-navy text-cream',
  mostaza: 'bg-mostaza text-white',
}

interface AvatarProps {
  initials: string
  color?: AcumenColor
  size?: AvatarSize
}

export function Avatar({ initials, color = 'royal', size = 'md' }: AvatarProps) {
  return <div className={`${base} ${colors[color]} ${sizes[size]}`}>{initials}</div>
}
