import { forwardRef } from 'react'
import type { SVGAttributes } from '../types'

export const RSSIcon = forwardRef<SVGSVGElement, SVGAttributes>((props, ref) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" {...props} ref={ref}>
    <path d="M5.73753 18.0823C5.73708 18.8005 5.45143 19.4891 4.94339 19.9967C4.43535 20.5042 3.74651 20.7893 3.02836 20.789C2.6727 20.7893 2.32047 20.7194 1.9918 20.5835C1.66312 20.4476 1.36444 20.2483 1.11279 19.997C0.861143 19.7456 0.661465 19.4472 0.525157 19.1187C0.388848 18.7902 0.318578 18.438 0.318359 18.0823C0.318578 17.7267 0.388848 17.3745 0.525157 17.046C0.661465 16.7175 0.861143 16.4191 1.11279 16.1677C1.36444 15.9164 1.66312 15.7171 1.9918 15.5812C2.32047 15.4453 2.6727 15.3754 3.02836 15.3756C3.74651 15.3754 4.43535 15.6604 4.94339 16.168C5.45143 16.6756 5.73708 17.3642 5.73753 18.0823ZM0.318359 7.60556V11.6148C5.36003 11.6664 9.45169 15.7532 9.50336 20.789H13.5175C13.4659 13.5306 7.58586 7.65723 0.318359 7.60556ZM0.318359 4.79886C9.13503 4.8372 16.2784 11.9606 16.3042 20.789H20.3184C20.2934 9.76309 11.3559 0.827152 0.318359 0.788818V4.79886Z" />
  </svg>
))