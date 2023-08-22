'use client'
import { motion, LayoutGroup } from "framer-motion"
import { ReactNode, useEffect, useRef } from "react"
import * as Katex from "react-katex"
import 'katex/dist/katex.min.css'

export type MessageSpec = {
    id: string,
    content: string,
    eventId?: string
}

function Timeline() {}

export function Message({ data }: { data: MessageSpec }) {
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

    const Content = ({ content }: { content: string }) => {
        let here = `  ${content}`.split('$$').entries()
        let elems: ReactNode[] = [];
        for (const [index, value] of here) {
            elems = [...elems,
            (index % 2 == 0) ? <div>{value}</div> : <Katex.BlockMath>{value}</Katex.BlockMath>]
        }

        return (
            <div>
                {elems}
            </div>
        )
    }

    return (
        <motion.div
            className="flex-col m-7 p-3 near-block w-max"
            style={{ minWidth: '16rem', boxShadow: '2px 2px 5px 0px #00000044' }}
            variants={variants}
            whileHover={"hover"}
            whileTap={"tap"}
        >
            <div>{data.id}</div>
            <Content content={data.content} />
        </motion.div>
    )
}

export function MessageStage({ messages }: { messages: MessageSpec[] }) {
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
                messages.map((msg) => <Message data={msg} key={msg.eventId} />)
            }
            <div ref={ref}></div>
        </div>
    )
}