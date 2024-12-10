'use client'

import type { DialogProps } from '@radix-ui/react-dialog'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'

import { ChevronsDownIcon } from '../../icons/ChevronsDownIcon'
import { cn } from '../../lib/utils'
import { ModuleGrid } from '../ModuleGrid'

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-web3sheet-black fixed z-50',
      className,
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  closeSheet?: () => void
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ className, children, closeSheet, ...props }, ref) => (
  <SheetPortal>
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 gap-4 p-2 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
        'md:data-[state=closed]:slide-out-to-right md:data-[state=open]:slide-in-from-right md:sm:max-w-md md:inset-y-0 md:right-0 md:h-full md:w-3/4 md:border-transparent',
        'max-md:data-[state=closed]:slide-out-to-bottom max-md:data-[state=open]:slide-in-from-bottom bottom-0 h-max w-full',
      )}
    >
      <div
        className={cn(
          'fixed h-full w-24 -translate-x-16 cursor-pointer rounded-lg px-4 py-6 opacity-75 transition-all duration-200 hover:-translate-x-14 hover:bg-[rgba(255,255,255,0.1)]',
        )}
        onClick={closeSheet}
      >
        <SheetPrimitive.Close
          className="rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={closeSheet}
        >
          <ChevronsDownIcon className="stroke-web3sheet-text h-8 w-8 -rotate-90 transform" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </div>
      <ModuleGrid variant="section" className={cn('h-full p-4', className)} {...props}>
        {children}
      </ModuleGrid>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
)
SheetHeader.displayName = 'SheetHeader'

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
)
SheetFooter.displayName = 'SheetFooter'

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('text-w3s-foreground text-lg font-semibold', className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-w3s-muted-foreground text-sm', className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
}
