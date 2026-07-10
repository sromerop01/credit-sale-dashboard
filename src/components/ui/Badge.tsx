import type { ReactNode } from 'react'
import styles from './Badge.module.css'

type BadgeTone = 'green' | 'rust' | 'cyan' | 'royal' | 'mint' | 'navy' | 'neutral'

interface BadgeProps {
  tone?: BadgeTone
  children: ReactNode
}

export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>
}
