export default function Select({className, id, name, value, onChange, children, required}) {
    return (
        <select className={className} id={id} name={name} value={value} onChange={onChange} required={required}>
            {children}
        </select>    
    )
}
