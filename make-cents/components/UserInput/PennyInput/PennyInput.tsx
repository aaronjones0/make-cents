import { InputHTMLAttributes } from 'react';

export function PennyInput({
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        'h-10 w-full',
        'px-2',
        'transition-colors',
        'bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100',
        'enabled:hover:bg-neutral-100 enabled:dark:hover:bg-neutral-800',
        'disabled:text-neutral-500 dark:disabled:text-neutral-500',
        'border border-neutral-50 dark:border-neutral-950',
        'enabled:shadow-inner',
        'rounded-md',
      ].join(' ')}
    />
  );
}
