'use client'
import { easeInOut, motion } from "framer-motion"

const variants = {
    hover: {
        scale: 1.05
    },
    transition: {
        duration: 0.4,
        // type:  'tween',
        ease: 'easeInOut'
    }
}

export default function Button_({ children, ...props }: any) {
    return (
        <motion.button
            {...props}
            variants={variants}
            whileHover={'hover'}
            transition={'transition'}
            className=" block rounded my-border text-md shadow-md p-2 my-5"
            style={{
                alignSelf: 'center',
                margin: 'auto',
                color: '#000000aa',
                fontWeight: 'bold'
            }}
        >{children}</motion.button>
    )
}