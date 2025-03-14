import { forwardRef } from 'react'
import type { SVGAttributes } from './types'

export const ClipboardIcon = forwardRef<SVGSVGElement, SVGAttributes>((props, ref) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" {...props} ref={ref}>
    <path d="M7.12 6.25h1.26v-1.5c0-.6.32-.93.94-.93h2.72v3.1c0 .8.42 1.21 1.21 1.21h2.86v5.36c0 .6-.32.93-.95.93h-1.2v1.27h1.31c1.39 0 2.1-.73 2.1-2.12V8.44c0-.85-.17-1.4-.68-1.92l-3.23-3.28a2.35 2.35 0 0 0-1.81-.69H9.22c-1.38 0-2.1.73-2.1 2.12v1.58Zm5.97.5v-2.4l2.69 2.72H13.4c-.22 0-.32-.1-.32-.32Z" />
    <path d="M3.92 16.89c0 1.4.72 2.12 2.1 2.12h6.06c1.39 0 2.1-.73 2.1-2.12V11.9c0-.87-.1-1.28-.65-1.83l-3.5-3.56c-.53-.53-.97-.65-1.75-.65H6.02c-1.38 0-2.1.72-2.1 2.12v8.9Zm1.27-.08V8.06c0-.59.31-.92.94-.92h1.99v3.54c0 .93.46 1.38 1.37 1.38h3.42v4.75c0 .6-.31.93-.94.93H6.12c-.62 0-.93-.33-.93-.93Zm4.43-5.87c-.27 0-.38-.11-.38-.38V7.39l3.5 3.55H9.62Z" />
  </svg>
))
