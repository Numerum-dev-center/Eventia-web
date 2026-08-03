function SectionTitle({
  label,
  title,
  description,
  align = "center",
}) {

  return (

    <div
      className={`
        max-w-3xl
        ${
          align === "center"
            ? "mx-auto text-center"
            : "text-left"
        }
      `}
    >

      {label && (

        <span
          className="
            text-blue-500
            font-semibold
            uppercase
            tracking-widest
            text-sm
          "
        >
          {label}
        </span>

      )}


      <h2
        className="
          mt-4
          text-4xl
          lg:text-5xl
          font-bold
          text-gray-900
          leading-tight
        "
      >
        {title}
      </h2>


      {description && (

        <p
          className="
            mt-6
            text-lg
            text-gray-600
            leading-8
          "
        >
          {description}
        </p>

      )}

    </div>

  );
}


export default SectionTitle;