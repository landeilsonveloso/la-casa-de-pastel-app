import Image from "next/image"

export default function Logo() {
    return (
        <div className="flex justify-center mb-6">
            <Image className="rounded-full" src="/logo.png" alt="Logo La Casa de Pastel" width={150} height={150} priority />
        </div>
    )
}
