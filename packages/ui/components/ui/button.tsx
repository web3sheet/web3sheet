import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium ring-offset-w3s-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-w3s-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-w3s-primary text-web3sheet-black hover:bg-web3sheet-black hover:text-w3s-primary border border-w3s-primary',
        destructive:
          'bg-w3s-destructive text-w3s-destructive-foreground hover:bg-w3s-destructive/90',
        outline:
          'border border-w3s-primary text-w3s-primary bg-w3s-background hover:bg-w3s-primary hover:text-web3sheet-black disabled:border-gray-lightest disabled:text-gray-lightest disabled:opacity-100',
        'destructive-outline':
          'border border-w3s-destructive text-w3s-destructive bg-w3s-background hover:bg-w3s-destructive hover:text-w3s-destructive-foreground',
        secondary: 'bg-w3s-secondary text-w3s-secondary-foreground hover:bg-w3s-secondary/80',
        ghost: 'hover:bg-w3s-accent hover:text-w3s-accent-foreground',
        link: 'text-w3s-primary underline-offset-4 hover:underline',
      },
      size: {
        xs: 'h-6 px-2 text-xs',
        sm: 'h-9 px-3 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
      },
      rounded: {
        full: 'rounded-full',
        lg: 'rounded-lg',
        md: 'rounded-md',
        sm: 'rounded-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      rounded: 'full',
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

const IconButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Button {...props} ref={ref} variant="ghost" />
))

const TabFullWidthButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Button {...props} ref={ref} variant="outline" />
))

const ButtonWithIconSrc = forwardRef<HTMLButtonElement, ButtonProps & { src: string }>(
  ({ src, children, className, ...props }, ref) => (
    <TabFullWidthButton {...props} ref={ref} variant="ghost" className={cn('relative', className)}>
      <div className="absolute" style={{ left: '6px' }}>
        <Avatar className="h-6 w-6">
          <AvatarImage src={src} />
          <AvatarFallback className="bg-black" />
        </Avatar>
      </div>
      {children}
    </TabFullWidthButton>
  ),
)

const ButtonWithIconReactNode = forwardRef<HTMLButtonElement, ButtonProps & { icon: ReactNode }>(
  ({ icon, children, className, ...props }, ref) => (
    <TabFullWidthButton {...props} ref={ref} variant="ghost" className={cn('relative', className)}>
      <div className="absolute" style={{ left: '6px' }}>
        {icon}
      </div>
      {children}
    </TabFullWidthButton>
  ),
)

export {
  Button,
  buttonVariants,
  IconButton,
  TabFullWidthButton,
  ButtonWithIconSrc,
  ButtonWithIconReactNode,
}
