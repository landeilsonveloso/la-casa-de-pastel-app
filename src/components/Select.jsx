export default function Select({className, value, onChange, children, required}) {
    return (
        <select className={className} value={value} onChange={onChange} required={required}>
            {children}
        </select>    
    )
}
