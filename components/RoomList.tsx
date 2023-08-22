'use client'
import { ReactNode } from "react";
import { motion } from "framer-motion";

export function RoomList({ children }: { children?: ReactNode }) {
    return (
        <motion.div className="flex-center items-center justify-center roomlist near-block">
            {children}
        </motion.div>
    )
}

export function RoomListItem({ name }: { name?: string }) {
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
        <motion.div
            variants={variants}
            whileHover={"hover"}
            whileTap={"tap"}
            className="h-max w-[88%] mx-3 my-2 text-white text-clip rounded-md p-2 text-lg text-start hover:cursor-pointer "
            style={{
                color: '#A1608C'
            }}>
            Room: {name}
        </motion.div>
    )
}