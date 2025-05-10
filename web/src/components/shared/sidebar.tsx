import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Sidebar = () => {
    const { pathname } = useRouter();

    const isActive = (path: string) => {
        if (pathname === path) return 'bg-gray-800';
        if (pathname.startsWith(path)) return 'bg-gray-800';
        return '';
    };
    function handleLogout() {
        Cookies.remove("userToken");
        Cookies.remove("userData");
        window.location.reload();
    }

    return (
        <aside className="bg-black shadow-md hidden md:block bg-opacity-80 w-[200px]">
            <div className="h-16 flex items-center justify-center font-bold text-xl border-b text-white">
                TaskTracks
            </div>
            <nav className="p-4 space-y-2">
                <Link href="/boards">
                    <span className={`block px-4 py-2 rounded ${isActive('/boards')} text-sm text-white cursor-pointer`}>
                        Project Boards
                    </span>
                </Link>
                <Link href="/teams">
                    <span className={`block px-4 py-2 rounded ${isActive('/teams')} text-sm text-white cursor-pointer`}>
                        Teams / Groups
                    </span>
                </Link>
                <Link href="/settings">
                    <span className={`block px-4 py-2 rounded ${isActive('/settings')} text-sm text-white cursor-pointer`}>
                        Settings
                    </span>
                </Link>
                <Link href="#">
                    <span className="block px-4 py-2 rounded hover:bg-gray-800 text-sm text-white cursor-pointer" onClick={handleLogout}>
                        Logout
                    </span>
                </Link>
            </nav>
        </aside>
    );
};

export default Sidebar;
