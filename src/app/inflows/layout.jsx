import SideBar from "src/components/SideBar"

export default function InflowPageLayout({children}) {
    return (
        <div className="flex min-h-screen bg-black text-white">
            <SideBar/>
            <main className="flex-1 p-8">{children}</main>
        </div>
    )
}
