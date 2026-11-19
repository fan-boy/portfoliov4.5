'use client';

import { usePathname } from 'next/navigation';
import { NavChip } from './Navchips';
import { KeyboardNav } from './keyboardnav';

const navItems = [
  { href: '/', label: 'Work', letter: 'W' },
  { href: '/about', label: 'About', letter: 'A' },
  { href: '/contact', label: 'Contact', letter: 'C' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed w-full flex justify-center top-5 z-50">
      <KeyboardNav />
      <div className="flex gap-2 rounded-full bg-background/80 backdrop-blur px-2 py-1 shadow-md border border-gray-200 items-center">
        {navItems.map(({ href, label, letter }) => {
          let isActive = false;
          if (href === '/') {
            isActive =
              pathname === '/' ||
              /^\/(dune|chainreactive|universitypark|records|film|run)(\/|$)/.test(pathname);
          } else {
            // The guides are personal, so they sit under About.
            isActive = pathname === href || (href === '/about' && /^\/guides(\/|$)/.test(pathname));
          }
          return (
            <NavChip
              key={href}
              href={href}
              label={label}
              letter={letter}
              isActive={isActive}
            />
          );
        })}
      </div>
    </nav>
  );
}
