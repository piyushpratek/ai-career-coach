import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { LayoutDashboard } from 'lucide-react'

const Header = () => {
    return (
        <header>
            <nav>
                <Link href="/">
                    <Image src="/logo2.png" alt='ai career coach logo' width={200} height={60} className=' h-12 py-2 w-auto object-contain' />
                </Link>

                <div>
                    <SignedIn>
                        <Link href={"/dashboard"}>
                            <Button>
                                <LayoutDashboard className=' h-4 w-4' />
                                Industry Insights
                            </Button>
                        </Link>
                    </SignedIn>
                </div>

            </nav>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
    )
}

export default Header