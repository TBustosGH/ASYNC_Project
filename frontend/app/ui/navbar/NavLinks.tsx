'use client';

import {
    HomeIcon as HomeIcon,
    MagnifyingGlassIcon as SearchIcon,
    BookmarkSquareIcon as HistoryIcon
} from '@heroicons/react/24/outline';
import {
    HomeIcon as SelectedHomeIcon,
    MagnifyingGlassIcon as SelectedSearchIcon,
    BookmarkSquareIcon as SelectedHistoryIcon
} from '@heroicons/react/24/solid'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    {
        name: 'Home',
        href: '/home',
        icon: HomeIcon,
        selectedIcon: SelectedHomeIcon
    },
    {
        name: 'Search',
        href: '/search',
        icon: SearchIcon,
        selectedIcon: SelectedSearchIcon
    },
    {
        name: 'History',
        href: '/p',
        icon: HistoryIcon,
        selectedIcon: SelectedHistoryIcon
    }
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map(link => {
                const LinkIcon = pathname.startsWith(link.href) 
                    ? link.selectedIcon 
                    : link.icon;

                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className='flex justify-center py-6 rounded-md bg-gray-900 text-white font-medium hover:bg-gray-500'
                    >
                        <LinkIcon className='w-6' />
                        <p className='hidden md:block'>{link.name}</p>
                    </Link>
                );
            })}
        </>
    )
}

