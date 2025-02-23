import { ButtonHTMLAttributes } from 'react';

export function PennyButton({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={[
        'h-10 w-fit min-w-20',
        'py-2 px-3',
        'whitespace-nowrap',
        'flex flex-row gap-1 items-center justify-center',
        'bg-neutral-400 dark:bg-neutral-900 text-neutral-100 dark:text-neutral-400',
        'disabled:bg-neutral-300 disabled:dark:bg-neutral-800 disabled:text-neutral-200 disabled:dark:text-neutral-300',
        'enabled:hover:bg-neutral-500 enabled:dark:hover:bg-neutral-800',
        'enabled:hover:text-neutral-200 enabled:dark:hover:text-neutral-300',
        'shadow-sm shadow-neutral-800 disabled:shadow-none',
        'rounded-md',
        'transition-colors',
      ].join(' ')}
    >
      {props.children}
    </button>
  );
}
