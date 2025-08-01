export default function Main({children}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-900 to-black text-white px-4">
            <div className="w-full max-w-sm p-6 rounded-2xl bg-black/40 backdrop-blur-sm shadow-2xl">
                {children}
            </div>
        </div>
    )
}
