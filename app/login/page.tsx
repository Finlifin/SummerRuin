'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import Lint from '@/components/Lint'
import Input_ from '@/components/Input_'
import Button_ from '@/components/Button_'
import { useRouter } from 'next/navigation'

const baseUrl = "http://localhost:8008"

function Page() {
    const [client, setClient] = useState<any>(null)
    const [some, setSome] = useState<any>(null)
    const homeserver = useRef()
    const [userName, setUserName] = useState("alice");
    const [password, setPassword] = useState("11111111")
    const router = useRouter()

    const translateUserId = () => {
        "hello"
    }

    const checkLoginInfo = () => {
        fetch("http://localhost:8008/_matrix/client/v3/login", {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({
                type: "m.login.password",
                identifier: {
                    type: "m.id.user",
                    user: userName
                },
                password: password
            })
        }).then((response) => response.json())
            .then((data: any) => {
                localStorage.setItem("baseUrl", baseUrl)
                localStorage.setItem("userId", `@${userName}:${baseUrl}`)
                localStorage.setItem("accessToken", data.access_token)
                router.push("/main")
            })
    }

    const [isSignIn, setSignIn] = useState<Boolean>(true)
    return (
        isSignIn ?
            <AnimatePresence>
                <div className="flex-col justify-center items-center w-max h-max m-auto" >
                    <div className="my-5 text-center font-sans title text-shadow">login</div>
                    <Input_ type="text" placeholder="User Name" value={"alice"} />
                    <Input_ type="password" placeholder="Password" value={"11111111"} />
                    <Input_ type="text" placeholder="Home Server" value={baseUrl} />
                    <Button_ onClick={checkLoginInfo}>Continue</Button_>
                    <Lint onClick={() => setSignIn(() => !isSignIn)}>Or create one</Lint>
                </div>
            </AnimatePresence >
            :
            <AnimatePresence>
                <div className="flex-col justify-center items-center w-max h-max m-auto" >
                    <div className="my-5 text-center font-sans title text-shadow">register</div>

                    <Input_ type="text" placeholder="Email" />
                    <Input_ type="password" placeholder="Password" />
                    <Input_ type="text" placeholder="Home Server" value={baseUrl} />

                    <Button_>Continue</Button_>
                    <Lint onClick={() => setSignIn(() => !isSignIn)}>Or login</Lint>
                    <Button_>register</Button_>
                </div>
            </AnimatePresence >
    )
}

export default Page
