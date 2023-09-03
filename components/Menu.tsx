'use client'
import * as React from "react";
import { useEffect, useRef } from "react";
import { motion, sync, useCycle } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { globalClient } from "@/sperate/msg-state";

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

const MenuItem = ({ itemName, onClick }: { itemName: string, onClick: any }) => {
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
    const style = {
        background: '#ffffff33',
        border: 'solid #ffffff35 1px'
    };
    return (
        <motion.li
            variants={variants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
        >
            <div className="px-3 py-2 shadow-sm rounded-md my-1 hover:cursor-pointer " style={style}>{itemName}</div>
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

const Menu = () => {
    const [isOpen, setOpen] = React.useState(false)
    const containerRef = useRef(null)
    const router = useRouter()
    const [client, setGlobalClient] = useRecoilState(globalClient)
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
    }

    const logout = async () => {
        console.log("hello?")
        if (window.confirm("confirm to logout?")) {
            await client.logout(true)
            localStorage.removeItem("userId")
            localStorage.removeItem("userName")
            localStorage.removeItem("password")
            localStorage.removeItem("baseUrl")
            localStorage.removeItem("accessToken")

            router.push("/login")

        }
    }
    const clearStore = async () => {
        client.stopClient()
        await client.clearStores()
        client.login("m.login.password", { "user": localStorage.getItem("userName"), "password": localStorage.getItem("password") }).then((response) => { })
        setGlobalClient(client)

        client.startClient()
    }
    const updateUserName = async () => {
        let newName = window.prompt("New display name:", localStorage.getItem("userName") || "")
        await client.setProfileInfo("displayname", { displayname: newName || "" })
        window.alert("Set display name done.")
    }


    const Order = () => {

        const variants = {
            open: {
                transition: { staggerChildren: 0.07, delayChildren: 0.2 }
            },
            closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 }
            }
        }
        return (<motion.ul variants={variants}>
            <MenuItem itemName="Logout" key="logout" onClick={async (e: MouseEvent) => { e.preventDefault(); await logout() }} />
            <MenuItem itemName="Clear Store" key="clearStore" onClick={() => clearStore()} />
            <MenuItem itemName="Update Display Name" key="updateUsername" onClick={() => updateUserName()} />
        </motion.ul>)
    }

    return (
        <motion.div
            className="fixed h-max z-10 rounded-[8px] backdrop-blur-md p-2 flex-col justify-end shadow-md"
            style={{
                top: '3vh'
                , left: '89vw'
                , background: '#ffffff33'
                , display: 'flex'
                , width: 'max-content'
            }}
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
        >
            <MenuToggle toggle={() => setOpen(() => !isOpen)} />
            {isOpen && <Order />}
        </motion.div>
    )
}


export default Menu