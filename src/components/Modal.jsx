export default function Modal({children}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 px-4">
            <div className="bg-white text-black rounded-xl shadow-lg w-full max-w-lg sm:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                {children}
            </div>
        </div>
    )
}
