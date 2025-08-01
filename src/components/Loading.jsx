export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <div className="flex flex-col items-center gap-4">
                <div className="relative flex items-center justify-center w-12 h-12">
                    <div className="absolute w-full h-full border-4 border-gray-300 rounded-full"></div>
                    <div className="absolute w-full h-full border-4 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
                
                <span>Carregando...</span>
            </div>
        </div>
    )
}
