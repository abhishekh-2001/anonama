import React from 'react'
// import ConnectWalletButton from '../components/WalletConnect'
import { Link } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'

// import SearchModal from '../components/ModalSearch'
// import Notifications from '../components/DropdownNotifications'
// import Help from '../components/DropdownHelp'
// import UserMenu from '../components/DropdownProfile'
// import ThemeToggle from '../components/ThemeToggle'

type HeaderProps = {
    headerTitle: string | null
    sidebarOpen: boolean
    setSidebarOpen: (newValue: boolean) => void
}

const Header: React.FC<HeaderProps> = ({
    headerTitle,
    sidebarOpen,
    setSidebarOpen,
}) => {
    return (
        <header className="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 -mb-px">
                    {/* Header: Left side */}
                    <div className="flex">
                        {/* Hamburger button */}
                        <button
                            className="text-slate-500 hover:text-slate-600 lg:hidden"
                            aria-controls="sidebar"
                            aria-expanded={sidebarOpen}
                            onClick={(e) => {
                                e.stopPropagation()
                                setSidebarOpen(!sidebarOpen)
                            }}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg
                                className="w-6 h-6 fill-current"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect x="4" y="5" width="16" height="2" />
                                <rect x="4" y="11" width="16" height="2" />
                                <rect x="4" y="17" width="16" height="2" />
                            </svg>
                        </button>
                        {headerTitle && (
                            <p className="text-xl font-bold">{headerTitle}</p>
                        )}
                    </div>

                    {/* Header: Right side */}
                    <div className="flex items-center space-x-3">
                        <div>
                            <Link to="/" className="hover:text-indigo-500">
                                Posts
                            </Link>
                        </div>
                        <div>
                            <Link
                                to="/makepost"
                                className="hover:text-indigo-500"
                            >
                                Dashboard
                            </Link>
                            {/* <SearchModal
                                id="search-modal"
                                searchId="search"
                                modalOpen={searchModalOpen}
                                setModalOpen={setSearchModalOpen}
                            /> */}
                        </div>
                        {/* <Notifications align="right" />
                        <Help align="right" />
                        <ThemeToggle /> */}
                        {/*  Divider */}
                        <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
                        {/* <ConnectWalletButton align="right" /> */}
                        <ConnectButton />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
