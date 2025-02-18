import { ButtonHTMLAttributes } from 'react';

export function PennyButton({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={[
        'h-10 w-full',
        'p-2',
        'flex flex-row gap-1 items-center justify-center',
        'bg-stone-400 dark:bg-stone-900 text-stone-100 dark:text-stone-400',
        'hover:bg-stone-500 dark:hover:bg-stone-800',
        'hover:text-stone-200 dark:hover:text-stone-400',
        'shadow-sm',
        'rounded-md',
        'transition-colors',
      ].join(' ')}
    >
      {props.children}
    </button>
  );
}
