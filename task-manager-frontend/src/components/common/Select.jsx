const Select = ({ value, onChange, options = [], name, className = '' }) => (
    <select name={name} value={value} onChange={onChange} className={`border px-2 py-1 rounded ${className}`}>
        <option value="">Select</option>
        {options.map((o) => (
            <option key={o.value ?? o} value={o.value ?? o}>
                {o.label ?? o}
            </option>
        ))}
    </select>
);

export default Select;