'use client'
import { motion, LayoutGroup } from "framer-motion"

type MessageSpec = {
    id: string,
    content: string,
    eventId?: string
}

export function Message({ data }: { data: MessageSpec }) {
    const variants = {
        hover: {
            backgroundColor: '#00000030',
            transition: {
                duration: '.2'
            }

        },
    }
    return (
        <motion.div
            className="flex-col m-7 p-3 near-block w-max "
            style={{ minWidth: '16rem', boxShadow: '2px 2px 5px 0px #00000044' }}
            variants={variants}
            whileHover={"hover"}
        >
            <div>{data.id}</div>
            <div></div>
            <div>{data.content}</div>
        </motion.div>
    )
}

export function MessageStage({ messages }: { messages: MessageSpec[] }) {
    return (
        <div className="h-[90%] w-[90%] flex-col">{
            messages.map((msg) => <Message data={msg} key={msg.eventId} />)
        }</div>
    )
}