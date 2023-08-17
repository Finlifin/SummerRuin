'use client'
import { RoomList, RoomListItem } from "@/components/RoomList"
import React, { useEffect, useState } from 'react'
import sdk from 'matrix-js-sdk'
import { selector, RecoilRoot, atom, useRecoilState, useRecoilValue } from 'recoil'
import { MessageStage } from '@/components/MessageStage'
import Menu from '@/components/Menu'

// const clientState = atom({
// 	key: "matrixClient",
// 	default: sdk.createClient({ baseUrl: "http://localhost:8008" }),
// 	dangerouslyAllowMutability: true
// })

function Input() {
	return (
		<div 
		className='p-1 rounded-full near-block mx-4 my-2 text-black'
		style={{
			display: "grid",
			gridTemplateColumns: "1fr 2.5rem 2.5rem"
		}} >
			<input type="text" className="m-1 placeholder:text-gray-600 bg-transparent text-lg focus:outline-none" placeholder="Send a message..."/>
			<button type="button" className="rounded-full">S</button>
			<button type="button">H</button>
		</div>
	)
}

const Right = () => {
	// const [client, setClient] = useRecoilState(clientState)

	return (
		<div className="flex-col justify-around">
			<MessageStage messages={[{ id: "man", content: "hello!" }, { id: "man", content: "hello!" }, { id: "man", content: "hello!" }, { id: "man", content: "hello!" }, { id: "man", content: "hello!" }, { id: "man", content: "hello!" }]} />
		</div>
	)
}

const Left = () => {
	return (<div></div>)
}

function Page() {
	const [logined, setLogined] = useState(false)
	// const [client, setClient] = useRecoilState(clientState)
	const [accessToken, setAccessToken] = useState("")

	useEffect(() => {
		setAccessToken(() => localStorage.getItem("accessToken") || "undefined")
		if (accessToken == "undefined") {
			setLogined(false)
		} else {
			setLogined(true)
			// setClient(sdk.createClient({
			// 	baseUrl: localStorage.getItem("baseUrl") || "http://localhost:8008",
			// 	userId: localStorage.getItem("userId") || "Unknown-User",
			// 	accessToken: accessToken
			// }))
			// client.startClient()
			// client.on("event" as unknown as any, (e: any) => { console.log(e) })
		}
	}, [])

	return (
		<div className="w-screen h-screen main-room">
			<Menu />
			<RoomList>
				{[234, 2, 34, 2387, 5, 34].map((x: any) => <RoomListItem name={x} key={x} />)}
			</RoomList>
			<div style={{ gridColumn: 2 }} className="flex flex-col justify-between near-block">
				<Right />
				<Input />
			</div>
		</div>
	)
}

export default Page
