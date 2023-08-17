'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

function Menu() {
    const variants = {
        hover: {
            scale: '1.05',
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40
            }

        },
        folded: {
            scale: '1.0',
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        },
        unfolded: {
            scale: '10.0',
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40
            }

        }
    }

    const [folded, setFolded] = useState(true)

    return (
        <motion.div
            variants={variants}
            animate={folded ? "folded" : "unfolded"}
            transition={{ duration: '6' }}
            className='w-16 h-16 bg-[#eef0f2] my-shadow rounded-full hover:cursor-pointer z-50'
            style={{
                position: 'fixed',
                top: '92%',
                left: '3%'
            }}
            onClickCapture={() => setFolded((old: boolean) => !old)}>

        </motion.div>
    )
}

export default Menu
