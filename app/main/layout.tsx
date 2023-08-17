'use client'
import Script from "next/script"
import { RecoilRoot } from "recoil"
import Background from "@/components/Background"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RecoilRoot>
      <Background />
      <div className=" z-10">{children}</div>
    </RecoilRoot>
  )
}
