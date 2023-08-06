import { RoomList, RoomListItem } from "@/components/RoomList"
import Script from "next/script"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex justify-between items-center w-screen h-screen">
      <Script src="/public/browser-matrix.js" />
      
      <RoomList >
        {
          ['234', '234', 'hello', 'terve', 'budrour', 'guten tag'].map((item) => {
            return <RoomListItem key={item} name={item} />
          })
        }
      </RoomList>
      {children}
    </div>
  )
}
