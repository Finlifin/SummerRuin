'use client'
import { MouseEventHandler, ReactNode } from "react";
import { motion } from "framer-motion";
import CharAvattar from "./CharAvatar";
import { useRecoilState, useRecoilValue } from "recoil";
import { allMessagesState, messagesState, roomNow, roomsState } from "@/sperate/msg-state";
import { Room } from "matrix-js-sdk";

export function RoomList({ onClick }: { onClick: MouseEventHandler }) {
    const rooms = useRecoilValue(roomsState)
    return (
        <motion.div className="flex-center items-center justify-center roomlist near-block" onClick={(e) => { onClick(e); console.log(rooms) }}>
            {rooms.map((x) => <RoomListItem room={x} key={x.roomId} />)}
        </motion.div>
    )
}

export function RoomListItem({ room }: { room?: Room }) {
    const allTheMessages = useRecoilValue(allMessagesState)
    const [msgs_now, setMsgsNow] = useRecoilState(messagesState)
    const [roomNowId, setRoomNowId] = useRecoilState(roomNow)

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

    function handleClick() {
        setMsgsNow(
            allTheMessages.get(room?.roomId || "") || []
        )

        setRoomNowId(
            room?.roomId || ""
        )

        document.title = room?.name || "Unknown Room"
    }

    return (
        <motion.div
            variants={variants}
            whileHover={"hover"}
            whileTap={"tap"}
            className="flex items-center h-max w-[88%] mx-3 my-2 text-clip rounded-md p-2 text-lg text-start hover:cursor-pointer "
            style={{
                color: 'rgb(65, 6, 46)'
            }}
            onClick={handleClick}>
            <CharAvattar name={room?.name || '?'} /> {room?.name}
        </motion.div>
    )
}