function Input({
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
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