import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <Link href={'/login'} >Sign In / Sign Up</Link>
  )
}
