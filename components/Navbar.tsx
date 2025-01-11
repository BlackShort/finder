'use client'

import { useState } from 'react'
import { SearchBar } from './SearchBar'
import { Button } from "@/components/ui/button"
import { Search, User } from 'lucide-react'
import Image from 'next/image'
import learning from '@/app/icon.png'
import Link from 'next/link'

export function Navbar() {
    const [showSearch, setShowSearch] = useState(false);

    // const router = useRouter()

    // useEffect(() => {
    //   const checkLoginStatus = async () => {
    //     try {
    //       const response = await axios.get(
    //         '/api/auth/check',
    //         { withCredentials: true }
    //       );
    //       setIsLoggedIn(response.data.loggedIn);
    //       if (isLoggedIn) router.push('/admin');

    //     } catch (error) {
    //       console.error('Error checking login status:', error);
    //     }
    //   };

    //   checkLoginStatus();
    // }, []);


    // const handleLogout = async () => {
    //     try {
    //         await fetch('/api/auth/logout', { method: 'POST' });
    //         setIsLoggedIn(false);
    //         router.push('/');
    //     } catch (error) {
    //         console.error('Logout error:', error);
    //     }
    // };

    return (
        <nav className="sticky top-0 z-50 rounded-lg text-primary-foreground py-3 px-3 bg-gradient-to-r from-blue-50 to-gray-100 backdrop-blur transition-all duration-300 ease-in-out">
            <div className="bg-primary rounded-lg mx-auto px-3 py-3">
                <div className="flex items-center justify-between">
                    {!showSearch ? (
                        <>
                            <Link href='/' className="flex items-center space-x-4">
                                <Image src={learning} alt="FinderX" width={40} height={40} />
                                <span className="text-xl font-bold">FinderX</span>
                            </Link>
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
                                    <Search className="h-7 w-7" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <User className="h-7 w-7" />
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="w-full">
                            <SearchBar onClose={() => setShowSearch(false)} />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

