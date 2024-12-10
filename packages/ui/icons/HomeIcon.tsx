import { forwardRef } from 'react'
import type { SVGAttributes } from './types'

export const HomeIcon = forwardRef<SVGSVGElement, SVGAttributes>((props, ref) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 29" {...props} ref={ref}>
    <path d="M19.93 26.24h-7.05V17.5c0-.63.42-1.04 1.05-1.04h4.97c.62 0 1.03.4 1.03 1.04v8.73Zm-15.58-.47c0 1.93 1.21 3.1 3.2 3.1H25.3c1.99 0 3.19-1.17 3.19-3.1V15.52L17.25 6.1a1.22 1.22 0 0 0-1.66 0L4.35 15.52v10.25ZM0 13.69c0 .7.52 1.28 1.37 1.28.42 0 .8-.21 1.12-.48l13.36-11.2c.36-.33.79-.33 1.15 0l13.35 11.2c.32.27.7.48 1.1.48.78 0 1.37-.48 1.37-1.25 0-.45-.17-.8-.51-1.1L18.3.86a2.8 2.8 0 0 0-3.77 0l-14 11.77c-.35.29-.53.68-.53 1.06Zm24.73-6.52 3.8 3.2V3.88c0-.6-.39-1-1-1h-1.8c-.6 0-1 .4-1 1v3.3Z" />
  </svg>
))
