'use client'
import React, { useState } from 'react'
import { motion, useCycle } from 'framer-motion'

const backgroundVariants = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2}px at 10vw 90vh)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
            damping: 10
        }
    }),
    closed: {
        clipPath: "circle(80px at 10vw 90vh)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            restDelta: 2,
            damping: 80
        }
    }
};

function Menu() {
    const [open, toggleOpen] = useCycle(false, true)

    return (<motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        onClickCapture={() => toggleOpen()}
        style={{
            position: 'fixed',
            bottom: '5vh',
            left: '5vw'
        }}>
        <motion.div className="menu-background" variants={backgroundVariants}></motion.div>
    </motion.div>)
}
export default Menu
