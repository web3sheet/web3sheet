import { forwardRef } from 'react'
import { ClipboardIcon } from '../icons/ClipboardIcon'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import { toast } from 'sonner';

export interface CopyToClipboardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textToCopy: string
  copyToClipboardToastMessage: string
  onCopyComplete?: () => void
}

/**
 * Copies the specified text to the clipboard and displays a success toast message.
 *
 * @param textToCopy The text to be copied to the clipboard.
 * @param onCopyComplete The callback function to be called after the text is copied.
 */
function copyToClipboard(
  textToCopy: string,
  onCopyComplete?: () => void,
) {
  void navigator.clipboard.writeText(textToCopy)
  if (onCopyComplete) {
    onCopyComplete()
  }
}

const CopyToClipboardButton = forwardRef<HTMLButtonElement, CopyToClipboardButtonProps>(
  ({ textToCopy, copyToClipboardToastMessage, onCopyComplete, className, ...props }, ref) => {
    return (
      <Button
        onClick={() => copyToClipboard(textToCopy, onCopyComplete)}
        variant="ghost"
        rounded={'md'}
        className={cn('select-all p-0', className)}
        ref={ref}
        {...props}
      >
        <ClipboardIcon className="fill-web3sheet-white h-5 w-5" />
      </Button>
    )
  },
)
CopyToClipboardButton.displayName = 'CopyToClipboardButton'

export { CopyToClipboardButton }
