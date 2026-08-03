function Input({
  id,
  name,
  type = "text",
  placeholder,
  value,
  checked,
  onChange,
  autoComplete,
  icon: Icon,
  disabled = false,
  error,
  className = "",
}) {
  if (type === "checkbox") {
    return (
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`w-5 h-5 rounded-md border-gray-300 text-blue-500 accent-blue-500 outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        )}
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`
            w-full
            ${Icon ? "pl-11 pr-5" : "px-5"}
            py-4
            border-2
            ${error ? "border-red-400" : "border-gray-300"}
            rounded-2xl
            text-gray-900
            placeholder:text-gray-400
            outline-none
            disabled:bg-gray-50 disabled:text-gray-400
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
            transition
            ${className}
          `}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default Input;
