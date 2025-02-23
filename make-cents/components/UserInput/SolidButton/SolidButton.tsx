export function SolidButton({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={[
        'flex flex-col gap-1 items-center px-2',
        'w-full bg-neutral-400 dark:bg-neutral-900 text-neutral-100 dark:text-neutral-400',
        'hover:bg-neutral-500 dark:hover:bg-neutral-800',
        'border-2 dark:border-neutral-900',
        // 'font-semibold',
        'shadow-sm',
        'rounded-md',
        'transition-colors',
      ].join(' ')}
    >
      {children}
    </div>
  );
}
