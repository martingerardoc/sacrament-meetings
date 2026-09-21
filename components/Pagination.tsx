'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
    totalPages: number;
}

export default function Pagination({
    totalPages,
}: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set('page', pageNumber.toString());

        return `${pathname}?${params.toString()}`;
    };

    const previousPage = Math.max(currentPage - 1, 1);
    const nextPage = Math.min(currentPage + 1, totalPages);

    return (
        <nav
            aria-label="Pagination"
            className="mt-10 flex items-center justify-between"
        >
            <Link
                href={createPageURL(previousPage)}
                aria-disabled={currentPage === 1}
                className={`rounded-lg border px-4 py-2 text-sm font-medium ${currentPage === 1
                        ? 'pointer-events-none border-slate-200 text-slate-400'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
            >
                Previous
            </Link>

            <span className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
            </span>

            <Link
                href={createPageURL(nextPage)}
                aria-disabled={currentPage === totalPages}
                className={`rounded-lg border px-4 py-2 text-sm font-medium ${currentPage === totalPages
                        ? 'pointer-events-none border-slate-200 text-slate-400'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
            >
                Next
            </Link>
        </nav>
    );
}