'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    href: '/meetings',
    label: 'All Meetings',
  },
  {
    href: '/meetings/current',
    label: 'Current Meeting',
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="border-b border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-3">
        <ul className="flex flex-wrap gap-2">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href === '/meetings' &&
                pathname.startsWith('/meetings/'));

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-violet-700 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}