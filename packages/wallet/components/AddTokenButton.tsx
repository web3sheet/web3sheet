import type { ButtonVariantProps } from '@web3sheet/ui/ui/button';
import { type AddTokenParams, useAddToken } from '@web3sheet/core/hooks/useAddToken';
import { useUiLibrary } from '@web3sheet/core';
import { PlusIcon } from 'lucide-react';

export type AddTokenButtonProps =  {
  buttonProps?: ButtonVariantProps;
  token: AddTokenParams
};

export function AddTokenButton({ token, buttonProps }: AddTokenButtonProps) {
  const UI = useUiLibrary();
  const { addToken, isPending } = useAddToken(token);

  return (
    <UI.Button
      onClick={addToken}
      disabled={isPending}
      className="px-0.5 py-0.5"
      {...buttonProps}
    >
      <PlusIcon className="stroke-web3sheet-text h-3 w-3" />
    </UI.Button>
  );
}
