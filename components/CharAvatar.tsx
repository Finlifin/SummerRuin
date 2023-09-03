export default function CharAvattar({ name }: { name?: string }) {
    return (
        <div
            style={{
                borderRadius: '50%',
                width: '2rem',
                height: '2rem',
                aspectRatio: '1/1',
                background: '#00000033',
                fontFamily: 'noto sans',
                color: 'white',
                margin: '0.3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            { typeof(name) === "undefined" ? "?" :
            
            name.toString().charAt(0).toUpperCase()}
        </div>
    )
}