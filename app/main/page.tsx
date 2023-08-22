'use client'
import { RoomList, RoomListItem } from "@/components/RoomList"
import React, { useEffect, useState } from 'react'
import sdk from 'matrix-js-sdk'
import { MessageStage, MessageSpec } from '@/components/MessageStage'
import Menu from '@/components/Menu'
import { motion } from "framer-motion"

// const clientState = atom({
// 	key: "matrixClient",
// 	default: sdk.createClient({ baseUrl: "http://localhost:8008" }),
// 	dangerouslyAllowMutability: true
// })

var client: sdk.MatrixClient

function Input() {
	const variants = {
		hover: {
			backgroundColor: '#00000030',
			transition: {
				duration: '.2'
			}

		},

		tap: {
			scale: 0.95
		}
	}
	return (
		<div
			className='p-1 rounded-full near-block mx-4 my-2 text-black'
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 2.5rem 2.5rem"
			}} >
			<input type="text" className="m-1 placeholder:text-gray-600 bg-transparent text-lg focus:outline-none" placeholder="Send a message..." />
			<motion.button
				type="button"
				className="rounded-md"
				variants={variants}
				whileHover={'hover'}
				whileTap={'tap'}>
				S
			</motion.button>
			<motion.button
				className="rounded-md"
				type="button"
				variants={variants}
				whileHover={'hover'}
				whileTap={'tap'}
				onClickCapture={()=>console.log(client)}>
				H
			</motion.button>
		</div>
	)
}

const Right = ({ msgs }: { msgs: MessageSpec[] }) => {
	return (
		<div className="flex-col justify-around">
			<MessageStage messages={msgs} />
		</div>
	)
}

const Left = () => {
	return (<div></div>)
}

function Page() {
	const [msgs, setMsgs] = useState<MessageSpec[]>([])

	const insertMessage = (sender: string, content: string) => {
		setMsgs((elder) => [...elder, { id: sender, content: content }])
		console.log(msgs)
	}

	useEffect(() => {
		client = sdk.createClient({
			baseUrl: localStorage.getItem("baseUrl") || "http://localhost:8008",
		})
		client.login("m.login.password", { "user": localStorage.getItem("userName"), "password": localStorage.getItem("password") }).then((response) => {
			console.log(response.access_token)
		})
		client.startClient()
		client.on("event" as unknown as any, (event: any) => {
			if (event.getType() == "m.room.message") {
				insertMessage(event.getSender(), event.getContent().body)
			}
		})
	}, [])

	return (
		<div className="w-screen h-screen main-room">
			<Menu />
			<RoomList>
				{[234, 2, 34, 2387, 5, 34].map((x: any) => <RoomListItem name={x} key={x} />)}
			</RoomList>
			<div style={{ gridColumn: 2 }} className="flex flex-col justify-between near-block">
				<Right msgs={msgs} />
				<Input />
			</div>
		</div>
	)
}

export default Page
