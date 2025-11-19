const Textarea = ({ value, onChange, placeholder = '', name, rows = 4, className = '', ...rest }) => (
    <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border px-2 py-1 rounded w-full ${className}`}
        {...rest}
    />
);

export default Textarea;