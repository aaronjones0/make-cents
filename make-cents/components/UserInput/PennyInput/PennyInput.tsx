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
        'bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100',
        'enabled:hover:bg-stone-100 enabled:dark:hover:bg-stone-800',
        'disabled:text-stone-500 dark:disabled:text-stone-500',
        'border border-stone-50 dark:border-stone-950',
        'enabled:shadow-inner',
        'rounded-md',
      ].join(' ')}
    />
  );
}
