export default  function TextArea({className, id, name, placeholder, rows, value, onChange}) {
    return (
        <textarea
            className={className}
            id={id}
            name={name}
            placeholder={placeholder}
            rows={rows}
            value={value}
            onChange={onChange}
            required
        />
    )
}
