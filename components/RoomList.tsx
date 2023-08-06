'use client'
import { ReactNode } from "react";
import { motion } from "framer-motion";

export function RoomList({ children }: { children?: ReactNode }) {
    return (
        <motion.div className="bg-[#19191d] w-[15vw] h-full">
            {children}
        </motion.div>
    )
}

export function RoomListItem({ name }: { name?: string }) {
    const variants = {
        hover: {
            backgroundColor: '#224334',
            transition: {
                duration: '.2'
            }
        },
    }

    return (
        <motion.div
            variants={variants}
            whileHover={'hover'}
            className="h-max m-2 text-white bg-[#22212a] rounded-md p-2 text-lg text-start hover:cursor-pointer">
            Room: {name}
        </motion.div>
    )
}