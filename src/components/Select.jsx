export default function Select({className, value, onChange, children}) {
    return (
        <select className={className} value={value} onChange={onChange} required>
            {children}
        </select>    
    )
}
