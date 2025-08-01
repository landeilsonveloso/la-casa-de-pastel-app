export default function Option({value, children, disabled}) {
    return (
        <option value={value} disabled={disabled}>
            {children}
        </option>  
    )
}
