'use client'
import { RoomList, RoomListItem } from "@/components/RoomList"
import React, { useEffect, useRef, useState } from 'react'
import sdk, { MatrixEvent } from 'matrix-js-sdk'
import { MessageStage, MessageSpec } from '@/components/MessageStage'
import { allMessagesState, messagesState, roomsState, globalClient, roomNow } from "@/sperate/msg-state"
import Menu from '@/components/Menu'
import { motion } from "framer-motion"
import { useRecoilState, useRecoilValue } from "recoil"

var client: sdk.MatrixClient

function Input() {
	const roomId = useRecoilValue(roomNow)
	const input = useRef<any>(null)
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

	const sendMessage = () => {
		console.log(input.current?.value || "")
		client.sendMessage(roomId, { body: input.current?.value || "", msgtype: "m.text" })

		input.current.value = ""
		input.current.focus()
	}
	return (
		<div
			className='p-1 rounded-full near-block mx-4 my-2 text-black'
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 2.5rem 2.5rem"
			}} >
			<input
				type="text"
				ref={input}
				onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) sendMessage() }}
				className="m-1 placeholder:text-gray-600 bg-transparent text-lg focus:outline-none"
				placeholder="Send a message..." />
			<motion.button
				type="button"
				className="rounded-md"
				variants={variants}
				whileHover={'hover'}
				onClick={sendMessage}
				whileTap={'tap'}>
				S
			</motion.button>
			<motion.button
				className="rounded-md"
				type="button"
				variants={variants}
				whileHover={'hover'}
				whileTap={'tap'}
				onClick={() => console.log(client)}>
				H
			</motion.button>
		</div>
	)
}

const Right = ({ events }: { events: MatrixEvent[] }) => {
	return (
		<div className="flex-col justify-around">
			<MessageStage events={events} />
		</div>
	)
}

const Left = () => {
	return (<div></div>)
}

function Page() {
	const [msgs, setMsgs] = useRecoilState(messagesState)
	const [rooms, setRooms] = useRecoilState(roomsState)
	const [allTheMessages, setAllTheMessage] = useRecoilState(allMessagesState)
	const [gGlient, setGlobalClient] = useRecoilState(globalClient)

	function clientInitialization() {
		client = sdk.createClient({
			baseUrl: localStorage.getItem("baseUrl") || "http://localhost:8008",
		})
		client.login("m.login.password", { "user": localStorage.getItem("userName"), "password": localStorage.getItem("password") }).then((response) => { })

		setGlobalClient(client)
	}

	function mountEventMapper() {
		client.on("event" as unknown as any, (event: any) => {
			if (event.getType() == "m.room.message") {
				console.log(event)
				allTheMessages.set(
					event.getRoomId(),
					[...allTheMessages.get(event.getRoomId()) || [], event])

				setMsgs(allTheMessages.get(event.getRoomId()) || [])
			}
			setGlobalClient(client)
		})
	}

	function getRoomList() {
		setRooms(client.getRooms())
		client.getRooms().forEach(room => allTheMessages.set(room.roomId, allTheMessages.get(room.roomId) || []))
	}

	useEffect(() => {
		clientInitialization()
		client.startClient()
		mountEventMapper()
	}, [])

	useEffect(() => {
		client = gGlient
	}, [gGlient])

	return (
		<div className="w-screen h-screen main-room">
			<Menu />
			<RoomList onClick={getRoomList} />
			<div style={{ gridColumn: 2 }} className="flex flex-col justify-between near-block">
				<Right events={msgs} />
				<Input />
			</div>
		</div>
	)
}

export default Page
