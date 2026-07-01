function Input({
  id,
  name,
  type = "text",
  placeholder,
  value,
  checked,
  onChange,
  autoComplete,
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={type === "checkbox" ? undefined : value}
      checked={type === "checkbox" ? checked : undefined}
      onChange={onChange}
      autoComplete={autoComplete}
      className="
        w-full
        px-5
        py-4
        border-2
        border-gray-500
        rounded-2xl
        text-gray-900
        placeholder:text-gray-700
        outline-none
        focus:border-orange-500
        focus:ring-2
        focus:ring-orange-300
      "
    />
  );
}

export default Input;