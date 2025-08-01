export default function Form({className, onSubimit, children}) {
    return (
        <form className={className} onSubmit={onSubimit}>
            {children}
        </form>
    )
}
