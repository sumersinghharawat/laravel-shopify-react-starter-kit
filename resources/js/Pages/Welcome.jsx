import { Head, Link, usePage } from '@inertiajs/react';
import logo  from '../Images/logo.svg';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const page = usePage().props
    const { query } = page.ziggy
    console.log(auth)
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };



    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid items-center grid-cols-2 gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <img src={logo} alt="Logo" onError={handleImageError} />
                            </div>
                            <nav className="flex justify-end flex-1 -mx-3 lg:col-start-3">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard', query)}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('shopify-app-install')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Install Application
                                        </Link>
                                        {/* <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link> */}
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="py-56 mt-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">

                            </div>
                        </main>

                        <footer className="py-16 text-sm text-center text-black dark:text-white/70">
                            Copyright &copy; 2022-2024 LSDT. All rights reserved.
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
