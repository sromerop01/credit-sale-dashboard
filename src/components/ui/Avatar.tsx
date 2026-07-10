import type { AcumenColor } from '../../types'
import styles from './Avatar.module.css'

type AvatarSize = 'sm' | 'md' | 'lg'

interface AvatarProps {
  initials: string
  color?: AcumenColor
  size?: AvatarSize
}

export function Avatar({ initials, color = 'royal', size = 'md' }: AvatarProps) {
  return (
    <div className={`${styles.avatar} ${styles[color]} ${styles[size]}`}>
      {initials}
    </div>
  )
}
