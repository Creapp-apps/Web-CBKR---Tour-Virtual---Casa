'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CasaRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/');
    }, [router]);

    return (
        <div className="w-full h-screen bg-black" />
    );
}
