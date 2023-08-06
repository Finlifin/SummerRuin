export default function Lint (props:any) {
    return (
        <div className="block text-center underline text-blue-400 m-3 hover:cursor-pointer hover:text-blue-700" {...props}>{props.children}</div>
    )
}