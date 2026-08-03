function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white border border-dashed border-gray-200 rounded-2xl">
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
          <Icon size={22} />
        </div>
      )}
      <h3 className="font-semibold text-gray-800">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 mt-1.5 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;
