import { forwardRef } from 'react'
import type { SVGAttributes } from './types'

export const LinkOutIcon = forwardRef<SVGSVGElement, SVGAttributes>((props, ref) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" {...props} ref={ref}>
    <path d="M17.78 1.22C16.74.2 15.3 0 13.49 0h-7.7c-1.8 0-3.23.2-4.26 1.23C.5 2.25.31 3.67.31 5.46v7.65c0 1.82.2 3.23 1.22 4.26 1.03 1.03 2.46 1.23 4.28 1.23h7.68c1.82 0 3.26-.2 4.29-1.23 1.02-1.03 1.21-2.44 1.21-4.27V5.5c0-1.83-.19-3.25-1.21-4.27Zm-.75 3.99v8.17c0 1.05-.13 2-.7 2.56-.55.55-1.52.7-2.56.7H5.53c-1.03 0-2-.15-2.57-.7-.55-.56-.69-1.51-.69-2.56V5.23c0-1.06.14-2.02.7-2.58.55-.56 1.53-.7 2.59-.7h8.21c1.04 0 2.01.15 2.57.7.56.57.69 1.52.69 2.56Z" />
    <path d="M12.78 11.9c.5 0 .82-.38.82-.91V6.32c0-.68-.38-.99-1-.99H7.9c-.53 0-.88.32-.88.82 0 .5.35.82.9.82h1.7l1.37-.16-1.5 1.36L6 11.69a.93.93 0 0 0-.28.64c0 .53.36.87.87.87.27 0 .49-.1.67-.28l3.5-3.5 1.35-1.47-.14 1.45V11c0 .54.32.9.82.9Z" />
  </svg>
))
