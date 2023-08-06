import { useEffect } from "react"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div className="flex-col items-center justify-around w-max h-max m-auto rounded-md shadow-lg p-5 my-border translate-y-[-7vh]">
            {children}
        </div>
    )
}
