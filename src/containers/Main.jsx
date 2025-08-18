export default function Main({children}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-900 to-black text-white px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg p-6 sm:p-8 rounded-2xl bg-black/40 backdrop-blur-sm shadow-2xl">
                {children}
            </div>
        </div>
    )
}
