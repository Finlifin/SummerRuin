'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import Lint from '@/components/Lint'
import Input_ from '@/components/Input_'
import Button_ from '@/components/Button_'
import Link from 'next/link'

function Page() {
    const [client, setClient] = useState<any>(null)
    const [some, setSome] = useState<any>(null)
    const homeserver = useRef()

    // useEffect(()=> {
    //     const some = require("/public/browser-matrix.js.map")
    //     const matrix_client = require("/public/browser-matrix.js")
    // }, [])

    const [isSignIn, setSignIn] = useState<Boolean>(true)
    return (
        isSignIn ?
            <AnimatePresence>
                <div className="flex-col justify-center items-center w-max h-max m-auto" >
                    <div className="my-5 text-center font-sans title text-shadow">login</div>
                    <Input_ type="text" placeholder="Email" />
                    <Input_ type="password" placeholder="Password" />
                    <Input_ type="text" placeholder="Home Server" value="http://localhost:8008" />
                    <Button_>Continue</Button_>
                    <Lint onClick={() => setSignIn(() => !isSignIn)}>Or create one</Lint>
                </div>
            </AnimatePresence >
            :
            <AnimatePresence>
                <div className="flex-col justify-center items-center w-max h-max m-auto" >
                    <div className="my-5 text-center font-sans title text-shadow">register</div>

                    <Input_ type="text" placeholder="Email" />
                    <Input_ type="password" placeholder="Password" />
                    <Input_ type="text" placeholder="Home Server" value="http://localhost:8008" />

                    <Button_>Continue</Button_>
                    <Lint onClick={() => setSignIn(() => !isSignIn)}>Or login</Lint>
                    <Button_>register</Button_>
                </div>
            </AnimatePresence >
    )
}

export default Page
