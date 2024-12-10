'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
// @ts-ignore - TS2339: Property 'useDebounce' does not exist on type 'typeof import(...).default'.
import { useDebounce } from '@uidotdev/usehooks'
import * as React from 'react'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
  forwardRef,
  useState,
} from 'react'
import { cn } from '../../lib/utils'

const TooltipRoot = PopoverPrimitive.Root

const TooltipTrigger = forwardRef<
  ElementRef<typeof PopoverPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Trigger ref={ref} className={cn('cursor-pointer', className)} {...props} />
))

const TooltipContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    side="top"
    className={cn(
      'text-web3sheet-white animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-web3sheet-black border-px z-50 overflow-hidden rounded-full border border-[#1C2624] bg-opacity-50 px-4 py-2 text-sm shadow-xl outline-none',
      className,
    )}
    {...props}
  />
))
TooltipContent.displayName = PopoverPrimitive.Content.displayName

type TooltipProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
  disableOnHover?: boolean
  tooltipContent: ReactNode
  triggerProps?: Omit<ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>, 'children'>
}

const Tooltip = forwardRef<ElementRef<typeof PopoverPrimitive.Content>, TooltipProps>(
  ({ tooltipContent, children, triggerProps, disableOnHover, ...props }, ref) => {
    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)
    const debouncedHover = useDebounce(hovered, 150)

    const handleMouseEnter = () => {
      if (disableOnHover) return
      setHovered(true)
    }

    const handleMouseLeave = () => {
      if (disableOnHover) return
      if (!clicked) {
        setHovered(false)
      }
    }

    const handleClick = () => {
      setClicked((prev) => !prev)
    }

    return (
      <TooltipRoot open={debouncedHover || clicked} onOpenChange={setHovered}>
        <TooltipTrigger
          asChild
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          {...triggerProps}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={ref}
          {...props}
        >
          {tooltipContent}
        </TooltipContent>
      </TooltipRoot>
    )
  },
)

export { Tooltip, TooltipRoot, TooltipContent, TooltipTrigger }
