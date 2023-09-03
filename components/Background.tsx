import Image from 'next/image'
import React from 'react'

function Background() {
    return (
        <div className=' fixed top-0 left-0 w-screen h-screen z-0 opacity-70'>
            <Image src={"/background"} quality={100} fill alt='' />
        </div>
    )
}

export default Background
