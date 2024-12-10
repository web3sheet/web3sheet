import { type VariantProps, cva } from 'class-variance-authority'
import { type HTMLAttributes, forwardRef } from 'react'
import { QuestionIcon } from '../icons/QuestionIcon'
import { cn } from '../lib/utils'
import { Loading } from './loading'
import { Button, type ButtonProps } from './ui/button'
import { Tooltip } from './ui/tooltip'

export const outerModuleVariants = cva(
  'rounded-3xl transition-all ease-in-out bg-module-outline bg-blend-lighten shadow-md p-px',
  {
    variants: {
      variant: {
        default: '',
        hero: '',
      },
      size: {
        default: 'col-span-1',
        lg: 'col-span-1 sm:col-span-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const innerModuleVariants = cva(
  cn(
    'rounded-3xl w-full h-full flex align-middle flex-col bg-module',
    '[&>span]:font-medium [&>*>span]:font-medium',
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-blend-lighten shadow-md gap-1',
          '[&>h3]:text-lg [&>*>h3]:text-lg',
          '[&>span]:text-3xl [&>*>span]:text-3xl [&>h3]:font-normal [&>*>h3]:font-normal',
        ),
        hero: cn(
          'gap-5 hover:brightness-125',
          '[&>h3]:text-3xl [&>h3]:font-normal [&>*>h3]:text-2xl [&>*>h3]:font-normal [&>h3]:text-web3sheet-white',
          '[&>span]:text-8xl [&>*>span]:text-8xl [&>span]:text-web3sheet-white [&>*>span]:text-web3sheet-white',
        ),
      },
      size: {
        default: 'p-6',
        lg: 'p-10 py-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ModuleProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof innerModuleVariants> {
  loading?: boolean
  noPadding?: boolean
}

const Module = forwardRef<HTMLDivElement, ModuleProps>(
  ({ className, variant, size, loading, children, noPadding, ...props }, ref) => {
    return (
      <div className={cn(outerModuleVariants({ size, variant, className }))}>
        <div
          className={cn(
            'relative',
            innerModuleVariants({ size, variant, className }),
            noPadding && 'p-0',
            props.onClick && 'hover:bg-w3s-primary hover:text-web3sheet-black hover:cursor-pointer',
          )}
          ref={ref}
          {...props}
          style={
            variant === 'hero'
              ? {
                  background: 'url(/images/module-hero.png)',
                  backgroundPositionX: '35%',
                  backgroundPositionY: '35%',
                  backgroundSize: '135%',
                }
              : undefined
          }
        >
          {loading ? <Loading /> : children}
        </div>
      </div>
    )
  },
)

Module.displayName = 'Module'

export interface ButtonModuleProps
  extends Omit<ButtonProps, 'size' | 'variant'>,
    VariantProps<typeof innerModuleVariants> {
  loading?: boolean
  noPadding?: boolean
}

const ButtonModule = forwardRef<HTMLButtonElement, ButtonModuleProps>(
  ({ className, variant, size, loading, children, noPadding, ...props }, ref) => {
    return (
      <div className={cn(outerModuleVariants({ size, variant, className }))}>
        <Button
          className={cn(
            innerModuleVariants({ size, variant, className }),
            'relative disabled:opacity-100',
            !props.disabled && 'hover:bg-w3s-primary border-w3s-primary border',
            noPadding && 'p-0',
          )}
          variant="ghost"
          ref={ref}
          {...props}
          style={
            variant === 'hero'
              ? {
                  background: 'url(/images/module-hero.png)',
                  backgroundPositionX: '35%',
                  backgroundPositionY: '35%',
                  backgroundSize: '135%',
                }
              : undefined
          }
        >
          {loading ? <Loading /> : children}
        </Button>
      </div>
    )
  },
)

ButtonModule.displayName = 'ButtonModule'

const moduleHeaderVariants = cva('w-full', {
  variants: {
    variant: {
      default: '',
      overlay: 'absolute z-1',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface ModuleHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof moduleHeaderVariants> {
  loading?: boolean
}

const ModuleHeader = forwardRef<HTMLDivElement, ModuleHeaderProps>(
  ({ className, variant, loading, children, ...props }, ref) => {
    return (
      <div className={cn(moduleHeaderVariants({ variant, className }))} ref={ref} {...props}>
        {loading ? <Loading /> : children}
      </div>
    )
  },
)
ModuleHeader.displayName = 'ModuleHeader'

const ModuleTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-gradient-white leading-none tracking-tight', className)}
      {...props}
    />
  ),
)
ModuleTitle.displayName = 'ModuleTitle'

const ModuleText = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn('text-gradient-white overflow-hidden', className)} {...props} />
  ),
)
ModuleText.displayName = 'ModuleText'

const ModuleDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-w3s-muted-foreground', className)} {...props} />
  ),
)
ModuleDescription.displayName = 'ModuleDescription'

const moduleContentVariants = cva(
  'flex flex-col align-middle justify-center w-full h-full text-center items-center',
  {
    variants: {
      variant: {
        default: '',
        underlay: 'absolute inset-0 -z-1',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface ModuleContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof moduleContentVariants> {
  loading?: boolean
}

const ModuleContent = forwardRef<HTMLDivElement, ModuleContentProps>(
  ({ className, variant, loading, children, ...props }, ref) => {
    return (
      <div className={cn(moduleContentVariants({ variant, className }))} ref={ref} {...props}>
        {loading ? <Loading /> : children}
      </div>
    )
  },
)

const ModuleTooltip = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <Tooltip ref={ref} tooltipContent={children}>
      <div className={cn('absolute right-5 top-4 cursor-pointer', className)} {...props}>
        <QuestionIcon className="fill-web3sheet-text h-4 w-4" />
      </div>
    </Tooltip>
  ),
)
ModuleTooltip.displayName = 'ModuleTooltip'

ModuleContent.displayName = 'ModuleContent'

export {
  Module,
  ModuleContent,
  ModuleDescription,
  ModuleHeader,
  ModuleText,
  ModuleTitle,
  ModuleTooltip,
  ButtonModule,
  innerModuleVariants as moduleVariants,
}
