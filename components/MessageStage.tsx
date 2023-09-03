'use client'
import { motion } from "framer-motion"
import { ReactNode, useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import * as Katex from "react-katex"
import { MatrixEvent, Room, getHttpUriForMxc } from "matrix-js-sdk"
import 'katex/dist/katex.min.css'
import CharAvattar from "./CharAvatar"
import { useRecoilState } from "recoil"
import { globalClient } from "@/sperate/msg-state"

export type MessageSpec = {
    id: string,
    content: string,
    eventId?: string,
    type?: string
}

export function Message({ data }: { data: MatrixEvent }) {
    const [gClient, setGlobalClient] = useRecoilState(globalClient)
    const [popup, setPopup] = useState(false)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    let msgtype = data.event.content?.msgtype || "m.text"
    let content = data.event.content
    let msg = data.event

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

    const Content = () => {
        let here = `  ${content?.body}`.split('$$').entries()
        let elems: ReactNode[] = [];
        for (const [index, value] of here) {
            elems = [...elems,
            (index % 2 == 0) ? <ReactMarkdown>{value}</ReactMarkdown> : <Katex.BlockMath>{value}</Katex.BlockMath>]
        }

        return (
            <div>
                {elems}
            </div>
        )
    }

    const LImage = () => {
        let url: string = getHttpUriForMxc(gClient.baseUrl, content?.url)
        return <img
            style={{
                maxWidth: '40rem',
                maxHeight: '40rem',
                minHeight: '10rem',
                minWidth: '10rem'
            }}
            src={url}
            alt={content?.body}></img>
    }

    const Timeline = () => {
        const [timeStamp, _] = useState(Date())
        return <div
            className="text-center"
        >
            {timeStamp}
        </div>
    }

    const Popup = () => {
        const popupMotion = {}

        const copyMessageContent = async () => {
            navigator.clipboard.writeText(content?.body)
        }
        const revocateEvent = () => {
            let currentRoom = new Room(
                data.getRoomId() || "",
                gClient,
                gClient.getUserId() || ""
            )
            console.log(
                currentRoom.removeEvent(data.event.event_id || "")
            )
        }

        const MenuItem = ({ itemName, onClick }: { itemName: string, onClick: any }) => {
            const variants = {
                open: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        y: { stiffness: 1000, velocity: -100 }
                    }
                },
                closed: {
                    y: 50,
                    opacity: 0,
                    transition: {
                        y: { stiffness: 1000 }
                    }
                }
            }
            const style = {
                background: '#ffffff33',
                border: 'solid #ffffff35 1px'
            }
            return (
                <motion.div
                    variants={variants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseDown={onClick}
                >
                    <div className="px-3 py-2 shadow-sm rounded-md my-1 hover:cursor-pointer " style={style}>{itemName}</div>
                </motion.div>
            )
        };


        return (
            <motion.div
                className="rounded p-4"
                initial={false}
                animate={{
                    x: 200,
                    transition: {
                        duration: 0.4,
                        type: 'tween'
                    }
                }}
                style={{
                    position: 'fixed',
                    top: `${y}px`,
                    left: `${x}px`,
                    zIndex: 999999,
                    background: '#00000033',
                    backdropFilter: 'blur(18px)'

                    // background: 'black',

                }}>
                <MenuItem itemName="Revocation the message" key={1} onClick={() => { revocateEvent() }} />
                {msgtype === "m.text" && <MenuItem itemName="Copy the messaage content" key={2} onClick={async () => {
                    await copyMessageContent()
                }} />}
                {/* {msgtype === "m.text" && <MenuItem itemName="Copy content" key={3} onClick={() => { }} />}
                {msgtype === "m.text" && <MenuItem itemName="Copy content" key={4} onClick={() => { }} />}
                {msgtype === "m.text" && <MenuItem itemName="Copy content" key={5} onClick={() => { }} />} */}
            </motion.div>
        )
    }

    return (
        <motion.div
            className="flex-col m-7 p-3 near-block w-max"
            style={{ minWidth: '16rem', boxShadow: '2px 2px 5px 0px #00000044' }}
            variants={variants}
            whileHover={"hover"}
            whileTap={"tap"}
            onClick={(event) => {
                // setX(() => event.clientX)
                // setY(() => event.clientY)
                setPopup(() => !popup)
            }}
            onBlur={() => setPopup(false)}
        >
            <div className="flex items-center"><CharAvattar name={data.sender?.name} />{data.sender?.name}</div>
            {
                msgtype === "m.text" ?
                    <Content /> :
                    msgtype === "m.image" ?
                        <LImage /> :
                        <div></div>
            }
            {
                popup ? <Popup /> : null
            }
        </motion.div>
    )
}

export function MessageStage({ events }: { events: MatrixEvent[] }) {
    const ref = useRef(null)
    useEffect(() => {
        let some = ref.current as any
        some.scrollIntoView({ behavior: "smooth" })
    })
    return (
        <div
            className="flex-col overflow-auto max-h-[92vh]"
            style={{
                scrollbarWidth: 'thin'
            }}
        >
            {
                events.map((event) => <Message data={event} key={event.getId()} />)
            }
            <div ref={ref}></div>
        </div>
    )
}