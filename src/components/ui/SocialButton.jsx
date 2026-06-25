function SocialButton({
  icon,
  children,
  onclick,
}) {
  return (

    <button
        onClick={onclick}
      className="
        flex
        items-center
        gap-3
        px-6
        py-3
        border
        border-gray-300
        rounded-xl
        hover:bg-gray-100
        transition
      "
    >
      {icon}
      <span className="font-medium text-gray-700">
        {children}
      </span>
    </button>
  );
}

export default SocialButton;