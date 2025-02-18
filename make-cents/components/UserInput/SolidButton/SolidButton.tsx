export function SolidButton({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={[
        'flex flex-col gap-1 items-center px-2',
        'w-full bg-stone-400 dark:bg-stone-900 text-stone-100 dark:text-stone-400',
        'hover:bg-stone-500 dark:hover:bg-stone-800',
        'border-2 dark:border-stone-900',
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
