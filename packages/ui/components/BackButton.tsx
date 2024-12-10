import { ArrowDownIcon } from '../icons/ArrowDownIcon'
import { Button } from './ui/button'

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} variant="ghost" size="icon">
      <ArrowDownIcon className="fill-web3sheet-text mt-0.5 h-3 w-3 rotate-90" />
    </Button>
  )
}
