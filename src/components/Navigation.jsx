import Link from "next/link"

export default function Navigation({className, href, children}) {
    return (
        <span className={className}>
            <Link className="text-right text-sm text-blue-400 hover:underline mb-4 cursor-pointer" href={href}>
                {children}
            </Link>
        </span>
    )
}
