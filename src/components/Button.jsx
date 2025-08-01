export default function Button({className, type, onClick, children, disabled}) {
    return (
        <button className={className} type={type} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}
