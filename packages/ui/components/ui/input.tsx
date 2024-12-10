import * as React from 'react'

import { cn } from '../../lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'border-web3sheet-white bg-web3sheet-black ring-offset-w3s-background focus-visible:ring-web3sheet-white flex h-10 w-full rounded-md border px-3 py-2 text-sm font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
