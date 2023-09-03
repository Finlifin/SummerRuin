'use client'
import { motion } from "framer-motion"
import { ReactNode, useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import * as Katex from "react-katex"
import { MatrixEvent, getHttpUriForMxc } from "matrix-js-sdk"
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

        return (
            <motion.div
                style={{
                    position: 'fixed',
                    top: `${y}px`,
                    left: `${x}px`,
                    zIndex: 999999
                    // background: 'black',
                    
                }}>
                {['asf', 'sdf', 'sdfsdf'].map((k) => <div key={k}>{k}</div>)}
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
                setX(() => event.movementX)
                setY(() => event.movementY)
                setPopup(true)
            }}
            onBlur={() => {
                setPopup(false)
            }}
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