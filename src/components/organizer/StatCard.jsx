function StatCard({
  title,
  value,
  icon,
  active,
  onMouseEnter,
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className={`
        rounded-2xl
        p-6
        flex
        items-center
        justify-between
        cursor-pointer
        transition-all
        duration-300

        ${
          active
            ? "bg-orange-50 border-2 border-orange-500 shadow-lg scale-[1.02]"
            : "bg-white shadow hover:shadow-lg"
        }
      `}
    >
      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2
          className="
            text-3xl
            font-bold
            mt-2
          "
        >
          {value}
        </h2>
      </div>

      <div
        className={`
          text-3xl
          ${
            active
              ? "text-orange-600"
              : "text-orange-500"
          }
        `}
      >
        {icon}
      </div>
    </div>
  );
}

export default StatCard;