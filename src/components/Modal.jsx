export default function Modal({children}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-0">
            <div className="bg-white text-black rounded-xl shadow-lg w-full max-w-md p-6 sm:max-w-2/5">
                {children}
            </div>
        </div>
    )
}
