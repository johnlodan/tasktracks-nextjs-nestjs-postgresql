import Cookies from 'js-cookie';

const Header = () => {
    const user = JSON.parse(Cookies.get('userData') || '{}');

    return (
        <header className="h-16 bg-gray-900 shadow flex items-center justify-between px-6 w-full fixed top-0 left-0 z-10">
            <h1 className="text-2xl font-semibold text-white">TaskTracks</h1>
            <div className="flex items-center gap-4">
                <span className="text-sm text-white">{user.name}</span>
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white text-xs font-bold uppercase">
                    {user.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </div>
            </div>
        </header>
    )
}

export default Header