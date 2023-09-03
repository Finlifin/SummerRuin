'use client'
import * as React from "react";
import { useEffect, useRef } from "react";
import { motion, sync, useCycle } from "framer-motion";

const useDimensions = (ref: any) => {
    const dimensions = useRef({ width: 0, height: 0 });

    useEffect(() => {
        dimensions.current.width = ref.current.offsetWidth;
        dimensions.current.height = ref.current.offsetHeight;
    }, []);

    return dimensions.current;
};

const Path = (props: any) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
    />
);


const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = (props: any) => {
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
    };
    const style = { border: `2px solid ${colors[props.i]}` };
    return (
        <motion.li
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            <div className="icon-placeholder" style={style}></div>
            <div className="text-placeholder" style={style}>{props.itemName}</div>
        </motion.li>
    )
};


const MenuToggle = ({ toggle }: any) => (
    <button
        onClick={toggle}
        className=" focus:outline-none border-none bg-white w-max p-4 rounded-full z-20"
        style={{
            aspectRatio: '1/1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <svg width="23" height="23" viewBox="0 0 23 23">
            <Path
                variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" }
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" }
                }}
            />
        </svg>
    </button>
);





const Navigation = () => {

    const variants = {
        open: {
            transition: { staggerChildren: 0.07, delayChildren: 0.2 }
        },
        closed: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 }
        }
    }
    return (<motion.ul variants={variants}>
        {itemIds.map(i => (
            <MenuItem i={i} key={i} itemName="Logout" />
        ))}
    </motion.ul>)
}

const itemIds = [0, 1, 2, 3, 4];

const Menu = () => {
    const [isOpen, toggleOpen] = useCycle(false, true)
    const containerRef = useRef(null)
    const { height } = useDimensions(containerRef)
    const sidebar = {
        open: (height = 1000) => ({
            clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2
            }
        }),
        closed: {
            clipPath: "circle(30px at 40px 40px)",
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };


    return (
        <motion.div
            className="fixed h-[400px] w-[300px] z-10 rounded-[8px] backdrop-blur-md p-2 flex-col justify-end shadow-md"
            style={{
                top: '50vh'
                , left: '5vw'
                , background: '#ffffff33'
                , display: 'flex'
            }}
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
        >
            {/* <motion.div className=" bg-white fixed top-0 left-0 w-100 h-screen" variants={sidebar} /> */}
            <Navigation />
            <MenuToggle toggle={() => toggleOpen()} />
        </motion.div>
    );
};


export default Menu