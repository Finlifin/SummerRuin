'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import Lint from '@/components/Lint'
import Input_ from '@/components/Input_'
import Button_ from '@/components/Button_'
import { useRouter } from 'next/navigation'
import * as sdk from 'matrix-js-sdk'

const baseUrl = "http://localhost:8008"
var client: sdk.MatrixClient

function Page() {
    const [userName, setUserName] = useState("alice")
    const [password, setPassword] = useState("11111111")
    const [homeServer, setHomeServer] = useState(baseUrl)
    const [isSignIn, setSignIn] = useState<Boolean>(true)
    const router = useRouter()


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
        })
            .then((response) => response.json())
            .then((data: any) => {
                if (data.error) { alert(data.error); return }

                localStorage.setItem("baseUrl", homeServer)
                localStorage.setItem("userId", `@${userName}:${homeServer}`)
                localStorage.setItem("accessToken", data.access_token)
                localStorage.setItem("password", password)
                localStorage.setItem("userName", userName)
                router.push("/main")
            })
            .catch(reason => console.log(reason))
    }

    const tryRegister = () => {
        if (password.length < 8) { return }

        client = sdk.createClient({ baseUrl: homeServer })
        fetch("http://localhost:8008/_matrix/client/v3/register", {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({
                // type: "m.register.password",
                auth: {},
                user: userName,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) { alert(data.error); return }

                localStorage.setItem("baseUrl", homeServer)
                localStorage.setItem("userId", `@${userName}:${homeServer}`)
                localStorage.setItem("accessToken", data.access_token || "")
                localStorage.setItem("password", password)
                localStorage.setItem("userName", userName)
                router.push("/main")
            })
    }

    return (
        isSignIn ?
            <AnimatePresence>
                <div className="flex-col justify-center items-center w-max h-max m-auto" >
                    <div className="my-5 text-center font-sans title text-shadow">login</div>
                    <Input_ type="text" placeholder="User Name" defaultValue="alice" value={userName} onChange={(event: any) => { setUserName(event.target.value) }} />
                    <Input_ type="password" placeholder="Password" defaultValue="11111111" value={password} onChange={(event: any) => setPassword(event.target.value)} />
                    <Input_ type="text" placeholder="Home Server" defaultValue={baseUrl} value={homeServer} onChange={(event: any) => setHomeServer(event.target.value)} />
                    <Button_ onClick={checkLoginInfo}>Continue</Button_>
                    <Lint onClick={() => setSignIn(() => !isSignIn)}>Or create one</Lint>
                </div>
            </AnimatePresence >
            :
            <AnimatePresence>
                <div className="flex-col justify-center items-center w-max h-max m-auto" >
                    <div className="my-5 text-center font-sans title text-shadow">register</div>

                    <Input_ type="text" placeholder="User Name" defaultValue="alice" value={userName} onChange={(event: any) => setUserName(event.target.value)} />
                    <Input_ type="password" placeholder="Password" defaultValue="11111111" value={password} onChange={(event: any) => setPassword(event.target.value)} />
                    <Input_ type="text" placeholder="Home Server" defaultValue={baseUrl} value={homeServer} onChange={(event: any) => setHomeServer(event.target.value)} />

                    <Button_ onClick={() => tryRegister()}>Continue</Button_>
                    <Lint onClick={() => setSignIn(() => !isSignIn)}>Or login</Lint>
                    <Button_>register</Button_>
                </div>
            </AnimatePresence >
    )
}

export default Page
