function Select({ id, name, value, onChange, options = [], placeholder, disabled = false, className = "" }) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`
        w-full px-5 py-4 border-2 border-gray-300 rounded-2xl
        text-gray-900 outline-none bg-white
        disabled:bg-gray-50 disabled:text-gray-400
        focus:border-orange-500 focus:ring-2 focus:ring-orange-100
        transition
        ${className}
      `}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
