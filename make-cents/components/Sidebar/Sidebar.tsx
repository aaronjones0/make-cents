'use client';

import { HomeIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div
      id='app-sidebar'
      className={[
        'p-4 flex flex-col gap-2',
        // 'divide-y divide-neutral-700',
        'w-56 bg-neutral-200 dark:bg-neutral-900',
        'border-r border-neutral-300 dark:border-neutral-950',
      ].join(' ')}
    >
      <h1 className='select-none text-2xl font-light text-neutral-300'>Make Cents</h1>
      <nav className='py-1'>
        <ul>
          <li>
            <NavLink label='Home' href='/' pathname={pathname}>
              <HomeIcon className='size-6' />
            </NavLink>
          </li>
          <li>
            <NavLink label='Account' href='/account' pathname={pathname}>
              <UserIcon className='size-6' />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function NavLink({
  label,
  href,
  pathname,
  children,
}: {
  label: string;
  href: string;
  pathname: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        'flex flex-row items-center gap-2',
        'px-3 py-2 rounded-md block',
        'hover:bg-neutral-300 dark:hover:bg-neutral-800',
        'transition-colors',
        pathname === href
          ? 'text-emerald-500'
          : 'text-neutral-800 dark:text-neutral-200',
      ].join(' ')}
    >
      {children}
      {label}
    </Link>
  );
}
